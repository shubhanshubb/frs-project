import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import _ from 'underscore';
import { API } from '../../../constant';
import { INVENTORY_REPORTS_PAGE_SIZE } from '../../../constant/constants';
import { makeAPIRequest } from '../../../services/Utils';

const useInventoryReport = () => {
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(1);
  const [inventoryReportsData, setInventoryData] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [totalInventoryCost, setTotalInventoryCost] = useState(0);
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [warehouses, setWarehouses] = useState([]);
  const warehousesRef = useRef([]);
  const filterParamsRef = useRef('');
  const totalCost = useRef(0);

  const filterFormDataRef = useRef({
    inventory: '',
    type: '',
    category: '',
    warehouse: ''
  });

  const [isFilterPageVisible, setFilterPageVisible] = useState(false);

  const [query, setQuery] = useState('');
  const dataRef = useRef([]);

  const onOpenModal = useCallback(() => {
    setFilterPageVisible(true);
  }, [isFilterPageVisible]);

  const onCloseModal = useCallback(() => {
    setFilterPageVisible(false);
  }, [isFilterPageVisible]);

  const filterResponse = (resp) => {
    return new Promise((resolve, reject) => {
      const inventoryItem = resp.map((itemAssociation) => {
        let location = [];
        let totalQuantity = 0;
        let InventoryCost = 0;
        for (let i in itemAssociation.locations) {
          location.push(
            `${itemAssociation?.locations[i]?.locationLabel} [${itemAssociation?.locations[i]?.totalQuantity}] `
          );
          totalQuantity += itemAssociation?.locations[i]?.totalQuantity;
          InventoryCost += Math.round(
            itemAssociation?.locations[i]?.totalQuantity *
              itemAssociation?._id?.item_id?.unitCost
          );
        }
        location = location.join('\n');
        let temp = {
          id: itemAssociation?._id ?? '',
          key: itemAssociation?._id?.item_id?._id ?? Math.random().toString(),
          // location: location ?? '',
          itemName: itemAssociation?._id?.item_id?.formalName ?? '',
          total: totalQuantity ?? '0',
          // reserved: itemAssociation?.reservedQuantity ?? '0',
          // available: totalQuantity - itemAssociation?.reservedQuantity ?? '0',
          cost: `$ ${InventoryCost.toLocaleString('en-US')}` ?? '0',
          // unitCost:
          //   `$ ${Math.round(
          //     itemAssociation?._id?.item_id?.unitCost
          //   ).toLocaleString('en-US')}` ?? 0,
          inventory:
            itemAssociation?._id?.item_id?.widgetFamily?.inventory?.name ?? '',
          size: itemAssociation?._id?.item_id?.size ?? '',
          thickness: itemAssociation?._id?.item_id?.type ?? '',
          color: itemAssociation?._id?.item_id?.color ?? '',
          warehouse:
            warehousesRef?.current?.find(
              (x) => x._id === itemAssociation?._id?.warehouse_id
            )?.name ?? ''
        };
        if (itemAssociation?._id?.item_id?.widgetFamily?.parent?.name) {
          temp = {
            ...temp,
            primaryWidgetFamily:
              itemAssociation?._id?.item_id?.widgetFamily?.parent?.name ?? '',
            secondaryWidgetFamily:
              itemAssociation?._id?.item_id?.widgetFamily?.name ?? ''
          };
        } else {
          temp = {
            ...temp,
            primaryWidgetFamily:
              itemAssociation?._id?.item_id?.widgetFamily?.name ?? ''
          };
        }
        return temp;
      });
      resolve(inventoryItem);
    });
  };

  const fetchInventoryReports = async (currentPage = 1) => {
    if (currentPage === 1) {
      setInitialLoading(true);
    } else {
      setLoadingNextPage(true);
    }
    try {
      const warehouseData = await queryClient.fetchQuery(
        ['warehouse-data', currentPage],
        () => makeAPIRequest('get', API.GET_WAREHOUSE_DATA)
      );
      setWarehouses(warehouseData?.data);
      warehousesRef.current = warehouseData?.data;
      const { data, success, count, totalInventoryCost } =
        await queryClient.fetchQuery(['inventory', currentPage], () =>
          makeAPIRequest(
            'get',
            API.INVENTORY_REPORT(currentPage) + filterParamsRef?.current
          )
        );

      if (data && success) {
        const inventoryData = await filterResponse(data);
        totalCost.current = totalInventoryCost;
        setTotalInventoryCost(totalInventoryCost);
        setTotalCount(count);
        setPage(currentPage);
        if (currentPage === 1) {
          dataRef.current = inventoryData;
          setInventoryData(inventoryData);
        } else {
          const filterDataMerge = [...inventoryReportsData, ...inventoryData];
          dataRef.current = filterDataMerge;
          setInventoryData(filterDataMerge);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInitialLoading(false);
      setLoadingNextPage(false);
    }
  };

  useEffect(() => {
    filterParamsRef.current = '';
    fetchInventoryReports();
  }, [navigation]);

  const onLoadMore = () => {
    if (
      page + 1 <= Math.ceil(totalCount / INVENTORY_REPORTS_PAGE_SIZE) &&
      !loadingNextPage &&
      !initialLoading
    ) {
      fetchInventoryReports(page + 1);
    }
  };

  const contains = (
    {
      itemName,
      warehouse,
      inventory,
      primaryWidgetFamily,
      secondaryWidgetFamily,
      location,
      unitCost,
      cost,
      thickness,
      size
    },
    query
  ) => {
    const text = query?.toLowerCase();

    if (
      itemName?.toLowerCase().includes(text) ||
      warehouse?.toLowerCase().includes(text) ||
      inventory?.toLowerCase().includes(text) ||
      primaryWidgetFamily?.toLowerCase().includes(text) ||
      secondaryWidgetFamily?.toLowerCase().includes(text) ||
      unitCost?.toLowerCase().includes(text) ||
      location?.toLowerCase().includes(text) ||
      cost?.toLowerCase().includes(text) ||
      size?.toLowerCase().includes(text) ||
      thickness?.toLowerCase().includes(text)
    ) {
      return true;
    }

    return false;
  };

  const handleSearch = (text) => {
    if (text?.trim()?.length === 0) {
      setInventoryData(dataRef.current);
      setQuery(text);
      return true;
    }
    const formattedQuery = text.toLowerCase();
    const filteredData = _.filter(dataRef.current ?? [], (item) => {
      return contains(item, formattedQuery);
    });
    setInventoryData(filteredData);
    setQuery(text);
  };

  const onFilterResult = (filterData, values) => {
    onCloseModal();
    filterParamsRef.current = filterData;
    filterFormDataRef.current = values;
    fetchInventoryReports(1);
  };

  const onFilterClear = () => {
    onCloseModal();
    filterParamsRef.current = '';
    filterFormDataRef.current = null;
    fetchInventoryReports(1);
  };

  return {
    initialLoading,
    loadingNextPage,
    totalInventoryCost: totalInventoryCost,
    onLoadMore,
    inventoryReportsData,
    handleSearch,
    query,
    isFilterPageVisible,
    warehouses,
    onFilterResult,
    onFilterClear,
    onOpenModal,
    defaultFormValues: filterFormDataRef.current,
    onCloseModal
  };
};

export default useInventoryReport;
