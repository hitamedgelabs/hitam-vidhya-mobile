import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Dashboard from '../screens/Dashboard/DashboardScreen';
import Courses from '../screens/Courses/CoursesScreen';
import Profile from '../screens/Profile/ProfileScreen';
import CourseDetailScreen from '../screens/Courses/CourseDetailScreen';
import EnrolledCourseDetail from '../screens/Courses/EnrolledCourseDetail';

const BottomTabs = ({ navigation }) => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [courseId, setCourseId] = useState('');
  const [enrolledItem, setEnrolledItem] = useState('');

  const resetDetailScreens = () => {
    setCourseId('');
    setEnrolledItem('');
  };

  const renderPage = () => {
    if (courseId) return <CourseDetailScreen courseId={courseId} />;
    if (enrolledItem) return <EnrolledCourseDetail enrolledCourse={enrolledItem} />;

    switch (activePage) {
      case 'Dashboard':
        return <Dashboard onSelectCourse={(item) => setEnrolledItem(item)} />;
      case 'Courses':
        return <Courses onSelectCourse={(id) => setCourseId(id)} />;
      case 'Profile':
        return <Profile navigation={navigation} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (courseId || enrolledItem) {
        resetDetailScreens();
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
  }, [activePage, courseId, enrolledItem]);

  const handleTabPress = (page) => {
    resetDetailScreens();
    setActivePage(page);
  };

  const TabButton = ({ page, label, icon, iconActive }) => (
    <TouchableOpacity onPress={() => handleTabPress(page)} style={styles.navButton}>
      <Image
        source={activePage === page ? iconActive : icon}
        style={[styles.icon, activePage === page && styles.selectedIcon]}
      />
      <Text style={[styles.bottomText, activePage === page && styles.activeText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderPage()}</View>

      <LinearGradient colors={['#F9FBFFCF', '#F9FBFF']} style={styles.navContainer}>
        <TabButton
          page="Dashboard"
          label="Dashboard"
          icon={require('../../assets/icons/dashboard.png')}
          iconActive={require('../../assets/icons/dashboard1.png')}
        />
        <TabButton
          page="Courses"
          label="Courses"
          icon={require('../../assets/icons/courses.png')}
          iconActive={require('../../assets/icons/courses1.png')}
        />
        <TabButton
          page="Profile"
          label="Profile"
          icon={require('../../assets/icons/profile.png')}
          iconActive={require('../../assets/icons/profile1.png')}
        />
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
  activeText: {
    color: '#22223B',
  },
});

export default BottomTabs;
