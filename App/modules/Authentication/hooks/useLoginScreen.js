import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../../constant';
import AuthActions, { AuthSelectors } from '../../../redux/AuthRedux';
import { manageRequest } from '../../../services/Utils';
import schema from '../../../services/ValidationServices';

const useLoginScreen = () => {
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const authData = useSelector(AuthSelectors.getAuthData);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const { loading } = manageRequest({
      slug: 'login-request',
      data: authData.user,
      error: authData.error,
      fetching: authData.fetching
    });
    setIsLoading(loading);
  }, [authData]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: schema(t).login,
    onSubmit: (values) => {
      onSubmitForm(values);
    }
  });

  const onSubmitForm = (values) => {
    Keyboard.dismiss();
    dispatch(
      AuthActions.loginRequest({
        loader: 'login-request',
        slug: API.LOGIN_USER,
        method: 'post',
        data: values
      })
    );
  };

  return { formik, passwordInputRef, isLoading };
};

export default useLoginScreen;
