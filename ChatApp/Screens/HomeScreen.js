import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Button, Image, Icon, Avatar } from "react-native-elements";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Input from "../Input";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../tools/colors";
import { database, auth } from "../firebase";
import CustomListItem from "../CustomListItem";

// main screen of the app with all the chats a user has

const HomeScreen = ({ navigation }) => {

    const signOutUser = () => { // when the user presses the icon with his profile picture he will sign out
        auth.signOut().then(() => {
            navigation.replace("Login") // will replace the stack with the LoginScreen
        })
    };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is authenticated
        setUser(authUser);
      } else {
        // user is not authenticated, navigate back to the login screen
        navigation.navigate("Login");
      }
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "ChatApp",
      headerStyle: { backgroundColor: Colors.darkBlue },
      headerLeft: () => ( // configuration for the left side of the navigation header
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutUser}>
            <Avatar rounded source={require("../assets/user.png")} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CustomListItem></CustomListItem>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
});
