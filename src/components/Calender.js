// components/DOBInput.js
import React, { useState } from 'react';
import { View, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from './AuthInput';

const Calender = ({ value, onChange }) => {
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
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

export default Calender;
