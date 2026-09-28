// GroupDetailsScreen.js - shows one group and lets the user join, leave or delete it.
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useGroups } from '../GroupsContext';

// Details screen; the group id arrives through the navigation params
export default function GroupDetailsScreen({ route, navigation }) {
  const { groups, toggleJoin, deleteGroup } = useGroups();
  const group = groups.find((g) => g.id === route.params.id);

  if (!group) return <Text style={styles.missing}>This group no longer exists.</Text>;

  // Asks for confirmation before deleting, then returns to the list
  function confirmDelete() {
    Alert.alert('Delete group', 'This removes the group from your phone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => { deleteGroup(group.id); navigation.goBack(); } },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.title}</Text>
      <Text style={styles.row}>Course: {group.course}</Text>
      <Text style={styles.row}>When: {group.time}</Text>
      <Text style={styles.row}>Where: {group.location}</Text>

      <TouchableOpacity
        style={[styles.button, group.joined && styles.leave]}
        onPress={() => toggleJoin(group.id)}
      >
        <Text style={styles.buttonText}>{group.joined ? 'Leave group' : 'Join group'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={confirmDelete}>
        <Text style={styles.delete}>Delete group</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f6f9' },
  title: { fontSize: 24, fontWeight: '700', color: '#1f3a5f', marginBottom: 16 },
  row: { fontSize: 16, marginBottom: 8, color: '#33445c' },
  button: { backgroundColor: '#2a8a4a', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  leave: { backgroundColor: '#6b7a8f' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  delete: { color: '#c0392b', textAlign: 'center', marginTop: 24 },
  missing: { textAlign: 'center', marginTop: 40 },
});
