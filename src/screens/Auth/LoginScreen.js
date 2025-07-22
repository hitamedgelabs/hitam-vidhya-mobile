import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Input from '../../components/AuthInput';
import Button from '../../components/AuthButton';
import colors from '../../constants/Colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login pressed', email, password);
    // TODO: Implement authentication
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Company Logo */}
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
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
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
