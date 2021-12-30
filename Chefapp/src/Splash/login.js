import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ent from 'react-native-vector-icons/Entypo';
import {SignIns} from '../redux/Action.js/Action';
import {useDispatch} from 'react-redux';

export default function login({navigation}) {
  const [hidePass, setHidePass] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [ongoing, setOngoing] = useState(false);
  useEffect(() => {
    // setLoad(false);
    setOngoing(false);
  }, []);
  // const loas = () => {
  //   if (load === true) {
  //     return (
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}>
  //         <ActivityIndicator size="large" color="white" />
  //       </View>
  //     );
  //   }
  // };
  console.log('Loading', ongoing);
  return (
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.imgcon}>
          <Image
            source={require('../image/chefbox_logo.png')}
            style={style.logo}
          />
          {/* <Svg /> */}
        </View>
        <View style={style.fcon}>
          <Text style={style.font}>Login</Text>
          <View style={style.logcon}>
            <Text style={style.fonus}>New User ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Regis2')}>
              <Text style={style.newup}>Create New Account</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.conep}>
          <Text style={style.fonus}>Email</Text>
          <View style={style.input}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={value => setEmail(value)}
              style={{width: wp('60%'), lineHeight: 14}}
            />
          </View>
          <Text style={style.fonus}>Password</Text>
          <View style={style.input}>
            <TextInput
              placeholder="Password"
              secureTextEntry={hidePass ? true : false}
              autoCorrect={false}
              value={password}
              onChangeText={value => setPassword(value)}
              style={{width: wp('60%'), lineHeight: 14}}
            />
            <Ent
              name={hidePass ? 'eye-with-line' : 'eye'}
              size={wp('6%')}
              color={'#999999'}
              onPress={() => setHidePass(!hidePass)}
            />
          </View>
          <View>
            {ongoing === true ? (
              <TouchableOpacity
                style={style.bulo}
                // onPress={async () => {
                //   setLoad(true);
                //   const login = await dispatch(SignIns(email, password));

                //   if (login === true) {
                //     ToastAndroid.show('Loadings...', 4000);
                //     navigation.navigate('Bot');
                //   } else {
                //     setLoad(false);
                //     Alert.alert('Please Input the correct email and password');
                //   }
                //   setEmail('');
                //   setPassword('');
                //   loas('');
                // }}>
              >
                <Text style={style.fontbut}>Loading....</Text>

                {/* <Text style={style.fontbut}>Sign In</Text> */}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={style.bulo}
                onPress={async () => {
                  // setLoad(true);
                  setOngoing(true);
                  const login = await dispatch(SignIns(email, password));

                  if (login === true) {
                    setOngoing(false);

                    ToastAndroid.show('Loadings...', 4000);
                    navigation.replace('Bot2');
                    setEmail('');
                    setPassword('');
                    loas('');
                  } else {
                    // setLoad(false);
                    setOngoing(false);
                    Alert.alert('Please Input the correct email and password');
                  }
                }}>
                <Text style={style.fontbut}>Sign In</Text>

                {/* <Text style={style.fontbut}>Sign In</Text> */}
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={style.conbut}>
          <View>
            <TouchableOpacity style={style.bulo2}>
              <Text style={style.fontbut2}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={style.bulo3}>
              <Text style={style.fontbut}>Continue with Facebook</Text>
            </TouchableOpacity>
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
  logo: {
    // height: hp('%'),
    width: wp('21%'),
    resizeMode: 'cover',
    // width: 41,
    // height: 38.8,
  },
  fcon: {
    flexDirection: 'column',
    paddingHorizontal: 30,
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
  newup: {
    color: '#b72f17',
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2.5%'),
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
});
