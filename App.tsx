import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ReadingScreen } from './src/screens/ReadingScreen';
import { getCategories } from './src/utils/storage';
import { colors } from './src/utils/colors';
import { RootStackParamList, Article } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
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

  if (isLoading) {
    return <View style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.background} 
        translucent={false}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: colors.background },
          }}
        >
          {!hasCompletedOnboarding ? (
            <Stack.Screen name="Onboarding">
              {() => <OnboardingScreen onComplete={handleOnboardingComplete} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Home">
                {({ navigation }) => (
                  <HomeScreen 
                    onArticlePress={(article) => handleArticlePress(article, navigation)}
                    onEditCategories={() => handleEditCategories(navigation)}
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loading: {
    flex: 1,
    backgroundColor: colors.background,
  },
});