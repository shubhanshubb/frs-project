import { Box, Image, ScrollView, Stack } from 'native-base';
import React from 'react';

const ImageList = ({ data }) => {
  return (
    <Box>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data?.map((item, index) => (
          <Stack mr={3}>
            <Image
              borderRadius={8}
              key={index?.toString()}
              size={'md'}
              resizeMode="cover"
              source={{
                uri: item?.url
              }}
              alt={'Image'}
            />
          </Stack>
        ))}
      </ScrollView>
    </Box>
  );
};

export default ImageList;
