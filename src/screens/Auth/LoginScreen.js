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
  ScrollView
} from 'react-native';
import Input from '../../components/AuthInput';
import Button from '../../components/AuthButton';
import colors from '../../constants/Colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  const handleLogin = () => {
    const canProceed = fieldValidation();
    if (!canProceed) return;
    console.log('Login pressed', email, password);
    navigation.navigate("ApplicationMain");
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
});

export default LoginScreen;
