import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  VirtualizedList,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Addcart,
  GetDetails,
  Remcom,
  Reviews,
  See,
} from '../redux/Action.js/Action';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Unorderedlist from 'react-native-unordered-list';
import Evil from 'react-native-vector-icons/EvilIcons';
import Fea from 'react-native-vector-icons/Feather';
import HeadSearch from '../Header/HeadBack';
import {useNavigation} from '@react-navigation/native';
import Ion from 'react-native-vector-icons/Ionicons';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Cartcard from '../Card/commentcard';
import Modal from 'react-native-modal';
import {numberWithCommas} from '../Helper/Formatnum';

export default function Details(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [num, setNum] = useState(1);
  const [load, setLoad] = useState(true);
  const [noted, setNoted] = useState();
  const [sends, setSends] = useState();
  const [load2, setLoad2] = useState(false);
  const [ratings, setRatings] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState('');
  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
    setRatings(rating);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  async function data() {
    // setLoad(true);
    await dispatch(GetDetails(props.route.params.Idfood));
    setLoad(false);
    setLoad2(false);
  }
  function rem() {
    dispatch(Remcom());
    setLoad(false);
  }
  useEffect(() => {
    data();
    // setLoad2(false);
    // rem();
    return () => {
      rem();
      // dispatch(Remcom());
    };
  }, []);

  const state = useSelector(state => state.fetch);
  const datas = useSelector(state => state.fetch.dataDetail);
  const notif = () => {
    setNoted(num);
    // setSends(ids);
  };
  console.log('details', state);

  if (load === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading... Please wait..</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  // console.log('func me', datas);
  function Comment() {
    return (
      <View>
        <FlatList
          nestedScrollEnabled={false}
          scrollEnabled={false}
          data={datas?.comments}
          renderItem={data => {
            // console.log('com', data);

            return (
              <View style={{flex: 1}}>
                {load2 === true ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Loading... Please wait..</Text>
                    <ActivityIndicator size="large" color="blue" />
                  </View>
                ) : (
                  <View style={style.comms}>
                    <View style={style.comft}>
                      <Image
                        source={{uri: data.item.user.image}}
                        style={style.pross}
                      />
                      <Text style={style.namas}>{data.item.user.userName}</Text>
                      <Text style={style.hour}>| {data.item.commentTime}</Text>
                    </View>
                    {data.item.value === undefined ? null : (
                      <Rating
                        // type="heart"
                        ratingCount={5}
                        size={15}
                        // isDisabled
                        readonly
                        imageSize={15}
                        style={{alignItems: 'flex-start'}}
                        // showRating={state.dataDetail.averageRatings}
                        startingValue={data.item?.value}
                      />
                    )}
                    <Text style={style.txtb3}>{data.item.comment}</Text>
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>
    );
  }
  if (state.dataDetail.data === undefined) {
    return (
      <View>
        <Text>to loading </Text>
      </View>
    );
  }
  return (
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeadSearch
          navigation={navigation}
          notif={noted}
          backnav={() => navigation.navigate('Bot2', {data: 1})}
        />
        {state.dataDetail.data && (
          <Image
            source={{uri: state.dataDetail.data.image}}
            style={style.imge}
          />
        )}
        <View style={style.com}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {state.dataDetail.data && (
              <Text style={style.txtp}>
                Rp.{numberWithCommas(state.dataDetail.data.price)}
              </Text>
            )}
            {state.dataDetail.averageRatings === undefined ? null : (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Rating
                  // type="heart"
                  ratingCount={5}
                  size={10}
                  readonly
                  imageSize={15}
                  startingValue={state.dataDetail.averageRatings}
                />
                <Text style={style.txtb}>
                  | {state.dataDetail.peopleRatings} People
                </Text>
              </View>
            )}
            {/* <Text></Text> */}
          </View>
          <Text style={style.banner}>{state.dataDetail.data.title}</Text>
          <Text style={style.txtb}>{state.dataDetail.data.description}</Text>
          <View style={style.cons}>
            <View style={style.contbutt2}>
              <Text style={style.txtp1}>Cooking Time</Text>
              <View style={style.contbutt}>
                <Evil name="clock" size={18} />
                <Text style={style.txtb2}>
                  {state.dataDetail.data.duration} Minutes
                </Text>
              </View>
            </View>
            <View style={style.contbutt2}>
              <Text style={style.txtp1}>Servings</Text>
              <View style={style.contbutt}>
                <Fea name="user" size={17} />
                <Text style={style.txtb2}>
                  {state.dataDetail.data.serving} Serving
                </Text>
              </View>
            </View>
          </View>
          <View style={style.pros1}>
            <View style={style.pros}>
              <Image
                source={{uri: state.dataDetail.data.user.image}}
                style={style.pross}
              />
              <Text style={style.namas}>
                {state.dataDetail.data.user.userName}
              </Text>
            </View>
            <View style={style.pros}>
              <Evil name="location" size={18} />
              <Text style={style.hour}>
                {state.dataDetail.data.location?.name}
              </Text>
            </View>
          </View>
        </View>
        <View style={style.pro}>
          <Text style={style.banner2}>Ingredients</Text>
          <Unorderedlist>
            <Text style={style.txtb3}>{state.dataDetail.data.ingredient}</Text>
          </Unorderedlist>
        </View>
        <View style={style.pro}>
          <Text style={style.banner2}>Method </Text>
          <Text style={style.txtb3}>{state.dataDetail.data.direction}</Text>
        </View>
        <View style={style.pro}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={style.banner2}>Review</Text>
            {load2 === true ? null : (
              <TouchableOpacity style={style.revw} onPress={toggleModal}>
                <Text style={style.txt1}>Review</Text>
              </TouchableOpacity>
            )}
          </View>
          <>
            <Comment />
          </>
        </View>
      </ScrollView>
      {state.dataDetail.data.stock === null ||
      state.dataDetails?.data.stock.length === 0 ? null : (
        <View style={style.foot}>
          <View style={style.countss}>
            <TouchableOpacity
              onPress={() => {
                // setNum(num - 1);
                if (num > 1) {
                  setNum(num - 1);
                }
              }}>
              <Ion name="caret-back-outline" size={40} color={'#B6340B'} />
            </TouchableOpacity>
            <View style={style.isis}>
              <Text style={style.int}>{num}</Text>
            </View>
            {num >= datas.data.stock ? null : (
              <TouchableOpacity
                onPress={() => {
                  console.log(num);
                  setNum(num + 1);
                }}>
                <Ion name="caret-forward-outline" size={40} color={'#B6340B'} />
              </TouchableOpacity>
            )}
          </View>
          {load2 === true ? (
            <TouchableOpacity style={style.carts}>
              <Text style={style.buts}>Load...</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={style.carts}
              onPress={async () => {
                notif();
                setLoad2(true);
                const ids = state.dataDetail.data.id;
                const adds = await dispatch(Addcart(ids, num));
                console.log('addsssss', ids);
                if (adds === true) {
                  setLoad2(false);
                  // await dispatch(CheckOut());

                  await dispatch(See());
                  ToastAndroid.show('Add Succes', 4000);
                }
              }}>
              <Text style={style.buts}>Add To Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <Modal isVisible={isModalVisible} testID={'modal'} style={style.modals}>
        <View style={style.modcon}>
          <View style={style.consat}>
            <TouchableOpacity onPress={toggleModal}>
              <Ion name="close" size={20} color={'black'} />
            </TouchableOpacity>
            <Text>{state.dataDetail.data.title}</Text>
            <Ion name="close" size={20} color={'white'} />
          </View>
          <View style={{marginVertical: 10}}>
            <Text>Ratings</Text>
            <AirbnbRating
              // data={Rats}
              defaultRating={0}
              // count={5}
              // ratingCount={3}
              onFinishRating={ratingCompleted}
            />
          </View>
          <Text>Review</Text>
          <View>
            <TextInput
              placeholder="e.g. Fresh ingredients and has good instruction."
              style={style.inpus}
              value={comments}
              onChangeText={value => setComments(value)}
            />
          </View>
          <TouchableOpacity
            style={style.bst}
            onPress={async () => {
              // setLoad(true);
              // setLoad2(true);
              const Nas = state.dataDetail.data.id;
              console.log('nas', Nas);

              // dispatch(Ranting);
              const sists = await dispatch(Reviews(Nas, comments, ratings));
              console.log('dispatch reviews', sists);

              if (sists === true) {
                ToastAndroid.show('Success', 4000);
                // console.log('dispatch rating', sats);
                setComments('');
                setRatings('');
                toggleModal();
                data();
              }
              // setLoad(false);
              // setLoad2(false);

              // console.log('ini rating', pushs);
            }}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // height: hp('10%'),
    width: wp('100%'),
    // backgroundColor: 'white',
  },
  imge: {
    paddingVertical: 10,
    height: hp('30%'),
    width: wp('100%'),
    resizeMode: 'cover',
  },
  com: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderBottomWidth: 0.5,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  txtp: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('3%'),
    color: '#587B67',
  },
  banner: {
    paddingVertical: 10,
    fontFamily: 'Nunito-Bold',
    fontSize: hp('3.5%'),
    color: 'black',
  },
  banner2: {
    paddingVertical: 10,
    fontFamily: 'Nunito-Bold',
    fontSize: hp('3%'),
    color: 'black',
  },
  txtb: {
    fontSize: hp('2%'),
    fontFamily: 'Nunito-Regular',
    color: 'black',
  },
  cons: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  contbutt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contbutt2: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    elevation: 10,
    height: hp('12%'),
    width: wp('35%'),
    borderRadius: 10,
  },
  txtp1: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.5%'),
    color: '#587B67',
  },
  txtb2: {
    fontSize: hp('1.9%'),
    fontFamily: 'Nunito-Regular',
    color: 'black',
  },
  txtb3: {
    fontSize: hp('2.3%'),
    fontFamily: 'Nunito-Regular',
    color: 'black',
  },
  comms: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
  },
  comft: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  hour: {
    fontSize: hp('2%'),
    fontFamily: 'Nunito-Regular',
  },
  namas: {
    fontSize: hp('3%'),
    fontFamily: 'Nunito-Regular',
    color: 'black',
  },
  pros: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pro: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    // borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  pros1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pross: {
    height: hp('6%'),
    width: wp('11%'),
    borderRadius: 50,
    marginHorizontal: 5,
    paddingVertical: 20,
  },
  foot: {
    height: hp('10%'),
    width: wp('100%'),
    backgroundColor: '#FFFAEF',
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carts: {
    height: hp('7%'),
    width: wp('50%'),
    backgroundColor: '#B6340B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 20,
  },
  buts: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('3%'),
    color: 'white',
  },
  isis: {
    backgroundColor: 'white',
    height: hp('7%'),
    width: wp('20%'),
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countss: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  int: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('3%'),
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
  txt1: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2%'),
    color: 'black',
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
  modals: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  consat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
