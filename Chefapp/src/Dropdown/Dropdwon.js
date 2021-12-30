import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DropdownMerch = props => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderlabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: '#3E3E3E'}]}>
          {props.label == 'Location'
            ? 'Location'
            : props.label == 'Type'
            ? 'Type'
            : 'Category'}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderlabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: '#E5E5E5;'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={props.data}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          console.log(item.value);
          setValue(item.value);
          setIsFocus(false);
          props.label == 'Date' && props.select(item.value);
          props.setValue(item.value);
        }}
      />
    </View>
  );
};

export default DropdownMerch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 0,
    paddingVertical: 10,
  },
  dropdown: {
    width: wp('89%'),
    height: hp('7%'),
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    left: 30,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
