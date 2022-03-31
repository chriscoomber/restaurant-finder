import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * See https://reactnavigation.org/docs/typescript#specifying-default-types-for-usenavigation-link-ref-etc
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

/**
 * Concepts used in the following types:
 * 
 * - Screen: a component which renders content to the screen
 * - Navigator: a component which manages navigation (e.g. a stack or a tab) to several routes,
 *   which may be Screens or (nested) Navigators
 * - Params: type-checked configuration that each component needs. `undefined` means none required,
 *   `| undefined ` means optional.
 * - Props: the actual properties passed to the component (screen or navigator). The params may be within that,
 *   e.g. `props.route.params`.
 * 
 * Note that the Props type for a screen contains more than just the params, as it contains a
 * navigator object as well as route information. 
 * 
 * See index.tsx for the navigation design for this app.
 */

/** 
 * Param types for components within RootStackNavigator
 */
export type RootStackParamList = {
  Tab: NavigatorScreenParams<TabParamList>;
  ExampleModal: undefined;
};

/** 
 * Props types for components within RootStackNavigator.
 */
export type RootStackScreenProps<ParamsTypeKey extends keyof RootStackParamList> 
    = NativeStackScreenProps<RootStackParamList, ParamsTypeKey>;

/**
 * Param types for components within TabNavigator
 */
export type TabParamList = {
  RestaurantStack: NavigatorScreenParams<RestaurantStackParamList>;
  Settings: undefined;
};

/**
 * Props types for components within TabNavigator.
 */
export type TabScreenProps<ParamsTypeKey extends keyof TabParamList> 
    = CompositeScreenProps<
      BottomTabScreenProps<TabParamList, ParamsTypeKey>,
      NativeStackScreenProps<RootStackParamList>
    >;

/**
 * Param types for components within RestaurantStackNavigator
 */
export type RestaurantStackParamList = {
  RestaurantSearch: undefined;
  RestaurantDetail: { restaurantId: string }
}

/**
 * Props type for components within RestaurantStackNavigator
 */
export type RestaurantStackScreenProps<ParamsTypeKey extends keyof RestaurantStackParamList> 
    = CompositeScreenProps<
      NativeStackScreenProps<RestaurantStackParamList, ParamsTypeKey>,
      CompositeScreenProps<
        BottomTabScreenProps<TabParamList>,
        NativeStackScreenProps<RootStackParamList>
      >
    >;