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
  BackHandler
} from 'react-native';
import Input from '../../components/AuthInput';
import Button from '../../components/AuthButton';
import colors from '../../constants/Colors';
import SelectInput from '../../components/Spinner';
import Calender from '../../components/Calender';

const SignupScreen = ({ navigation }) => {
  const [step, setStep] = useState(1); // ⬅️ Multi-step tracker
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
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    mobile: '',
    alterMobile: '',
    dob: '',
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
    parentFirstName: '',
    parentLastName: '',
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

  const handleSignUp = async () => {
    const studentData = {
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      email: form.email,
      mobile: form.mobile,
      alterMobile: form.alterMobile,
      dob: form.dob,
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
        firstName: form.parentFirstName,
        lastName: form.parentLastName,
        relation: form.parentRelation,
        mobile: form.parentMobile,
        email: form.parentEmail,
        occupation: form.parentOccupation,
        address: form.parentAddress,
      },
      password: form.password,
    };

    // try {
    //   const response = await fetch('http://<YOUR_IP>:5000/api/signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(studentData),
    //   });

    //   const result = await response.json();
    //   if (response.ok) {
    //     alert('Signup successful!');
    //     navigation.navigate('Login');
    //   } else {
    //     alert(result.error || 'Signup failed');
    //   }
    // } catch (error) {
    //   console.error(error);
    //   alert('Network error');
    // }
    navigation.navigate("ApplicationMain");
  };

  const renderStep1 = () => (
    <>
      <Text style={styles.section}>Basic Details</Text>
      <Input placeholder="First Name" value={form.firstName} onChangeText={(v) => handleChange('firstName', v)} />
      <Input placeholder="Last Name" value={form.lastName} onChangeText={(v) => handleChange('lastName', v)} />
      <SelectInput
        placeholder="Select Gender"
        value={form.gender}
        onValueChange={(v) => handleChange('gender', v)}
        items={[
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
          { label: 'Other', value: 'Other' },
        ]}
      />
      <Input placeholder="Email" value={form.email} onChangeText={(v) => handleChange('email', v)} />
      <Input placeholder="Password" value={form.password} onChangeText={(v) => handleChange('password', v)} />
      <Input placeholder="Confirm Password" value={confirmPassword} onChangeText={(v) => handleChange('confirm password', v)} />
      <Input placeholder="Mobile" value={form.mobile} onChangeText={(v) => handleChange('mobile', v)} keyboardType="phone-pad" />
      <Input placeholder="Alternate Mobile" value={form.alterMobile} onChangeText={(v) => handleChange('alterMobile', v)} keyboardType="phone-pad" />
      <Calender value={form.dob} onChange={(v) => handleChange('dob', v)} />
      <Input placeholder="Current Address" value={form.addressCurrent} onChangeText={(v) => handleChange('addressCurrent', v)} />
      <Input placeholder="Hometown" value={form.addressHometown} onChangeText={(v) => handleChange('addressHometown', v)} />
    </>
  );

  const renderStep2 = () => (
    <>
      <Text style={styles.section}>10th Details</Text>
      <Input placeholder="Institution" value={form.tenthInstitution} onChangeText={(v) => handleChange('tenthInstitution', v)} />
      <Input placeholder="Board" value={form.tenthBoard} onChangeText={(v) => handleChange('tenthBoard', v)} />
      <Input placeholder="Percentage" value={form.tenthPercentage} onChangeText={(v) => handleChange('tenthPercentage', v)} />

      <Text style={styles.section}>12th Details</Text>
      <Input placeholder="Institution" value={form.twelfthInstitution} onChangeText={(v) => handleChange('twelfthInstitution', v)} />
      <Input placeholder="Board" value={form.twelfthBoard} onChangeText={(v) => handleChange('twelfthBoard', v)} />
      <Input placeholder="Percentage" value={form.twelfthPercentage} onChangeText={(v) => handleChange('twelfthPercentage', v)} />

      <Text style={styles.section}>Bachelors Details</Text>
      <Input placeholder="Institution" value={form.bachelorsInstitution} onChangeText={(v) => handleChange('bachelorsInstitution', v)} />
      <Input placeholder="Course Name" value={form.bachelorsCourse} onChangeText={(v) => handleChange('bachelorsCourse', v)} />
      <Input placeholder="CGPA" value={form.bachelorsCgpa} onChangeText={(v) => handleChange('bachelorsCgpa', v)} />
    </>
  );

  const renderStep3 = () => (
    <>
      <Text style={styles.section}>Parent Details</Text>
      <Input placeholder="Parent First Name" value={form.parentFirstName} onChangeText={(v) => handleChange('parentFirstName', v)} />
      <Input placeholder="Parent Last Name" value={form.parentLastName} onChangeText={(v) => handleChange('parentLastName', v)} />
      <Input placeholder="Relation" value={form.parentRelation} onChangeText={(v) => handleChange('parentRelation', v)} />
      <Input placeholder="Parent Mobile" value={form.parentMobile} onChangeText={(v) => handleChange('parentMobile', v)} />
      <Input placeholder="Parent Email" value={form.parentEmail} onChangeText={(v) => handleChange('parentEmail', v)} />
      <Input placeholder="Parent Occupation" value={form.parentOccupation} onChangeText={(v) => handleChange('parentOccupation', v)} />
      <Input placeholder="Parent Address" value={form.parentAddress} onChangeText={(v) => handleChange('parentAddress', v)} />
    </>
  );

  const changeStep = (newStep) => {
    setStep(newStep);
  }

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

});

export default SignupScreen;
