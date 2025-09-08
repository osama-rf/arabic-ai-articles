import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onPress: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(article)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.textContent}>
          <Text style={styles.title} numberOfLines={2}>
            {article.title}
          </Text>
          <Text style={styles.excerpt} numberOfLines={2}>
            {article.excerpt}
          </Text>
          <View style={styles.meta}>
            <Text style={styles.source}>{article.source}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.time}>{article.time}</Text>
          </View>
        </View>
        
        <Image 
          source={{ uri: article.image }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    padding: 16,
  },
  textContent: {
    flex: 1,
    marginRight: 12,
    justifyContent: 'space-between',
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  excerpt: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  meta: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  source: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  separator: {
    color: colors.textSecondary,
    fontSize: 12,
    marginHorizontal: 6,
  },
  time: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
});