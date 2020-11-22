import React from 'react';

import { Dimensions } from 'react-native'
import { BannerView, BannerPhoto } from './style';

const BannerItem = ({ foto, keyCode }) => {
  return (
    <BannerView key={keyCode}>
      <BannerPhoto source={{
        uri: foto.trim(),
        width: (Dimensions.get('window').width) - 50,
        height: 180,
        resizeMode: 'contain',
      }} />
    </BannerView>
  );
}

export default BannerItem;