import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image
} from 'react-native';
import config from '../config/api';

const FollowPromptModal = ({ onContinue }) => {
  const [timer, setTimer] = useState(15);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanProceed(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.heading}>🎉 You’re In!</Text>
        <Text style={styles.subheading}>Follow us to stay updated:</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity onPress={() => Linking.openURL(config.facebook)}>
            <Image
              source={require('../../assets/icons/facebook.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(config.instagram)}>
            <Image
              source={require('../../assets/icons/instagram.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(config.linkedin)}>
            <Image
              source={require('../../assets/icons/linkedin.png')}
              style={[styles.socialIcon, {height: 30, width: 30, marginTop: 2, marginLeft: 5}]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(config.twitter)}>
            <Image
              source={require('../../assets/icons/twitter.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, !canProceed && styles.disabled]}
          onPress={onContinue}
          disabled={!canProceed}
        >
          <Text style={styles.continueText}>
            {canProceed ? 'Continue' : `Wait ${timer}s...`}
          </Text>
        </TouchableOpacity>
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
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 24,
  },
  icon: {
    marginHorizontal: 10,
    height: 36,
    width: 36,
  },
  continueButton: {
    backgroundColor: '#044c16ff',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  disabled: {
    backgroundColor: '#aaa',
  },
  continueText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default FollowPromptModal;
