import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';
import Evil from 'react-native-vector-icons/EvilIcons';
import Fea from 'react-native-vector-icons/Feather';
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {DelsRecep, Inti, MyRe} from '../redux/Action.js/Action';
import {numberWithCommas} from '../Helper/Formatnum';
// import {bookmark, Delete, Events} from '../redux/Action/Action';
// import {color} from 'react-native-reanimated';
// import SkeletonEvent from '../skeletonload/SkeletonHome';
export default function Viewss({data}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //   const [load, setLoad] = useState(false);
  //   const book = useSelector(state => state.fetch);

  //   if (load === true) {
  //     return (
  //       <View>
  //         <SkeletonEvent />
  //       </View>
  //     );
  //   }

  return (
    <View style={style.Contain}>
      <View style={style.imgcon}>
        <Image source={{uri: data.image}} style={style.img} />
      </View>

      <View style={style.Flex}>
        <View style={style.conts}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Description', {
                Idfood: data.id,
              })
            }>
            <Text style={style.title}>{data.title}</Text>
          </TouchableOpacity>
          <Text style={style.title2}>Rp. {numberWithCommas(data.price)}</Text>
          <View style={style.hum}>
            <View style={style.greycon}>
              <Evil name="location" size={18} />
              <Text style={style.abu}>{data.location?.name}</Text>
            </View>
            <View style={style.in}>
              <Fea name="user" size={17} />
              <Text style={style.abu}>{data.serving} Serving</Text>
            </View>
          </View>
          <View style={style.hum}>
            <View style={style.in}>
              <Evil name="clock" size={18} />
              <Text style={style.abu}>{data.duration} Menit</Text>
            </View>
          </View>
          <View style={style.nas}>
            {data.stock < 0 || data.stock === null || data.stock === 0 ? (
              <View style={style.nas}>
                <Mc name="truck-delivery-outline" size={18} color={'red'} />
                <Text style={style.abu2}> Out of Stock</Text>
              </View>
            ) : (
              <View style={style.nas}>
                <Mc name="truck-delivery-outline" size={18} color={'green'} />
                <Text style={style.abu1}> In Stock :{data.stock}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={style.buttss}
            onPress={async () => {
              const id = data.id;
              navigation.navigate('CreateIngris', {isidata: id});
            }}>
            <Text style={style.bnf}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.buttss1}
            onPress={async () => {
              const no = data.id;
              await dispatch(DelsRecep(no));
              await dispatch(MyRe());
              await dispatch(Inti());
              ToastAndroid.show('Delete Success', 4000);
            }}>
            <Text style={style.bnf1}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  bnf: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2%'),
    color: 'black',
  },
  bnf1: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2%'),
    color: 'white',
  },
  buttss: {
    backgroundColor: 'white',
    elevation: 10,
    height: hp('5%'),
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttss1: {
    backgroundColor: '#B6340B',
    elevation: 10,
    height: hp('5%'),
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Contain: {
    flex: 1,
    // height: hp('40%'),
    width: wp('47%'),
    borderRadius: 8,
    elevation: 10,
    backgroundColor: 'white',
    marginBottom: 15,
    marginHorizontal: 5,
  },
  abu: {
    fontFamily: 'Nunito-Regular',
    fontSize: hp('2%'),
    paddingVertical: 5,
  },
  in: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hum: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greycon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  imgcon: {
    flex: 3,
    width: wp('100%'),
  },
  img: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    resizeMode: 'cover',
    width: wp('47%'),
    height: hp('20%'),
  },
  title: {
    fontSize: hp('2.4%'),
    color: 'black',
    // fontWeight: 'bold',
    fontFamily: 'Nunito-Bold',
    width: '100%',
  },
  title2: {
    paddingVertical: 3,
    fontSize: hp('2.2%'),
    fontFamily: 'Nunito-Bold',
    color: '#B6340B',
    width: '100%',
  },
  title3: {
    fontSize: hp('1.5%'),
    color: 'black',
    fontWeight: 'bold',
    width: '100%',
  },
  Flex: {
    flex: 3,
    width: '100%',
    padding: 10,
  },
  conts: {
    width: '100%',
    height: '100%',
  },
  nas: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  abu1: {
    fontFamily: 'Nunito-Regular',
    fontSize: hp('2%'),
    paddingVertical: 5,
    color: 'green',
  },
  abu2: {
    fontFamily: 'Nunito-Regular',
    fontSize: hp('2%'),
    paddingVertical: 5,
    color: 'red',
  },
});
