import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeadSearch from '../Header/HeadSale';
import {DashSell} from '../redux/Action.js/Action';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ion from 'react-native-vector-icons/Ionicons';

import Sales from '../Card/SaleC';
export default function Sale() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  async function sels() {
    await dispatch(DashSell());
    // setLoad(true);
    setLoad(false);
    setLoad2(false);
  }
  useEffect(() => {
    sels();
  }, []);
  const state = useSelector(state => state.fetch.sellers);
  console.log('jual', state);
  const compox = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../image/nocar.png')} />
        <Text> Uh-oh!</Text>
        <Text>No Sales Recepie found. Try Publish Recepie, maybe?</Text>
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
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeadSearch />
      <View
        style={{
          flex: 1,

          marginHorizontal: 10,
          paddingVertical: 10,
        }}>
        <View style={{marginBottom: 10}}>
          <Text style={style.tit}>My Sale</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          {load2 === true ? (
            <TouchableOpacity style={style.ref}>
              <Text style={style.bash}> Refreshing..</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={style.ref}
              onPress={() => {
                setLoad2(true);
                const ia = sels();
                if (ia === true) {
                  setLoad2(false);
                  ToastAndroid.show('Refreshing....', 4000);
                }
              }}>
              <Ion name="refresh" size={20} color="white" />
              <Text style={style.bash}> Refresh</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{alignSelf: 'center', flex: 1}}>
          {state.length === 0 ? (
            compox()
          ) : (
            <FlatList
              data={state}
              showsVerticalScrollIndicator={false}
              renderItem={data => {
                return (
                  <View style={{flex: 1}}>
                    <Sales data={data.item} />
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
  vent: {
    paddingVertical: 10,
    width: wp('90%'),
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
  tit: {
    width: wp('55%'),
    fontFamily: 'Nunito-Bold',
    fontSize: hp('3%'),
    color: 'black',
  },
  ref: {
    backgroundColor: '#B6340B',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('26%'),
    borderRadius: 10,
    elevation: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  bash: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2%'),
    color: 'white',
  },
});
