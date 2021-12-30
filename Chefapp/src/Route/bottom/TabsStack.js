import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import HomeSearchs from '../../ini/HomeSearch';
import Home from '../../ini/Home';
import Cart from '../../ini/Cart';
import Details from '../../ini/Details';
export default function TabsStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Menu" component={Home} />
      {/* <Stack.Screen
        name="Search"
        component={HomeSearchs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Description"
        component={Details}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
}
