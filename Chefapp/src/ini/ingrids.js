import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GetDetails, Getin} from '../redux/Action.js/Action';
import Ion from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function ingrids(props) {
  //   console.log('das', data);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);

  async function ingri() {
    await dispatch(Getin(props.route.params.Ids));
    setLoad(false);
  }
  useEffect(() => {
    ingri();
  }, []);

  const state = useSelector(state => state.fetch);
  console.log('igruis', state);

  if (load === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading... Please wait..</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  return (
    <View style={style.container}>
      <View style={style.cos}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ion name="arrow-back-outline" size={25} color={'black'} />
        </TouchableOpacity>
        <Text>Product contents:</Text>
        <Ion name="arrow-back-outline" size={25} color={'white'} />
      </View>
      <View style={style.dss}>
        <Text>{state.datains.data.ingredient}</Text>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cos: {
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  dss: {
    paddingVertical: 20,
    backgroundColor: '#FFFAEF',
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
