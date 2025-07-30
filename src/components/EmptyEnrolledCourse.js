import React, {useEffect, useState} from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const EmptyCourseList = ({ }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (!show) return null;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.unpaidSummaryContainer}>
        <Text style={styles.unpaidSummaryText}>
          Seems like you’re interested in our courses. Why are you still waiting?  Enroll in any Course to get started!
        </Text>
      </View>
      <Image
        source={require('../../assets/images/not_available.png')}
        style={{ height: 120, marginBottom: 20, opacity: 0.7, resizeMode: 'contain' }}
      />
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#444', marginBottom: 8 }}>
        No Courses Enrolled
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
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
})

export default EmptyCourseList;
