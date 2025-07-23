import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import colors from '../../constants/Colors';
import CourseCard from '../../components/CourseCard';
import CourseData from '../../../course.json'; // Assuming you have a CourseData file

const EmptyCourseList = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Image
        source={require('../../../assets/images/not_available.png')}
        style={{ height: 120, marginBottom: 20, opacity: 0.7, resizeMode: 'contain' }}
      />
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#444', marginBottom: 8 }}>
        No Courses Found
      </Text>
      <Text style={{ fontSize: 14, color: '#888', textAlign: 'center' }}>
        It looks like there are no courses You are Enrolled now.{"\n"}Please Enroll in any of our Courses.
      </Text>
    </View>
  );
}
const CoursesScreen = () => {
  const [myCourse, setMyCourses] = useState([]);
  useEffect(() => {
    setMyCourses(CourseData);
    }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.heading}>My Courses</Text>
      <FlatList
        data={myCourse}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (<View style={{height: 80}} />)}
        ListEmptyComponent={() => (<EmptyCourseList/>)}
        renderItem={({ item }) => (
          <CourseCard course={item}/>
        )}
        contentContainerStyle={styles.courseList}
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
  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 20,
    color: colors.headerText1,
  },
});

export default CoursesScreen;
