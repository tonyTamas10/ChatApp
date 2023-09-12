import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, Image, Icon } from "react-native-elements";
import React, { useEffect, useLayoutEffect } from "react";
import Input from "../Input";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../tools/colors";
import { database, auth } from "../firebase";
import CustomListItem from "../CustomListItem";

// main screen of the app with all the chats a user has

const HomeScreen = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "ChatApp",
            headerStyle: { backgroundColor: Colors.darkBlue},
        })
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <CustomListItem>

                </CustomListItem>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blue
    }
});