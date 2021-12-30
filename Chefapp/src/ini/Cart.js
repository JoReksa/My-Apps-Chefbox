import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {profiles, Remcart, Remcom, See} from '../redux/Action.js/Action';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ion from 'react-native-vector-icons/Ionicons';
// import {FlatList} from 'react-native-gesture-handler';
import Kartus from '../Card/Cartcard';
import Checkouts from './Checkouts';
// import { TextInput } from 'react-native-gesture-handler';
export default function Cart(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [load2, setLoad2] = useState(false);
  const [edalam, setEdalam] = useState('');
  const [load, setLoad] = useState(true);
  const state = useSelector(state => state.fetch);

  async function Jum() {
    await dispatch(See());
    setLoad(false);
    setLoad2(false);
  }

  useEffect(() => {
    Jum();
    // console.log('gets carat');
    // return () => {
    //   dispatch(Remcart());
    // };
  }, []);
  // const state2 = useSelector(state => state.auth.profile);
  // console.log('cars', state);
  const compo = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../image/nocar.png')} />
        <Text> Uh-oh!</Text>
        <Text>No orders found. Try to order something, maybe?</Text>
        <View style={{paddingVertical: 10}}>
          <TouchableOpacity
            style={style.carts2}
            onPress={() => navigation.navigate('Search')}>
            <Text style={style.buts2}>Find Some Recipe </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // console.log('cart', state2);
  if (load === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading... Please wait..</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  return (
    <View style={style.container}>
      {/* head */}
      <View style={style.heads}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Bot2')}>
          <Ion name="arrow-back-outline" size={25} color={'black'} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',

            width: wp('50%'),
            // backgroundColor: 'red',
          }}>
          <Text style={style.header}>Your Shopping Cart </Text>
        </View>
        <Ion name="arrow-back-outline" size={25} color={'#F9C959'} />
      </View>
      {state.views === null || state.views.length === 0 ? (
        compo()
      ) : (
        <FlatList
          data={state.views.data}
          showsVerticalScrollIndicator={false}
          renderItem={data => (
            <View style={{fles: 1}}>
              <Kartus data={data.item} navigation={navigation} />
            </View>
          )}
        />
      )}
      <View
        style={{
          backgroundColor: '#FFFAEF',
          elevation: 10,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            height: hp('8%'),
            width: wp('100%'),
          }}>
          {state.views === null || state.views.length === 0 ? null : (
            <TouchableOpacity
              style={style.carts}
              onPress={() => {
                // setLoad2(true);

                // await dispatch(Checkouts());

                navigation.navigate('CheckRom');
              }}>
              <Text style={style.buts}>Check Order</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  desp: {
    // backgroundColor: 'red',
    height: hp('6%'),
    width: wp('100%'),
  },
  container: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'white',
    elevation: 10,
  },
  heads: {
    flexDirection: 'row',
    height: hp('7%'),
    width: wp('100%'),
    backgroundColor: '#F9C959',
    elevation: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.5%'),
    color: 'black',
  },
  carts: {
    height: hp('7%'),
    width: wp('95%'),
    backgroundColor: '#B6340B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#B6340B',
  },
  carts2: {
    height: hp('5%'),
    width: wp('50%'),
    backgroundColor: '#B6340B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#B6340B',
  },
  buts: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('3%'),
    color: 'white',
  },
  buts2: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.5%'),
    color: 'white',
  },
});
