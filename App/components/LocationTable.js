import React, { useMemo } from 'react';
import { Text, VStack } from 'native-base';
import CustomTable from './CustomTable';

const LocationTable = ({ data }) => {
  const getWarehouseMap = (locations) => {
    return locations.reduce((acc, item) => {
      const warehouse = acc?.[item.warehouse?._id];
      return {
        ...acc,
        [item.warehouse?._id]: [...(warehouse || []), item]
      };
    }, {});
  };

  const locationData = useMemo(() => getWarehouseMap(data), [data]);
  const aggregatedData = useMemo(
    () => Object.values(locationData),
    [locationData]
  );

  if (aggregatedData?.length > 0) {
    return (
      <VStack mt={5} space={5}>
        {aggregatedData.map((locations) => {
          const warehouse = locations[0].warehouse;
          const locationList = locations
            .filter((location) => location?.quantity > 0)
            ?.map((item) => {
              return [
                item._id, // always add row id to the first column
                item.label,
                item.quantity,
                item.outstandingVariance
              ];
            });
          return (
            <VStack key={warehouse?._id}>
              <Text mb={3} fontWeight="semibold">
                {warehouse.name}
              </Text>
              <CustomTable
                tableBody={locationList}
                tableHead={['Location', 'Quantity', 'Accurate']}
              />
            </VStack>
          );
        })}
      </VStack>
    );
  }
  return null;
};

export default LocationTable;
