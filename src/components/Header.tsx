import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { mockUser } from '../utils/mockData';

interface HeaderProps {
  onAddPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
        <Text style={styles.greeting}>مرحباً، {mockUser.name}</Text>
      </View>
      
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  greeting: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,
  },
});