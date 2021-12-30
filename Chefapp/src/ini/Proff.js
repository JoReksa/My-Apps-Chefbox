import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {profile} from '../redux/Action/Action';

let Profile = props => {
  const dispatch = useDispatch('');
  const state = useSelector(state => state.auth);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    async function getdata() {
      await dispatch(profile());
      setLoad(false);
    }
    getdata();
  }, []);
  if (load === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading... Please wait..</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  console.log('state Profile', state);
  return (
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.cimg}>
          <FontAwesome name="user-circle" style={style.img} />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
                color: '#373737',
                marginRight: 5,
              }}>
              {state.token.data.first_name}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
                color: '#373737',
              }}>
              {state.token.data.last_name}
            </Text>
          </View>
          <Text style={{alignSelf: 'center', color: '#373737'}}>
            {state.token.data.email}
          </Text>
        </View>
        <View style={style.mid}>
          <View style={style.conb}>
            <TouchableOpacity
              style={style.button}
              onPress={() => props.navigation.navigate('Editprofile')}>
              <Feather name="user" size={25} color={'#214457'} />
              <Text style={style.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={style.button}
              onPress={() => props.navigation.navigate('EditPassword')}>
              <Feather name="user" size={25} color={'#214457'} />
              <Text style={style.buttonText}>Edit Password</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={style.button}
              onPress={() => props.navigation.navigate('SaveEvent')}>
              <Material name="ticket-account" size={25} color={'#214457'} />
              <Text style={style.buttonText}>Saved Events</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={style.button}
              onPress={() => {
                dispatch(Logout());
                props.navigation.navigate('Splash');
              }}>
              <Feather name="log-out" size={25} color={'#214457'} />
              <Text style={style.buttonText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{alignSelf: 'center', marginVertical: 15}}>
          Version v1.1.2
        </Text>
      </ScrollView>
    </View>
  );
};

export default Profile;

const style = StyleSheet.create({
  container: {
    height: hp('80%'),
    width: wp('100%'),
    flex: 1,
    padding: 20,
  },

  cimg: {
    height: hp('29%'),
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: 5,
    width: wp('90%'),
    marginBottom: 10,
    paddingVertical: 15,
  },

  img: {
    fontSize: 100,
    alignSelf: 'center',
    color: `#214457`,
    marginBottom: 5,
  },

  mid: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  conb: {
    width: wp('90%'),
  },

  button: {
    width: wp('90%'),
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 16,
    color: '#214457',
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
