import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import login from '../Splash/login';
import login2 from '../Splash/login';
import SignUp from '../Splash/SignUp';
import SignUp2 from '../Splash/SignUp2';
import Tabs from './bottom/Tabs';
import Tabs2 from './bottom/Tabs';

import HomeSearchs from '../ini/HomeSearch';
import Cart from '../ini/Cart';
import Details from '../ini/Details';
import ingrids from '../ini/ingrids';
import CreatDes from '../dzihni/createDescript';
import CreatDir from '../dzihni/createDirect';
import CreatIns from '../dzihni/createIngrid';
import CreatPro1 from '../dzihni/createProduct';
import CheckIn from '../ini/Checkouts';
import ConfirmP from '../ini/Confirmpays';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useDispatch, useSelector} from 'react-redux';

const Stack = createStackNavigator();

export default function Appstack() {
  // useState;
  // const [load, setLoad] = useState(true);
  const [toket, setToket] = useState();
  const getDada = async () => {
    try {
      const value = await AsyncStorage.getItem('Kont');
      if (value !== null) {
        setToket(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  console.log('tokket', toket);
  useEffect(() => {
    getDada();
    // setLoad(false);
  }, []);
  return (
    <Stack.Navigator>
      {toket ? (
        <Stack.Screen
          name="Bot"
          component={Tabs}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="Splash"
            component={login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Regis"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Step"
            component={SignUp2}
            options={{headerShown: false}}
          />
        </>
      )}
      <Stack.Screen
        name="Splash2"
        component={login2}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Regis2"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Step2"
        component={SignUp2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bot2"
        component={Tabs2}
        options={{headerShown: false}}
      />
      <Stack.Screen
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
      />
      <Stack.Screen
        name="Bahan"
        component={ingrids}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreatDescrip"
        component={CreatDes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateDirect"
        component={CreatDir}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateIngris"
        component={CreatIns}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateProd1"
        component={CreatPro1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckRom"
        component={CheckIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Confirmpays"
        component={ConfirmP}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
