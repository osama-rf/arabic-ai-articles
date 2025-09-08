import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView 
} from 'react-native';
import { colors } from '../utils/colors';
import { Article } from '../types';

interface ReadingScreenProps {
  article: Article;
  onBack: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
}

export const ReadingScreen: React.FC<ReadingScreenProps> = ({ 
  article, 
  onBack, 
  onBookmark, 
  onShare 
}) => {
  const handleBookmark = () => {
    console.log('Bookmark article:', article.id);
    onBookmark?.();
  };

  const handleShare = () => {
    console.log('Share article:', article.id);
    onShare?.();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
            <Text style={styles.actionButtonText}>🔖</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Text style={styles.actionButtonText}>↗️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image 
          source={{ uri: article.image }} 
          style={styles.headerImage}
          resizeMode="cover"
        />
        
        <View style={styles.articleContent}>
          <View style={styles.meta}>
            <Text style={styles.source}>{article.source}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.time}>{article.time}</Text>
          </View>

          <Text style={styles.title}>{article.title}</Text>
          
          <Text style={styles.excerpt}>{article.excerpt}</Text>
          
          <Text style={styles.body}>{article.content}</Text>
          
          {/* Extended content for better reading experience */}
          <Text style={styles.body}>
            يمثل هذا النهج المبتكر في توصيل المحتوى تحولاً كبيراً في الطريقة التي يستهلك بها المستخدمون المعلومات.
            يضمن دمج التصنيف المدعوم بالذكاء الاصطناعي حصول القراء على محتوى مخصص يتماشى مع اهتماماتهم وتفضيلاتهم.
          </Text>
          
          <Text style={styles.body}>
            مع استمرار تطور التكنولوجيا، يمكننا أن نتوقع رؤية طرق أكثر تطوراً لتنظيم المحتوى وتقديمه.
            يكمن مستقبل تجارب القراءة الرقمية في المزج السلس بين الذكاء الاصطناعي ومبادئ التصميم المتمحورة حول الإنسان.
          </Text>

          <Text style={styles.body}>
            تتجاوز تداعيات هذه التطورات مجرد استهلاك المحتوى البسيط. إنها تمثل تحولاً جوهرياً في الطريقة التي نتفاعل بها
            مع المعلومات في حياتنا اليومية، مما يجعل المعرفة أكثر سهولة وتخصيصاً من أي وقت مضى.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  articleContent: {
    padding: 20,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  source: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  separator: {
    color: colors.textSecondary,
    fontSize: 14,
    marginHorizontal: 8,
  },
  time: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
    marginBottom: 16,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  excerpt: {
    color: colors.textSecondary,
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 24,
    fontStyle: 'italic',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  body: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});