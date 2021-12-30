/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Unorderedlist from 'react-native-unordered-list';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ion from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import Drop from '../Dropdown/Dropdwon';
import {useDispatch, useSelector} from 'react-redux';
import {PRods, MyRe, Inti} from '../redux/Action.js/Action';

const createProduct = () => {
  //   const [isSelected, setSelection] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [location, setLocation] = useState(0);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(false);
  }, []);

  const state = useSelector(state => state.fetch);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data1 = [
    {value: 1, label: 'Jakarta'},
    {value: 2, label: 'Bogor'},
    {value: 3, label: 'Depok'},
    {value: 4, label: 'Tangerang'},
    {value: 5, label: 'Bekasi'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.heads}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateDirect')}>
          <Ion name="arrow-back-outline" size={25} color={'black'} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',

            width: wp('50%'),
            // backgroundColor: 'red',
          }}>
          <Text style={styles.header}>Product (4/4)</Text>
        </View>
        <Ion name="arrow-back-outline" size={25} color={'#F9C959'} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.boxorder}>
          <Text style={styles.txtPro}>Product contents</Text>
          <View style={styles.order}>
            <Unorderedlist
              bulletUnicode={0x2022}
              color="black"
              style={{marginVertical: 1.5}}>
              <Text style={styles.oItem}>1 kg package eg noodles</Text>
            </Unorderedlist>
            <Unorderedlist
              bulletUnicode={0x2022}
              color="black"
              style={{marginVertical: 1.5}}>
              <Text style={styles.oItem}>50 gr butter</Text>
            </Unorderedlist>
            <Unorderedlist
              bulletUnicode={0x2022}
              color="black"
              style={{marginVertical: 1.5}}>
              <Text style={styles.oItem}>50 gr minced parsley</Text>
            </Unorderedlist>
            <Unorderedlist
              bulletUnicode={0x2022}
              color="black"
              style={{marginVertical: 1.5}}>
              <Text style={styles.oItem}>50 gr salt</Text>
            </Unorderedlist>
            <Unorderedlist
              bulletUnicode={0x2022}
              color="black"
              style={{marginVertical: 1.5}}>
              <Text style={styles.oItem}>10 gr black pepper</Text>
            </Unorderedlist>
            <Unorderedlist
              bulletUnicode={0x2022}
              color="black"
              style={{marginVertical: 1.5}}>
              <Text style={styles.oItem}>100 ml olive oil</Text>
            </Unorderedlist>
          </View>
        </View> */}
        <View>
          <SafeAreaView>
            <Text style={styles.txtForm}>Price</Text>
            <TextInput
              placeholder="e.g. 120000"
              style={styles.input}
              value={price}
              onChangeText={value => setPrice(value)}
            />
            <Text
              style={{
                fontFamily: 'Nunito-SemiBoldItalic',
              }}>
              Fill with number only
            </Text>
            <Text style={styles.txtForm}>Stock</Text>
            <TextInput
              placeholder="e.g. 25"
              style={styles.input}
              value={stock}
              onChangeText={value => setStock(value)}
            />
            <Text
              style={{
                fontFamily: 'Nunito-SemiBoldItalic',
              }}>
              Fill with number only
            </Text>
            <Text style={styles.txtForm}>Location</Text>
            <View>
              <Drop
                label="Location"
                data={data1}
                value={location}
                setValue={e => setLocation(e)}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {load === true ? (
                <TouchableOpacity style={styles.btnPublish}>
                  <Text style={styles.txtBtnPub}>Loadings...</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.btnPublish}
                  onPress={async () => {
                    setLoad(true);
                    const ID12 = state.IdCreat;
                    const prods = await dispatch(
                      PRods(ID12, price, stock, location),
                    );
                    console.log('reue', prods);
                    if (prods === true) {
                      setLoad(false);
                      await dispatch(MyRe());
                      await dispatch(Inti());
                      ToastAndroid.show('Success Publish', 40000);
                      navigation.navigate('Resep');
                    }
                    setPrice('');
                    setStock('');
                    setLocation('');
                  }}>
                  <Text style={styles.txtBtnPub}>Publish</Text>
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
};

export default createProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: wp('100%'),
    // height: hp('100%'),
    // justifyContent: ''',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
  },
  draft: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    color: '#000',
  },
  btnPublish: {
    // width: 350,
    width: wp('91%'),
    // marginBottom: 10,
    height: 44,
    borderRadius: 24,
    backgroundColor: '#F9C959',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    elevation: 5,
  },
  txtBtnPub: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
  },
  boxorder: {
    backgroundColor: '#FFFCF5',
    width: wp('91%'),
    height: 220,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 20,
    marginVertical: 15,
  },
  txtInput1: {
    // width: 350,
    width: wp('91%'),

    height: 44,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#9F9F9F',
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  txtPro: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 25,
    color: '#000',
    marginBottom: 10,
  },
  order: {
    paddingHorizontal: 30,
  },
  oItem: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
  },
  txtForm: {
    color: '#000',
    fontFamily: 'Nunito',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    marginVertical: 10,
  },
  input: {
    lineHeight: 14,
    // width: 350,
    width: wp('91%'),

    height: 44,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#9F9F9F',
    marginBottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: '#000',
    fontFamily: 'Nunito',
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
});
