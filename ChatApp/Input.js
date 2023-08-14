import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../ChatApp/tools/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native";

{
  /* input function with several properties */
}
const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  {
    /* for hiding the password when entered */
  }
  const [hidePassword, setHidePassword] = React.useState(password);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer]}>
        <Icon
          name={iconName}
          style={{ fontSize: 18, color: Colors.grey, marginRight: 10 }}
        ></Icon>
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
          }}
          style={{ color: Colors.grey, flex: 1 }}
          {...props}
        />
        {/* if we have a password input block we should hide the input (the icon can be pressed to show the input) */}
        {password && (
          <Icon
            name="eye-outline"
            style={{ color: Colors.grey, fontSize: 18 }}
            onPress={() => setHidePassword(!hidePassword)}
          />
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 500,
    color: Colors.grey,
  },

  inputContainer: {
    flexDirection: "row",
    backgroundColor: Colors.basicBlue,
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 20,
    borderWidth: 0,
    alignItems: "center",
  },
});
