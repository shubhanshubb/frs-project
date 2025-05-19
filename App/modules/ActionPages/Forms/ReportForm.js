import { Box } from 'native-base';
import React from 'react';
import { CustomRadioButton, CustomTextAreaInput } from '../../../components';
import { getFormikError, getFormikValue } from '../../../services/Utils';

const ReportForm = ({ formik }) => {
  return (
    <Box width={'100%'}>
      <CustomRadioButton
        label="Reporting for"
        value={getFormikValue(formik, 'reportingFor')}
        defaultValue={getFormikValue(formik, 'reportingFor')}
        onChange={(value) => {
          formik.setFieldValue('reportingFor', value);
          formik.setTouched('reportingFor', true);
          formik.setFieldValue('details', '');
        }}
        data={[
          {
            label: 'Location',
            value: 'LOCATION'
          },
          {
            label: 'Issue',
            value: 'ISSUE'
          },
          {
            label: 'Incident',
            value: 'INCIDENT'
          }
        ]}
      />
      <CustomTextAreaInput
        label="Issue/ Incident Details"
        value={getFormikValue(formik, 'details')}
        isInvalid={getFormikError(formik, 'details')}
        onBlur={formik.handleBlur('details')}
        onChangeText={formik.handleChange('details')}
        numberOfLines={6}
        maxH={200}
        minH={150}
      />
    </Box>
  );
};

export default ReportForm;
