import React from 'react';
import { Text } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { RestaurantView, RestaurantPhoto, RestaurantInfo } from './style';

const RestaurantItem = ({ photo, name, key, rating, category, distance, deliveryPrice, deliveryTime }) => {
  return (
    <RestaurantView key={key}>
      <RestaurantPhoto source={{
          uri: photo.trim(),
          width: 50,
          height: 50,
          resizeMode: 'cover',
        }}/>
      <RestaurantInfo>
        <Text>{name}</Text>
        <Text><AntDesign name="star" size={12} color="#F9A825"/> {rating}   {category} - {distance}</Text>
        <Text>{deliveryTime} • R$ {deliveryPrice}</Text>
      </RestaurantInfo>
    </RestaurantView>
  );
}

export default RestaurantItem;