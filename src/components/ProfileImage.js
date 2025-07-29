import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/Colors';
import Loader from './Loader';
import config from '../config/api';
 
const API_URL = config.API_URL;

const ProfileImage = ({ student, onUpdate }) => {
  const [uploading, setUploading] = useState(false);

  const getInitial = () => {
    if (student?.name) return student.name.charAt(0).toUpperCase();
    return '?';
  };

  const handleChange = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.didCancel) return;

      const image = result.assets?.[0];
      if (!image) return;

      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        name: image.fileName || `defualt_profile.png`,
        type: image.type || 'image/jpeg',
      });

      setUploading(true);
      const token = await AsyncStorage.getItem('authToken');

      const res = await fetch(`${API_URL}/enrol/upload-profile-picture`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await res.json();
      setUploading(false);

      if (res.ok) {
        Alert.alert('Success', 'Profile picture updated');
        if (onUpdate) onUpdate();
      } else {
        Alert.alert('Error', data?.error || 'Upload failed');
      }
    } catch (err) {
      setUploading(false);
      console.error('Upload error:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <TouchableOpacity onPress={handleChange}>
      {
        uploading ? (
          <View style={styles.profileImage}>
            <Loader message='Uploading...'/>
          </View>
        ) : student && student.profilePicture && student.profilePicture !== 'default-profile.png' ? (
        <Image
          source={{ uri: student.profilePicture }}
          style={styles.profileImage}
        />
      ) : (
        <View style={[styles.profileImage, styles.initialsCircle]}>
          <Text style={styles.initialsText}>{getInitial()}</Text>
        </View>
      )}
    </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  initialsCircle: {
    backgroundColor: colors.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default ProfileImage;
