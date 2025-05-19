import { useSelector } from 'react-redux';
import { AuthSelectors } from '../redux/AuthRedux';

const useAuthentication = () => {
  const user = useSelector(AuthSelectors.getUser);
  return { isAuthenticated: user ? true : false };
};
export default useAuthentication;
