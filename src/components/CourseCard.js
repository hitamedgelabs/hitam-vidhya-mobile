import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/Colors';

const CourseCard = ({ course, onPress }) => {
  const finalPrice = course.fees - (course.fees * (course.discount || 0)) / 100;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: course.template_image }} style={styles.image} alt='Course Image'/>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{course.name}</Text>
        <Text style={styles.level}>{course.course_level} • {course.category}</Text>

        <View style={styles.row}>
          <Text style={styles.meta}>⏱ {course.duration}</Text>
          {course.ratings > 0 && <Text style={styles.meta}>⭐ {course.ratings.toFixed(1)}</Text>}
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{finalPrice}</Text>
          {course.discount > 0 && (
            <Text style={styles.discount}>₹{course.fees} • {course.discount}% OFF</Text>
          )}
        </View>

        {course.days_left && (
          <Text style={styles.daysLeft}>📅 {course.days_left} days left</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 2,
  },
  meta: {
    fontSize: 11,
    color: '#666',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e8449',
  },
  discount: {
    fontSize: 11,
    color: '#e74c3c',
    textDecorationLine: 'line-through',
  },
  daysLeft: {
    fontSize: 11,
    marginTop: 4,
    color: '#d35400',
  },
});

export default CourseCard;
