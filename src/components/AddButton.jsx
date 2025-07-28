import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useChickensStore } from '../store/useChickensStore';

const AddButton = ({ chickenData }) => {
  const navigation = useNavigation();
  const addChicken = useChickensStore((state) => state.addChicken);

  const handleAdd = () => {
    if (!chickenData || !chickenData.name?.trim()) return;

    addChicken(chickenData);
    navigation.navigate('Main');
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleAdd} activeOpacity={0.8}>
      <Text style={styles.text}>Add the chicken</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 358,
    height: 49,
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#FFC108',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Moderustic-SemiBold',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: -0.41,
    color: '#5E2D1D',
    textAlign: 'center',
  },
});

export default AddButton;
