import { Stack } from 'native-base';
import React from 'react';
import { CustomButtonGroup, SelectInput } from '../../../components';
import { getFormikError, getFormikValue } from '../../../services/Utils';
import useFilterForm from '../hooks/useFilterForm';

const FilterModalForm = ({
  onFilterResult,
  onFilterClear,
  hideClearButton = false
}) => {
  const {
    formik,
    inventoryList,
    onSelectInventory,
    onSelectParent,
    getParent,
    subCategory,
    selectedInventory,
    params,
    isSubmitting,
    inventoryItems,
    onPressButton
  } = useFilterForm(onFilterResult, onFilterClear);

  return (
    <>
      <Stack flex={1}>
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
              isDisabled: !selectedInventory?.label,
              isLoading: isSubmitting
            }
          ].filter((item) => !hideClearButton || item.label !== 'Clear')}
        />
      </Stack>
    </>
  );
};

export default FilterModalForm;
