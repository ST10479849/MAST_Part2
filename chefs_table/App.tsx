import { StyleSheet, Text, View, FlatList, Alert, TextInput} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

type MenuItem = {
    id: string;
    name: string;
    description: string;
    course: string;
    price: string;
};

const Tab = createBottomTabNavigator();

const HomeScreen = ({menuItems}: {menuItems: MenuItem[]}) =>{
  return(
    <View style={styles.container}>
        <Text style={styles.title}>What's cooking 🍳</Text>
        <FlatList 
        data={menuItems}
        keyExtractor={(_,idx) => idx.toString()}
        renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.dishName}>{item.name}</Text>
              {item.description}|{item.course}| {item.price}
            </View>
          )}
          ListEmptyComponent={<Text>No items at this stage "Go to add items tab" </Text>}
          style={{width:'100%'}}
        />
          </View>
  );
};

function AddItemsScreen(){
  const [dishName,setDishName]= useState('');
  const[description,setDescription]= useState('');
  const[course,setCourse]= useState('');
  const[price,setPrice]= useState('');
    
  const handleAddItems  = () => {
    if (!dishName || !description || !course || !price) {
      Alert.alert('Please fill in all boxes.'); 
     return;}
      }
 }
 const newItem: MenuItem = {
      id: Date.now().toString(),
      name: dishName,
      description,
      course,
      price,};


 setMenuItems([...menuItems, newItem])
setDishName('');
setDescription('');
setCourse('');
setPrice('');


Alert.alert('book added succesfuly')
