import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import colors from '../../constants/Colors';

const EnrolledCourseDetail = ({ enrolledCourse }) => {

  if (!enrolledCourse || !enrolledCourse.course) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundText}>Enrolled course not found.</Text>
      </View>
    );
  }

  const course = enrolledCourse.course;
  const joinedDate = new Date(course.createdAt).toLocaleDateString();

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      

      {/* Course Banner */}
      <Image
        source={{ uri: course.template_image || 'https://via.placeholder.com/300x200' }}
        style={styles.image}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title */}

        <Text style={styles.title}>{course.name}</Text>
        <Text style={styles.subtitle}>
          {course.course_level} • {course.category}
        </Text>

        {/* Description */}
        <Text style={styles.sectionLabel}>Course Description</Text>
        <Text style={styles.description}>{course.description}</Text>

        {/* Details */}
        <View style={styles.infoBox}>
          <Text style={styles.infoItem}>
            <Text style={styles.bold}>Type:</Text> {course.type}
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.bold}>Duration:</Text> {course.duration}
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.bold}>Days Left:</Text> {course.days_left}
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.bold}>Ratings:</Text> ⭐ {course.ratings}
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.bold}>Joined On:</Text> {joinedDate}
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.bold}>Payment ID:</Text> {enrolledCourse.paymentId}
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.bold}>Payment Status:</Text>{' '}
            <Text style={enrolledCourse.paymentStatus === 'paid' ? styles.paid : styles.unpaid}>
              {enrolledCourse.paymentStatus.toUpperCase()}
            </Text>
          </Text>
          <View style={styles.logoBox}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.greenbackground },
  logoBox: {
    alignItems: 'flex-end',
    marginBottom: 30,
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
  scrollContent: {
    padding: 20,
    backgroundColor: colors.greenbackground,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.headerText1,
    marginBottom: 4,
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
    marginBottom: 30,
  },
  infoItem: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  bold: {
    fontWeight: '600',
  },
  paid: {
    color: '#1b5e20',
    fontWeight: 'bold',
  },
  unpaid: {
    color: '#b71c1c',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    backgroundColor: colors.greenbackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: '#555',
  },
});

export default EnrolledCourseDetail;
