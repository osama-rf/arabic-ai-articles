import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ReadingScreen } from './src/screens/ReadingScreen';
import { DrawerContent } from './src/components/DrawerContent';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { useTheme } from './src/hooks/useTheme';
import { getCategories } from './src/utils/storage';
import { RootStackParamList, Article } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const AppContent = () => {
  const { colors } = useTheme();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force RTL layout
    I18nManager.forceRTL(true);
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const categories = await getCategories();
      setHasCompletedOnboarding(categories.length > 0);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setHasCompletedOnboarding(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
  };

  const handleArticlePress = (article: Article, navigation: any) => {
    navigation.navigate('Reading', { article });
  };

  const handleBackToHome = (navigation: any) => {
    navigation.goBack();
  };

  const handleEditCategories = (navigation: any) => {
    navigation.navigate('EditCategories');
  };

  const handleCategoriesUpdated = (navigation: any) => {
    navigation.goBack();
  };

  const handleMenuPress = (navigation: any) => {
    navigation.openDrawer();
  };

  // Main Stack Navigator
  const MainStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Home">
        {({ navigation }) => (
          <HomeScreen 
            onArticlePress={(article) => handleArticlePress(article, navigation)}
            onEditCategories={() => handleEditCategories(navigation)}
            onMenuPress={() => handleMenuPress(navigation)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Reading">
        {({ route, navigation }) => (
          <ReadingScreen 
            article={route.params?.article}
            onBack={() => handleBackToHome(navigation)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="EditCategories">
        {({ navigation }) => (
          <OnboardingScreen 
            onComplete={() => handleCategoriesUpdated(navigation)}
            isEditing={true}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );

  if (isLoading) {
    return <View style={[styles.loading, { backgroundColor: colors.background }]} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={colors.text === '#f8fafc' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
        translucent={false}
      />
      <NavigationContainer>
{!hasCompletedOnboarding ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen name="Onboarding">
              {() => <OnboardingScreen onComplete={handleOnboardingComplete} />}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Drawer.Navigator
            drawerContent={() => <DrawerContent />}
            screenOptions={{
              headerShown: false,
              drawerPosition: 'right',
              drawerType: 'slide',
              drawerStyle: {
                width: 280,
              },
            }}
          >
            <Drawer.Screen 
              name="MainApp" 
              component={MainStack}
            />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
  },
});