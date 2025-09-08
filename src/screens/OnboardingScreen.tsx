import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Alert,
  ActivityIndicator 
} from 'react-native';
import { colors } from '../utils/colors';
import { generateCategoriesFromInterests } from '../utils/mockData';
import { saveCategories, saveInterests, getCategories, getInterests } from '../utils/storage';
import { Category } from '../types';

interface OnboardingScreenProps {
  onComplete: () => void;
  isEditing?: boolean;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, isEditing = false }) => {
  const [interests, setInterests] = useState('');
  const [generatedCategories, setGeneratedCategories] = useState<Category[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    if (isEditing) {
      loadExistingData();
    }
  }, [isEditing]);

  const loadExistingData = async () => {
    try {
      const [existingInterests, existingCategories] = await Promise.all([
        getInterests(),
        getCategories()
      ]);
      
      if (existingInterests) {
        setInterests(existingInterests);
      }
      
      if (existingCategories.length > 0) {
        setGeneratedCategories(existingCategories);
        setShowCategories(true);
      }
    } catch (error) {
      console.error('Failed to load existing data:', error);
    }
  };

  const handleGenerateCategories = async () => {
    if (!interests.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال اهتماماتك أولاً');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const categories = generateCategoriesFromInterests(interests);
      setGeneratedCategories(categories);
      setIsGenerating(false);
      setShowCategories(true);
    }, 1500);
  };

  const toggleCategory = (categoryId: string) => {
    setGeneratedCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.id === categoryId
          ? { ...cat, isActive: !cat.isActive }
          : cat
      )
    );
  };

  const handleSaveAndContinue = async () => {
    const activeCategories = generatedCategories.filter(cat => cat.isActive);
    
    if (activeCategories.length === 0) {
      Alert.alert('خطأ', 'يرجى اختيار فئة واحدة على الأقل');
      return;
    }

    try {
      await saveInterests(interests);
      await saveCategories(activeCategories);
      onComplete();
    } catch (error) {
      Alert.alert('خطأ', 'فشل في حفظ التفضيلات. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {isEditing && (
          <TouchableOpacity style={styles.backButton} onPress={onComplete}>
            <Text style={styles.backButtonText}>← رجوع</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>
          {isEditing ? 'تعديل الفئات' : 'مرحباً بك في مقالات الذكي'}
        </Text>
        <Text style={styles.subtitle}>
          {isEditing 
            ? 'قم بتحديث اهتماماتك وتعديل الفئات الخاصة بك' 
            : 'أخبرنا عن اهتماماتك حتى نتمكن من تخصيص تجربتك'
          }
        </Text>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>ما هي اهتماماتك؟</Text>
          <TextInput
            style={styles.textInput}
            value={interests}
            onChangeText={setInterests}
            placeholder="مثال: التكنولوجيا، الصحة، الأعمال، الطبخ..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            textAlign="right"
          />
        </View>

        {!showCategories && (
          <TouchableOpacity
            style={[styles.button, isGenerating && styles.buttonDisabled]}
            onPress={handleGenerateCategories}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator color={colors.text} size="small" />
                <Text style={styles.buttonText}>جاري إنشاء الفئات...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>
                {isEditing ? 'إعادة إنشاء الفئات' : 'إنشاء الفئات'}
              </Text>
            )}
          </TouchableOpacity>
        )}

        {showCategories && (
          <View style={styles.categoriesSection}>
            <Text style={styles.categoriesTitle}>اختر الفئات المناسبة لك</Text>
            <View style={styles.categoriesGrid}>
              {generatedCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    category.isActive && styles.categoryChipActive
                  ]}
                  onPress={() => toggleCategory(category.id)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      category.isActive && styles.categoryChipTextActive
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSaveAndContinue}
            >
              <Text style={styles.buttonText}>
                {isEditing ? 'حفظ التغييرات' : 'متابعة إلى التطبيق'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 12,
    marginBottom: 16,
  },
  backButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    writingDirection: 'rtl',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    writingDirection: 'rtl',
  },
  inputSection: {
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
    fontWeight: '500',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  textInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    color: colors.text,
    fontSize: 16,
    minHeight: 120,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  categoriesSection: {
    marginTop: 32,
  },
  categoriesTitle: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: colors.text,
  },
});