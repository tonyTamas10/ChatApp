import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";

const Stack = createStackNavigator();

const defaultScreenOptions = {
  headerStyle: { backgroundColor: "#082032" },
  headerTitleStyle: { color: "#fff" },
  headerTintColor: "white",
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}