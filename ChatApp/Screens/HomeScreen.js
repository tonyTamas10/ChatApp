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
import { auth, firestore } from "../firebase";
import CustomListItem from "../CustomListItem";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import NewChatScreen from "./NewChatScreen";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

// Main screen of the app with all the chats a user has

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    // When the user presses the icon with his profile picture he will sign out
    auth.signOut().then(() => {
      navigation.replace("Login"); // Will replace the stack with the LoginScreen
    });
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const chatsCollection = collection(firestore, "chats"); // Providing the collection with all the chats

    const unsubscribe = onSnapshot(chatsCollection, (snapshot) => {
      // Unsubscribe to clean up the function, onSnapshot to get a live look at the collection
      const updatedChats = snapshot.docs.map((doc) => ({
        // Return a map with every doc from the collection
        id: doc.id,
        data: doc.data(),
      }));
      setChats(updatedChats); // List with every chat
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is authenticated
        setUser(authUser);
      } else {
        // User is not authenticated, navigate back to the login screen
        navigation.navigate("Login");
      }
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "ChatApp",
      headerStyle: { backgroundColor: Colors.darkBlue },
      headerLeft: () => (
        // Configuration for the left side of the navigation header
        // Only functionality of the user profile pic is to sign the user out when pressed
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutUser}>
            <Avatar rounded source={require("../assets/user.png")} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 20,
            width: 30,
          }}
        >
          <TouchableOpacity>
            <AntDesign name="camera" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ height: "100%" }}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("New Chat")}
        activeOpacity={0.3}
      >
        <SimpleLineIcons name="pencil" size={30} color={Colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue,
  },

  addButton: {
    backgroundColor: Colors.darkBlue,
    width: 70,
    height: 70,
    position: "absolute",
    bottom: 50,
    right: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
