import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Image, Icon } from "react-native-elements";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../tools/colors";
import { database, auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // we use replace in order to replace all the other screens from the stack
        // so that we can not go back to the LoginScreen for example
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {

      signInWithEmailAndPassword(auth, email, password)
      .catch((error) => alert(error));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 20, paddingTop: 50 }}>
        <View style={{ alignItems: "center" }}>
          <Image source={require("../assets/chat.png")} style={styles.image} />
        </View>
        <Input
          placeholder="Enter your email adress"
          placeholderTextColor={Colors.grey}
          iconName="email-outline"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Enter your password"
          placeholderTextColor={Colors.grey}
          iconName="lock-outline"
          label="Password"
          password
          onSubmitEditing={signIn}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            buttonStyle={styles.button}
            onPress={signIn}
            titleStyle={{ color: Colors.grey }}
            title="Login"
          />
          <Button
            onPress={() => navigation.navigate("Register")}
            buttonStyle={styles.button}
            titleStyle={{ color: Colors.grey }}
            title="Register"
          />
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
  },
});
