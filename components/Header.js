import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import style from '../style/style';

export const Header = () => {
  return (
        <View style={style.header}>
            <Text style={style.title}>Dice game</Text>
        </View>
        
  )
}
