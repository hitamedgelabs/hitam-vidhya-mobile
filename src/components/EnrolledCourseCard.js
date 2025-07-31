import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/Colors';

const EnrolledCourseCard = ({ enrolledCourse, onPress }) => {
  if (!enrolledCourse || !enrolledCourse.course) {
    return null;
  }

  const course = enrolledCourse.course;

  return (
    <View>
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: course.template_image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{course.name}</Text>
        <Text style={styles.level}>{course.course_level} • {course.category}</Text>
        <Text style={styles.meta}>⏱ {course.duration}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Status:</Text>
          <Text
            style={[
              styles.status,
              enrolledCourse.paymentStatus === 'paid' ? styles.paid : styles.unpaid,
            ]}
          >
            {enrolledCourse.paymentStatus.toUpperCase()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    {
      enrolledCourse.paymentStatus !== 'paid' && 
      <View style={styles.unpaidSummaryContainer}>
        <Text style={styles.unpaidSummaryText}>
          Payment is still pending for the above course. It may take up to an hour to process. If the issue persists, please re-verify your payment or contact support.
        </Text>
      </View>
    }
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.headerText1 || '#1a1a1a',
  },
  level: {
    fontSize: 12,
    color: colors.textSecondary || '#6c757d',
    marginVertical: 2,
  },
  meta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    color: '#444',
    marginRight: 4,
    fontWeight: '600',
  },
  value: {
    fontSize: 12,
    color: '#1e8449',
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
  paid: {
    color: '#27ae60',
  },
  unpaid: {
    color: '#c0392b',
  },
  unpaidSummaryContainer: {
    backgroundColor: '#e6f4ff',  // soft blue background
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3399ff', // slightly deeper blue
  },
  unpaidSummaryText: {
    fontSize: 14,
    color: '#1a73e8', // soft primary blue
    lineHeight: 20,
    fontWeight: '500',
  },
});

export default EnrolledCourseCard;
