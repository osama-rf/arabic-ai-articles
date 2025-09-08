import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  Modal 
} from 'react-native';
import { WrenchScrewdriverIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../hooks/useTheme';
import { Article } from '../types';

interface ReadingScreenProps {
  article: Article;
  onBack: () => void;
}

export const ReadingScreen: React.FC<ReadingScreenProps> = ({ 
  article, 
  onBack
}) => {
  const { colors } = useTheme();
  const [showToolsModal, setShowToolsModal] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const handleToolsPress = () => {
    setShowToolsModal(true);
  };

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
  };

  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleToolsPress}>
            <WrenchScrewdriverIcon size={20} color={colors.text} />
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

          <Text style={[styles.title, { fontSize: fontSize + 12 }]}>{article.title}</Text>
          
          <Text style={[styles.excerpt, { fontSize: fontSize + 2 }]}>{article.excerpt}</Text>
          
          <Text style={[styles.body, { fontSize }]}>{article.content}</Text>
          
          {/* Extended content for better reading experience */}
          <Text style={[styles.body, { fontSize }]}>
            يمثل هذا النهج المبتكر في توصيل المحتوى تحولاً كبيراً في الطريقة التي يستهلك بها المستخدمون المعلومات.
            يضمن دمج التصنيف المدعوم بالذكاء الاصطناعي حصول القراء على محتوى مخصص يتماشى مع اهتماماتهم وتفضيلاتهم.
          </Text>
          
          <Text style={[styles.body, { fontSize }]}>
            مع استمرار تطور التكنولوجيا، يمكننا أن نتوقع رؤية طرق أكثر تطوراً لتنظيم المحتوى وتقديمه.
            يكمن مستقبل تجارب القراءة الرقمية في المزج السلس بين الذكاء الاصطناعي ومبادئ التصميم المتمحورة حول الإنسان.
          </Text>

          <Text style={[styles.body, { fontSize }]}>
            تتجاوز تداعيات هذه التطورات مجرد استهلاك المحتوى البسيط. إنها تمثل تحولاً جوهرياً في الطريقة التي نتفاعل بها
            مع المعلومات في حياتنا اليومية، مما يجعل المعرفة أكثر سهولة وتخصيصاً من أي وقت مضى.
          </Text>
        </View>
      </ScrollView>

      {/* Tools Modal */}
      <Modal
        visible={showToolsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowToolsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>إعدادات القراءة</Text>
            
            <View style={styles.fontSizeSection}>
              <Text style={styles.sectionTitle}>حجم الخط</Text>
              <View style={styles.fontSizeControls}>
                <TouchableOpacity
                  style={styles.fontButton}
                  onPress={() => handleFontSizeChange(Math.max(12, fontSize - 2))}
                >
                  <Text style={styles.fontButtonText}>أ-</Text>
                </TouchableOpacity>
                
                <Text style={styles.currentFontSize}>{fontSize}</Text>
                
                <TouchableOpacity
                  style={styles.fontButton}
                  onPress={() => handleFontSizeChange(Math.min(24, fontSize + 2))}
                >
                  <Text style={styles.fontButtonText}>أ+</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowToolsModal(false)}
            >
              <Text style={styles.closeButtonText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
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
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 200,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  fontSizeSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  fontSizeControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  fontButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  fontButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  currentFontSize: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    minWidth: 32,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: colors.primaryText,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});