import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Colors from "../tools/colors";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-gesture-handler";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, firestore } from "../firebase";

const ChatScreen = ({ navigation, route }) => {
  // The chat screen component for every chat initiated

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      //headerTitle: route.params.chatName,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: -10,
          }}
        >
          <Avatar rounded source={require("../assets/user.png")} />
          <Text style={{ color: Colors.white, fontSize: 20, marginLeft: 10 }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.3}
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color={Colors.white} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            marginRight: 10,
            justifyContent: "space-around",
            width: 100,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sendMessage = async (input) => {
    Keyboard.dismiss();

    try {
      // Create a new message document in the 'messages' sub-collection

      const chatId = route.params.id;

      const messagesRef = doc(
        collection(firestore, "chats", chatId, "messages")
      );

      const messageData = {
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: "../assets/user.png",
      };

      await setDoc(messagesRef, messageData);

      setInput("");
    } catch (error) {
      console.error("Error sending the message: ", error);
    }
  };

  useLayoutEffect(() => {
    const chatId = route.params.id;
    const messagesRef = collection(firestore, "chats", chatId, "messages");

    const unsubscribe = onSnapshot(
      query(messagesRef, orderBy("timestamp", "asc")),
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setMessages(messages);
      }
    );

    return unsubscribe;
  }, [route]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp.toDate()); // Convert Firestore timestamp to JavaScript Date object
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Format hours and minutes to ensure they are two digits
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${formattedHours}:${formattedMinutes}`;
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blue }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* This is a fragment block */}
          <>
            <ScrollView contentContainerStyle={{paddingTop: 15}}>
              {/* Take all the messages and show them on the screen by sender or receiver */}
              {messages.map(({ id, data }) =>
              
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver} elevation={8}>
                    <Avatar rounded position="absolute" size={30} bottom={-15} right={-5} source={require("../assets/user.png")} />
                    <Text style={styles.receiverMessage}>{data.message}</Text>
                    <Text style={{color: Colors.grey}}>{formatTimestamp(data.timestamp)}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender} elevation={8}>
                    <Avatar rounded position="absolute" size={30} bottom={-15} left={-5} source={require("../assets/user.png")} />
                    <Text style={{color: Colors.grey, fontSize: 12}}>{data.displayName}</Text>
                    <Text style={styles.senderMessage}>{data.message}</Text>
                    <Text style={{color: Colors.grey, alignSelf: "flex-end"}}>{formatTimestamp(data.timestamp)}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder="Message"
                placeholderTextColor={Colors.grey}
                style={styles.textInput}
              />
              <TouchableOpacity
                onPress={() => sendMessage(input)}
                activeOpacity={0.3}
              >
                <Ionicons name="send" size={24} color={"white"} />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },

  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    padding: 10,
    borderRadius: 30,
    backgroundColor: Colors.darkBlue,
    color: Colors.white,
  },

  receiver: {
    padding: 15,
    backgroundColor: Colors.darkBlue,
    alignSelf: "flex-end",
    position: "relative",
    maxWidth: "80%",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    shadowOpacity: 0.6,
    shadowOffset: {width: -2, height: 10},
    shadowRadius: 4,
    shadowColor: Colors.black
  },

  receiverMessage: {
    color: Colors.white,
    fontWeight: "400",
    marginLeft: 10,
    fontSize: 17
  },

  sender: {
    padding: 15, 
    backgroundColor: Colors.darkBlue,
    alignSelf: "flex-start",
    position: "relative",
    maxWidth: "80%",
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    shadowOpacity: 0.6,
    shadowOffset: {width: -2, height: 10},
    shadowRadius: 4,
    shadowColor: Colors.black
  },

  senderMessage: {
    color: Colors.white,
    fontWeight: "400",
    fontSize: 17,
    marginRight: 10
  }
});
