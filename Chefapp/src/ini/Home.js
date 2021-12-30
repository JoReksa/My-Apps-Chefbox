import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HeadSearch from '../Header/HeadSearch';
import CardMenu from '../Card/homecard';
import {useDispatch, useSelector} from 'react-redux';
import {Inti, Intis, profiles, Remcom, See} from '../redux/Action.js/Action';
import {useNavigation} from '@react-navigation/native';
// import { set } from 'react-native-reanimated';
export default function Home(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const [timeout, setTimeout] = useState();
  const state = useSelector(state => state.fetch);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(1);
  const [load2, setLoad2] = useState(false);
  async function gets() {
    await dispatch(Inti(page));
    await dispatch(profiles());
    // await dispatch(Remcom());
    setLoad2(false);
    setLoad(false);
  }
  async function seacr() {
    await dispatch(Intis());
    setLoad(false);
  }
  useEffect(() => {
    // seacr();
    gets();
    // setRefreshing(false);
  }, [page]);
  const handleOnEndReached = () => {
    setPage(previousPage => previousPage + 1);
    // setLoad2(true);
    // gets();
  };
  const ontop = () => {
    setPage(previousPage => previousPage - 1);
    // gets();
  };
  const flatListRef = useRef();

  const onPressTouch = () => {
    // console.log('SCROLL REF NI BOSSS', scrollRef.current.scrollTo);
    flatListRef.current?.scrollToOffset({
      animated: true,
      y: 0,
    });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // setLoad(true);
    // ontop()
    ontop();
    ToastAndroid.show('Refreshing...', 4000);
    wait(4000).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  if (load === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading... Please wait..</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  const LoadB = () => {
    return (
      <View style={style.footer}>
        <TouchableOpacity
          onPress={() => {
            handleOnEndReached();
            onPressTouch();
          }}
          style={style.loadMoreBtn}>
          <Text style={style.btnText}>Load More</Text>
          {load2 === true ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };
  console.log('state home', state);
  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  return (
    <View style={style.container}>
      <HeadSearch navigation={navigation} notif={state.views?.total} />
      <View style={style.bagan}>
        <ImageBackground
          source={require('../image/Rectangle.png')}
          style={style.image}>
          <Text style={style.text}>Welcome to</Text>
          <Image
            source={require('../image/chefbox_logo.png')}
            style={style.chef}
          />
        </ImageBackground>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={style.text1}>Most Favourites</Text>
        <TouchableOpacity
          // style={{borderBottomWidth: 1, borderBottomColor: 'black'}}
          onPress={() => {
            const ia = gets();
            ToastAndroid.show('Refreshing....', 4000);
          }}>
          <Text style={style.text2}> Refresh</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, paddingVertical: 5}}>
        <FlatList
          ref={flatListRef}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={state.datafetch?.recipe}
          ItemSeparatorComponent={ItemSeparatorView}
          numColumns={2}
          // onResponderEnd={}
          showsVerticalScrollIndicator={false}
          // onEndReached=
          // onScrollToTop={ontop}
          // onEndThreshold={0.5}
          // onScrollToTop={ontop}
          // onScrollEndDrag={handleOnEndReached}
          initialNumToRender={20}
          ListFooterComponent={LoadB}
          renderItem={data => (
            <View style={style.boxmenu2}>
              <CardMenu data={data.item} navigation={navigation} />
            </View>
          )}
        />
      </View>
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
    height: hp('20%'),
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
    fontFamily: 'Nunito-Bold',
    paddingHorizontal: 20,
    color: 'black',
  },
  text2: {
    fontFamily: 'Nunito-Bold',
    paddingHorizontal: 20,
    color: 'blue',
  },
  boxmenu2: {
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});
