import { StyleSheet, Text, View, Animated, Image } from 'react-native'
import React from 'react'
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context'
import Colors from './tools/colors'

const SplashScreen = () => {

    const edges = useSafeAreaInsets();

  return (
    <View style={styles.container}>
        <Animated.View style={styles.animation}>
            <Image source={require("../ChatApp/assets/chat(1).png")}></Image>
        </Animated.View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.darkBlue
    },

    animation: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})