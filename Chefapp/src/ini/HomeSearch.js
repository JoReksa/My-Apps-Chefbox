import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import Ion from 'react-native-vector-icons/Ionicons';
import Ent from 'react-native-vector-icons/Entypo';
import {Filterss, Inti, Intis, Remcomponent} from '../redux/Action.js/Action';
import HeadSearch from '../Header/HeadSeFunct';
import CardMenu from '../Card/SearchCard';
import Drop from '../Dropdown/Dropdwon';
export default function Home(props, {navigation}) {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [load, setLoad] = useState(true);
  const [load2, setLoad2] = useState(true);
  const [user, setUser] = useState('');
  const [Id, setId] = useState(null);
  const [names, setNames] = useState(null);
  const [location, setLocation] = useState(0);
  const [type, setType] = useState(0);
  const [categor, setCategor] = useState(0);
  const [price, setPrice] = useState(0);
  const [price1, setPrice1] = useState(0);
  const [apply, setApply] = useState(0);
  const [count, setCount] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  async function gets() {
    // setLoad(true);
    await dispatch(Intis());
    setLoad2(false);
    setLoad(false);
  }
  async function cont() {
    await dispatch(Remcomponent());
    setLoad(false);
  }
  useEffect(() => {
    gets();
    return () => {
      cont();
    };
  }, []);
  // console.log('location fill', location);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const data1 = [
    {value: 1, label: 'Jakarta'},
    {value: 2, label: 'Bogor'},
    {value: 3, label: 'Depok'},
    {value: 4, label: 'Tangerang'},
    {value: 5, label: 'Bekasi'},
  ];
  const data2 = [
    {label: 'Food', value: 1},
    {label: 'Beverage', value: 2},
  ];
  const data3 = [
    {label: 'Meat', value: 1},
    {label: 'Chicken', value: 2},
    {label: 'Seafood', value: 3},
    {label: 'Vegetarian', value: 4},
    {label: 'Local Category', value: 5},
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    cont();
    ToastAndroid.show('Refreshing...', 3000);
    wait(4000).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const renderItem = data => {
    return (
      <View style={style.boxmenu2}>
        <CardMenu data={data.item} navigation={navigation} />
      </View>
    );
  };
  const state = useSelector(state => state.fetch);

  const memo = useMemo(() => renderItem, []);

  const Item = ({title, name}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 3,
      }}
      onPress={e => {
        setId(title);
        setNames(name);
      }}>
      <Text
        style={{
          fontSize: 20,
          color: Id === title ? 'black' : '#A9A9A9',
        }}>
        {name}
      </Text>
      <Ent
        name="check"
        size={20}
        style={{color: Id === title ? 'black' : 'white'}}
      />
    </TouchableOpacity>
  );
  const renderItems = ({item}) => {
    return <Item title={item.id_category} name={item.name} />;
  };
  if (load2 === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading... Please wait..</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  console.log('state', state);
  const searchMovie = state?.datafetch2.filter(i => {
    return i.title.toLowerCase().match(user.toLowerCase());
  });
  return (
    <View style={style.container}>
      <HeadSearch
        navigation={navigation}
        user={user}
        setUser={e => setUser(e)}
      />
      <View style={style.btn}>
        <TouchableOpacity style={style.press} onPress={toggleModal}>
          <Ion name="toggle" style={style.icons} />
          <Text style={style.txtmid}>Filter</Text>
        </TouchableOpacity>
        <Text>Pull To Refresh</Text>
      </View>
      <Modal isVisible={isModalVisible} testID={'modal'} style={style.view}>
        <View
          style={{
            width: '100%',
            // height: hp('80%'), // 70% of height device screen
            width: wp('100%'), // 80% of width device screen
            backgroundColor: '#FFFFFF',
            justifyContent: 'flex-end',
            borderRadius: 16,
            borderBottomEndRadius: 0,
            borderBottomLeftRadius: 0,
            padding: 20,
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              flexDirection: 'row',
            }}>
            <TouchableOpacity title="Hide modal" onPress={toggleModal}>
              <Ion name="close" size={25} color={'black'} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Nunito-Bold',
                color: '#000000',
                paddingLeft: 10,
                paddingBottom: 5,
              }}>
              Filtered
            </Text>
          </View>
          <View>
            <Text style={style.txtdrop}>Location</Text>
            <Drop
              label="Location"
              data={data1}
              value={location}
              setValue={e => setLocation(e)}
            />
            <Text style={style.txtdrop}>Type</Text>
            <Drop
              label="Type"
              data={data2}
              value={type}
              setValue={e => setType(e)}
            />
            <Text style={style.txtdrop}>Category</Text>
            <Drop
              label="Category"
              data={data3}
              value={categor}
              setValue={e => setCategor(e)}
            />
            <Text style={style.txtdrop}>Price</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: 20,
              }}>
              <TextInput
                style={style.price}
                placeholder="Down Price"
                isnumber
                value={price}
                onChangeText={value => setPrice(value)}
              />
              <TextInput
                style={style.price}
                placeholder="Up Price"
                isnumber
                value={price1}
                onChangeText={value => setPrice1(value)}
              />
            </View>
            {/* <FlatList data={sort} renderItem={renderItems} /> */}
            <TouchableOpacity
              style={style.apply}
              title="Hide modal"
              onPress={async () => {
                toggleModal();
                setLoad(true);
                const isi = await dispatch(
                  Filterss(categor, type, price, price1, location),
                );
                // console.log('Isi dispatch', isi);
                if (isi === true) {
                  setLoad(false);
                  ToastAndroid.show('Success', 3000);
                }
                setType(0);
                setCategor(0);
                setPrice(0);
                setPrice1(0);
                location(0);
              }}>
              {load === true ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: 'Nunito-Bold',
                  }}>
                  Apply
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {searchMovie.length === 0 && user.length > 0 ? (
        <View>
          <Text
            style={{
              color: 'black',

              fontFamily: 'Nunito-Bold',
              paddingHorizontal: 10,
            }}>
            Result <Text>"{user}"</Text>
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 50,
            }}>
            <Image source={require('../image/notfound.png')} />
            <Text style={{fontFamily: 'Nunito-Bold', paddingVertical: 10}}>
              sorry we couldn't find any Dish from this search.
            </Text>
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          {searchMovie.length > 0 && user.length > 0 && (
            <Text
              style={{
                color: 'black',
                fontFamily: 'Nunito-Bold',

                paddingHorizontal: 10,
              }}>
              Result:<Text> "{user}"</Text>
            </Text>
            // {searchMovie.length}
          )}
          <View style={{flex: 1, paddingVertical: 5}}>
            <Text
              style={{
                color: 'black',
                paddingVertical: 5,
                fontFamily: 'Nunito-Bold',
                paddingHorizontal: 10,
              }}>
              Yummy
            </Text>
            <FlatList
              data={
                user.length > 0
                  ? searchMovie.length > 0
                    ? searchMovie
                    : state.datafetch2
                  : state.hasil?.length > 0
                  ? state.hasil?.length > 0
                    ? state?.hasil
                    : state.datafetch2
                  : state.hasil?.lenght === 0
                  ? state.datafetch2
                  : state.datafetch2
              }
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              // initialNumToRender={6}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={memo}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'white',
  },
  bagan: {
    alignItems: 'center',
  },
  image: {
    marginVertical: 20,
    width: wp('95%'),
    borderRadius: 20,
    resizeMode: 'cover',
    height: hp('23%'),
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  chef: {
    height: hp('7%'),
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2%'),
    color: 'black',
  },
  text1: {
    paddingVertical: 10,
    fontFamily: 'Nunito-Bold',
    paddingHorizontal: 10,
    color: 'black',
  },
  boxmenu2: {
    flex: 1,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  press: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: wp('35%'),
    height: hp('4%'),
  },
  txtmid: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.5%'),
    color: 'black',
    alignSelf: 'center',
  },
  icons: {
    fontSize: hp('2%'),
    color: '#214457',
    marginHorizontal: 10,
    // color: 'black',
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  apply: {
    height: hp('5%'),
    width: wp('90%'),
    backgroundColor: '#b82f17',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtdrop: {
    fontFamily: 'Nunito-Bold',
    color: 'black',
    paddingTop: 10,
  },
  price: {
    lineHeight: 14,
    height: hp('8%'),
    width: wp('40%'),
    marginBottom: 10,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  price2: {
    backgroundColor: '#b82f17',
    height: hp('5%'),
    width: wp('30%'),
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 15,
    marginVertical: 10,
  },
});
