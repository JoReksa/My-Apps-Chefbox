import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ion from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  ChangeAdds,
  CheckOut,
  Payments,
  Remcart,
  Uls,
} from '../redux/Action.js/Action';
import {useNavigation} from '@react-navigation/native';
import Ants from 'react-native-vector-icons/AntDesign';
import Baya from '../Card/CheckoutC';
import Modal from 'react-native-modal';
import {numberWithCommas} from '../Helper/Formatnum';

export default function Checkouts() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [frist, setFrist] = useState('');
  const [last, setLast] = useState('');
  const [pho, setPho] = useState('');
  const [adds, setAdds] = useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  async function order() {
    await dispatch(CheckOut());
    setLoad(false);
  }

  useEffect(() => {
    order();
    return () => {
      dispatch(Uls());
    };
  }, []);
  const state = useSelector(state => state.fetch?.checkin);
  // const payss = useSelector(state => state.fetch);
  console.log('checkoi', state.cart);
  const compos = () => {
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
  return (
    <View style={style.container}>
      <View style={style.heads}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ion name="arrow-back-outline" size={25} color={'black'} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',

            width: wp('50%'),
            // backgroundColor: 'red',
          }}>
          <Text style={style.header}> Checkout </Text>
        </View>
        <Ion name="arrow-back-outline" size={25} color={'#F9C959'} />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          marginVertical: 10,
          flex: 2,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={toggleModal}>
          <Text style={style.bash}>Delivery Address</Text>
          <Ants name="edit" size={20} color="black" />
        </TouchableOpacity>

        <View style={{flexDirection: 'row', paddingVertical: 5}}>
          <FlatList
            data={state.detailDelivery}
            renderItem={data => {
              return (
                <View style={style.comms}>
                  <View style={style.comft}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 5,
                      }}>
                      <Text>{data.item?.firstName} </Text>
                      <Text> {data.item?.lastName}</Text>
                    </View>

                    <Text style={{marginBottom: 5}}>
                      {data.item.phoneNumber}
                    </Text>
                    <Text>{data.item.address}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <Text style={style.bash}>Product Details</Text>
        {state.cart === undefined || state?.cart.length === 0 ? (
          compos()
        ) : (
          <FlatList
            data={state.cart}
            showsVerticalScrollIndicator={false}
            renderItem={data => {
              console.log('casr', data);
              return (
                <View style={{fles: 1}}>
                  <Baya data={data.item} navigation={navigation} />
                </View>
              );
            }}
          />
        )}
      </View>
      {state.cart === undefined || state?.cart.length === 0 ? (
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <Text>Fill All Your Profile First</Text>
          <TouchableOpacity
            style={style.bs}
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Text>Go To Profile</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={style.foots}>
          <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
            <View style={style.sst}>
              <Text style={style.bash2}>Subtotal</Text>

              <Text style={style.bash2}>
                Rp. {numberWithCommas(state?.detailOrder.subtotal)}
              </Text>
            </View>
            <View style={style.sst}>
              <Text style={style.bash2}>Delivery Fee</Text>
              <Text style={style.bash2}>
                Rp. {numberWithCommas(state?.detailOrder.deliveryFee)}
              </Text>
            </View>
            <View style={style.sst}>
              <Text style={style.bash3}>Total</Text>
              <Text style={style.bash3}>
                {' '}
                Rp. {numberWithCommas(state?.detailOrder.total)}
              </Text>
            </View>
          </View>
          {load === true ? (
            <TouchableOpacity
              style={{
                width: wp('95%'),
                alignSelf: 'center',
                alignItems: 'center',
                height: hp('7%'),
                // backgroundColor: 'red',
                backgroundColor: '#F9C959',
                borderRadius: 50,
                elevation: 10,
                justifyContent: 'center',
              }}>
              <Text style={style.bash4}>Loadings...</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: wp('95%'),
                alignSelf: 'center',
                alignItems: 'center',
                height: hp('7%'),
                // backgroundColor: 'red',
                backgroundColor: '#F9C959',
                borderRadius: 50,
                elevation: 10,
                justifyContent: 'center',
              }}
              onPress={async () => {
                setLoad(true);
                const fin = await dispatch(Payments());
                if (fin === true) {
                  setLoad(false);
                  navigation.navigate('Confirmpays');
                }
              }}>
              <Text style={style.bash4}>Confirm Payment</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <Modal isVisible={isModalVisible} testID={'modal'} style={style.modals}>
        <View style={style.modcon}>
          <View style={style.bils}>
            <TouchableOpacity onPress={toggleModal}>
              <Ion name="close" size={25} color={'black'} />
            </TouchableOpacity>
            <Text style={style.bash}>Change Delivery Address</Text>
            <Ion name="close" size={25} color={'white'} />
          </View>
          <View style={{marginVertical: 10, marginBottom: 30}}>
            <Text style={style.bash}>First Name</Text>
            <TextInput
              placeholder="First Name"
              style={style.input}
              value={frist}
              onChangeText={value => setFrist(value)}
            />
            <Text style={style.bash}>Last Name</Text>
            <TextInput
              placeholder="Last Name"
              style={style.input}
              value={last}
              onChangeText={value => setLast(value)}
            />

            <Text style={style.bash}>Phone Number</Text>
            <TextInput
              placeholder="+62 -XXX-XXX-XX"
              style={style.input}
              value={pho}
              onChangeText={value => setPho(value)}
            />

            <Text style={style.bash}>Address</Text>
            <TextInput
              placeholder="New Address"
              style={style.input}
              value={adds}
              onChangeText={value => setAdds(value)}
            />
          </View>
          <TouchableOpacity
            style={style.bs}
            onPress={async () => {
              setLoad(false);
              const bums = state.detailDelivery[0].id;
              console.log('ini bums', bums);

              const chang = await dispatch(
                ChangeAdds(bums, last, pho, frist, adds),
              );
              if (chang === true) {
                ToastAndroid.show('Change Address Success', 4000);
                toggleModal();
                order();
              }
              setAdds('');
              setFrist('');
              setLast('');
              setPho('');
            }}>
            <Text style={style.bash}>Change Delivery</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  bs: {
    width: wp('90%'),
    height: hp('7%'),
    backgroundColor: '#F9C959',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
  },
  input: {
    lineHeight: 14,
    borderBottomWidth: 1,
    paddingVertical: 4,
    marginVertical: 5,
  },
  bils: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bash: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.5%'),
    color: 'black',
  },
  bash2: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.3%'),
    color: 'black',
  },
  bash3: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.3%'),
    color: '#B6340B',
  },
  bash4: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('3%'),
    color: 'black',
  },
  sst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomWidth: 0.5,
  },
  foots: {
    width: wp('100%'),
    height: hp('22%'),
    // backgroundColor: 'red',
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heads: {
    flexDirection: 'row',
    height: hp('7%'),
    width: wp('100%'),
    backgroundColor: '#F9C959',
    elevation: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.5%'),
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
  comms: {
    paddingHorizontal: 10,
    // paddingVertical: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    // borderBottomWidth: 0.5,
    // borderColor: 'grey',
  },
  comft: {
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
});
