import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { SunIcon, MoonIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../hooks/useTheme';
import { spacing, typography, sizes } from '../utils/colors';

export const DrawerContent: React.FC = () => {
  const { theme, colors, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>القائمة</Text>
      </View>
      
      <View style={styles.menuItems}>
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: colors.background, borderColor: colors.border }]} 
          onPress={toggleTheme}
        >
          <View style={styles.menuItemContent}>
            <View style={styles.themeIconContainer}>
              {theme === 'dark' ? (
                <SunIcon size={sizes.iconSize} color={colors.primary} />
              ) : (
                <MoonIcon size={sizes.iconSize} color={colors.primary} />
              )}
            </View>
            <View style={styles.menuItemText}>
              <Text style={[styles.menuItemTitle, { color: colors.text }]}>
                {theme === 'dark' ? 'الوضع المضيء' : 'الوضع المظلم'}
              </Text>
              <Text style={[styles.menuItemDescription, { color: colors.textSecondary }]}>
                {theme === 'dark' ? 'التبديل إلى الوضع المضيء' : 'التبديل إلى الوضع المظلم'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>قريباً...</Text>
        <Text style={[styles.emptyDescription, { color: colors.textSecondary }]}>
          سيتم إضافة عناصر القائمة هنا
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.xl,
    paddingTop: spacing.lg,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: '700',
    textAlign: 'right',
  },
  menuItems: {
    padding: spacing.lg,
  },
  menuItem: {
    borderRadius: sizes.borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  themeIconContainer: {
    width: sizes.avatarMd,
    height: sizes.avatarMd,
    borderRadius: sizes.avatarMd / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    marginBottom: spacing.xs,
    textAlign: 'right',
  },
  menuItemDescription: {
    fontSize: typography.sm,
    textAlign: 'right',
    lineHeight: typography.sm * 1.3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: typography.xl,
    fontWeight: '600',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: typography.base,
    textAlign: 'center',
    lineHeight: typography.base * 1.4,
  },
});