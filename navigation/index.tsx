/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ExampleModalScreen from '../screens/ExampleModalScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import RestaurantSearchScreen from '../screens/RestaurantSearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RestaurantStackParamList, RestaurantStackScreenProps, RootStackParamList, TabParamList, TabScreenProps } from './types';

/**
 * Navigation model is as follows.
 * 
 * RootStackNavigator:
 * - TabNavigator:
 *     - RetaurantStackNavigator (default):
 *         - RestaurantSearchScreen (default)
 *         - RestaurantDetailScreen (from RestaurantSearchScreen only)
 *     - SettingsScreen
 * - ...Modals (any page can navigate to a modal)
 */
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootStackNavigator />
    </NavigationContainer>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();
function RootStackNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="ExampleModal" component={ExampleModalScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<TabParamList>();
function TabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="RestaurantStack"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <Tab.Screen
        name="RestaurantStack"
        component={RestaurantStackNavigator}
        options={{ 
          headerShown: false,
          title: 'Search Screen',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
         }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings Screen',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const RestaurantStack = createNativeStackNavigator<RestaurantStackParamList>();
function RestaurantStackNavigator() {
  const colorScheme = useColorScheme();

  return (
    <RestaurantStack.Navigator>
      <RestaurantStack.Screen
        name="RestaurantSearch"
        component={RestaurantSearchScreen}
        options={(props: RestaurantStackScreenProps<"RestaurantSearch">) => ({
          title: 'Restaurant Search',
          headerRight: () => (
            <Pressable
              onPress={() => props.navigation.navigate('ExampleModal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
        />
      <RestaurantStack.Screen name="RestaurantDetail" component={RestaurantDetailScreen}/>
    </RestaurantStack.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
