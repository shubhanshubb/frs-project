import { useSelector } from 'react-redux';
import { AuthSelectors } from '../redux/AuthRedux';

const useUserPermissions = () => {
  const user = useSelector(AuthSelectors.getUser);

  const checkPermission = (type) => {
    const allowedPermissions = user?.permissions ?? [];
    const isAllowed = allowedPermissions?.includes('Perform::' + type);
    return isAllowed;
  };

  return {
    checkPermission
  };
};
export default useUserPermissions;
