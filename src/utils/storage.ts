import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category } from '../types';

const CATEGORIES_KEY = '@ai_articles_categories';
const INTERESTS_KEY = '@ai_articles_interests';

export const saveCategories = async (categories: Category[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await AsyncStorage.getItem(CATEGORIES_KEY);
    return categories ? JSON.parse(categories) : [];
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
};

export const saveInterests = async (interests: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(INTERESTS_KEY, interests);
  } catch (error) {
    console.error('Error saving interests:', error);
    throw error;
  }
};

export const getInterests = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(INTERESTS_KEY);
  } catch (error) {
    console.error('Error loading interests:', error);
    return null;
  }
};