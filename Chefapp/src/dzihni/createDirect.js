/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ion from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Dircs} from '../redux/Action.js/Action';
const EventDetail = props => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={4000}
      placeholder="e.g. Add all ingredients and blend well."
    />
  );
};

const createDirect = () => {
  const [value, onChangeText] = React.useState('');
  const [Load, setLoad] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    setLoad(false);
  }, []);
  const state = useSelector(state => state.fetch);

  return (
    <View style={styles.container}>
      <View style={styles.heads}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateIngris')}>
          <Ion name="arrow-back-outline" size={25} color={'black'} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',

            width: wp('50%'),
            // backgroundColor: 'red',
          }}>
          <Text style={styles.header}>Directions (3/4)</Text>
        </View>
        <Ion name="arrow-back-outline" size={25} color={'#F9C959'} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>
              <Text style={styles.txt1}>Direction 1</Text>
              <View style={styles.boxEvent}>
                <EventDetail
                  multiline
                  // numberOfLines={4}
                  onChangeText={value => onChangeText(value)}
                  value={value}
                />
              </View>
              {Load === true ? (
                <TouchableOpacity style={styles.btnAdd}>
                  <Text style={styles.txtAdd}>Load...</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={async () => {
                    setLoad(true);
                    const ID = state.IdCreat;
                    const dirs = await dispatch(Dircs(ID, value));
                    if (dirs === true) {
                      setLoad(false);
                      ToastAndroid.show('Success', 4000);
                      onChangeText('');
                    }
                  }}>
                  <Text style={styles.txtAdd}>Add New</Text>
                </TouchableOpacity>
              )}

              <View style={{flex: 1, paddingVertical: 40}}>
                <TouchableOpacity
                  style={styles.btnNext}
                  onPress={() => {
                    navigation.navigate('CreateProd1');
                  }}>
                  <Text style={styles.txtBtnNext}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default createDirect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  txt1: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    color: '#000',
    marginVertical: 20,
  },
  txtBtnNext: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
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
    marginHorizontal: 10,
  },
  txtAdd: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 25,
  },
  boxEvent: {
    height: 189,
    width: 350,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: '#9F9F9F',
    marginBottom: 30,
  },
  btnNext: {
    width: 343,
    height: 44,
    borderRadius: 24,
    backgroundColor: '#F9C959',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 5,
    elevation: 5,
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
