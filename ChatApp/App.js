import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import SplashScreen from "./Screens/SplashScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

//SplashScreen.preventAutoHideAsync();
//setTimeout(SplashScreen.hideAsync, 3000);

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#082032" },
  headerTitleStyle: { color: "#fff" },
  headerTintColor: "white",
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator initialRouteName="Splash" screenOptions={globalScreenOptions}>
        {isLoading ? ( // show the splash screen if we just started the app, then proceed to the LoginScreen
          <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Register" component={RegisterScreen}/>
          </>
        )}
      </Stack.Navigator>
      </NavigationContainer>
  );
}
