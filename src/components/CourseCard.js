// components/CourseCard.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/Colors';

const CourseCard = ({ course }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => {}}>
      <View style={styles.iconContainer}>
        <Image source={{ uri: course.template_image }} style={styles.icon} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{course.name}</Text>
        <Text style={styles.subject}>{course.description}</Text>
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
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    shadowColor: '#d2e3d9',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#b3e8c2ff',
    padding: 5,
    borderRadius: 8,
    marginRight: 14,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
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
  },
});

export default CourseCard;
