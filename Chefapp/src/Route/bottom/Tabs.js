import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ion from 'react-native-vector-icons/Ionicons';
import Sale from '../../ini/Sale';
import Allhome from './TabsStack';
import Order from '../../ini/Order';
import Pro from '../../dzihni/profile';
import Prof from '../../ini/Proff';
import MyRecip from '../../ini/MyRecip';
const Tab = createBottomTabNavigator();
export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: 'grey',
      }}>
      <Tab.Screen
        name="Home"
        component={Allhome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ion name="ios-home-outline" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({color, size}) => (
            <Ion name="cart-outline" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Resep"
        component={MyRecip}
        options={{
          tabBarLabel: 'My Recepie',
          tabBarIcon: ({color, size}) => (
            <Ion name="md-bonfire-outline" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Sales"
        component={Sale}
        options={{
          tabBarLabel: 'Sale',
          tabBarIcon: ({color, size}) => (
            <Ion name="ios-basket-outline" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Pro}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Ion name="md-people" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
