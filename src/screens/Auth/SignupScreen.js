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
  const [step, setStep] = useState(1); // ⬅️ Multi-step tracker
  const [errors, setErrors] = useState({});
  const [otpVerification, setOtpVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (step > 1) {
        setStep(step - 1); // go to previous step
        return true; // prevent default behavior
      }
      return false; // allow default exit behavior
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [step]);


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
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (name, value) => {
    if (name === 'confirm password') {
      setConfirmPassword(value);
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const today = () => {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = today.getFullYear();

    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    console.log(`${day}-${month}-${year} ${hours}:${minutes}`);
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }
  
  const handleSignUp = async () => {
    setLoading(true);
    const studentData = {
      name: form.name,
      gender: form.gender,
      email: form.email,
      mobile: form.mobile,
      alternateMobile: form.alternateMobile || undefined,
      dob: form.dob,
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
      password: form.password,
      courseEnrolled: [],
      joinedAt: today(), // OR omit this field — your backend sets default
    };

    try {
      const res = await axios.post(`${API_URL}/student/register`, studentData);
      if (res.data.success) {
        setOtpVerification(true); // show OTP modal/screen
      } else {
        Alert.alert("Signup Error", res.data.message);
      }
    } catch (err) {
      console.error("Signup error:", err?.response?.data || err.message);
      Alert.alert(
        "Signup Failed",
        err?.response?.data?.message || err.message || "Server error"
      );
    }
    setLoading(false);
  };


  const renderStep1 = () => (
    <>
      <Text style={styles.section}>Basic Details</Text>
      <Input placeholder="Full Name" value={form.name} onChangeText={(v) => handleChange('name', v)} error={errors.name} />

      <SelectInput
        placeholder="Select Gender"
        value={form.gender}
        onValueChange={(v) => handleChange('gender', v)}
        items={[
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
          { label: 'Other', value: 'Other' },
        ]}
        error={errors.gender}
      />
      <Input placeholder="Email" value={form.email} onChangeText={(v) => handleChange('email', v)} error={errors.email} />
      <Input placeholder="Password" value={form.password} onChangeText={(v) => handleChange('password', v)} error={errors.password} />
      <Input placeholder="Confirm Password" value={confirmPassword} onChangeText={(v) => handleChange('confirm password', v)} />

      <Input placeholder="Mobile" value={form.mobile} onChangeText={(v) => handleChange('mobile', v)} error={errors.mobile} />
      <Input placeholder="Alternate Mobile" value={form.alternateMobile} onChangeText={(v) => handleChange('alternateMobile', v)} />
    
      <Calender value={form.dob} onChange={(v) => handleChange('dob', v)} error={errors.dob}/>
      <Input placeholder="Linked Profile" value={form.linkedinProfile} onChangeText={(v) => handleChange('linkedinProfile', v)} />
      <Input placeholder="Twitter Profile" value={form.twitterProfile} onChangeText={(v) => handleChange('twitterProfile', v)} />
      <Input placeholder="Instagram Profile" value={form.instagramProfile} onChangeText={(v) => handleChange('instagramProfile', v)} />
      <Input placeholder="Current Address" value={form.addressCurrent} onChangeText={(v) => handleChange('addressCurrent', v)} error={errors.addressCurrent} />
      <Input placeholder="Hometown" value={form.addressHometown} onChangeText={(v) => handleChange('addressHometown', v)} error={errors.addressHometown} />
    </>
  );


  const renderStep2 = () => (
    <>
      <Text style={styles.section}>10th Details</Text>
      <Input placeholder="Institution" value={form.tenthInstitution} onChangeText={(v) => handleChange('tenthInstitution', v)} error={errors.tenthInstitution} />
      <Input placeholder="Board" value={form.tenthBoard} onChangeText={(v) => handleChange('tenthBoard', v)} error={errors.tenthBoard} />
      <Input placeholder="Percentage" value={form.tenthPercentage} onChangeText={(v) => handleChange('tenthPercentage', v)} error={errors.tenthPercentage} />
      <Text style={styles.section}>12th Details</Text>
      <Input placeholder="Institution" value={form.twelfthInstitution} onChangeText={(v) => handleChange('twelfthInstitution', v)} error={errors.twelfthInstitution} />
      <Input placeholder="Board" value={form.twelfthBoard} onChangeText={(v) => handleChange('twelfthBoard', v)} error={errors.twelfthBoard} />
      <Input placeholder="Percentage" value={form.twelfthPercentage} onChangeText={(v) => handleChange('twelfthPercentage', v)} error={errors.twelfthPercentage} />
      <Text style={styles.section}>Bachelors Details</Text>
      <Input placeholder="Institution" value={form.bachelorsInstitution} onChangeText={(v) => handleChange('bachelorsInstitution', v)} error={errors.bachelorsInstitution} />
      <Input placeholder="Course Name" value={form.bachelorsCourse} onChangeText={(v) => handleChange('bachelorsCourse', v)} error={errors.bachelorsCourse} />
      <Input placeholder="CGPA" value={form.bachelorsCgpa} onChangeText={(v) => handleChange('bachelorsCgpa', v)} error={errors.bachelorsCgpa} />
    </>
  );


  const renderStep3 = () => (
    <>
      <Text style={styles.section}>Parent Details</Text>
      <Input placeholder="Full Name" value={form.parentName} onChangeText={(v) => handleChange('parentName', v)} error={errors.parentName} />
      <Input placeholder="Relation" value={form.parentRelation} onChangeText={(v) => handleChange('parentRelation', v)} error={errors.parentRelation} />
      <Input placeholder="Mobile" value={form.parentMobile} onChangeText={(v) => handleChange('parentMobile', v)} error={errors.parentMobile} />
      <Input placeholder="Email" value={form.parentEmail} onChangeText={(v) => handleChange('parentEmail', v)} error={errors.parentEmail} />
      <Input placeholder="Occupation" value={form.parentOccupation} onChangeText={(v) => handleChange('parentOccupation', v)} error={errors.parentOccupation} />
      <Input placeholder="Address" value={form.parentAddress} onChangeText={(v) => handleChange('parentAddress', v)} error={errors.parentAddress} />
    </>
  );
  
  const changeStep = (newStep) => {
    const { valid, newErrors } = validateSignupStep(step, form);
    let localError = false; // use local flag instead of useState

    if (!valid) {
      setErrors(newErrors);
      localError = true;
    }
    if (step === 1) {
      // Email format check
      if (!form.email.includes('@gmail.com') && form.email !== '') {
        setErrors((prev) => ({ ...prev, email: "Invalid email" }));
        localError = true;
      }
      // Password validation
      const { valid: passwordValid, errors: passwordErrors } = validatePassword(form.password, confirmPassword);
      if (!passwordValid) {
        setErrors((prev) => ({ ...prev, password: passwordErrors }));
        localError = true;
      }
    }
    if (localError) {
      return; // block step change if any error found
    }
    setErrors({});
    setStep(newStep);
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={10}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sign Up</Text>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          <View style={styles.stepIndicator}>
            {[1, 2, 3].map((s) => (
            <View
              key={s}
              style={[
                styles.dot,
                step === s ? styles.activeDot : styles.inactiveDot
              ]}
            />
            ))}
          </View>
          {/* Navigation Buttons */}
          <View style={styles.buttonRow}>
            {step > 1 && (
              <TouchableOpacity onPress={() => changeStep(step - 1)}>
                <Text style={styles.navButton}>← Previous</Text>
              </TouchableOpacity>
            )}
            {step < 3 ? (
              <TouchableOpacity onPress={() => changeStep(step + 1)} style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={styles.navButton}>Next →</Text>
              </TouchableOpacity>
            ) : (null)}
          </View>
          {step === 3 && 
            <Button title="Sign Up" onPress={handleSignUp} />
          }
        </ScrollView>
        <Modal visible={otpVerification} animationType="slide" transparent>
          <OTPVerification
            visible={otpVerification}
            email={form.email}
            onClose={() => setOtpVerification(false)}
            onVerified={(token) => {
              setOtpVerification(false);    // close modal
              navigation.navigate("ApplicationMain"); // proceed
            }}
          />
        </Modal>
        {
          loading && <View style = {styles.loaderContainer}>
            <Loader message='Loading...'/>
          </View>
        }
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
