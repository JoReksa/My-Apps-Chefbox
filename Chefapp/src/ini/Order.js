import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  ToastAndroid,
} from 'react-native';
import HeadSearch from '../Header/Headorder';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ion from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {CheckOut, MyOrs, See, Uls} from '../redux/Action.js/Action';
import Cast from '../Card/OrderC';
import {useNavigation} from '@react-navigation/native';

export default function Order() {
  const navigation = useNavigation();
  const [combs, setCombs] = useState(null);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const [load2, setLoad2] = useState(false);
  async function order() {
    await dispatch(CheckOut());
    // await dispatch(See());
    await dispatch(MyOrs());
    setLoad2(false);

    setLoad(false);
  }
  useEffect(() => {
    order();

    return () => {
      dispatch(Uls());
    };
    // setLoad2(false);
  }, []);
  const state = useSelector(state => state.fetch);
  // const state1 = useSelector(state => state.fetch);
  // const gabung = state.concat(state1);
  console.log('gabung', state);

  const compox = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../image/nocar.png')} />
        <Text> Uh-oh!</Text>
        <Text>No orders found. Try to order something, maybe?</Text>
      </View>
    );
  };
  if (load === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading... Please wait..</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  const newss = () => {
    return state.Myord.map(function (item, index) {
      return (
        <View key={index}>
          <Text> {item.quantity}</Text>
        </View>
      );
    });
  };
  return (
    <View style={style.container}>
      <HeadSearch />
      <Text style={style.bashband}>All My Order</Text>
      <View style={style.refres}>
        {load2 === true ? (
          <TouchableOpacity style={style.ref}>
            <Text style={style.bash}> Refreshing..</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={style.ref}
            onPress={() => {
              setLoad2(true);
              const ia = order();
              if (ia === true) {
                setLoad2(false);
                ToastAndroid.show('Refreshing....', 4000);
              }
            }}>
            <Ion name="refresh" size={20} color="white" />
            <Text style={style.bash}> Refresh</Text>
          </TouchableOpacity>
        )}
        <View
          style={{alignSelf: 'flex-start', elevation: 10, marginBottom: 10}}>
          <Text style={style.bash2}> History Order </Text>
        </View>
        <View
          style={{
            flex: 1,
            width: wp('95%'),
          }}>
          {state.Myord.length === 0 ? (
            compox()
          ) : (
            <FlatList
              data={state.Myord}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              renderItem={data => {
                console.log('casr', data);
                return (
                  <View style={{fles: 1}}>
                    {data.item.quantity === 0 ? null : (
                      <Cast data={data.item} navigation={navigation} />
                    )}
                  </View>
                );
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  refres: {
    flex: 1,
    alignItems: 'flex-end',
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  ref: {
    backgroundColor: '#B6340B',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('26%'),
    borderRadius: 10,
    elevation: 10,
    marginBottom: 10,
  },
  bash: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2%'),
    color: 'white',
  },
  bash2: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2%'),
    color: 'black',
  },
  bashband: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.5%'),
    color: 'black',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
