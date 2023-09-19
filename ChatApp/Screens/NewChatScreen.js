import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Avatar, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../tools/colors";
import { firestore } from "../firebase";
import * as Contacts from "expo-contacts";
import { TouchableOpacity } from "react-native-gesture-handler";

const NewChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [contacts, setContacts] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Message",
    });
  }, [navigation]);

  const searchChat = async () => {
    // fetch contacts when the user initiates a search
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContacts(data);
      }
    }

    // we filter contacts based on the input provided
    const filteredContacts = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(input.toLowerCase()) ||
        (contact.phoneNumbers &&
          contact.phoneNumbers.some((phoneNumber) =>
            phoneNumber.number.includes(input)
          ))
    );

    console.log("Filtered Contacts:", filteredContacts);
  };

  useEffect(() => {
    searchChat(); // Fetch contacts when the component loads
  }, []);

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Search name or number"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={searchChat}
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: Colors.darkBlue,
          borderRadius: 20,
          marginTop: 20,
        }}
        leftIcon={
          <Icon
            name="search"
            type="antdesign"
            size={24}
            color={Colors.white}
            style={{ paddingLeft: 20, paddingRight: 10 }}
          />
        }
        inputStyle={{ color: Colors.white }}
      />

      {/* Display the filtered contacts */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.2} style={styles.contactBlock}>
            <Avatar rounded size={50} source={require("../assets/user.png")} />
            <Text style={styles.contactBlockText}>
              {item.name} - {item.phoneNumbers && item.phoneNumbers[0]?.number}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NewChatScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
  },

  contactBlock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.blue,
    margin: 20
  },

  contactBlockText: {
    color: Colors.white
  }
};
