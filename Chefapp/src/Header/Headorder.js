import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ion from 'react-native-vector-icons/Ionicons';

export default function HeadSearch(props) {
  const navigation = useNavigation();
  return (
    <View style={style.contain}>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Bot')}>
        <Ion
          name="arrow-back-outline"
          size={25}
          color={'black'}
          // style={{backgroundColor: 'red'}}
        />
      </TouchableOpacity> */}
      <View style={style.input}>
        <TextInput
          placeholder="Find My Order"
          editable={false}
          style={style.text}
          // onChangeText={e => props.setUser(e)}
        />

        <View>
          <Ion name="ios-search-outline" size={20} color={'black'} />
        </View>
      </View>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Image source={require('../image/cart.png')} />
      </TouchableOpacity> */}
    </View>
  );
}

const style = StyleSheet.create({
  contain: {
    flexDirection: 'row',
    height: hp('8%'),
    backgroundColor: '#F9C959',
    elevation: 10,

    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('6%'),
    width: wp('90%'),
    borderWidth: 1,
    borderColor: '#FFFFFF80',
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF80',
  },
  text: {
    lineHeight: 14,
    width: wp('60%'),
    alignSelf: 'center',
    height: hp('6%'),
  },
});
