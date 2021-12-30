import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  Addcart,
  Delcar,
  See,
  Remcart,
  Ranting,
  Reviews,
} from '../redux/Action.js/Action';
import Modal from 'react-native-modal';
import Ions from 'react-native-vector-icons/Ionicons';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {numberWithCommas} from '../Helper/Formatnum';

export default function Cartcard({data}) {
  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
    setRatings(rating);
  };

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [kurang, setKurang] = useState(1);
  const [load, setLoad] = useState(true);
  const [ratings, setRatings] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const pends = () => {
    return (
      <View>
        <Text>Pending</Text>
      </View>
    );
  };
  const complete = () => {
    return (
      <View>
        <Text>complete</Text>
      </View>
    );
  };
  const compox = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../image/nocar.png')} />
        <Text> Uh-oh!</Text>
        <Text>No orders found. Try to order something, maybe?</Text>
      </View>
    );
  };
  console.log('sol', data);
  return (
    <View>
      {data.quantity === 0 ? null : (
        <View style={style.container}>
          <View style={style.cons}>
            <View style={{marginHorizontal: 20}}>
              {data.ispayment === false ? (
                <Ions name="receipt-outline" size={20} color="red" />
              ) : (
                <Ions name="receipt-outline" size={20} color="green" />
              )}
            </View>
            <View style={style.con}>
              <Text style={style.tit}>ID Delivery:{data.id_delivery}</Text>
              <Text style={style.tit2}>
                {data.ispayment === true
                  ? 'Payment : Complete'
                  : 'Payment : Pending'}
              </Text>
              <Text style={style.tit2}>Quantity : {data.quantity}</Text>
              <Text style={style.tit2}>
                <Text style={style.tit2}>Total </Text>Rp.{' '}
                {numberWithCommas(data.total)}
              </Text>
            </View>
            <View>
              <View
                style={{
                  marginHorizontal: 30,
                }}>
                {data.ispayment === false ? (
                  <Ions name="md-lock-closed-outline" size={20} color="red" />
                ) : (
                  <Ions name="checkmark-done-sharp" size={20} color="green" />
                )}
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  bst: {
    backgroundColor: '#F9C959',
    height: hp('10%'),
    width: wp('90%'),
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    borderRadius: 30,
  },
  inpus: {
    lineHeight: 14,
    // textAlign: 'flex-start',
    marginVertical: 8,
    borderWidth: 1,
    height: hp('10%'),
    width: wp('90%'),
    borderRadius: 10,
    margin: 0,
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
  consat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt1: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2%'),
    color: 'black',
  },
  revw: {
    backgroundColor: '#F9C959',
    height: hp('6%'),
    width: wp('19%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 10,
  },
  container: {
    flex: 1,
    // width: wp('95%'),
  },
  cons: {
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#999',
    borderWidth: 0.5,
    marginVertical: 5,
    padding: 0,
    // elevation: 10,
  },
  con: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    // backgroundColor: 'red',
    width: wp('45%'),
  },
  img: {
    height: hp('25%'),
    width: wp('25%'),
    resizeMode: 'contain',
    // backgroundColor: 'red',
    // backgroundColor: 'red',
  },
  isis: {
    backgroundColor: 'white',
    height: hp('3%'),
    width: wp('10%'),
    // borderWidth: 1,
    // borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  int: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2%'),
    color: 'black',
    borderBottomWidth: 1,
  },
  tit: {
    width: wp('55%'),
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2%'),
    color: 'black',
  },
  tit2: {
    // width: wp('55%'),
    fontFamily: 'Nunito-Regular',
    fontSize: hp('2%'),
    color: 'black',
  },
  modals: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modcon: {
    width: wp('100%'),
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    borderRadius: 15,
    padding: 20,

    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
