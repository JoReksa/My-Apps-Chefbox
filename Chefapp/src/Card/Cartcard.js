import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
  CheckOut,
} from '../redux/Action.js/Action';
import {numberWithCommas} from '../Helper/Formatnum';

export default function Cartcard({data}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [kurang, setKurang] = useState(1);
  const [load, setLoad] = useState(false);
  const state = useSelector(state => state.fetch);
  console.log('ren id', state);
  //   const select = true;
  //   const props = useLinkProps();

  //   const CardCart = props => {
  //     const [plus, setPlus] = useState(1);
  //     // console.log('INI PLUS', plus);
  //   };
  //   const total = () => {
  //     setPlus(plus + 1);
  //     return plus;
  //   };
  //   console.log('data card', data);
  useEffect(() => {
    setLoad(false);
  }, []);
  return (
    <View style={style.container}>
      <View style={style.cons}>
        <Image source={{uri: data.image}} style={style.img} />
        <View style={style.con}>
          {/* <Text>{data.id}</Text> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Bahan', {
                Ids: data.id,
              });
            }}>
            <Text style={style.tit}>{data.title}</Text>
          </TouchableOpacity>
          <Text style={style.tit2}>Rp. {numberWithCommas(data.price)}</Text>
          <Text style={style.tit2}>Quantity</Text>
          <View
            style={{
              flexDirection: 'row',
              //   justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingVertical: 5,
            }}>
            {/* <TouchableOpacity
              onPress={async () => {
                console.log('ini quan', Addcart);
                const id = data.id;
                const minus = -(data.quantity - 1);

                await dispatch(Addcart(id, minus));
                // console.log('min', minus);
                // if (quan > 1) {
                //   setKurang(-1);
                // }
                await dispatch(See());
              }}>
              <Icon name="minus" size={15} color={'#FF5353'} />
            </TouchableOpacity> */}
            <View style={style.isis}>
              <Text style={style.int}>{data.quantity}</Text>
            </View>
            {/* <Icon name="plus" size={15} color={'#FF5353'} /> */}
          </View>
          <Text style={style.tit2}>
            <Text style={style.tit2}>Total </Text>Rp.{' '}
            {numberWithCommas(data.total)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={async () => {
            setLoad(true);

            console.log('delete', Delcar);
            const id = data.id;
            const dels = await dispatch(Delcar(id));
            if (dels === true) {
              setLoad(false);

              ToastAndroid.show('Delete Success', 4000);
              await dispatch(Remcart());
              await dispatch(See());
              await dispatch(CheckOut());
            }
          }}>
          <Icon name="trash" size={15} color={'#FF5353'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    borderBottomWidth: 1,
  },
  cons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    // width: wp('100%'),
  },
  con: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
  img: {
    height: hp('25%'),
    width: wp('25%'),
    resizeMode: 'contain',
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
});
