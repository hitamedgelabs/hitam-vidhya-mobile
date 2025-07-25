import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import colors from '../constants/Colors';

const Input = ({ placeholder, error, ...rest }) => {
  const [secure, setSecure] = useState(true);

  const renderTextInput = () => (
    <TextInput
      style={[styles.inputField, { flex: 1 }]}
      placeholder={placeholder}
      placeholderTextColor={colors.placeholder}
      {...rest}
      secureTextEntry={placeholder.includes("Password") && secure}
      keyboardType={placeholder === "Mobile" ? 'phone-pad' : 'default'}
    />
  );

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={styles.inputContainer}>
        {placeholder.includes("Password") ? (
          <>
            {renderTextInput()}
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
          </>
        ) : (
          renderTextInput()
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputField: {
    color: 'black',
  },
  icon: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
  },
});

export default Input;
