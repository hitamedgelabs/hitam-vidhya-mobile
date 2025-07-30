import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import colors from '../../constants/Colors';
import EnrolledCourseCard from '../../components/EnrolledCourseCard';
import EmptyEnrolledCourse from '../../components/EmptyEnrolledCourse';
import Loader from '../../components/Loader';
import { fetchStudentData } from '../../utils/fetchStudent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/api';

const API_URL = config.API_URL;

const CoursesScreen = ({ navigation, onSelectCourse }) => {
  const [myCourse, setMyCourses] = useState([]);
  const [unpaidCourses, setUnpaidCourses] = useState([]); // ✅ New state
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    console.log("Logging out...");
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.replace('LoginPages');
    } catch (error) {
      console.error("Error removing auth token during logout:", error);
    }
    setLoading(false);
  };

  const loadStudent = async () => {
    setLoading(true);
    const studentData = await fetchStudentData();
    if(studentData === "TOKEN_EXPIRED" || studentData === "STUDENT_NOT_FOUND"){
      await handleLogout();
      return;
    }
    if (studentData) {
      setStudent(studentData);
      console.log('Student Profile:', studentData);
    }
    setLoading(false);
  };

  const getMyCourses = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      
      const res = await fetch(`${API_URL}/enrol/enrolled-course`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const data = await res.json();

      if (res.ok) {
        const paid = data.data.filter(
          (item) => item.course !== null
        );
        console.log(data.data);
        setMyCourses(paid);
      } else {
        throw new Error(data.message || 'Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error.message);
    }
  };

  useEffect(() => {
    loadStudent();
    getMyCourses();
  }, []);

  if(loading){
    return (
      <View style={styles.loadingContainer}>
        <Loader message='Loading...'/>
      </View>
    );
  }

  const openCourse = (item) => {
    if (onSelectCourse) onSelectCourse(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.helloText}>Hello! {student?.name || ''}</Text>
      {unpaidCourses.length > 0 && (
        <View>
          <Text style={styles.unpaidHeading}>Payment Pending</Text>
          <FlatList
            data={unpaidCourses}
            keyExtractor={(item) => item.course._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <EnrolledCourseCard enrolledCourse={item} />
            )}
          />
          <View style={styles.unpaidSummaryContainer}>
            <Text style={styles.unpaidSummaryText}>
              Payment is still pending for the above course. It may take up to an hour to process. If the issue persists, please re-verify your payment or contact support.
            </Text>
          </View>
        </View>
      )}
      <Text style={styles.heading}>My Courses</Text>
      <FlatList
        data={myCourse}
        keyExtractor={(item) => item.course._id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <EmptyEnrolledCourse />}
        renderItem={({ item }) => (
          <EnrolledCourseCard 
            enrolledCourse={item} 
            onPress={() => openCourse(item)}
          />
        )}
        contentContainerStyle={styles.courseList}
        ListFooterComponent={() => <View style={{ height: 80 }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greenbackground,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  helloText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.darkGreen,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
    color: colors.headerText1,
  },
  unpaidHeading: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 20,
    color: colors.headerText1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7ffd8ff',
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

export default CoursesScreen;
