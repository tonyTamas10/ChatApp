import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Avatar, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../tools/colors";
import { auth, firestore } from "../firebase";
//import * as Contacts from "expo-contacts";
//import { TouchableOpacity } from "react-native-gesture-handler";

const NewChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  //const [contacts, setContacts] = useState([]);
  //const [filteredContacts, setFilteredContacts] = useState([]);
  
  const createChat = async () => {
    try {
      firestore.collection("chats").add({ chatName: input });
      navigation.replace("Chat");
    } catch (error) {
      console.error("Error creating chat:", error);
      // Handle the error here, such as displaying an alert to the user.
      alert("Error creating chat. Please try again later.");
    }
  };
  

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Message",
    });
  }, [navigation]);

  {
    /*
  const searchChat = async () => {
    try {
      // Request permissions and fetch contacts
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          // Set contacts state
          setContacts(data);

          // Filter contacts based on the input provided
          const filtered = data.filter(
            (contact) =>
              contact.name.toLowerCase().includes(input.toLowerCase()) ||
              (contact.phoneNumbers &&
                contact.phoneNumbers.some((phoneNumber) =>
                  phoneNumber.number.includes(input)
                ))
          );

          // Set filtered contacts as the data source
          setFilteredContacts(filtered);
        }
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    searchChat(); // Fetch contacts when the component loads
  }, []);
*/
  }

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Search name or number"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
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

      {/* Display the filtered contacts
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.2}
            style={styles.contactBlock}
            onPress={() => createChat(item, navigation)}
          >
            <Avatar rounded size={50} source={require("../assets/user.png")} />
            <View style={{ margin: 10 }}>
              <Text style={styles.contactBlockText}>{item.name}</Text>
              <Text style={{ color: Colors.grey, fontSize: 16 }}>
                {item.phoneNumbers && item.phoneNumbers[0]?.number}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
        */}
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
    margin: 20,
  },

  contactBlockText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: "bold",
  },
};
