import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPages from '../navigation/AuthStack'; 
import ApplicationMain from '../navigation/BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import Loader from '../components/Loader';
import axios from 'axios';


const Stack = createStackNavigator();

const API_URL = 'http://10.0.2.2:8000/api';

const AppStack = () => {
  const [initialRoute, setInitialRoute] = useState(null); // null means loading

  // useEffect(() => {
  //   const checkStudentToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('authToken');

  //       if (!token) {
  //         return setInitialRoute('LoginPages');
  //       }

  //       const response = await axios.get(`${API_URL}/auth/student`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       });

  //       if (response.data.success && response.data.student) {
  //         setInitialRoute('ApplicationMain')
  //       } else {
  //         setInitialRoute('LoginPages');
  //       }
  //     } catch (err) {
  //       console.log('Auth Error:', err?.response?.data || err.message);
  //       setInitialRoute('LoginPages');
  //     }
  //   };

  //   checkStudentToken();
  // }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        setInitialRoute(token ? 'ApplicationMain' : 'LoginPages');
      } catch (err) {
        console.error("Error checking auth token:", err);
        setInitialRoute('LoginPages');
      }
    };
    checkAuth();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7ffd8ff' }}>
        <Loader message='Please Wait...'/>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="LoginPages"
          component={LoginPages}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ApplicationMain"
          component={ApplicationMain}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
