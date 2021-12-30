import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
  ImageBackground,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ion from 'react-native-vector-icons/Ionicons';
import Ent from 'react-native-vector-icons/Entypo';
import {launchImageLibrary} from 'react-native-image-picker';
import imagedefault from '../image/Frame.png';
import {useDispatch} from 'react-redux';
import Bars from '../Dropdown/Dropdwon';

import {SignUps2} from '../redux/Action.js/Action';
export default function SignUp2({navigation}) {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [value, onChangeText] = React.useState('');
  const [image, setImage] = useState();
  const [rawImage, setRawImage] = useState();
  const [Id, setId] = useState(null);
  const [names, setNames] = useState(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [load, setLoad] = useState(false);
  const [luk, setLuk] = useState(null);
  console.log('data regis phone', phone);
  console.log('data regis address', address);
  console.log('data regis loc', Id);
  console.log('data regis image', rawImage);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    setLoad(false);
  }, []);
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

  const sort = [
    {id_category: 1, name: 'Jakarta'},
    {id_category: 2, name: 'Bogor'},
    {id_category: 3, name: 'Depok'},
    {id_category: 4, name: 'Tangerang'},
    {id_category: 5, name: 'Bekasi'},
  ];
  const renderItem = ({item}) => {
    return <Item title={item.id_category} name={item.name} />;
  };

  return (
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.imgcon}>
          <Image
            source={require('../image/chefbox_logo.png')}
            style={style.logo}
          />
        </View>
        <View style={style.fcon}>
          <Text style={style.font}>One More Step!</Text>
          <View style={style.logcon}>
            <Text style={style.fonus}>Help us know you better </Text>
          </View>
        </View>
        <View style={style.fcon2}>
          <ImageBackground
            source={!image ? imagedefault : {uri: image}}
            style={style.prof}></ImageBackground>
          <TouchableOpacity onPress={() => pickImage()} style={style.up}>
            <Text style={{fontFamily: 'Nunito-Bold', color: 'white'}}>
              Upload Photo
            </Text>
            <Ion name="ios-pencil-outline" size={20} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={style.conep}>
          <Text style={style.fonus}>Phone Number</Text>
          <View style={style.input}>
            <TextInput
              placeholder="e.g +62 1234 3456"
              keyboardType="numeric"
              value={phone}
              onChangeText={value => setPhone(value)}
              style={{width: wp('60%'), lineHeight: 14}}
            />
          </View>
          <Text style={style.fonus2}>Address</Text>
          <View style={style.input2}>
            <TextInput
              editable
              maxLength={40}
              value={address}
              onChangeText={value => setAddress(value)}
              style={{
                textAlignVertical: 'top',
                height: hp('15'),
                fontFamily: 'Nunito-Bold',
                width: wp('78%'),
                lineHeight: 14,
              }}
            />
          </View>
          <Text style={style.fonus}>Location(City)</Text>
          <Bars
            label="Location"
            data={lokasi}
            value={luk}
            setValue={e => setLuk(e)}
          />
          <View>
            {load === true ? (
              <TouchableOpacity style={style.bulo}>
                <Text style={style.fontbut}>Loading...</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={style.bulo}
                onPress={async () => {
                  setLoad(true);
                  const regis2 = await dispatch(
                    SignUps2(rawImage, phone, address, luk),
                  );
                  if (regis2 === true) {
                    setLoad(false);
                    ToastAndroid.show('Create Profile Succes', 3000);
                    navigation.replace('Bot2');
                    setRawImage();
                    setAddress('');
                    setPhone('');
                    setId('');
                  } else {
                    setLoad(false);
                    Alert.alert('Please fill All the form include foto');
                  }
                  // console.log('register2', regis2);
                }}>
                <Text style={style.fontbut}>Complete Profile</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
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
  imgcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  up: {
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: wp('35%'),
    height: hp('4%'),
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#b82f17',
    elevation: 10,
  },
  prof: {
    height: hp('20%'),
    width: wp('35%'),
  },
  logo: {
    // height: hp('8%'),
    width: wp('21%'),
    resizeMode: 'cover',
    // width: 41,
    // height: 38.8,
  },
  fcon: {
    flexDirection: 'column',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  fcon2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  font: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('5%'),
    textAlign: 'left',
    color: 'black',
  },
  logcon: {
    flexDirection: 'row',
  },
  fonus: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.5%'),
    color: 'black',
  },
  fonus2: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.5%'),
    color: 'black',
  },
  newup: {
    color: '#b72f17',
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.5%'),
  },
  input2: {
    flexDirection: 'row',
    borderWidth: 0.5,
    marginVertical: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('17%'),
  },
  input: {
    flexDirection: 'row',
    borderWidth: 0.5,
    marginVertical: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conep: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  bulo: {
    backgroundColor: '#b82f17',
    height: hp('7%'),
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 10,
  },
  bulo2: {
    backgroundColor: 'white',
    height: hp('7%'),
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
    marginVertical: 10,
  },
  bulo3: {
    backgroundColor: '#4E67A5',
    height: hp('7%'),
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
    marginVertical: 10,
  },
  fontbut: {
    fontFamily: 'Nunito-Bold',
    color: 'white',
  },
  fontbut2: {
    fontFamily: 'Nunito-Bold',
    color: 'black',
  },
  conbut: {
    paddingHorizontal: 30,
    paddingVertical: 10,
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
  btn: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  press: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    width: wp('80%'),
    height: hp('8'),
  },
  txtmid: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('3%'),
    color: 'black',
    alignSelf: 'center',

    width: wp('70%'),
  },
  txtmid1: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2%'),
    color: '#214457',
  },
  icons: {
    fontSize: hp('2%'),
    color: '#214457',
    marginLeft: 10,
    // color: 'black',
  },
  text: {
    fontSize: hp('2.5%'),
    fontFamily: 'Nunito-Bold',
    fontStyle: 'normal',
    marginVertical: 5,
    color: 'black',
  },
});
