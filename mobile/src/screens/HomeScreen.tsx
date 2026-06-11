import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../services/api';

const HomeScreen = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await api.get('/menu/');
      setItems(response.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      {item.variants.map((v: any) => (
        <View key={v.id} style={styles.variant}>
          <Text>{v.name}</Text>
          <Text style={styles.price}>${v.price}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to Order</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1faee' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1d3557' },
  desc: { color: '#666', marginVertical: 5 },
  variant: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 },
  price: { fontWeight: 'bold' },
  button: { backgroundColor: '#e63946', padding: 10, borderRadius: 4, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});

export default HomeScreen;
