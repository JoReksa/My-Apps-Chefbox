/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  CheckBox,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Drops from '../Dropdown/Dropdwon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ion from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
// import imagedefault from '../dzihni/img';
import imagedefault from '../image/Frame.png';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {CreatsD} from '../redux/Action.js/Action';

const EventDetail = props => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={4000}
      placeholder="e.g. This gluten-free baked oatmeal dotted with blueberries and raspberries is an easy and heathy brunch casserole. Reheat leftovers for a quick breakfast all weeklong."
    />
  );
};

const createDescription = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const [rawImage, setRawImage] = useState();
  const [value, onChangeText] = useState('');
  const [type, setType] = useState(0);
  const [categor, setCategor] = useState(0);
  const [tittle, setTittle] = useState('');
  const [time, setTime] = useState('');
  const [serving, setServing] = useState('');
  const [descrip, setDescrip] = useState('');
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(false);
  }, []);
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
  return (
    <View style={styles.container}>
      <View style={styles.heads}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Resep');
          }}>
          <Ion name="arrow-back-outline" size={25} color={'black'} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',

            width: wp('50%'),
            // backgroundColor: 'red',
          }}>
          <Text style={styles.header}>Description (1/4)</Text>
        </View>
        <Ion name="arrow-back-outline" size={25} color={'#F9C959'} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.form}>
          <TouchableOpacity style={styles.btnImg} onPress={() => pickImage()}>
            <ImageBackground
              source={!image ? imagedefault : {uri: image}}
              style={styles.prof}></ImageBackground>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Nunito-SemiBoldItalic',
            }}>
            Upload Image Max 2 MB
          </Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View>
              <Text style={styles.txtLabel}>Title</Text>
              <TextInput
                placeholder="e.g. Healthy Berry Pancake"
                style={styles.txtInput}
                value={tittle}
                onChangeText={value => setTittle(value)}
              />
              <Text style={styles.txtLabel}>Type</Text>
              <View style={{}}>
                <Drops
                  label="Type"
                  data={data2}
                  value={type}
                  setValue={e => setType(e)}
                />
              </View>
              <Text style={styles.txtLabel}>Category</Text>
              <View style={{}}>
                <Drops
                  label="Category"
                  data={data3}
                  value={categor}
                  setValue={e => setCategor(e)}
                />
              </View>
              <Text style={styles.txtLabel}>Cooking Time</Text>

              <TextInput
                placeholder="e.g. 30 minutes"
                style={styles.txtInput}
                value={time}
                onChangeText={value => setTime(value)}
              />
              <Text
                style={{
                  fontFamily: 'Nunito-SemiBoldItalic',
                }}>
                Fill with number only / 30 (30 minutes)
              </Text>
              <Text style={styles.txtLabel}>Servings</Text>
              <TextInput
                placeholder="e.g. 5"
                style={styles.txtInput}
                value={serving}
                onChangeText={value => setServing(value)}
              />
              <Text
                style={{
                  fontFamily: 'Nunito-SemiBoldItalic',
                }}>
                Fill with number only / 1 (1 servings)
              </Text>
              <Text style={styles.txtLabel}>Description</Text>
              <View style={styles.boxEvent}>
                <EventDetail
                  multiline
                  onChangeText={value => {
                    onChangeText(value);
                    setDescrip(value);
                  }}
                  value={descrip}
                />
              </View>
            </View>
            {load === true ? (
              <TouchableOpacity style={styles.btnSave}>
                <Text style={styles.txtBtnSave}>Loading ...</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btnSave}
                onPress={async () => {
                  setLoad(true);
                  const des1 = await dispatch(
                    CreatsD(
                      categor,
                      type,
                      tittle,
                      time,
                      serving,
                      rawImage,
                      descrip,
                    ),
                  );
                  if (des1 === true) {
                    setLoad(false);
                    ToastAndroid.show(
                      'Add Create Description 1 Success',
                      40000,
                    );
                    navigation.navigate('CreateIngris');
                  }
                  setCategor('');
                  setType('');
                  setTime('');
                  setServing('');
                  setRawImage('');
                  setDescrip('');
                }}>
                <Text style={styles.txtBtnSave}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};
//
//
export default createDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  btnImg: {
    flex: 1,
    width: 311,
    height: 240,
    borderRadius: 10,
    // marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {},
  txtLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
    textAlign: 'left',
    marginBottom: 10,
    paddingVertical: 5,
  },
  txtInput: {
    lineHeight: 14,
    width: wp('90%'),
    height: hp('7'),
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#9F9F9F',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  txtInput1: {
    width: 320,
    height: 44,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#9F9F9F',
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  boxEvent: {
    height: 89,
    width: 320,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: '#9F9F9F',
    marginBottom: 30,
  },
  btnSave: {
    width: wp('90%'),
    height: 44,
    borderRadius: 24,
    backgroundColor: '#F9C959',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    elevation: 5,
  },
  txtBtnSave: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
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
  prof: {
    height: hp('30%'),
    width: wp('70%'),
    resizeMode: 'cover',
  },
});
