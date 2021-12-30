import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ent from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {SignUps} from '../redux/Action.js/Action';
// import auth from '../redux/reducer/auth';

export default function SignUp({navigation}) {
  const dispatch = useDispatch();
  const [hidePass, setHidePass] = useState(true);
  const [conpass, setConPass] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfrim] = useState('');
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(false);
  }, []);
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
          <Text style={style.font}>Create Account</Text>
          <View style={style.logcon}>
            <Text style={style.fonus}>Already have account? </Text>
            <TouchableOpacity>
              <Text
                style={style.newup}
                onPress={() => navigation.navigate('Splash')}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.conep}>
          <Text style={style.fonus}>Username</Text>
          <View style={style.input}>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={value => setUsername(value)}
              style={{width: wp('60%'), lineHeight: 14}}
            />
          </View>
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
              value={password}
              onChangeText={value => setPassword(value)}
              autoCorrect={false}
              style={{width: wp('60%'), lineHeight: 14}}
            />
            <Ent
              name={hidePass ? 'eye-with-line' : 'eye'}
              size={wp('6%')}
              color={'#999999'}
              onPress={() => setHidePass(!hidePass)}
            />
          </View>

          <Text style={style.fonus}>Confirm Password</Text>
          <View style={style.input}>
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={conpass ? true : false}
              autoCorrect={false}
              value={confirm}
              onChangeText={value => setConfrim(value)}
              style={{width: wp('60%'), lineHeight: 14}}
            />
            <Ent
              name={conpass ? 'eye-with-line' : 'eye'}
              size={wp('6%')}
              color={'#999999'}
              onPress={() => setConPass(!conpass)}
            />
          </View>
          <Text
            style={{
              fontSize: hp('2%'),
              marginHorizontal: 5,
              padding: 0,
              marginBottom: 5,
            }}>
            Minimal 8 character 1 symbol!@#$%^&* and Number For the pasword
          </Text>
          {password !== confirm && (
            <Text style={{marginLeft: 22, marginTop: 5, color: 'red'}}>
              * Password did not match
            </Text>
          )}
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
                  const auth = await dispatch(
                    SignUps(email, username, password, confirm),
                  );
                  console.log('auth', auth);
                  if (auth === true) {
                    setLoad(false);
                    ToastAndroid.show(
                      'One more step to registered in the Chefbox',
                      5000,
                    );
                    navigation.replace('Step2');
                    setEmail('');
                    setPassword('');
                    setUsername('');
                    setConfrim('');
                  } else {
                    setLoad(false);
                    Alert.alert(
                      'Please Check All data like Password Or email typo, or your email already Used',
                    );
                  }
                }}>
                <Text style={style.fontbut}>Sign Up</Text>
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
    // height: hp('8%'),
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
