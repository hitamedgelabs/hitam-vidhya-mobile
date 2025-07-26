import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Button from '../components/AuthButton';
import axios from 'axios';
import Loader from './Loader';  
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:8000/api';

const OTPVerification = ({ visible, email, onClose }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      return Alert.alert('Error', 'Please enter a valid 6-digit OTP');
    }
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/verify-otp`, { email, otp });

      if (res.data.success) {
        const token = res.data.data.token;
        // ✅ Save token securely
        await AsyncStorage.setItem('authToken', token);
        Alert.alert('Success', 'Email verified successfully');
      } else {
        Alert.alert('Error', res.data.message || 'Verification failed');
      }
    } catch (err) {
      console.error('OTP verify error:', err?.response?.data || err.message);
      Alert.alert('Error', err?.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setCanResend(false);
      setResendTimer(60);
      const res = await axios.post(`${API_URL}/auth/resend-otp`, { email });
      if (!res.data.success) {
        Alert.alert('Error', res.data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      console.error('Resend error:', err?.response?.data || err.message);
      Alert.alert('Error', err?.response?.data?.message || 'Resend failed');
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>Enter the 6-digit OTP sent to:</Text>
        <Text style={styles.emailText}>{email}</Text>
        
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={6}
          placeholder="123456"
          placeholderTextColor="#aaa"
          value={otp}
          onChangeText={setOtp}
        />
        <TouchableOpacity
          onPress={handleResend}
          disabled={!canResend}
          style={styles.resendContainer}
        >
          <Text style={[styles.resendText, { color: canResend ? '#044c16ff' : '#aaa' }]}>
            {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
          </Text>
        </TouchableOpacity>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Button
            title={loading ? 'Verifying...' : 'Verify OTP'}
            onPress={handleVerify}
            disabled={loading}
          />
        </View>
        {loading && <Loader />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
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
    marginBottom: 6,
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginVertical: 8,
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
    color: '#000',
  },
  resendContainer: {
    alignSelf: 'flex-start',
  },
  resendText: {
    fontSize: 10,
    fontWeight: '500',
  },
  cancelButton: {
    marginTop: 16,
  },
  cancelText: {
    color: '#d00',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OTPVerification;
