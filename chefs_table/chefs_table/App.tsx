import { StyleSheet, Text, View, FlatList, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
};

const Tab = createBottomTabNavigator();

// Home Screen
const HomeScreen = ({ menuItems }: { menuItems: MenuItem[] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's cooking 🍳</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.dishName}>{item.name}</Text>
            <Text>{item.description} | {item.course} | {item.price}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noItems}>No items yet, Go to Add Item tab!</Text>
        }
        style={{ width: '100%' }}
      />
    </View>
  );
};

//  Add Items Screen
function AddItemsScreen({
  menuItems,
  setMenuItems,
}: {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const handleAddItems = () => {
    if (!dishName || !description || !course || !price) {
      Alert.alert('Please fill in all boxes.');
      return;
    }

    const newItem: MenuItem = {
      id: Math.random().toString(),
      name: dishName,
      description,
      course,
      price,
    };

    setMenuItems([...menuItems, newItem]);

    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Dish 🍽️</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish name"
        value={dishName}
        onChangeText={setDishName}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Course (e.g. Starter, Main, Dessert)"
        value={course}
        onChangeText={setCourse}
      />

      <TextInput
        style={styles.input}
        placeholder="Price (R)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text onPress={handleAddItems} style={styles.button}>
        ➕ Add to Menu
      </Text>
    </View>
  );
}


export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: any = '';

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else {
              iconName = 'add-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home">
          {() => <HomeScreen menuItems={menuItems} />}
        </Tab.Screen>

        <Tab.Screen name="Add Item">
          {() => (
            <AddItemsScreen
              menuItems={menuItems}
              setMenuItems={setMenuItems}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1166d6', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1166d6',
    color: '#fff',
    textAlign: 'center',
    padding: 12,
    borderRadius: 10,
    fontWeight: 'bold',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  dishName: { fontWeight: 'bold', fontSize: 16 },
  noItems: { color: 'gray', fontStyle: 'italic', marginTop: 10 },
});
