import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "./tools/colors";

// component for the chat preview (couldn't find another name for it)

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} containerStyle={styles.container}>
      <Avatar style={styles.icon} rounded source={require("./assets/user.png")} />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: "bold", color: Colors.white}}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{color: Colors.grey}}> {/* using elipsesizeMode in order to hide the rest of the message from a user if the message is too long */}
          This is a test in order for me to figure if this is looking great or not
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
    backgroundColor: Colors.blue
  },

  icon: {
    width: 50,
    height: 50
  }
});
