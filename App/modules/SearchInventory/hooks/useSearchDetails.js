import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { API } from '../../../constant';
import useCustomQuery from '../../../hooks/useCustomQuery';
import useUserPermissions from '../../../hooks/useUserPermissions';

const useSearchDetails = () => {
  const { t } = useTranslation();
  const { params } = useRoute();
  const { navigate } = useNavigation();

  const { checkPermission } = useUserPermissions();

  const { data, isLoading, isError, error } = useCustomQuery(
    'get',
    'item-for-transaction',
    API.ITEM_DETAILS(params?._id)
  );

  const getCustomAttributeData = () => {
    if (data?.customAttributes?.length > 0) {
      return data?.customAttributes?.map((item) => {
        return { title: item?.fieldName, value: item?.fieldValue ?? '' };
      });
    } else {
      return [];
    }
  };

  const getData = () => {
    return [
      {
        title: 'Formal Name',
        value: data?.formalName ?? ''
      },
      {
        title: 'Description',
        value: data?.description ?? ''
      },
      {
        title: 'Manufacturer',
        value: data?.manufacturer ?? ''
      },
      {
        title: 'Size | Type | Color',
        value: `${data?.size ?? ''} | ${data?.type ?? ''} | ${data?.color ??
          ''}`
      },
      {
        title: 'Last Maintenance Date',
        value: data?.updatedAt ?? ''
      },
      {
        title: 'Widget name',
        value: data?.widgetFamily?.name ?? ''
      },
      {
        title: 'Last Check-Out Meter Reading',
        value: data?.lastCheckOutMeterReading ?? ''
      },
      {
        title: 'Last Check-In Meter Reading',
        value: data?.lastCheckInMeterReading ?? ''
      },
      {
        title: 'Last Service Date',
        value: data?.lastServicedAt ?? ''
      },
      {
        title: 'Last reported location',
        value: data?.lastReportedLocation ?? ''
      },
      {
        title: 'Status',
        value: data?.availabilityStatus ?? ''
      },
      {
        title: 'Check-Out Reason',
        value: data?.checkOutReason ?? ''
      },
      {
        title: 'Last Check-In by',
        value: data?.lastCheckInBy?.fullName ?? ''
      },
      {
        title: 'Last Reported Date & Time',
        value: data?.lastIssueReported?.reportedAt ?? ''
      },
      {
        title: 'Issue reported',
        value: data?.lastIssueReported?.issueDescription ?? ''
      }
    ];
  };

  const getButton = () => {
    if (
      data?.availabilityStatus === 'Checked-Out' ||
      data?.availabilityStatus === 'Not Checked-In'
    ) {
      return [
        {
          label: 'Check-In',
          bg: 'green.400',
          size: 'sm',
          route: 'CheckIn',
          isDisabled: !checkPermission('CheckIn')
        },
        {
          label: 'Report',
          bg: 'blue.400',
          size: 'sm',
          route: 'Report',
          isDisabled: !checkPermission('ReportIncident')
        }
      ];
    } else if (data?.availabilityStatus === 'Checked-In') {
      return [
        {
          label: 'Check-Out',
          bg: 'red.400',
          size: 'sm',
          route: 'CheckOut',
          isDisabled: !checkPermission('CheckOut')
        },
        {
          label: 'Report',
          bg: 'blue.400',
          size: 'sm',
          route: 'Report',
          isDisabled: !checkPermission('ReportIncident')
        }
      ];
    } else {
      return [];
    }
  };

  const onPressButton = (type, props) => {
    navigate(props?.route, { params, data });
  };

  return {
    isLoading,
    isError,
    error,
    params,
    data: getData().concat(getCustomAttributeData()),
    buttons: getButton(),
    onPressButton
  };
};

export default useSearchDetails;
