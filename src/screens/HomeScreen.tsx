import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList,
  SafeAreaView 
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { getCategories } from '../utils/storage';
import { mockArticles } from '../utils/mockData';
import { Header } from '../components/Header';
import { ArticleCard } from '../components/ArticleCard';
import { Category, Article } from '../types';

interface HomeScreenProps {
  onArticlePress: (article: Article) => void;
  onEditCategories: () => void;
  onMenuPress?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onArticlePress, onEditCategories, onMenuPress }) => {
  const { colors } = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadCategories();
    }, [])
  );

  useEffect(() => {
    if (activeCategory) {
      const filtered = mockArticles.filter(article => 
        article.categorySlug === activeCategory
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(mockArticles);
    }
  }, [activeCategory]);

  const loadCategories = async () => {
    try {
      const savedCategories = await getCategories();
      if (savedCategories.length > 0) {
        setCategories(savedCategories);
        setActiveCategory(savedCategories[0].slug);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleCategoryPress = (categorySlug: string) => {
    setActiveCategory(categorySlug);
  };

  const handleAddPress = () => {
    onEditCategories();
  };

  const renderArticleItem = ({ item }: { item: Article }) => (
    <ArticleCard article={item} onPress={onArticlePress} />
  );

  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <Header onAddPress={handleAddPress} onMenuPress={onMenuPress} />
      
      {categories.length > 0 && (
        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            <TouchableOpacity
              style={[
                styles.categoryTab,
                activeCategory === '' && styles.categoryTabActive
              ]}
              onPress={() => handleCategoryPress('')}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  activeCategory === '' && styles.categoryTabTextActive
                ]}
              >
                الكل
              </Text>
            </TouchableOpacity>
            
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryTab,
                  activeCategory === category.slug && styles.categoryTabActive
                ]}
                onPress={() => handleCategoryPress(category.slug)}
              >
                <Text
                  style={[
                    styles.categoryTabText,
                    activeCategory === category.slug && styles.categoryTabTextActive
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <FlatList
        data={filteredArticles}
        renderItem={renderArticleItem}
        keyExtractor={(item) => item.id}
        style={styles.articlesList}
        contentContainerStyle={styles.articlesContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 12,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryTabText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTabTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
  articlesList: {
    flex: 1,
  },
  articlesContent: {
    paddingVertical: 8,
  },
});