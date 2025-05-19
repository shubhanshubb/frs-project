import { Stack, Text, theme, View } from 'native-base';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { CustomButtonGroup, SelectInput } from '../../../components';
import { getFormikError, getFormikValue } from '../../../services/Utils';
import useFilterInventoryReports from '../hooks/useFilterInventoryReports';

const FilterInventoryModal = ({
  warehouses,
  defaultFormValues,
  onFilterResult,
  onFilterClear,
  hideClearButton = false
}) => {
  const {
    formik,
    isLoading,
    inventoryList,
    onSelectInventory,
    onSelectParent,
    getParent,
    subCategory,
    selectedInventory,
    params,
    isSubmitting,
    inventoryItems,
    warehouseList,
    onPressButton
  } = useFilterInventoryReports(
    onFilterResult,
    onFilterClear,
    warehouses,
    defaultFormValues
  );
  console.log('formik', formik?.values);

  return (
    <>
      {isLoading ? (
        <View flex={1} justifyContent={'center'} alignItems={'center'}>
          <ActivityIndicator size={'large'} color={theme.colors.primary} />
        </View>
      ) : (
        <>
          <Stack flex={1}>
            <SelectInput
              label={`Select Warehouse`}
              data={warehouseList}
              selectedValue={getFormikValue(formik, 'warehouse')}
              isInvalid={getFormikError(formik, 'warehouse')}
              onSelect={(value) => {
                formik.setFieldValue('warehouse', value);
                formik.handleBlur('warehouse');
              }}
            />
            <SelectInput
              label={`Select Inventory`}
              data={inventoryList}
              selectedValue={getFormikValue(formik, 'inventory')}
              isInvalid={getFormikError(formik, 'inventory')}
              onSelect={(value) => {
                onSelectInventory(value);
                formik.setFieldValue('inventory', value);
                formik.handleBlur('inventory');
              }}
            />
            {selectedInventory?.label && (
              <SelectInput
                label={`Select ${selectedInventory?.label ?? ''} - Family`}
                data={getParent(inventoryItems ?? [])}
                selectedValue={getFormikValue(formik, 'type')}
                isInvalid={getFormikError(formik, 'type')}
                onSelect={(value, f) => {
                  onSelectParent(value);
                  formik.setFieldValue('type', value);
                  formik.handleBlur('type');
                }}
              />
            )}

            {subCategory?.length > 0 && (
              <SelectInput
                label={`Select ${selectedInventory?.label ?? ''} - Sub family`}
                data={subCategory ?? []}
                selectedValue={getFormikValue(formik, 'category')}
                isInvalid={getFormikError(formik, 'category')}
                onSelect={(value) => {
                  formik.setFieldValue('category', value);
                  formik.handleBlur('category');
                }}
              />
            )}
          </Stack>
          <Stack flex={0.1} justifyContent="flex-end">
            <CustomButtonGroup
              onPressButton={onPressButton}
              buttons={[
                {
                  label: 'Clear',
                  bg: 'red.400'
                },
                {
                  label: 'Apply',
                  isDisabled:
                    getFormikValue(formik, 'inventory') === '' &&
                    getFormikValue(formik, 'warehouse') === '',
                  isLoading: isSubmitting
                }
              ].filter((item) => !hideClearButton || item.label !== 'Clear')}
            />
          </Stack>
        </>
      )}
    </>
  );
};

export default FilterInventoryModal;
