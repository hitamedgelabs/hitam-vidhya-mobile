import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../constants/Colors';

const Input = ({ placeholder, ...rest }) => {
  if(placeholder === "Mobile")
    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        {...rest}
        keyboardType='phone-pad'
      />);
  else if(placeholder === "Password" || placeholder === "Confirm Password")
    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        {...rest}
        secureTextEntry
      />);
  else
    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        {...rest}
      />);
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
});

export default Input;
