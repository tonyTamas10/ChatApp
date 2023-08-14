import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React from "react";
import Colors from "../tools/colors";
import Input from "../Input";
import { StatusBar } from "expo-status-bar";

{/*  */}

const RegisterScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={{ paddingHorizontal: 20, paddingTop: 50 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/chat(1).png")}
            style={styles.image}
          />
        </View>

        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "flex-end" }}
        >
          <Text style={styles.text}>Create a ChatApp account</Text>
        </View>
        {/* casutele pentru introducerea datelor noului utilizator */}
        <Input
          placeholder="Enter your full name"
          placeholderTextColor={Colors.grey}
          iconName="account-circle-outline"
          label="Full Name"
        />
        <Input
          placeholder="Enter your email adress"
          placeholderTextColor={Colors.grey}
          iconName="email-outline"
          label="Email"
        />
        <Input
          placeholder="Enter your password"
          placeholderTextColor={Colors.grey}
          iconName="lock-outline"
          label="Password"
          password
        />
        <Input
          placeholder="Confirm your password"
          placeholderTextColor={Colors.grey}
          iconName="lock-outline"
          label="Re-enter Password"
          password
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
  },

  image: {
    width: 150,
    height: 150,
    marginBottom: 60,
  },

  text: {
    color: Colors.grey,
    fontSize: 25,
    fontWeight: 800,
    paddingBottom: 50,
  },
});
