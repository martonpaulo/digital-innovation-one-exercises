import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, Alert, ActivityIndicator } from 'react-native';
import {
  SafeAreaView,
  ViewActivity,
  CategoryView,
  BannerView,
  ViewPrincipal,
  ViewRestaurants,
  TitleRestaurants,
  ButtonSelectType,
  TextSelectType,
  SelectType
} from './style';

import CategoryItem from '../../components/CategoryItem';
import BannerItem from '../../components/BannerItem';
import RestaurantItem from '../../components/RestaurantItem';


export default function Principal() {

  const [ banners, setBanners ] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const [ restaurants, setRestaurants ] = useState([]);
  const [ loaded, setLoaded ] = useState(false);
  const [ type, setType ] = useState('Entrega');

  useEffect(() => {
    async function searchData() {
      try {
        const response = await fetch('https://my-json-server.typicode.com/pablohdev/app-ifood-clone/db');
        const data = await response.json();
        
        setLoaded(true);
        setBanners(data.banner_principal);
        setCategories(data.categorias);
        setRestaurants(data.restaurantes);

      } catch(e) {
        Alert.alert('Erro na consulta!\n' + e);
      }
    }

    searchData();
  }, []);


  const ViewHome = (props) => {
    return (
      <ViewPrincipal>

        <SelectType>
          <ButtonSelectType onPress={() => setType('Entrega')}><TextSelectType selected={type == 'Entrega'}>Entrega</TextSelectType></ButtonSelectType>
          <ButtonSelectType onPress={() => setType('Retirada')}><TextSelectType selected={type == 'Retirada'}>Retirada</TextSelectType></ButtonSelectType>
        </SelectType>

        <CategoryView horizontal={true} showsHorizontalScrollIndicator={false}>
          { categories.map(category => (
            <CategoryItem key={category.id} photo={category.img_url} text={category.nome} />
          ))}
        </CategoryView>

        <BannerView horizontal={true} showsHorizontalScrollIndicator={false}>
          {banners.map(banner => (
            <BannerItem key={banner.id} foto={banner.banner_img_url} />
          ))}
        </BannerView>

        <TitleRestaurants>Restaurantes</TitleRestaurants>

        <ViewRestaurants>
          { restaurants.map(restaurant => (
            <>
              <RestaurantItem 
                key={restaurant.id} 
                photo={restaurant.url_img} 
                name={restaurant.nome} 
                rating={restaurant.nota} 
                category={restaurant.categoria} 
                distance={restaurant.distancia} 
                deliveryPrice={restaurant.valor_frete} 
                deliveryTime={restaurant.tempo_entrega} 
              />
            </>
          ))}
        </ViewRestaurants>
      </ViewPrincipal>
    );
  };


  return (
    <>
      <StatusBar style="theme-dark" />
      <SafeAreaView>
        { loaded ? (
          <ViewHome />
        ) : (
          <ViewActivity>
            <ActivityIndicator color='#F0001A' size="large" />
            <Text>Carregando dados, aguarde... {loaded}</Text>
          </ViewActivity>
        )}
      </SafeAreaView>
    </>
  );
}