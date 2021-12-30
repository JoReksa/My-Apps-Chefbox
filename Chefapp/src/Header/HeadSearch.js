import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Imagedefault from '../image/cart.png';
import Ion from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Checkouts from '../ini/Checkouts';

export default function HeadSearch(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={style.contain}>
      <View style={style.input}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Text style={style.text}>What do you want to eat today?</Text>
        </TouchableOpacity>
        <View>
          <Ion name="ios-search-outline" size={20} color={'black'} />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Cart');
        }}
        style={{
          height: hp('7%'),
          justifyContent: 'center',
          width: wp('8%'),
        }}>
        <View
          style={{
            backgroundColor: props.notif ? 'red' : null,
            borderRadius: 10,
            width: wp('5%'),
            height: hp('2.5%'),
            marginLeft: 15,
            marginBottom: 30,
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Bold',
              color: 'white',
              textAlign: 'center',
              fontSize: hp('1.8%'),
            }}>
            {props.notif}
          </Text>
        </View>
        <ImageBackground
          source={require('../image/cart.png')}
          style={style.cars}></ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  contain: {
    flexDirection: 'row',
    height: hp('8%'),
    backgroundColor: '#F9C959',
    elevation: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('6%'),
    width: wp('80%'),
    borderWidth: 1,
    borderColor: '#FFFFFF80',
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF80',
  },
  text: {
    width: wp('60%'),
    alignSelf: 'center',
  },
  cars: {
    height: hp('4%'),
    width: wp('8%'),
    alignItems: 'flex-end',
    position: 'absolute',
  },
});
