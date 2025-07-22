import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../constants/Colors';

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    color: '#ffff',
    fontWeight: 'bold',
  },
});

export default Button;
