// components/DOBInput.js
import React, { useState } from 'react';
import { View, Platform, Pressable, Text, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from './AuthInput';

const Calender = ({ value, onChange, error }) => {
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      const today = new Date();
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(today.getFullYear() - 10);

      if (selectedDate > fiveYearsAgo) {
        Alert.alert("Invalid DOB", "You must be at least 10 years old.");
        return;
      }

      const formatted = selectedDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      onChange(formatted);
    }
  };

  return (
    <View>
      <Pressable onPress={() => setShow(true)}>
        <Input
          placeholder="Date of Birth"
          value={value}
          editable={false}
          pointerEvents="none"
          error={error}
        />
      </Pressable>
      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()} // prevent future dates
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 10,
  },
});

export default Calender;
