import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { API } from '../../../constant';
import useCustomQuery from '../../../hooks/useCustomQuery';

const useInventoryTypes = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useCustomQuery(
    'get',
    'inventory-types',
    API.INVENTORY_TYPES
  );

  return { data, isLoading, isError, error, navigate, t };
};

export default useInventoryTypes;
