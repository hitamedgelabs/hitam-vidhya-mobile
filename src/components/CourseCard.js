// components/CourseCard.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/Colors';

const CourseCard = ({ course, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: course.template_image }} style={styles.icon} />
      <View style={styles.info}>
        <Text style={styles.title}>{course.name}</Text>
        <Text style={styles.subject}>{course.course_level}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground || '#fff',
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#d2e3d9',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  icon: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 10,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.headerText1 || '#1a1a1a',
  },
  subject: {
    fontSize: 13,
    marginTop: 4,
    color: colors.textSecondary || '#6c757d',
  },
  arrow: {
    fontSize: 24,
    fontWeight: '500',
    color: '#B0B0B0',
    marginRight: 16,
  },
});

export default CourseCard;
