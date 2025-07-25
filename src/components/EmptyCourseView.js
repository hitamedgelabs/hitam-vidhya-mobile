import React, {useEffect, useState} from 'react';
import { Text, View, Image } from 'react-native';

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Image
        source={require('../../assets/images/not_available.png')}
        style={{ height: 120, marginBottom: 20, opacity: 0.7, resizeMode: 'contain' }}
      />
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#444', marginBottom: 8 }}>
        No Courses Found
      </Text>
      <Text style={{ fontSize: 14, color: '#888', textAlign: 'center' }}>
        It looks like there are no courses available right now.{"\n"}Please check back later.
      </Text>
    </View>
  );
};

export default EmptyCourseList;
