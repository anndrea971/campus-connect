// CreateGroupScreen.js - form to create a study group, with input validation.
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useGroups } from '../GroupsContext';

// Form screen
export default function CreateGroupScreen({ navigation }) {
  const { addGroup } = useGroups();
  const [form, setForm] = useState({ title: '', course: '', time: '', location: '' });
  const [errors, setErrors] = useState({});

  // Updates one field of the form
  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Checks the form; returns an object of error messages (empty if everything is valid)
  function validate() {
    const found = {};
    if (form.title.trim().length < 3) found.title = 'Enter a title with at least 3 characters.';
    if (!form.course.trim()) found.course = 'Enter the course, for example CSE 310.';
    if (!form.time.trim()) found.time = 'Enter when the group meets.';
    if (!form.location.trim()) found.location = 'Enter a place or a meeting link.';
    return found;
  }

  // Runs validation, then saves the group and goes back to the list
  function handleSave() {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    addGroup({
      title: form.title.trim(),
      course: form.course.trim().toUpperCase(),
      time: form.time.trim(),
      location: form.location.trim(),
    });
    navigation.goBack();
  }

  // Renders one labeled input with its error message
  function field(name, label, placeholder) {
    return (
      <View style={styles.group}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={[styles.input, errors[name] && styles.inputError]}
          value={form[name]}
          placeholder={placeholder}
          onChangeText={(text) => setField(name, text)}
        />
        {errors[name] && <Text style={styles.error}>{errors[name]}</Text>}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {field('title', 'Title', 'Midterm review')}
      {field('course', 'Course', 'CSE 310')}
      {field('time', 'When', 'Wed 5:00 PM')}
      {field('location', 'Where', 'Library room 3 or a video link')}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Create group</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  group: { marginBottom: 16 },
  label: { fontWeight: '600', marginBottom: 6, color: '#1f3a5f' },
  input: { borderWidth: 1, borderColor: '#c5cedb', borderRadius: 8, padding: 12, backgroundColor: '#fff' },
  inputError: { borderColor: '#c0392b' },
  error: { color: '#c0392b', marginTop: 4 },
  button: { backgroundColor: '#1f3a5f', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
