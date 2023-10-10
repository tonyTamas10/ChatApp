import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { ListItem, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "./tools/colors";
import { useState } from "react";
import { firestore,  auth } from "./firebase";
import {
  Timestamp,
  orderBy,
  query,
  collection,
  onSnapshot,
} from "firebase/firestore";

// component for the chat preview (couldn't find another name for it)

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const chatId = id;
    const messagesRef = collection(firestore, "chats", chatId, "messages");

    const q = query(messagesRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setChatMessages(messages);
    });
    return unsubscribe;
  });

  return (
    <ListItem
      onPress={() => enterChat(id, chatName)}
      key={id}
      containerStyle={styles.container}
    >
      <Avatar
        style={styles.icon}
        rounded
        source={require("./assets/user.png")}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "bold", color: Colors.white }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: Colors.grey }}
        >
          {" "}
          {/* using elipsesizeMode in order to hide the rest of the message from a user if the message is too long */}
          {/* if there is no conversation started with the contact we display nothing */}
          {chatMessages[0] ? (
            <Text style={{fontWeight: "500"}}>
              {chatMessages[0]?.data.displayName ===
              auth.currentUser.displayName
                ? "You"
                : chatMessages[0]?.data.displayName}
              : {chatMessages[0]?.data.message}
            </Text>
          ) : "..."}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.blue,
  },

  icon: {
    width: 50,
    height: 50,
  },
});
