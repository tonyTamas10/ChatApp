import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

const ChatScreen = ({ navigation, route }) => {

  // The chat screen component for every chat initiated

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.chatName,
      
  })
  }, [navigation])

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
