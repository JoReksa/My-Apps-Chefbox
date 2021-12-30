import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import HeadSearch from '../Header/Headrecep';
import Ions from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {MyRe} from '../redux/Action.js/Action';
import Ion from 'react-native-vector-icons/Ionicons';

import ISIN from '../Card/recepie';
export default function MyRecip() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [load, setLoad] = useState(true);
  const [load2, setLoad2] = useState(false);
  async function great() {
    await dispatch(MyRe());
    setLoad(false);
    setLoad2(false);
  }
  useEffect(() => {
    great();
  }, []);
  const state = useSelector(state => state.fetch);
  console.log('my recepie', state);
  const compor = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../image/nocar.png')} />
        <Text> Uh-oh!</Text>
        <Text>No Recepe Found ?? Create One !!!</Text>
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
    <View style={style.container}>
      <HeadSearch />
      <View>
        <Text
          style={{
            fontFamily: 'Nunito-Bold',
            fontSize: hp('3%'),
            color: 'black',
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}>
          My Recepie
        </Text>
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
                const ia = great();
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
      </View>
      <View style={{flex: 1}}>
        {state.MyRes?.length === 0 ? (
          compor()
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={state.MyRes}
            numColumns={2}
            renderItem={data => (
              <View style={style.boxmenu2}>
                <ISIN data={data.item} navigation={navigation} />
              </View>
            )}
          />
        )}
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          marginHorizontal: 10,
          marginBottom: 10,
        }}>
        <View style={style.foot}>
          <TouchableOpacity
            style={style.butt}
            onPress={() => {
              navigation.navigate('CreatDescrip');
            }}>
            <Ions name="plus" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: 'white',
    elevation: 10,
  },
  foot: {
    backgroundColor: '#F9C959',
    width: wp('15%'),
    height: wp('15'),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
    elevation: 10,
    position: 'absolute',
  },
  butt: {},
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
  refres: {
    // flex: 1,
    alignItems: 'flex-end',
    marginHorizontal: 10,
    paddingVertical: 10,
  },
});
