import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import colors from '../../constants/Colors';
import axios from 'axios';
import Loader from '../../components/Loader'; // Make sure this file exists

const API_URL = 'https://api.hitamvidhya.com/api';

const CourseDetailScreen = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses/${courseId}`);
      setCourse(response.data || null);
      console.log('Course fetched:', response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEnroll = () => {
    Alert.alert('Enrolled!', 'You have successfully enrolled in the course.');
  };

  if (loading) {
    return <View style={styles.centered}>
      <Loader message="Loading course details..." />
    </View>;
  }

  if (!course) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 18, color: '#444' }}>Course not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      <Image
        source={{ uri: course.template_image || 'https://via.placeholder.com/300x200' }}
        style={styles.image}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.content}>
          <Text style={styles.title}>{course.name}</Text>
          <Text style={styles.subtitle}>
            {course.course_level} | {course.category}
          </Text>

          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>{course.description}</Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoItem}>
              <Text style={styles.bold}>Type:</Text> {course.type}
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.bold}>Duration:</Text> {course.duration}
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.bold}>Days Left:</Text> {course.days_left} days
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.bold}>Ratings:</Text> ⭐ {course.ratings}
            </Text>
          </View>

          <View style={styles.priceBox}>
            <Text style={styles.priceText}>
              ₹{(course.fees || 0).toLocaleString()}
            </Text>
            <Text style={styles.discountText}>Save {course.discount}%</Text>
          </View>

          <TouchableOpacity style={styles.enrollButton} onPress={handleEnroll}>
            <Text style={styles.enrollText}>Enroll Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.greenbackground },
  logoBox: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'flex-start',
    backgroundColor: colors.greenbackground,
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: 'contain',
  },
  image: {
    width: '100%',
    height: 200,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  content: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    color: colors.headerText1,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#444',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    lineHeight: 20,
  },
  infoBox: {
    marginBottom: 20,
  },
  infoItem: {
    fontSize: 14,
    marginBottom: 6,
    color: '#444',
  },
  bold: {
    fontWeight: '600',
  },
  priceBox: {
    padding: 15,
    backgroundColor: '#f1fdf4',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aad6aa',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1b5e20',
  },
  discountText: {
    fontSize: 14,
    color: '#2e7d32',
    marginTop: 4,
  },
  enrollButton: {
    backgroundColor: '#2c6f2c',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    elevation: 2,
  },
  enrollText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    backgroundColor: colors.greenbackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CourseDetailScreen;
