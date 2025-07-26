import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../constants/Colors';

const Input = ({ placeholder, error, value, onChangeText, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
  const [secure, setSecure] = useState(true);
  const shouldFloat = isFocused || value !== '';

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: shouldFloat ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    left: 15,
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -10],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: colors.placeholder,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 5,
  };
  const isNumeric = ['Mobile', 'Percentage', 'CGPA'].includes(placeholder);

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={[styles.inputWrapper, shouldFloat && styles.focusedBorder]}>
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
        <TextInput
          style={[styles.inputField, { flex: 1 }]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={placeholder.includes('Password') && secure}
          keyboardType={isNumeric ? 'phone-pad' : 'default'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {placeholder.includes('Password') && (
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Image
              source={
                secure
                  ? require('../../assets/icons/eye-close.png')
                  : require('../../assets/icons/eye-open.png')
              }
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  inputField: {
    color: 'black',
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginTop: 4,
  },
  focusedBorder: {
    borderWidth: 1,
    borderColor: '#066a26ff'
  }
});

export default Input;
