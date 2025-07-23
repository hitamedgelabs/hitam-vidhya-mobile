import React, {useState} from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import colors from '../constants/Colors';

const Input = ({ placeholder, ...rest }) => {
  const [secure, setSecure] = useState(true);

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
      <View style={[styles.input, {paddingLeft: 12}]}>
        <TextInput
          style={{ flex: 1, color: 'black' }}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          {...rest}
          secureTextEntry={secure}
        />
        <TouchableOpacity style={styles.icon} onPress={() => setSecure(!secure)}>
          <Image
            source={secure ? require('../../assets/icons/eye-close.png') : require('../../assets/icons/eye-open.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  icon: {
    width: 24,
    height: 24,
  }
});

export default Input;
