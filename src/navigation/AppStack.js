import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPages from '../navigation/AuthStack'; 
import ApplicationMain from '../navigation/BottomTabs'; 

const Stack = createStackNavigator();

const AppStack = () => {
    const [initialRoute, setInitialRoute] = useState('LoginPages'); 
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