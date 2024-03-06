import React from 'react'
import { Text, View } from 'react-native'
import { Header } from './Header'
import { Footer } from './Footer'

export const ScoreBoard = ({navigation}) => {
  return (
    <>
      <Header />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Scoreboard</Text>
        <Footer />
    </View>
    </>
  )
}
