import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../constants/Colors';

const Input = ({ placeholder, error, setError = () => {}, value, onChangeText, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secure, setSecure] = useState(true);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const shouldFloat = isFocused || value !== '';

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: shouldFloat ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const getKeyboardType = () => {
    if (placeholder === 'Mobile') return 'phone-pad';
    if (placeholder === 'Percentage' || placeholder === 'CGPA') return 'decimal-pad';
    if (placeholder.toLowerCase().includes('email')) return 'email-address';
    return 'default';
  };

  const getMaxLength = () => {
    if (placeholder === 'Mobile') return 10;
    if (placeholder === 'Alternate Mobile') return 10;
    if (placeholder === 'Percentage') return 5;
    if (placeholder === 'CGPA') return 4;
    return undefined;
  };

  const validate = (text) => {
    if (placeholder.includes('Mobile') && text !== '') {
      if (!/^\d{10}$/.test(text)) {
        setError('Mobile number must be 10 digits');
        return;
      }
    }

    if (placeholder === 'CGPA') {
      const num = parseFloat(text);
      if (isNaN(num) || num < 0 || num > 10) {
        setError('Enter a valid CGPA (0 - 10)');
        return;
      }
    }

    if (placeholder === 'Percentage') {
      const num = parseFloat(text);
      if (isNaN(num) || num < 0 || num > 100) {
        setError('Enter a valid Percentage (0 - 100)');
        return;
      }
    }

    if (placeholder.toLowerCase().includes('email')) {
      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(text)) {
        setError('Enter a valid Gmail address');
        return;
      }
    }

    setError(''); // No errors
  };

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

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={[styles.inputWrapper, shouldFloat && styles.focusedBorder]}>
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
        <TextInput
          style={[styles.inputField, { flex: 1 }]}
          value={value}
          onChangeText={(text) => {
            onChangeText(text);
            validate(text);
          }}
          secureTextEntry={placeholder.includes('Password') && secure}
          keyboardType={getKeyboardType()}
          autoCapitalize={placeholder.toLowerCase().includes('email') ? 'none' : 'sentences'}
          textContentType={
            placeholder.toLowerCase().includes('email')
              ? 'emailAddress'
              : placeholder === 'Mobile'
              ? 'telephoneNumber'
              : 'none'
          }
          maxLength={getMaxLength()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            validate(value);
          }}
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
    width: '100%',
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
    borderColor: '#066a26ff',
  },
});

export default Input;
