import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../constants/Colors';

const Spinner = ({ items, value, onValueChange, placeholder, error }) => {
  return (
    <View style={{ marginBottom: 10 }}>
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
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: colors.text,
    paddingVertical: 12,
  },
  inputAndroid: {
    fontSize: 16,
    color: colors.text,
    paddingVertical: 12,
  },
  placeholder: {
    color: colors.placeholder,
  },
});

export default Spinner;
