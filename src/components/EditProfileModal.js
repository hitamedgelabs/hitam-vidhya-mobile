import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Input from './AuthInput';
import SelectInput from '../components/Spinner';
import Calender from './Calender';
import Button from '../components/AuthButton';
import colors from '../constants/Colors';
import config from '../config/api';
import { validateSignupStep } from '../utils/validateSignupStep';
import { fetchStudentData } from '../utils/fetchStudent';

const API_URL = config.API_URL;

const EditProfileModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
  });

  useEffect(() => {
    const loadStudent = async () => {
      const studentData = await fetchStudentData();
      if (studentData && studentData !== 'TOKEN_EXPIRED') {
        setForm({
          name: studentData.name || '',
          gender: studentData.gender || '',
          email: studentData.email || '',
          mobile: studentData.mobile || '',
          alternateMobile: studentData.alternateMobile || '',
          dob: studentData.dob?.substring(0, 10) || '',
          profilePicture: studentData.profilePicture || '',
          linkedinProfile: studentData.linkedinProfile || '',
          twitterProfile: studentData.twitterProfile || '',
          instagramProfile: studentData.instagramProfile || '',
          addressCurrent: studentData.address?.current || '',
          addressHometown: studentData.address?.hometown || '',
          tenthInstitution: studentData.educationDetails?.tenth?.institutionName || '',
          tenthBoard: studentData.educationDetails?.tenth?.board || '',
          tenthPercentage: studentData.educationDetails?.tenth?.percentage || '',
          twelfthInstitution: studentData.educationDetails?.twelfth?.institutionName || '',
          twelfthBoard: studentData.educationDetails?.twelfth?.board || '',
          twelfthPercentage: studentData.educationDetails?.twelfth?.percentage || '',
          bachelorsInstitution: studentData.educationDetails?.bachelors?.institutionName || '',
          bachelorsCourse: studentData.educationDetails?.bachelors?.courseName || '',
          bachelorsCgpa: studentData.educationDetails?.bachelors?.cgpa || '',
          parentName: studentData.parentDetails?.name || '',
          parentRelation: studentData.parentDetails?.relation || '',
          parentMobile: studentData.parentDetails?.mobile || '',
          parentEmail: studentData.parentDetails?.email || '',
          parentOccupation: studentData.parentDetails?.occupation || '',
          parentAddress: studentData.parentDetails?.address || '',
        });
      }
    };
    loadStudent();
  }, []);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (value && value !== '') {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const bind = (field) => ({
    value: form[field],
    onChangeText: (v) => handleChange(field, v),
    error: errors[field],
    setError: (msg) => setErrors((prev) => ({ ...prev, [field]: msg })),
  });

  const changeStep = (newStep) => {
    const { valid, newErrors } = validateSignupStep(step, form);
    let localError = false; // use local flag instead of useState
    if(step>newStep) {
      setErrors({});
      setStep(newStep);
      return;
    }

    if (!valid) {
      setErrors(newErrors);
      console.log(newErrors);
      if(newErrors.email !== "*Required Field" && newErrors.password !== "*Required Field")
        localError = true;
    }
    if (localError) {
      return; // block step change if any error found
    }
    if (Object.values(errors).some((msg) => msg)) {
      return;
    }
    setErrors({});
    setStep(newStep);
  };

  const handleSubmit = async () => {
    const { valid, newErrors } = validateSignupStep(step, form);
    const filteredErrors = { ...newErrors };
    delete filteredErrors.email;
    delete filteredErrors.password;
    delete filteredErrors.confirmPassword;
    // ⛔ If there are still other errors, block submission
    if (Object.keys(filteredErrors).length > 0) {
      setErrors(filteredErrors);
      return;
    }
    // ⛔ Don't proceed if local errors still exist
    if (Object.values(errors).some((msg) => msg)) {
      return;
    }

    setLoading(true);
    const payload = {
      name: form.name,
      mobile: form.mobile,
      alternateMobile: form.alternateMobile,
      email: form.email || undefined,
      dob: form.dob,
      profilePicture: form.profilePicture,
      gender: form.gender,
      linkedinProfile: form.linkedinProfile,
      twitterProfile: form.twitterProfile,
      instagramProfile: form.instagramProfile,
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
    };

    try {
      const token = await AsyncStorage.getItem('authToken');
      const res = await fetch(`${API_URL}/enrol/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (res.ok) {
        Alert.alert('Success', 'Profile updated successfully');
        onClose();
      } else {
        Alert.alert('Update Failed', result?.message || 'Unknown error');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
    setLoading(false);
  };

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
      <Text style={styles.section}>Education Details</Text>
      <Input placeholder="10th Institution" {...bind('tenthInstitution')} />
      <Input placeholder="10th Board" {...bind('tenthBoard')} />
      <Input placeholder="10th Percentage" {...bind('tenthPercentage')} />
      <Input placeholder="12th Institution" {...bind('twelfthInstitution')} />
      <Input placeholder="12th Board" {...bind('twelfthBoard')} />
      <Input placeholder="12th Percentage" {...bind('twelfthPercentage')} />
      <Input placeholder="Bachelors Institution" {...bind('bachelorsInstitution')} />
      <Input placeholder="Course Name" {...bind('bachelorsCourse')} />
      <Input placeholder="CGPA" {...bind('bachelorsCgpa')} />
    </>
  );

  const renderStep3 = () => (
    <>
      <Text style={styles.section}>Parent Details</Text>
      <Input placeholder="Parent Name" {...bind('parentName')} />
      <Input placeholder="Relation" {...bind('parentRelation')} />
      <Input placeholder="Mobile" {...bind('parentMobile')} />
      <Input placeholder="Email" {...bind('parentEmail')} />
      <Input placeholder="Occupation" {...bind('parentOccupation')} />
      <Input placeholder="Address" {...bind('parentAddress')} />
    </>
  );

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <Text style={styles.title}>Edit Profile</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </ScrollView>

        <View style={styles.stepIndicator}>
          {[1, 2, 3].map((s) => (
            <View key={s} style={[styles.dot, step === s ? styles.activeDot : styles.inactiveDot]} />
          ))}
        </View>

        <View style={styles.buttonRow}>
          {step > 1 && (
            <TouchableOpacity onPress={() => changeStep(step - 1)}>
              <Text style={styles.navButton}>← Previous</Text>
            </TouchableOpacity>
          )}
          {step < 3 && (
            <TouchableOpacity onPress={() => changeStep(step + 1)} style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.navButton}>Next →</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
            <Text style={styles.btnText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={[styles.submitBtn, loading && styles.disabledBtn]} disabled={loading}>
            <Text style={styles.btnText}>{loading ? 'Updating...' : 'Update'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    height: 600,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
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
    marginTop: 10,
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: '#2c6f2c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
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

export default EditProfileModal;
