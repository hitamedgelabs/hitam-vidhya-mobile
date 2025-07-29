import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../constants/Colors';
import Input from './AuthInput';

const Spinner = ({ items, value, onValueChange, placeholder, error }) => {

  const valueKey = (value) => {
    if(value === 'Male' || value === 'Female' || value === 'Others') {
      return false;
    }
    return true;
  }
  return (
    <View style={{ marginBottom: 10, position: 'relative', height: 50 }}>
      {/* Background Input (non-editable) */}
      <View style={StyleSheet.absoluteFill}>
        <Input
          placeholder={placeholder}
          value={valueKey(value)? '' : value}
          editable={false}
          pointerEvents="none"
          error={error}
        />
      </View>

      {/* Foreground Picker */}
      <RNPickerSelect
        onValueChange={onValueChange}
        value={value}
        items={items}
        placeholder={{ label: placeholder, value: null }}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 10,
    marginTop: 2,
    marginLeft: 4,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 16,
    color: 'transparent',
    backgroundColor: 'transparent',
  },
  inputAndroid: {
    height: 50,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 16,
    color: 'transparent',
    backgroundColor: 'transparent',
  },
  placeholder: {
    color: 'transparent',
  },
});

export default Spinner;
