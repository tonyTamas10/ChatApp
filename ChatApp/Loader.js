import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import Colors from "./tools/colors";
import { ActivityIndicator } from "react-native";

// Loader component for when the registration is complete

const Loader = ({ visible = false }) => {
  const { height, width } = useWindowDimensions();

  return (
    visible && ( // visible is set to true after the user has pressed "Register"
      <View style={[styles.container, { height, width }]}>
        <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.white}/>
            <Text style={styles.text}>Loading...</Text>
        </View>
      </View>
    )
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },

  loader: {
    height: 70,
    backgroundColor: Colors.basicBlue,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 20
  },

  text: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: 400,
    color: Colors.white
  }
});
