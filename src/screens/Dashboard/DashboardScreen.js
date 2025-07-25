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
import CourseCard from '../../components/CourseCard';
import CourseData from '../../../course.json'; // Assuming you have a CourseData file
import EmptyCourseList from '../../components/EmptyCourseView';

const CoursesScreen = () => {
  const [myCourse, setMyCourses] = useState([]);
  useEffect(() => {
    setMyCourses(CourseData);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
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
