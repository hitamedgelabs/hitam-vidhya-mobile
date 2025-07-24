import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EditProfileModal = ({ onClose }) => {

  const handleSubmit = () => {
    // You can call an API here or pass data back via props
    console.log('Submitted:');
    onClose();
  };
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <Text style={styles.title}>Edit Profile</Text>
        {/* Add your form fields here */}
        <Text style={styles.info}>[ Form inputs go here ]</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
            <Text style={styles.btnText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  info: {
    fontSize: 14,
    color: '#777',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: '#2c6f2c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default EditProfileModal;
