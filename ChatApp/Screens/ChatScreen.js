import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect } from "react";
import Colors from "../tools/colors";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

const ChatScreen = ({ navigation, route }) => {
  // The chat screen component for every chat initiated

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.chatName,
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
        <TouchableOpacity activeOpacity={0.3} style={{marginLeft: 10}} onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color={Colors.white}/>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.basicBlue,
  },
});
