import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Button from '../components/AuthButton';
import axios from 'axios';

const API_URL = 'https://api.hitamvidhya.com/api';

const OTPVerification = ({ visible, email, onClose, onVerified }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) return Alert.alert('Error', 'Please enter the OTP');
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/verify-otp`, {
        email,
        otp,
      });

      if (res.data.success) {
        Alert.alert('Success', 'Email verified successfully');
        onVerified(res.data.data.token); // Pass token or data back
      } else {
        Alert.alert('Error', res.data.message);
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>OTP sent to {email}</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChangeText={setOtp}
          />
          <Button title={loading ? 'Verifying...' : 'Verify OTP'} onPress={handleVerify} disabled={loading} />
          <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18
  },
  cancel: {
    color: 'red',
    fontSize: 16
  }
});

export default OTPVerification;
