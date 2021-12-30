import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CheckOut,
  MyOrs,
  Payments,
  Remcart,
  See,
  Uls,
  Delcar,
} from '../redux/Action.js/Action';
import Ion from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {numberWithCommas} from '../Helper/Formatnum';

export default function Confirmpays() {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  async function Ors() {
    await dispatch(MyOrs());
    setLoad(false);
  }
  useEffect(() => {
    Ors();
  }, []);
  const state = useSelector(state => state.fetch.Pays);
  const get = useSelector(state => state.fetch);
  console.log('link', get);
  return (
    <View style={style.container}>
      <View style={style.heads}>
        <TouchableOpacity onPress={() => navigation.navigate('CheckRom')}>
          <Ion name="arrow-back-outline" size={25} color={'black'} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: wp('73%'),
            // backgroundColor: 'red',
          }}>
          <Text style={style.header}> Payments </Text>
        </View>
        <Ion name="arrow-back-outline" size={25} color={'#F9C959'} />
      </View>
      <View style={style.con2}>
        <Image
          source={{uri: state.merchant_profile_picture_url}}
          style={{
            height: hp('10%'),
            width: wp('20%'),
            resizeMode: 'contain',
            alignSelf: 'center',
            marginBottom: 10,
            marginVertical: 10,
            // backgroundColor: 'red',
          }}
        />
        <View
          style={{
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text style={style.bash}>Please complete your payment</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginVertical: 5,
          }}>
          <Text style={style.bash}>User Invoice :</Text>
          <Text>{state.id}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Text style={style.bash}>Name:</Text>
          <Text>{state.customer.given_names}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginVertical: 5,
          }}>
          <Text style={style.bash}>{state.currency}:</Text>
          <Text>Rp. {numberWithCommas(state.amount)}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginVertical: 5,
          }}>
          <Text style={style.bash}>Ongkir : </Text>
          <Text>Rp. 15.000</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginVertical: 5,
          }}>
          <Text style={style.bash}>Bank Account : </Text>
          <Text>PT Chefbox Indonesia</Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          // justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={style.buts}
          onPress={async () => {
            // setLoad(true);
            Linking.openURL(state.invoice_url);

            await dispatch(Remcart());

            navigation.navigate('Order');
          }}>
          <Text style={style.bash2}>Kuy Bayar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  buts: {
    backgroundColor: '#F9C959',
    height: hp('8%'),
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginVertical: 100,
    elevation: 10,
  },
  con2: {
    backgroundColor: '#FFFAEF',
    height: hp('45%'),
    width: wp('100%'),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  bash: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.4%'),
    color: 'black',
  },
  bash2: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.8%'),
    color: 'black',
  },
});
