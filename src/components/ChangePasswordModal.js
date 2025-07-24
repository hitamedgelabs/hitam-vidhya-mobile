import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Input from './AuthInput';

const ChangePasswordModal = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    // You can call an API here or pass data back via props
    console.log('Submitted:');
    onClose();
  };
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <Text style={styles.title}>Change Password</Text>
        
        <Input
            placeholder="Old Password"
            value={oldPassword}
            onChangeText={setOldPassword}
          />
        <Input
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
          />
        <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
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
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 14,
    color: '#333',
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

export default ChangePasswordModal;
