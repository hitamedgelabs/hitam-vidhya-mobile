import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Dashboard from '../screens/Dashboard/DashboardScreen';
import Courses from '../screens/Courses/CoursesScreen';
import Profile from '../screens/Profile/ProfileScreen';
import CourseDetailScreen from '../screens/Courses/CourseDetailScreen'; // ✅ import this

const BottomTabs = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [courseId, setCourseId] = useState('');

  const renderPage = () => {
    if (courseId !== '') {
      return <CourseDetailScreen courseId={courseId} />;
    }
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Courses':
        return <Courses onSelectCourse={(id) => setCourseId(id)} />;
      case 'Profile':
        return <Profile />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (courseId !== '') {
        setCourseId('');
        return true;
      }
      if (activePage !== 'Dashboard') {
        setActivePage('Dashboard');
        return true;
      }
      BackHandler.exitApp();
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [activePage, courseId]);

  const setPage = (page) => {
    if (courseId !== '') {
      setCourseId('');
    }
    setActivePage(page);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderPage()}</View>
        <LinearGradient colors={['#F9FBFFCF', '#F9FBFF']} style={styles.navContainer}>
          <TouchableOpacity onPress={() => setPage('Dashboard')} style={styles.navButton}>
            <Image
              source={
                activePage === 'Dashboard'
                  ? require('../../assets/icons/dashboard1.png')
                  : require('../../assets/icons/dashboard.png')
              }
              style={[styles.icon, activePage === 'Dashboard' && styles.selectedIcon]}
            />
            <Text style={[styles.bottomText, activePage === 'Dashboard' && { color: '#22223B' }]}>
              Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setPage('Courses')} style={styles.navButton}>
            <Image
              source={
                activePage === 'Courses'
                  ? require('../../assets/icons/courses1.png')
                  : require('../../assets/icons/courses.png')
              }
              style={[styles.icon, activePage === 'Courses' && styles.selectedIcon]}
            />
            <Text style={[styles.bottomText, activePage === 'Courses' && { color: '#22223B' }]}>
              Courses
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setPage('Profile')} style={styles.navButton}>
            <Image
              source={
                activePage === 'Profile'
                  ? require('../../assets/icons/profile1.png')
                  : require('../../assets/icons/profile.png')
              }
              style={[styles.icon, activePage === 'Profile' && styles.selectedIcon]}
            />
            <Text style={[styles.bottomText, activePage === 'Profile' && { color: '#22223B' }]}>
              Profile
            </Text>
          </TouchableOpacity>
        </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navButton: {
    height: 50,
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  selectedIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  bottomText: {
    fontSize: 10,
    color: '#618A61',
    fontWeight: '400',
    fontFamily: 'Open Sans Light',
    textAlign: 'center',
  },
});

export default BottomTabs;
