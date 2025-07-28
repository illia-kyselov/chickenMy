import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import OnboardingScreen from '../screens/OnboardingScreen';
import SecondScreen from '../screens/SecondScreen';
import MainScreen from '../screens/MainScreen';
import AddChickenScreen from '../screens/AddChickenScreen';
import ChickenDetailsScreen from '../screens/ChickenDetailsScreen';
import EditChickenScreen from '../screens/EditChickenScreen';
import StatsScreen from '../screens/StatsScreen';
import AddEggScreen from '../screens/AddEggScreen';
import RemindersScreen from '../screens/RemindersScreen';
import FeedingScreen from '../screens/FeedingScreen';
import CleaningScreen from '../screens/CleaningScreen';
import HealthScreen from '../screens/HealthScreen';
import NewReminderScreen from '../screens/NewReminderScreen';
import StatisticsPageScreen from '../screens/StatisticsPageScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UnitsScreen from '../screens/UnitsScreen';
import DateFormatScreen from '../screens/DateFormatScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Second" component={SecondScreen} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="AddChicken" component={AddChickenScreen} />
      <Stack.Screen name="ChickenDetails" component={ChickenDetailsScreen} />
      <Stack.Screen name="EditChicken" component={EditChickenScreen} />
      <Stack.Screen name="Stats" component={StatsScreen} />
      <Stack.Screen name="AddEggScreen" component={AddEggScreen} />
      <Stack.Screen name="RemindersScreen" component={RemindersScreen} />
      <Stack.Screen name="FeedingScreen" component={FeedingScreen} />
      <Stack.Screen name="CleaningScreen" component={CleaningScreen} />
      <Stack.Screen name="HealthScreen" component={HealthScreen} />
      <Stack.Screen name="NewReminderScreen" component={NewReminderScreen} />
      <Stack.Screen name="StatisticsPageScreen" component={StatisticsPageScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="UnitsScreen" component={UnitsScreen} />
      <Stack.Screen name="DateFormatScreen" component={DateFormatScreen} /> 
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
