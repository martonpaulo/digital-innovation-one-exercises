import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, AvatarImage, PerfilText } from './style';

import avatarIcon from '../../assets/img/avatar-icon.png';


export default function Perfil() {
  return (
    <>
      <StatusBar style="theme-dark" />
      <SafeAreaView>
        <AvatarImage source={avatarIcon} />
        <PerfilText>Perfil</PerfilText>
      </SafeAreaView>
    </>
  );
}