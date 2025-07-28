import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

const API_URL = 'http://10.0.2.2:8000/api';

export const fetchStudentData = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      Alert.alert("Not Logged In", "Please login first.");
      return null;
    }

    const res = await axios.get(`${API_URL}/student`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      return res.data.data; // student object
    } else {
      Alert.alert("Error", res.data.message || "Failed to fetch student.");
      return null;
    }
  } catch (err) {
    console.error("Fetch student error:", err?.response?.data || err.message);
    Alert.alert("Error", err?.response?.data?.message || "Server error");
    return null;
  }
};
