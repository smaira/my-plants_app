import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, StatusBar as NativeStatusBar } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
} from "@expo-google-fonts/inter";
import { AkayaKanadaka_400Regular } from "@expo-google-fonts/akaya-kanadaka";
import { RootSiblingParent } from "react-native-root-siblings";
import * as Sentry from "sentry-expo";

import HomeScreen from "screens/home";
import AddPlantScreen from "screens/plants/add";
import EditPlant from "screens/plants/edit";
import PlantHistory from "screens/plants/history";
import SettingsScreen from "screens/settings";
import LoginScreen from "screens/login";
import RegisterScreen from "screens/register";
import SettingsNotificationsScreen from "screens/settings/notifications";
import SettingsAccountScreen from "screens/settings/account";
import SettingsAccountChangePasswordScreen from "screens/settings/account/changePassword";
import SettingsAccountConfirmEmailScreen from "screens/settings/account/confirmEmail";
import { store, persistor } from "store";
import "./i18n";

export type RootStackParamList = {
  login: undefined;
  register: undefined;
  home: undefined;
  addPlant: undefined;
  editPlant: { plantId: string };
  plantHistory: { plantId: string };

  settings: undefined;
  settingsAccount: undefined;
  settingsAccountChangePassword: undefined;
  settingsNotifications: undefined;
  settingsAccountConfirmEmail: undefined;
};

Sentry.init({
  dsn: "https://bb2c2200bc6d42d2a2fe98aa5b3d35a1@o1400884.ingest.sentry.io/6730902",
  enableInExpoDevelopment: true,
  debug: true,
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_300Light,
    AkayaKanadaka_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <SafeAreaView>
            {/* Workaround for devices with native StatusBar */}
            <View style={{ paddingTop: NativeStatusBar.currentHeight }}>
              <StatusBar />
            </View>
          </SafeAreaView>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="login"
                component={LoginScreen}
                options={{ gestureEnabled: false }}
              />
              <Stack.Screen name="register" component={RegisterScreen} />
              <Stack.Screen
                name="home"
                component={HomeScreen}
                options={{ gestureEnabled: false }}
              />

              <Stack.Screen name="addPlant" component={AddPlantScreen} />
              <Stack.Screen name="editPlant" component={EditPlant} />
              <Stack.Screen name="plantHistory" component={PlantHistory} />

              <Stack.Screen name="settings" component={SettingsScreen} />
              <Stack.Screen
                name="settingsNotifications"
                component={SettingsNotificationsScreen}
              />
              <Stack.Screen
                name="settingsAccount"
                component={SettingsAccountScreen}
              />
              <Stack.Screen
                name="settingsAccountChangePassword"
                component={SettingsAccountChangePasswordScreen}
              />
              <Stack.Screen
                name="settingsAccountConfirmEmail"
                component={SettingsAccountConfirmEmailScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}
