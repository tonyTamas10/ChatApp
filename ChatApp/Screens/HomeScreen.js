import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, Image, Icon } from "react-native-elements";
import React, { useEffect } from "react";
import Input from "../Input";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../tools/colors";
import { database, auth } from "../firebase";
import CustomListItem from "../CustomListItem";

const HomeScreen = ({ navigation }) => {

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