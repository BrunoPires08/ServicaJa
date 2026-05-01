import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import HomeScreen from './src/screens/HomeScreen';
import MeusAgendamentosScreen from './src/screens/MeusAgendamentosScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import AgendamentoScreen from './src/screens/AgendamentoScreen';
import PainelPrestadorScreen from './src/screens/PainelPrestadorScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A2E26',
          borderTopColor: '#2E5446',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarActiveTintColor: '#1D9E75',
        tabBarInactiveTintColor: '#9DB5AE',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Agendamentos"
        component={MeusAgendamentosScreen}
        options={{
          tabBarLabel: 'Agenda',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>📅</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Prestador"
        component={PainelPrestadorScreen}
        options={{
          tabBarLabel: 'Painel',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🔧</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Agendamento" component={AgendamentoScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}