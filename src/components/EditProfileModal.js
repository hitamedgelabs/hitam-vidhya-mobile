import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SelectInput from '../components/Spinner';
import Calender from './Calender';
import Input from './AuthInput';
import { validateSignupStep } from '../utils/validateSignupStep';
import colors from '../constants/Colors';

const EditProfileModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    // You can call an API here or pass data back via props
    console.log('Submitted:');
    onClose();
  };

  const handleChange = (name, value) => {
    if (name === 'confirm password') {
      setConfirmPassword(value);
      return;
    }
    setForm({ ...form, [name]: value });
  };

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
    }
    if (localError) {
      return; // block step change if any error found
    }
    setErrors({});
    setStep(newStep);
  };
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <Text style={styles.title}>Edit Profile</Text>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          
        </ScrollView>
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
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
            <Text style={styles.btnText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
            <Text style={styles.btnText}>Submit</Text>
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
    alignSelf: 'center'
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '600',
    fontSize: 16,
  },
  info: {
    fontSize: 14,
    color: '#777',
    marginBottom: 30,
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

export default EditProfileModal;
