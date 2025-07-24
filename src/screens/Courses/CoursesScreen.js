import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from '../../constants/Colors';
import CourseCard from '../../components/CourseCard';
import EmptyCourseList from '../../components/EmptyCourseView';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';

const API_URL = 'https://api.hitamvidhya.com/api';


const CoursesScreen = ({ onSelectCourse }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [category, setCategory] = useState('IT');
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    hasMore: true,
  });
  
  const fetchCourses = async (page = 1, limit = 10, reset = false) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/courses`, {
        params: {
          page,
          limit,
          category,
          search: searchText,
        },
      });

      const { data = [], pagination: resPagination = {} } = response.data || {};
      setAllCourses((prev) => (reset ? data : [...prev, ...data]));
      setPagination({
        page: resPagination.page || page,
        limit: resPagination.limit || limit,
        hasMore: resPagination.hasNextPage || false,
      });
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  // On mount or category change
  useEffect(() => {
    fetchCourses(1, pagination.limit, true);
  }, [category]);

  // Search debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCourses(1, pagination.limit, true);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  const handleTabChange = (tab) => {
    if (tab !== category) {
      setCategory(tab);
      setAllCourses([]);
      setPagination({ page: 1, limit: 10, hasMore: true });
    }
  };

  const openCourse = (courseId) => {
    if (onSelectCourse) onSelectCourse(courseId);
  };

  const loadMoreCourses = () => {
    if (pagination.hasMore && !loading) {
      fetchCourses(pagination.page + 1, pagination.limit);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={() => setSearchOpen(false)}>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.titleRow}>
            <Text style={styles.heading}>Our Courses</Text>
            <TouchableOpacity onPress={() => setSearchOpen(true)}>
              <Image
                source={require('../../../assets/icons/search.png')}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
          {[ 'IT', 'NON IT'].map((cat, index) => (
            <TouchableOpacity key={index} style={{ alignItems: 'center', marginLeft: index !== 0 ? 10 : 0 }} onPress={() => handleTabChange(cat)}>
              <Text style={[styles.categoryText, category === cat && { color: '#2c6f2cff' }]}>{cat}</Text>
              {category === cat && <View style={styles.categoryLine} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.courseContainer}>
        <FlatList
          data={allCourses}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <View style={{ height: 10 }} />}
          ListFooterComponent={() =>
            loading ? (
              <ActivityIndicator size="small" color="#2c6f2cff" style={{ marginVertical: 20 }} />
            ) : (
              <View style={{ height: 100 }} />
            )
          }
          ListEmptyComponent={() => !loading && <EmptyCourseList />}
          renderItem={({ item }) => (
            <CourseCard course={item} onPress={() => openCourse(item._id)} />
          )}
          contentContainerStyle={styles.courseList}
          onEndReached={loadMoreCourses}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greenbackground,
    paddingTop: 10,
  },
  header: {
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#638763',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.headerText1,
  },
  searchIcon: {
    width: 24,
    height: 48,
    resizeMode: 'contain',
  },
  arrow: {
    fontSize: 30,
    fontWeight: '500',
    color: '#B0B0B0',
    paddingLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    width: '100%',
    marginVertical: 10,
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
  tabs: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
  tab: {
    marginHorizontal: 12,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 10,
    color: '#000',
  },
  activeCategory: {
    color: '#2c6f2cff',
  },
  categoryLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#2c6f2cff',
    borderRadius: 1,
    marginTop: 5,
  },
  courseContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  courseList: {
    paddingBottom: 20,
  },
});

export default CoursesScreen;
