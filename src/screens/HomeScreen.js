// HomeScreen.js - lists study groups, with a filter for the groups you joined.
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useGroups } from '../GroupsContext';

// Main list screen
export default function HomeScreen({ navigation }) {
  const { groups, loaded } = useGroups();
  const [showJoinedOnly, setShowJoinedOnly] = useState(false);

  const visible = showJoinedOnly ? groups.filter((g) => g.joined) : groups;

  // Draws one group row; tapping it opens the details screen
  function renderGroup({ item }) {
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('GroupDetails', { id: item.id })}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>{item.course} - {item.time}</Text>
        </View>
        {item.joined && <Text style={styles.badge}>Joined</Text>}
      </TouchableOpacity>
    );
  }

  if (!loaded) return <Text style={styles.empty}>Loading groups...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <TouchableOpacity onPress={() => setShowJoinedOnly(false)}>
          <Text style={[styles.filter, !showJoinedOnly && styles.filterActive]}>All groups</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowJoinedOnly(true)}>
          <Text style={[styles.filter, showJoinedOnly && styles.filterActive]}>My groups</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        renderItem={renderGroup}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {showJoinedOnly ? 'You have not joined any groups yet.' : 'No groups yet. Create the first one.'}
          </Text>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateGroup')}>
        <Text style={styles.fabText}>New group</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f9' },
  filters: { flexDirection: 'row', gap: 20, padding: 16 },
  filter: { fontSize: 16, color: '#6b7a8f' },
  filterActive: { color: '#1f3a5f', fontWeight: '700', textDecorationLine: 'underline' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 10, padding: 14, borderRadius: 10 },
  title: { fontSize: 17, fontWeight: '600', color: '#1f3a5f' },
  meta: { marginTop: 4, color: '#5b6b80' },
  badge: { color: '#2a8a4a', fontWeight: '700' },
  empty: { textAlign: 'center', marginTop: 40, color: '#6b7a8f', paddingHorizontal: 24 },
  fab: { position: 'absolute', right: 16, bottom: 24, backgroundColor: '#e07a1f', paddingVertical: 14, paddingHorizontal: 22, borderRadius: 28 },
  fabText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
