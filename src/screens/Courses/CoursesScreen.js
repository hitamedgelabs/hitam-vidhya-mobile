import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/Colors';
import CourseCard from '../../components/CourseCard';
import CourseData from '../../../course.json'; // Assuming you have a CourseData file
import { TextInput } from 'react-native-gesture-handler';

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
        It looks like there are no courses available right now.{"\n"}Please check back later.
      </Text>
    </View>
  );
}
const CoursesScreen = () => {
  const [myCourse, setMyCourses] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
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
        {searchOpen ? (
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search courses..."
              placeholderTextColor="#999"
              style={styles.searchInput}
            />
            <TouchableOpacity onPress={() => {setSearchOpen(!searchOpen)}}>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
          ) : (
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
          <Text style={styles.heading}>Our Courses</Text>
          <TouchableOpacity onPress={() => {setSearchOpen(!searchOpen)}}>
            <Image
              source={require('../../../assets/icons/search.png')}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
        )}
        
      </View>
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
    flexDirection: 'Column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
    alignSelf: 'flex-start',
    resizeMode: 'contain',
  },
  searchIcon: {
    width: 24,
    height: 48,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 20,
    alignSelf: 'center',
    color: colors.headerText1,
  },
  arrow: {
    fontSize: 30,
    fontWeight: '500',
    color: '#B0B0B0',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    width: '100%',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#22223B',
  },
});

export default CoursesScreen;
