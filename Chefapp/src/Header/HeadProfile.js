import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ion from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {Changepw, Logout, Remcart} from '../redux/Action.js/Action';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HeadProfile({}) {
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('Kont');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isUpcomingModal, setUpcomingModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [load, setLoad] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const Pw = () => {
    setUpcomingModal(!isUpcomingModal);
  };
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.butsytle2} onPress={Pw}>
        <Ion name="ios-key-outline" size={23} color={'black'} />
      </TouchableOpacity>
      <View style={style.conprof}>
        <Text style={style.txt}>My Profile</Text>
      </View>

      <TouchableOpacity style={style.butsytle} onPress={toggleModal}>
        <Ion name="exit-outline" size={23} color={'black'} />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} testID={'modal'} style={style.modals}>
        <View style={style.modcon}>
          <Text style={style.logisi}>Are You Sure Want To Logout?</Text>

          <View style={style.logs}>
            {load === true ? (
              <TouchableOpacity style={style.apply}>
                <Text style={style.tulis}>Loadings</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={style.apply}
                onPress={async () => {
                  dispatch(Logout());

                  navigation.replace('Splash2');
                  ToastAndroid.show('Goodbye', 4000);
                  dispatch(Remcart());
                  toggleModal();
                  setLoad(false);
                  removeValue();
                }}>
                <Text style={style.tulis}>Yes</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={style.logs}>
            <TouchableOpacity style={style.apply1} onPress={toggleModal}>
              <Text style={style.tulis}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={isUpcomingModal} testID={'modal'} style={style.modals}>
        <View style={style.modcon}>
          <TouchableOpacity onPress={Pw}>
            <Ion name="close" size={25} color={'black'} />
          </TouchableOpacity>
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <Text style={style.logisi}>Change Password</Text>
          </View>
          <View style={{paddingVertical: 10}}>
            <Text style={style.text11}>New Password</Text>
            <TextInput
              placeholder="New Password"
              value={password}
              onChangeText={value => setPassword(value)}
            />
            <Text style={style.text11}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm Password"
              value={confirmpass}
              onChangeText={value => setConfirmpass(value)}
            />
          </View>
          {password !== confirmpass && (
            <Text style={{marginLeft: 22, marginTop: 5, color: 'red'}}>
              * Password did not match
            </Text>
          )}
          {load === true ? (
            <TouchableOpacity style={style.apply}>
              <Text style={style.tulis}>Loading</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={style.apply}
              onPress={async () => {
                const ganti = await dispatch(Changepw(password, confirmpass));
                console.log('ini ganti', ganti);
                if (ganti === true) {
                  setLoad(false);
                  // dispatch(Logout());
                  // navigation.replace('Splash');
                  ToastAndroid.show('Success Change', 4000);
                  ToastAndroid.show('Please Login Again', 4000);
                }
                setPassword('');
                setConfirmpass('');
                Pw();
              }}>
              <Text style={style.tulis}>Change</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  tulis: {
    fontFamily: 'Nunito-Bold',
    color: 'black',
    fontSize: hp('2.4%'),
    textAlign: 'center',
  },
  logisi: {
    fontFamily: 'Nunito-Bold',
    color: 'black',
    fontSize: hp('2.4%'),
    textAlign: 'center',
  },
  text11: {
    fontFamily: 'Nunito-Bold',
    color: 'black',
    fontSize: hp('2%'),
  },
  logs: {
    paddingVertical: 10,
  },
  apply: {
    height: hp('7%'),
    width: wp('91%'),
    backgroundColor: '#F9C959',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
  },
  apply1: {
    height: hp('7%'),
    width: wp('91%'),
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
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
  container: {
    flex: 1,
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: '#F9C959',
    elevation: 10,
    justifyContent: 'center',
  },
  conprof: {
    alignItems: 'center',
  },
  txt: {
    fontFamily: 'Nunito-Bold',
    color: 'black',
    fontSize: hp('2.4%'),
  },
  butsytle: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    paddingHorizontal: 20,
  },
  butsytle2: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    position: 'absolute',
    paddingHorizontal: 20,
  },
});
