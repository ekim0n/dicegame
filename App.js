import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import style from './style/style';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GameBoard } from './components/GameBoard';

export default function App() {
  return (
    <View style={style.container}>
      <Header />
      <GameBoard />
      <Footer />
    </View>
  );
}


