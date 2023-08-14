import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, Image, Icon } from "react-native-elements";
import React from "react";
import Input from "../Input";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../tools/colors";

const LoginScreen = ({ navigation }) => {

  const signIn = () => {

  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 20, paddingTop: 50 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/chat(1).png")}
            style={styles.image}
          />
        </View>
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
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Button buttonStyle={styles.button} onPress={signIn} titleStyle={{color: Colors.grey}} title="Login" />
          <Button onPress={() => navigation.navigate("Register")} buttonStyle={styles.button} titleStyle={{color: Colors.grey}} title="Register" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
  },

  image: {
    width: 150,
    height: 150,
    marginBottom: 100,
  },

  button: {
    width: 150,
    borderRadius: 0,
    backgroundColor: Colors.darkBlue,
  }
});
