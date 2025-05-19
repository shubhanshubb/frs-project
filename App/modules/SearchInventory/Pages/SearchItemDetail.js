import { VStack } from 'native-base';
import React from 'react';
import { CustomCard, ImageList, TitleSubtitleGroup } from '../../../components';
import PageLayout from '../../../layouts/PageLayout';
import useSearchDetails from '../hooks/useSearchDetails';

const SearchItemDetail = ({ navigation }) => {
  const { data, params, buttons, onPressButton } = useSearchDetails();
  return (
    <PageLayout
      isFooter
      onPressButton={onPressButton}
      buttons={buttons}
      appLayoutProps={{
        type: 'back',
        title: params?.commonName ?? '',
        onPressBack: () => navigation.goBack()
      }}>
      <CustomCard>
        <VStack space={2}>
          {data?.map((item, i) => (
            <TitleSubtitleGroup
              key={i + item?.title}
              title={item?.title ?? ''}
              subTitle={item?.value ?? '--'}
            />
          ))}
        </VStack>
      </CustomCard>
      {params?.images?.length > 0 && (
        <CustomCard mt={5}>
          <ImageList data={params?.images ?? []} />
        </CustomCard>
      )}
    </PageLayout>
  );
};

export default SearchItemDetail;
