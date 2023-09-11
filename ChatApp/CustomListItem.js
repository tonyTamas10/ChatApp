import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from './tools/colors';


const CustomListItem = () => {
  return (
    <ListItem style={styles.container}>
      <Avatar rounded>
        <Icon name="account-circle-outline" style={{fontSize: 35}}/>
      </Avatar>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})