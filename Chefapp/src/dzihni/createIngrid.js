/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ion from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {CreateIng} from '../redux/Action.js/Action';
const createIngrid = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [label, setLabel] = useState('');
  const [loads, setLoads] = useState(true);
  useEffect(() => {
    setLoads(false);
  }, []);

  const state = useSelector(state => state.fetch);
  console.log('ingrid', state);
  return (
    <View style={styles.container}>
      <View style={styles.heads}>
        <TouchableOpacity onPress={() => navigation.navigate('CreatDescrip')}>
          <Ion name="arrow-back-outline" size={25} color={'black'} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',

            width: wp('50%'),
            // backgroundColor: 'red',
          }}>
          <Text style={styles.header}>Ingredients (2/4)</Text>
        </View>
        <Ion name="arrow-back-outline" size={25} color={'#F9C959'} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={styles.allBox}>
            <View>
              <Text style={styles.txt1}>Ingredient 1</Text>
              <Text
                style={{
                  fontFamily: 'Nunito-SemiBoldItalic',
                }}>
                Fill with number only / 1 (1 amount )
              </Text>
              <View style={styles.box1}>
                <View>
                  <Text style={styles.txtLbl}>Amount</Text>

                  <TextInput
                    style={styles.amount}
                    placeholder="e.g. 1"
                    value={amount}
                    onChangeText={value => setAmount(value)}
                  />
                </View>
                <View>
                  <Text style={styles.txtLbl}>Unit</Text>

                  <TextInput
                    style={styles.txtInput1}
                    placeholder="E.g Unit (MG,KG,FLOUR ETC)"
                    value={unit}
                    onChangeText={value => setUnit(value)}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.txtLbl}>Label</Text>
                <TextInput
                  placeholder="Flour"
                  style={styles.txtInput}
                  value={label}
                  onChangeText={value => setLabel(value)}
                />
              </View>
              {loads === true ? (
                <TouchableOpacity style={styles.btnAdd}>
                  <Text style={styles.txtAdd}>Load...</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={async () => {
                    setLoads(true);
                    const ID = state.IdCreat;
                    const addsnew = await dispatch(
                      CreateIng(ID, amount, unit, label),
                    );
                    if (addsnew === true) {
                      setLoads(false);
                      ToastAndroid.show('Add ingridients Success', 4000);
                      setAmount('');
                      setUnit('');
                      setLabel('');
                    }
                  }}>
                  <Text style={styles.txtAdd}>Add New</Text>
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingVertical: 20,
              }}>
              <TouchableOpacity
                style={styles.btnNext}
                onPress={() => navigation.navigate('CreateDirect')}>
                <Text style={styles.txtBtnNext}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default createIngrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 20,
  },
  allBox: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  box1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  btnNext: {
    width: 343,
    height: 44,
    borderRadius: 24,
    backgroundColor: '#F9C959',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    elevation: 5,
  },
  btnAdd: {
    width: 130,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignSelf: 'flex-end',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtAdd: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 25,
  },
  txtLbl: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    marginBottom: 10,
  },
  txt1: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    color: '#000',
  },
  txtBtnNext: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
  },
  txtInput: {
    lineHeight: 14,
    width: 320,
    height: 44,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#9F9F9F',
    marginBottom: 30,
    flexDirection: 'row',
  },
  txtInput1: {
    lineHeight: 14,
    width: 213,
    height: 44,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#9F9F9F',
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    lineHeight: 14,
    width: 83,
    height: 44,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#9F9F9F',
    marginBottom: 30,
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
