import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  BackHandler,
  Modal
} from 'react-native';
import Input from '../../components/AuthInput';
import Button from '../../components/AuthButton';
import colors from '../../constants/Colors';
import SelectInput from '../../components/Spinner';
import Calender from '../../components/Calender';
import OTPVerification from '../../components/OtpVerification';
import { validateSignupStep } from '../../utils/validateSignupStep';
import { validatePassword } from '../../utils/passwordValidator';
import axios from 'axios';
import Loader from '../../components/Loader';
import { Alert } from 'react-native';
import config from '../../config/api';
 
const API_URL = config.API_URL;

const SignupScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [otpVerification, setOtpVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [form, setForm] = useState({
    name: '',
    gender: '',
    email: '',
    mobile: '',
    alternateMobile: '',
    dob: '',
    profilePicture: '',
    linkedinProfile: '',
    twitterProfile: '',
    instagramProfile: '',
    addressCurrent: '',
    addressHometown: '',
    tenthInstitution: '',
    tenthBoard: '',
    tenthPercentage: '',
    twelfthInstitution: '',
    twelfthBoard: '',
    twelfthPercentage: '',
    bachelorsInstitution: '',
    bachelorsCourse: '',
    bachelorsCgpa: '',
    parentName: '',
    parentRelation: '',
    parentMobile: '',
    parentEmail: '',
    parentOccupation: '',
    parentAddress: '',
    password: '',
  });

  useEffect(() => {
    const backAction = () => {
      if (step > 1) {
        setStep(step - 1);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [step]);

  const handleChange = (name, value) => {
    if (name === 'confirm password') {
      setConfirmPassword(value);
      if (form.password && form.password !== value) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: '' }));
      }
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
    if (value && value !== '') {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const today = () => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const handleSignUp = async () => {
    const { valid, newErrors } = validateSignupStep(step, form);
    if (!valid) {
      setErrors(newErrors);
      return;
    }
    if (Object.values(errors).some((msg) => msg)) {
      return;
    }
    setLoading(true);
    const studentData = {
      ...form,
      alternateMobile: form.alternateMobile || undefined,
      profilePicture: form.profilePicture || "default-profile.png",
      linkedinProfile: form.linkedinProfile?.trim() || undefined,
      twitterProfile: form.twitterProfile?.trim() || undefined,
      instagramProfile: form.instagramProfile?.trim() || undefined,
      address: {
        current: form.addressCurrent,
        hometown: form.addressHometown,
      },
      educationDetails: {
        tenth: {
          institutionName: form.tenthInstitution,
          board: form.tenthBoard,
          percentage: form.tenthPercentage,
        },
        twelfth: {
          institutionName: form.twelfthInstitution,
          board: form.twelfthBoard,
          percentage: form.twelfthPercentage,
        },
        bachelors: {
          institutionName: form.bachelorsInstitution,
          courseName: form.bachelorsCourse,
          cgpa: form.bachelorsCgpa,
        },
      },
      parentDetails: {
        name: form.parentName,
        relation: form.parentRelation,
        mobile: form.parentMobile,
        email: form.parentEmail,
        occupation: form.parentOccupation,
        address: form.parentAddress,
      },
      courseEnrolled: [],
      joinedAt: today(),
    };

    try {
      const res = await axios.post(`${API_URL}/student/register`, studentData);
      if (res.data.success) setOtpVerification(true);
      else Alert.alert("Signup Error", res.data.message);
    } catch (err) {
      console.error("Signup error:", err?.response?.data || err.message);
      Alert.alert("Signup Failed", err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const changeStep = (newStep) => {
    if (newStep < step) {
      setErrors({});
      setStep(newStep);
      return;
    }
    const { valid, newErrors } = validateSignupStep(step, form);
    if (!valid) {
      setErrors(newErrors);
      return;
    }

    if (step === 1) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(form.email)) {
        setErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
        return;
      }

      const { valid: pwValid, errors: pwErrors } = validatePassword(form.password, confirmPassword);
      if (!pwValid) {
        setErrors((prev) => ({ ...prev, ...pwErrors }));
        return;
      }
    }
    if (Object.values(errors).some((msg) => msg)) {
      return;
    }

    setErrors({});
    setStep(newStep);
  };

  const bind = (field) => ({
    value: form[field],
    onChangeText: (v) => handleChange(field, v),
    error: errors[field],
    setError: (msg) => setErrors((prev) => ({ ...prev, [field]: msg })),
  });

  const renderStep1 = () => (
    <>
      <Text style={styles.section}>Basic Details</Text>
      <Input placeholder="Full Name" {...bind('name')} />
      <SelectInput
        placeholder="Select Gender"
        value={form.gender}
        onValueChange={(v) => handleChange('gender', v)}
        items={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Other' }]}
        error={errors.gender}
      />
      <Input placeholder="Email" {...bind('email')} />
      <Input placeholder="Password" {...bind('password')} />
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(v) => handleChange('confirm password', v)}
        error={errors.confirmPassword}
        setError={(msg) => setErrors((prev) => ({ ...prev, confirmPassword: msg }))}
      />
      <Input placeholder="Mobile" {...bind('mobile')} />
      <Input placeholder="Alternate Mobile" {...bind('alternateMobile')} />
      <Calender value={form.dob} onChange={(v) => handleChange('dob', v)} error={errors.dob} />
      <Input placeholder="LinkedIn Profile" {...bind('linkedinProfile')} />
      <Input placeholder="Twitter Profile" {...bind('twitterProfile')} />
      <Input placeholder="Instagram Profile" {...bind('instagramProfile')} />
      <Input placeholder="Current Address" {...bind('addressCurrent')} />
      <Input placeholder="Hometown" {...bind('addressHometown')} />
    </>
  );

  const renderStep2 = () => (
    <>
      <Text style={styles.section}>10th Details</Text>
      <Input placeholder="Institution" {...bind('tenthInstitution')} />
      <Input placeholder="Board" {...bind('tenthBoard')} />
      <Input placeholder="Percentage" {...bind('tenthPercentage')} />
      <Text style={styles.section}>12th Details</Text>
      <Input placeholder="Institution" {...bind('twelfthInstitution')} />
      <Input placeholder="Board" {...bind('twelfthBoard')} />
      <Input placeholder="Percentage" {...bind('twelfthPercentage')} />
      <Text style={styles.section}>Bachelors Details</Text>
      <Input placeholder="Institution" {...bind('bachelorsInstitution')} />
      <Input placeholder="Course Name" {...bind('bachelorsCourse')} />
      <Input placeholder="CGPA" {...bind('bachelorsCgpa')} />
    </>
  );

  const renderStep3 = () => (
    <>
      <Text style={styles.section}>Parent Details</Text>
      <Input placeholder="Full Name" {...bind('parentName')} />
      <Input placeholder="Relation" {...bind('parentRelation')} />
      <Input placeholder="Mobile" {...bind('parentMobile')} />
      <Input placeholder="Email" {...bind('parentEmail')} />
      <Input placeholder="Occupation" {...bind('parentOccupation')} />
      <Input placeholder="Address" {...bind('parentAddress')} />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Image source={require('../../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Sign Up</Text>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          <View style={styles.stepIndicator}>
            {[1, 2, 3].map((s) => (
              <View key={s} style={[styles.dot, step === s ? styles.activeDot : styles.inactiveDot]} />
            ))}
          </View>

          <View style={styles.buttonRow}>
            {step > 1 && <TouchableOpacity onPress={() => changeStep(step - 1)}><Text style={styles.navButton}>← Previous</Text></TouchableOpacity>}
            {step < 3 && <TouchableOpacity onPress={() => changeStep(step + 1)} style={{ flex: 1, alignItems: 'flex-end' }}><Text style={styles.navButton}>Next →</Text></TouchableOpacity>}
          </View>

          {step === 3 && <Button title="Sign Up" onPress={handleSignUp} disabled={loading} />}
        </ScrollView>

        <Modal visible={otpVerification} animationType="slide" transparent>
          <OTPVerification
            visible={otpVerification}
            email={form.email}
            onClose={() => setOtpVerification(false)}
            onVerified={() => {
              setOtpVerification(false);
              navigation.navigate("ApplicationMain");
            }}
          />
        </Modal>

        {loading && <View style={styles.loaderContainer}><Loader message="Loading..." /></View>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 100,
    alignSelf: 'center',
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '600',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  navButton: {
    color: colors.darkGreen,
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: colors.darkGreen,
  },
  inactiveDot: {
    borderWidth: 2,
    borderColor: colors.darkGreen,
    backgroundColor: 'transparent',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }

});

export default SignupScreen;
