import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
  ToastAndroid,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import HeadProfile from '../Header/HeadProfile';
import {Cprofile, profiles} from '../redux/Action.js/Action';
import Modal from 'react-native-modal';
import Bars from '../Dropdown/Dropdwon';
import Ions from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import imagedefault from '../image/Frame.png';
const EventDetail = props => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable={false}
      maxLength={4000}
      style={styles.event}
    />
  );
};

const profile = props => {
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const [rawImage, setRawImage] = useState();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [numbers, setNumbers] = useState('');
  const [alamat, setAlamat] = useState('');
  const [Id, setId] = useState(null);
  const [load, setLoad] = useState(true);
  const [load2, setLoad2] = useState(false);
  async function getdata() {
    // setIsLoading(true);
    setLoad(true);
    await dispatch(profiles());
    setLoad(false);
    setLoad2(false);
  }
  useEffect(() => {
    getdata();
  }, []);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [value, onChangeText] = React.useState('');

  const state = useSelector(state => state.auth?.profile);

  const lokasi = [
    {value: 1, label: 'Jakarta'},
    {value: 2, label: 'Bogor'},
    {value: 3, label: 'Depok'},
    {value: 4, label: 'Tangerang'},
    {value: 5, label: 'Bekasi'},
  ];
  const options = {
    storageOptions: {
      skipBackup: false,
      path: 'images',
    },
  };

  function pickImage() {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Eror: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };

        setRawImage(source);
        setImage(response.assets[0].uri);
      }
    });
  }

  console.log('logget', state);
  console.log('image', image);

  if (load === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading... Please wait..</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <HeadProfile />
      <View style={styles.cont}>
        {state?.data.image === 'undefined' || state.data.image === null ? (
          <Image source={imagedefault} />
        ) : (
          <Image
            source={{
              uri: state.data.image,
            }}
            style={styles.img}
          />
        )}

        <View style={styles.conput}>
          <Text style={styles.txtLabel}>Username</Text>
          <TextInput
            value={state?.data?.userName === null ? null : state.data.userName}
            editable={false}
            style={styles.txtInput}></TextInput>
          <Text style={styles.txtLabel}>Email</Text>
          <TextInput
            value={state?.data?.email === null ? null : state?.data?.email}
            editable={false}
            style={styles.txtInput}></TextInput>
          <Text style={styles.txtLabel}>FirstName</Text>
          <TextInput
            value={
              state?.data?.firstName === null ? null : state?.data?.firstName
            }
            editable={false}
            style={styles.txtInput}></TextInput>
          <Text style={styles.txtLabel}>Last Name</Text>
          <TextInput
            value={
              state?.data?.lastName === null ? null : state?.data?.lastName
            }
            editable={false}
            style={styles.txtInput}></TextInput>
          <Text style={styles.txtLabel}>Location (City)</Text>
          <TextInput
            value={
              state?.data.location?.name === null
                ? null
                : state?.data.location?.name
            }
            editable={false}
            style={styles.txtInput}></TextInput>
          <Text style={styles.txtLabel}>Phone Number</Text>
          <TextInput
            value={
              state?.data.phoneNumber === null ? null : state?.data.phoneNumber
            }
            editable={false}
            style={styles.txtInput}></TextInput>
          <Text style={styles.txtLabel}>Address</Text>
          <View style={styles.boxEvent}>
            <EventDetail
              multiline
              onChangeText={text => onChangeText(text)}
              value={state?.data.address === null ? null : state?.data.address}
            />
          </View>
          <TouchableOpacity style={styles.btnSave} onPress={toggleModal}>
            <Text style={styles.txtBtnSave}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        {/* Moda Edit */}

        <Modal
          isVisible={isModalVisible}
          testID={'modal'}
          style={styles.modals}>
          <View style={styles.modcon}>
            <View
              style={{
                alignItems: 'flex-start',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={toggleModal}>
                <Ions name="close" size={20} color={'black'} />
              </TouchableOpacity>
              <Text style={styles.txt}>Edit Profile</Text>
            </View>
            <View style={styles.imgcons}>
              {!image ? (
                <Image source={imagedefault} />
              ) : (
                <ImageBackground
                  source={!image ? {uri: state?.data.image} : {uri: image}}
                  style={styles.prof}></ImageBackground>
              )}
              <TouchableOpacity onPress={() => pickImage()}>
                <Text style={styles.pht}>Change Photo</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Nunito-SemiBoldItalic',
                  fontSize: 11,
                }}>
                Upload Image Max 2 MB
              </Text>
            </View>
            <View>
              <Text style={styles.labels}>Frist Name</Text>
              <TextInput
                placeholder="Frist name"
                value={firstname}
                onChangeText={value => {
                  setFirstname(value);
                }}
              />
              <Text style={styles.labels}>Last Name </Text>
              <TextInput
                placeholder="Last name"
                value={lastname}
                onChangeText={value => setLastname(value)}
              />
              <Text style={styles.labels}>Phone Number(+62)</Text>
              <TextInput
                placeholder="Phone number"
                value={numbers}
                onChangeText={value => setNumbers(value)}
              />
              <Text style={styles.labels}>New Address</Text>
              <TextInput
                placeholder="Address"
                value={alamat}
                onChangeText={value => setAlamat(value)}
              />
            </View>
            <Text style={styles.labels}>New Location</Text>
            <View style={{padding: 0}}>
              <Bars
                label="Location"
                data={lokasi}
                value={Id}
                setValue={e => setId(e)}
              />
              {load2 === true ? (
                <TouchableOpacity style={styles.apply}>
                  <Text style={styles.sub}>Loading...</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.apply}
                  onPress={async () => {
                    setLoad2(true);

                    const change = await dispatch(
                      Cprofile(
                        firstname,
                        lastname,
                        numbers,
                        alamat,
                        Id,
                        rawImage,
                      ),
                    );
                    // toggleModal();
                    if (change === true) {
                      setLoad2(false);
                      getdata();
                      toggleModal();
                      ToastAndroid.show('Change Success', 4000);
                    } else {
                      setLoad2(false);
                      Alert.alert('Please Check and Fill all the data');
                    }
                    setFirstname('');
                    setLastname('');
                    setNumbers('');
                    setAlamat('');
                  }}>
                  <Text style={styles.sub}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default profile;

const styles = StyleSheet.create({
  labels: {fontFamily: 'Nunito-Bold', fontSize: hp('1.8%'), color: 'black'},
  sub: {textAlign: 'center', color: 'white', fontFamily: 'Nunito-Bold'},
  apply: {
    height: hp('5%'),
    width: wp('91%'),
    backgroundColor: '#b82f17',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  imgcons: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pht: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2%'),
    color: 'skyblue',
    textDecorationLine: 'underline',
  },
  prof: {
    height: hp('20%'),
    width: wp('35%'),
  },
  txt: {
    fontFamily: 'Nunito-Bold',
    color: 'black',
    fontSize: hp('2.4%'),
    paddingHorizontal: 10,
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
  // conts: {flex: 1},
  cont: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    // flex: 1,
    // height: hp('100%'),
    // backgroundColor: 'white',
  },
  conput: {
    paddingHorizontal: 20,
    width: wp('100%'),
  },
  img: {
    height: hp('22%'),
    width: wp('40%'),
    borderRadius: 360,
    marginVertical: 20,
    // backgroundColor: 'red',
  },
  txtLabel: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
  },
  txtInput: {
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#9F9F9F',
    marginVertical: 15,
    color: 'black',
  },
  boxEvent: {
    width: wp('90%'),
    height: wp('25%'),
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#9F9F9F',
  },
  btnSave: {
    width: wp('90%'),
    height: wp('13%'),
    borderRadius: 24,
    backgroundColor: '#F9C959',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  txtBtnSave: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#000',
  },
  event: {
    width: wp('85%'),
    height: wp('18%'),
    color: 'black',
  },
});
