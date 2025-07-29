import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal
} from 'react-native';
import Input from '../../components/AuthInput';
import Button from '../../components/AuthButton';
import OTPVerification from '../../components/OtpVerification';
import Loader from '../../components/Loader';
import ForgotPasswordModal from '../../components/ForgotPasswordModal';
import colors from '../../constants/Colors';
import { Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/api';
 
const API_URL = config.API_URL;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifiedToken, setVerifiedToken] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpVerification, setOtpVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotVisible, setForgotVisible] = useState(false);

  const fieldValidation = () => {
    let localError = false;
    if(email === '') {
      setEmailError('*Required Field');
      localError = true;
    }
    if(password === '') {
      setPasswordError('*Required Field');
      localError = true;
    }
    if(!email.includes('@gmail.com') && email !== '' ) {
      setEmailError('Please enter a valid email');
      localError = true;
    }
    return !localError;
  }

  const handleLogin = async () => {
    setLoading(true);
    const canProceed = fieldValidation();
    if (!canProceed) {
      setLoading(false);
      return;
    }
    console.log('Login pressed', email, password);
    try {
      const res = await axios.post(`${API_URL}/student/login`, { email, password });

      if (res?.data?.success) {
        const token = res.data.data.token; // ✅ Fix: correct token path
        const studentName = res.data.data.students.name;

        await AsyncStorage.setItem('authToken', token);
        Alert.alert('Login Successful', `Welcome ${studentName}`);
        navigation.navigate("ApplicationMain");
        return;
      }
      // Handles any failed login (other than exception)
      Alert.alert('Login Failed', res?.data?.message || 'Invalid credentials');
    } catch (err) {
      console.error('Login error:', err?.response?.data || err.message);
      const errorCode = err?.response?.data?.code;
      if (errorCode === "EMAIL_NOT_VERIFIED") {
        try {
          const otpRes = await axios.post(`${API_URL}/student/resend-otp`, { email });
          if (otpRes?.data?.success) {
            Alert.alert('Email Verification Required', 'Please verify your email before logging in.');
          } else {
            Alert.alert('Error', otpRes?.data?.message || 'Failed to send OTP');
          }
          setOtpVerification(true);
        } catch (otpErr) {
          console.error('OTP resend error:', otpErr?.response?.data || otpErr.message);
          Alert.alert('Error', otpErr?.response?.data?.message || 'Failed to resend OTP');
        }
        return;
      }
      Alert.alert('Error', err?.response?.data?.message || 'Server error during login');
    } finally {
      setLoading(false); // ✅ ensures spinner is always reset
    }
  };


  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={40} // adjust based on header height if any
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Login</Text>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            error={emailError}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            error={passwordError}
          />
          <TouchableOpacity onPress={() => setForgotVisible(true)}>
            <Text style={{ color: colors.darkGreen }}>Forgot Password?</Text>
          </TouchableOpacity>
          <Button title="Login" onPress={handleLogin} />
          <View style={styles.newUserText}>
            <Text style={{ color: colors.text, textAlign: 'center' }}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{ color: colors.darkGreen }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal visible={otpVerification} animationType="slide" transparent>
          <OTPVerification
            visible={otpVerification}
            email={email}
            onClose={() => {setOtpVerification(false); setLoading(false);}}
            onVerified={(token) => {
              setVerifiedToken(token);      // store token if needed
              setOtpVerification(false);   // close modal
              navigation.navigate("ApplicationMain"); // proceed
            }}
          />
        </Modal>
        <ForgotPasswordModal
  visible={forgotVisible}
  onClose={() => setForgotVisible(false)}
  onSuccess={() => {
    Alert.alert('Password changed', 'You can now login with your new password');
  }}
/>

        {loading && <View style={styles.loaderContainer}>
          <Loader message="Logging in..." />
        </View>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  logo: {
    width: 150,
    height: 100,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  newUserText: {
    marginTop: 20,
    padding: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderRadius: 5,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(167, 161, 161, 0.69)', // semi-transparent background
  },
});

export default LoginScreen;
