import {
  Button,
  Center,
  Heading,
  Icon,
  Stack,
  Text,
  VStack
} from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from '../../components';
import { getFormikError, getFormikValue } from '../../services/Utils';
import useLoginScreen from './hooks/useLoginScreen';
FontAwesome.loadFont();

const LoginScreen = () => {
  const { t } = useTranslation();
  const { formik, passwordInputRef, isLoading } = useLoginScreen();
  console.log('formik', formik);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Stack pt={50} space={5} m={5}>
        <VStack mb={8}>
          <Heading fontSize={'3xl'} fontWeight={700} color={'app.primary'}>
            {t('Welcome')}
          </Heading>
          <Text fontSize={'2xl'} color={'app.text'} fontWeight={400}>
            {t('Let’s sign you in!')}
          </Text>
        </VStack>
        <VStack>
          <TextInput
            stackProps={{ flex: 0, mb: 2 }}
            placeholder={'Email Address'}
            leftElement={
              <Center>
                <Icon ml={3} as={FontAwesome} name="envelope-o" size={5} />
              </Center>
            }
            isDisabled={isLoading}
            returnKey="next"
            value={getFormikValue(formik, 'email')}
            isInvalid={getFormikError(formik, 'email')}
            onBlur={formik.handleBlur('email')}
            onChangeText={formik.handleChange('email')}
            onSubmitEditing={() => passwordInputRef.current.focus()}
          />
          <TextInput
            stackProps={{ flex: 0, mb: 2 }}
            type={'password'}
            ref={passwordInputRef}
            placeholder={'Password'}
            leftElement={
              <Center>
                <Icon ml={3} as={FontAwesome} name="lock" size={5} />
              </Center>
            }
            isDisabled={isLoading}
            value={getFormikValue(formik, 'password')}
            isInvalid={getFormikError(formik, 'password')}
            onBlur={formik.handleBlur('password')}
            onChangeText={formik.handleChange('password')}
            onSubmitEditing={formik.submitForm}
          />
          {/* @todo */}
          {/* <Stack alignItems={'flex-end'}>
            <Button
              variant={'link-btn'}
              size={'noPadding'}
              onPress={() => console.log('hello world')}>
              {t('Forgot password?')}
            </Button>
          </Stack> */}
        </VStack>
        <VStack mt={50}>
          <Button
            variant={'primary'}
            size={'large'}
            isLoading={isLoading}
            onPress={formik.submitForm}>
            {t('Sign In')}
          </Button>
        </VStack>
      </Stack>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
