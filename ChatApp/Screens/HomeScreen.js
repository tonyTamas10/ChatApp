import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, Image, Icon } from "react-native-elements";
import React, { useEffect } from "react";
import Input from "../Input";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../tools/colors";
import { database, auth } from "../firebase";

const HomeScreen = ({ navigation }) => {

    return(
        <View>
            <Text>This is the Home page</Text>
        </View>
    );
};

export default HomeScreen

const styles = StyleSheet.create({

});