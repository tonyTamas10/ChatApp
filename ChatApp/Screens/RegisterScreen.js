import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity
} from "react-native";
import { Button } from "react-native-elements"
import React from "react";
import Colors from "../tools/colors";
import Input from "../Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";

{
  /* Register screen for new users */
}

const RegisterScreen = ({ navigation }) => {

  const register = () => {

  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
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
        {/* Input blocks for the user's credentials */}
        <Input
          placeholder="Enter your full name"
          placeholderTextColor={Colors.grey}
          iconName="account-circle-outline"
          label="Full Name"
        />
        <Input
          placeholder="Enter your email adress"
          autofocus
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
          onSubmitEditing={register}
        />

        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 15}}>
          <Button buttonStyle={styles.button} onPress={register} titleStyle={{color: Colors.grey}} title="Register" /> 
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAwareScrollView>
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

  button: {
    width: 150,
    backgroundColor: Colors.darkBlue,
    shadowColor: Colors.black,
    shadowColor: 'rgba(46, 229, 157, 0.4)',
  }
});
