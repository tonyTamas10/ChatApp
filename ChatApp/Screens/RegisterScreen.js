import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import React, { useState } from "react";
import Colors from "../tools/colors";
import Input from "../Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import { database, auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Loader from "../Loader";
import { StackActions } from "@react-navigation/native";

/* Register screen for new users */

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setPasswordAgain] = useState("");
  const [loading, setLoading] = useState(false);

  // register function called when pressing the button or Enter on the last input field
  const register = () => {
    setLoading(true); // trigger the loading screen and wait for 3 seconds
    setTimeout(() => {}, 3000);

    // checking if the passwords entered are the same
    if (password != confirmPassword) {
      setLoading(false);
      alert(
        "Passwords do not match! Please make sure you entered the same password."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        const user = authUser.user;

        return updateProfile(user, {
          displayName: name,
        });
      })
      .then(() => {
        // registration is complete
        setLoading(false); // stop the loading screen
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  return (
    // using KeyboardAwareScrollView so that the keyboard won't cover up the input blocks
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <StatusBar style="light" />
      <Loader visible={loading} />
      <ScrollView style={{ paddingHorizontal: 20, paddingTop: 50 }}>
        <View style={{ alignItems: "center" }}>
          <Image source={require("../assets/chat.png")} style={styles.image} />
        </View>
        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "flex-end" }}
        >
          <Text style={styles.text}>Create a ChatApp account</Text>
        </View>

        <Input
          placeholder="Enter your full name"
          autofocus
          placeholderTextColor={Colors.grey}
          iconName="account-circle-outline"
          value={name}
          onChangeText={(text) => setName(text)}
          label="Full Name"
        />
        <Input
          placeholder="Enter your email adress"
          placeholderTextColor={Colors.grey}
          iconName="email-outline"
          value={email}
          onChangeText={(text) => setEmail(text)}
          label="Email"
        />
        <Input
          placeholder="Enter your password"
          placeholderTextColor={Colors.grey}
          iconName="lock-outline"
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          password
        />
        <Input
          placeholder="Confirm your password"
          placeholderTextColor={Colors.grey}
          iconName="lock-outline"
          label="Re-enter Password"
          value={confirmPassword}
          onChangeText={(text) => setPasswordAgain(text)}
          password
          // on last field when pressed enter this triggers the register function
          onSubmitEditing={register}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 15,
          }}
        >
          <Button
            buttonStyle={styles.button}
            onPress={register}
            titleStyle={{ color: Colors.grey }}
            title="Register"
          />
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
    shadowColor: "rgba(46, 229, 157, 0.4)",
  },
});
