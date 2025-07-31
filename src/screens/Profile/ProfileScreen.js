import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import colors from '../../constants/Colors';
import EditProfileModal from '../../components/EditProfileModal';
import ChangePasswordModal from '../../components/ChangePasswordModal';
import ProfileImage from '../../components/ProfileImage';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchStudentData } from '../../utils/fetchStudent';
import { Linking } from 'react-native';
import config from '../../config/api';


const ProfileScreen = ({navigation}) => {
  const [editVisible, setEditVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

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
  const formatDOB = (isoString) => {
    const d = new Date(isoString);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  const [student, setStudent] = useState([]);

  const loadStudent = async () => {
    setLoading1(true);
    const studentData = await fetchStudentData();
    if(studentData === "TOKEN_EXPIRED" || studentData === "STUDENT_NOT_FOUND"){
      await handleLogout();
      return;
    }
    if (studentData) {
      setStudent(studentData);
      console.log('Student Profile:', studentData);
    }
    setLoading1(false);
  };
  useEffect(() => {
    loadStudent();
  }, []);

  if(!student) {
    return <View style = {styles.loadingContainer}>
      <Loader message='Loading...'/>
    </View>
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Top Bar with Logo and Logout */}
        <View style={styles.topBar}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
          />
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.header}>
          <ProfileImage student={student} onUpdate={() => loadStudent()}/>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.email}>{student.email}</Text>
        </View>

        {/* Account Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Info</Text>
          <Text style={styles.infoItem}>Mobile: {student.mobile}</Text>
          <Text style={styles.infoItem}>DOB: {formatDOB(student.dob)}</Text>
          <Text style={styles.infoItem}>Gender: {student.gender}</Text>
        </View>

        {/* Settings Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <TouchableOpacity style={styles.buttonCard} onPress={() => setEditVisible(true)}>
            <Text style={styles.buttonText}>✏️ Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonCard} onPress={() => setPasswordVisible(true)}>
            <Text style={styles.buttonText}>🔒 Change Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Follow Us On</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity onPress={() => Linking.openURL(config.facebook)}>
            <Image
              source={require('../../../assets/icons/facebook.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(config.instagram)}>
            <Image
              source={require('../../../assets/icons/instagram.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(config.twitter)}>
            <Image
              source={require('../../../assets/icons/twitter.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      {/* Modals */}
      <Modal visible={editVisible} animationType="slide" transparent>
        <EditProfileModal onClose={() => { setEditVisible(false); loadStudent()}} />
      </Modal>

      <Modal visible={passwordVisible} animationType="slide" transparent>
        <ChangePasswordModal onClose={() => setPasswordVisible(false)} />
      </Modal>
      { loading && (
        <View style = {styles.loadingContainer}>
          <Loader message='Logging out...'/>
        </View>)
      }
      { loading1 && (
        <View style = {[styles.loadingContainer, {backgroundColor:  '#f7ffd8ff'}]}>
          <Loader message='Loading...'/>
        </View>)
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greenbackground,
  },
  scrollContainer: {
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  logoutButton: {
    backgroundColor: '#fdecea',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    elevation: 3
  },
  logoutText: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.headerText1,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkGreen,
    marginBottom: 10,
  },
  infoItem: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 6,
  },
  buttonCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  loadingContainer: {
    position: 'absolute',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7ffd8ff',
  },
  socialContainer: {
  flexDirection: 'row',
  marginTop: 10,
},
socialIcon: {
  marginRight: 20,
  height: 34,
  width: 34
},

});

export default ProfileScreen;
