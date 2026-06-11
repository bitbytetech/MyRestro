import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store, RootState } from './src/redux/store';
import { hydrateToken, logout } from './src/redux/authSlice';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(hydrateToken(token));
      }
    };
    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#1d3557',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: 'MyRestro Menu',
            headerRight: () => (
              isAuthenticated ? (
                <TouchableOpacity onPress={() => dispatch(logout())} style={{ marginRight: 15 }}>
                  <Text style={{ color: '#e63946', fontWeight: 'bold' }}>Logout</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => {/* navigate to login manually if needed */}} style={{ marginRight: 15 }}>
                  {/* Handle login button visibility if desired */}
                </TouchableOpacity>
              )
            )
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
