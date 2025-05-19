import { Box, ScrollView, Spinner, Stack, VStack } from 'native-base';
import React from 'react';
import { CustomButtonGroup } from '../components';
import AppLayout from './AppLayout';

const PageLayout = ({
  isFooter = false,
  renderBottom,
  children,
  appLayoutProps,
  scrollViewProps,
  buttonProps,
  buttons,
  onPressButton,
  renderSubHeader,
  isLoading = false
}) => {
  return (
    <AppLayout {...appLayoutProps} renderSubHeader={renderSubHeader}>
      {isLoading ? (
        <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
          <Spinner size={'lg'} color="emerald.500" />
        </Stack>
      ) : (
        <>
          <ScrollView
            paddingX={5}
            mt={5}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 20
            }}
            {...scrollViewProps}>
            <VStack flex={1} flexGrow={1}>
              {children}
            </VStack>
          </ScrollView>
          {isFooter && (
            <Box paddingX={5} mb={5} pt={2}>
              {React.isValidElement(renderBottom) ? (
                renderBottom
              ) : buttons?.length > 0 ? (
                <VStack>
                  <CustomButtonGroup
                    onPressButton={onPressButton}
                    size="lg"
                    buttons={buttons}
                    {...buttonProps}
                  />
                </VStack>
              ) : null}
            </Box>
          )}
        </>
      )}
    </AppLayout>
  );
};

export default PageLayout;
