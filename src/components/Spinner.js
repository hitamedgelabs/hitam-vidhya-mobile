import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View } from 'react-native';
import colors from '../constants/Colors';

const Spinner = ({ items, value, onValueChange, placeholder }) => {
  return (
    <View style={styles.wrapper}>
      <RNPickerSelect
        onValueChange={onValueChange}
        value={value}
        items={items}
        placeholder={{ label: placeholder, value: null }}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    fontSize: 16,
    paddingVertical: 12,
    color: colors.text,
  },
  inputAndroid: {
    height: 50,
    fontSize: 16,
    color: colors.text,
  },
  placeholder: {
    color: colors.placeholder, // <-- Change this to your desired placeholder color
  },
});

export default Spinner;
