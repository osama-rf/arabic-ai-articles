import { User, Category, Article } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'أحمد السالم',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
};

export const generateCategoriesFromInterests = (interests: string): Category[] => {
  const keywords = interests.toLowerCase().split(/\s+|,/).map(k => k.trim()).filter(k => k);
  const categoryMap: { [key: string]: string } = {
    'tech': 'التكنولوجيا',
    'technology': 'التكنولوجيا',
    'التكنولوجيا': 'التكنولوجيا',
    'تقنية': 'التكنولوجيا',
    'programming': 'التكنولوجيا',
    'برمجة': 'التكنولوجيا',
    'code': 'التكنولوجيا',
    'software': 'التكنولوجيا',
    'ai': 'الذكاء الاصطناعي',
    'artificial': 'الذكاء الاصطناعي',
    'intelligence': 'الذكاء الاصطناعي',
    'ذكاء': 'الذكاء الاصطناعي',
    'اصطناعي': 'الذكاء الاصطناعي',
    'machine': 'تعلم الآلة',
    'learning': 'تعلم الآلة',
    'تعلم': 'تعلم الآلة',
    'health': 'الصحة',
    'صحة': 'الصحة',
    'medical': 'الصحة',
    'طبي': 'الصحة',
    'fitness': 'الصحة',
    'لياقة': 'الصحة',
    'wellness': 'الصحة',
    'business': 'الأعمال',
    'أعمال': 'الأعمال',
    'تجارة': 'الأعمال',
    'startup': 'الأعمال',
    'entrepreneur': 'الأعمال',
    'ريادة': 'الأعمال',
    'finance': 'المالية',
    'مالية': 'المالية',
    'أموال': 'المالية',
    'money': 'المالية',
    'investment': 'الاستثمار',
    'استثمار': 'الاستثمار',
    'science': 'العلوم',
    'علوم': 'العلوم',
    'research': 'البحوث',
    'بحوث': 'البحوث',
    'sports': 'الرياضة',
    'رياضة': 'الرياضة',
    'football': 'الرياضة',
    'كرة': 'الرياضة',
    'soccer': 'الرياضة',
    'travel': 'السفر',
    'سفر': 'السفر',
    'سياحة': 'السفر',
    'food': 'الطعام',
    'طعام': 'الطعام',
    'طبخ': 'الطعام',
    'cooking': 'الطعام',
  };

  const foundCategories = new Set<string>();
  keywords.forEach(keyword => {
    if (categoryMap[keyword]) {
      foundCategories.add(categoryMap[keyword]);
    }
  });

  // Add default categories if none found
  if (foundCategories.size === 0) {
    foundCategories.add('التكنولوجيا');
    foundCategories.add('الصحة');
    foundCategories.add('الأعمال');
  }

  return Array.from(foundCategories).map((name, index) => ({
    id: `cat-${index + 1}`,
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    isActive: index === 0,
    sortOrder: index,
  }));
};

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'مستقبل الذكاء الاصطناعي في تطوير التطبيقات',
    excerpt: 'كيف يعيد الذكاء الاصطناعي تشكيل الطريقة التي نبني بها التطبيقات المحمولة.',
    content: 'يقوم الذكاء الاصطناعي بثورة في تطوير التطبيقات المحمولة من خلال تمكين المطورين من إنشاء تطبيقات أكثر ذكاءً وبديهية. من النص التنبؤي إلى التعرف على الصور، تصبح قدرات الذكاء الاصطناعي جزءاً لا يتجزأ من تجارب الهاتف المحمول الحديثة.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    source: 'تك ديلي',
    time: 'منذ ساعتين',
    categorySlug: 'التكنولوجيا',
  },
  {
    id: '2',
    title: 'بناء واجهات مستخدم أفضل مع React Native',
    excerpt: 'أفضل الممارسات لإنشاء واجهات محمولة متجاوبة وسهلة الوصول.',
    content: 'يستمر React Native في التطور كإطار عمل قوي لتطوير التطبيقات متعددة المنصات. تستكشف هذه المقالة أحدث التقنيات لبناء واجهات مستخدم جميلة وعالية الأداء.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop',
    source: 'أسبوعية تطوير المحمول',
    time: 'منذ 4 ساعات',
    categorySlug: 'التكنولوجيا',
  },
  {
    id: '3',
    title: '10 نصائح لنوم أفضل وصحة أكبر',
    excerpt: 'استراتيجيات مدعومة علمياً لتحسين جودة النوم والعافية العامة.',
    content: 'النوم الجيد أساس الصحة الجيدة. تظهر الأبحاث أن النظافة الصحية للنوم يمكن أن تحسن بشكل كبير من الرفاهية الجسدية والعقلية.',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=250&fit=crop',
    source: 'مجلة الصحة',
    time: 'منذ 6 ساعات',
    categorySlug: 'الصحة',
  },
  {
    id: '4',
    title: 'اتجاهات تمويل الشركات الناشئة في 2024',
    excerpt: 'تحليل أنماط الاستثمار الجريء والفرص الناشئة.',
    content: 'تستمر بيئة الشركات الناشئة في التطور مع نماذج التمويل الجديدة وتفضيلات المستثمرين. فهم هذه الاتجاهات أمر بالغ الأهمية لرواد الأعمال.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop',
    source: 'بزنس إنسايدر',
    time: 'منذ يوم',
    categorySlug: 'الأعمال',
  },
  {
    id: '5',
    title: 'شرح خوارزميات التعلم الآلي',
    excerpt: 'دليل مبسط لفهم المفاهيم الأساسية لتعلم الآلة.',
    content: 'قد يبدو التعلم الآلي معقداً، لكن فهم الخوارزميات الأساسية هو الخطوة الأولى لإتقان هذه التقنية القوية.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    source: 'أبحاث الذكاء الاصطناعي',
    time: 'منذ يوم',
    categorySlug: 'الذكاء-الاصطناعي',
  },
];