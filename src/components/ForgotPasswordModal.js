import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import Loader from './Loader';
import Input from './AuthInput';
import Button from './AuthButton';
import { validatePassword } from '../utils/passwordValidator';
import config from '../config/api';

const API_URL = config.API_URL;

const ForgotPasswordModal = ({ visible, onClose, emailId = '', onSuccess }) => {
  const [step, setStep] = useState(1); // 1: email, 2: otp + new password
  const [email, setEmail] = useState(emailId);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [isFirst, setIsFirst] = useState(false);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSendOtp = async () => {
    if (!email) return Alert.alert('Error', 'Email is required');

    try {
      if (emailId === '') setLoading(true);
      const res = await axios.post(`${API_URL}/student/forgot-password`, { email });
      if (res.data.success) {
        Alert.alert('OTP Sent', 'Check your email for the OTP.');
        setStep(2);
      } else {
        Alert.alert('Error', res.data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Send OTP error:', err?.response?.data || err.message);
      Alert.alert('Error', err?.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      return Alert.alert('Error', 'OTP and new password are required');
    }

    const { valid: passwordValid, errors: passwordErrors } = validatePassword(
      newPassword,
      confirmPassword
    );

    if (!passwordValid) {
      Alert.alert('Password Error', passwordErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/student/reset-password`, {
        email,
        otp,
        newPassword,
      });

      if (res.data.success) {
        Alert.alert('Success', 'Password has been updated');
        setStep(1);
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        onSuccess?.();
        onClose();
      } else {
        Alert.alert('Error', res.data.message || 'Reset failed');
      }
    } catch (err) {
      console.error('Reset error:', err?.response?.data || err.message);
      Alert.alert('Error', err?.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  // Auto OTP for emailId prop
  useEffect(() => {
    const runOtpFlow = async () => {
      if (emailId && !isFirst) {
        setEmail(emailId);
        setStep(2);
        await wait(1000);
        handleSendOtp();
        setIsFirst(true);
      }
    };
    runOtpFlow();
  }, [emailId]);

  // Reset all state on modal close
  useEffect(() => {
    if (!visible) {
      setStep(1);
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setIsFirst(false);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Forgot Password</Text>

          {step === 1 ? (
            <>
              <Input
                placeholder="Enter your registered email"
                value={email}
                onChangeText={setEmail}
              />
              <Button
                title={loading ? 'Sending OTP...' : 'Send OTP'}
                onPress={handleSendOtp}
              />
            </>
          ) : (
            <>
              <Text style={styles.infoText}>OTP has been sent to {email}</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={6}
                placeholder="123456"
                placeholderTextColor="#aaa"
                value={otp}
                onChangeText={setOtp}
              />
              <Input
                placeholder="Enter New Password"
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <Input
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Button
                title={loading ? 'Resetting...' : 'Reset Password'}
                onPress={handleResetPassword}
              />
            </>
          )}

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          {loading && <Loader />}
        </View>
      </View>
    </Modal>
  );
};

export default ForgotPasswordModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#222',
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingTop: 12,
    paddingHorizontal: 20,
    fontSize: 20,
    letterSpacing: 4,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    color: '#000',
  },
  cancelBtn: {
    marginTop: 20,
  },
  cancelText: {
    color: '#d00',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    alignSelf: 'flex-start',
  },
  resendText: {
    fontSize: 10,
    fontWeight: '500',
  },
});
