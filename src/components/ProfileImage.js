import React from 'react';
import {StyleSheet, Image } from 'react-native';
import colors from '../constants/Colors';

const ProfileImage = () => {
  return (
    <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        style={styles.profileImage}
    />
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: colors.darkGreen,
    marginBottom: 10,
  },
});

export default ProfileImage;
