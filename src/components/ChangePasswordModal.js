import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from './AuthInput'; // Your custom input component
import Loader from './Loader';
import { validatePassword } from '../utils/passwordValidator';
import config from '../config/api';
import colors from '../constants/Colors';
import ForgotPasswordModal from './ForgotPasswordModal';
 
const API_URL = config.API_URL;

const ChangePasswordModal = ({ onClose, email }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotVisible, setForgotVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const { valid: passwordValid, errors: passwordErrors } = validatePassword(newPassword, confirmPassword);
    console.log("password:", oldPassword,newPassword,confirmPassword);
    if (!passwordValid) {
      // setErrors((prev) => ({ ...prev, password: passwordErrors }));
      setTimeout(() => {
        Alert.alert("Password Error", passwordErrors);
      }, 0);
      return;
    }
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('authToken');
      const res = await axios.post(`${API_URL}/student/change-password`, {
        currentPassword: oldPassword,
        newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
        Alert.alert('Success', res.data.message || 'Password changed successfully');
        onClose();
      } else {
        Alert.alert('Error', res.data.message || 'Password change failed');
      }
    } catch (err) {
      console.error("Change password error:", err?.response?.data || err.message);
      Alert.alert('Error', err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  if(forgotVisible) {
    return <ForgotPasswordModal
          visible={forgotVisible}
          onClose={() => {setForgotVisible(false); onClose();}}
          emailId = {email}
          onSuccess={() => {
            Alert.alert('Success', 'Password changed successfully');
          }}
        />
  }

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <Text style={styles.title}>Change Password</Text>

        <Input
          placeholder="Old Password"
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <Input
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setForgotVisible(true)} style = {{alignSelf: 'flex-start'}}>
          <Text style={{ color: colors.darkGreen }}>Forgot Old Password?</Text>
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn} disabled={loading}>
            <Text style={styles.btnText}>{loading ? 'Submitting...' : 'Submit'}</Text>
          </TouchableOpacity>
        </View>

        {loading && <Loader />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '100%',
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: '#2c6f2c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ChangePasswordModal;
