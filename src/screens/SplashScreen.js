// SplashScreen.js
// Essa é a primeira tela que aparece quando o app abre
// Fica 2 segundos e vai automaticamente para o Login

import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {

  // useEffect roda automaticamente quando a tela abre
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // troca para a tela de Login
    }, 2000); // 2000 = 2 segundos

    return () => clearTimeout(timer); // limpeza do timer
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoArea}>
        <Text style={styles.logoTexto}>serviç</Text>
        <Text style={styles.logoDestaque}>já</Text>
      </View>
      <Text style={styles.slogan}>Serviços na palma da mão</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2E26',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoArea: {
    flexDirection: 'row',
  },
  logoTexto: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logoDestaque: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#1D9E75',
  },
  slogan: {
    fontSize: 16,
    color: '#9DB5AE',
    marginTop: 12,
  },
});