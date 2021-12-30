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
import {numberWithCommas} from '../Helper/Formatnum';
import {Remcom} from '../redux/Action.js/Action';
// import {bookmark, Delete, Events} from '../redux/Action/Action';
// import {color} from 'react-native-reanimated';
// import SkeletonEvent from '../skeletonload/SkeletonHome';
export default function Viewss({data, navigation}) {
  const dispatch = useDispatch();
  //   const [load, setLoad] = useState(false);
  //   const book = useSelector(state => state.fetch);
  async function remDe() {
    await dispatch(Remcom());
  }
  //   if (load === true) {
  //     return (
  //       <View>
  //         <SkeletonEvent />
  //       </View>
  //     );
  //   }
  // console.log('id pass', Idfood);
  return (
    <View>
      <View style={style.Contain}>
        <View style={style.imgcon}>
          <Image source={{uri: data.image}} style={style.img} />
        </View>

        <View style={style.Flex}>
          <View style={style.conts}>
            {data.stock === null || data.stock === 0 || data.stock < 0 ? (
              <TouchableOpacity
                onPress={() =>
                  ToastAndroid.show('Sorry the menu is Out of Stock', 40000)
                }>
                <Text style={style.title}>{data.title}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Description', {
                    Idfood: data.id,
                  });
                }}>
                <Text style={style.title}>{data.title}</Text>
              </TouchableOpacity>
            )}
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
          </View>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  Contain: {
    flex: 1,
    // height: hp('40%'), // 70% of height device screen
    width: wp('47%'), // 80% of width device screen
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
  in: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hum: {
    // flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
  },
  greycon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingVertical: 3,
    marginTop: 4,
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
});
