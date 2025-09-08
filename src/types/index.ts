export interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  source: string;
  time: string;
  categorySlug: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Reading: { article: Article };
  EditCategories: undefined;
};