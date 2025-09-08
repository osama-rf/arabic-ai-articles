import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bars3Icon } from 'react-native-heroicons/outline';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onAddPress?: () => void;
  onMenuPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddPress, onMenuPress }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <Bars3Icon size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.appTitle}>مقالات الذكاء الاصطناعي</Text>
      </View>
      
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
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
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: colors.surface,
  },
  appTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
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
    color: colors.primaryText,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,
  },
});