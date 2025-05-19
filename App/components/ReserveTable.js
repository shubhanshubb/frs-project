import React, { useMemo } from 'react';
import { Stack } from 'native-base';
import CustomTable from './CustomTable';

const ReserveTable = ({
  data,
  selection = 'single',
  selected = [],
  hasSelection = false,
  onSelection
}) => {
  const getLocationData = (locations) => {
    return locations?.reduce((acc, item) => {
      if (acc[item.warehouse?.id]) {
        const warehouse = { ...acc[item.warehouse?.id] };
        warehouse.quantity += item.quantity;
        warehouse.outstandingVariance =
          warehouse.outstandingVariance || item.outstandingVariance;
        return { ...acc, [item.warehouse?.id]: warehouse };
      }
      return { ...acc, [item.warehouse?.id]: item };
    }, {});
  };

  const getAggregatedData = (locationMap) => {
    return Object.values(locationMap).map((item) => {
      return [
        item.warehouse._id, // always add row id to the first column
        item.warehouse.name,
        item.quantity,
        item.outstandingVariance
      ];
    });
  };

  const locationData = useMemo(() => getLocationData(data), [data]);
  const aggregatedData = useMemo(() => getAggregatedData(locationData), [
    locationData
  ]);

  if (data?.length > 0) {
    return (
      <Stack mt={5}>
        <CustomTable
          tableBody={aggregatedData ?? []}
          tableHead={['Warehouse', 'Count', 'Accurate']}
          selectionType={selection}
          hasSelection={hasSelection}
          checkedValue={selected}
          onSelect={(item) => {
            onSelection(item);
          }}
        />
      </Stack>
    );
  }
  return null;
};

export default ReserveTable;
