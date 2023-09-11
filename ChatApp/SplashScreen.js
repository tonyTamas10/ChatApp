import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Colors from './tools/colors';

const SplashScreen = ({ onAnimationComplete }) => {
  const navigation = useNavigation();

  const fadeInDuration = 2000;
  const fadeOutDuration = 2000;

  const startAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.sequence([
        // Fade in
        Animated.timing(startAnimation, {
          toValue: 1,
          duration: fadeInDuration,
          useNativeDriver: true,
        }),
  
        // Delay
        Animated.delay(1000), // Adjust the delay duration as needed
  
        // Fade out
        Animated.timing(startAnimation, {
          toValue: 0,
          duration: fadeOutDuration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Animation is complete, navigate to the login screen
        // navigation.navigate("Login");
        onAnimationComplete;
      });
    }, 5000);
  }, []);
  
  

  return (
    <View style={styles.container}>
      <Animatable.View
        style={[styles.animation, { opacity: startAnimation }]}
        animation="fadeIn"
        duration={fadeInDuration}
      >
        <Image source={require("../ChatApp/assets/chat.png")} style={{ width: 200, height: 200, marginBottom: 20 }} />
        <Text style={styles.title}>ChatApp</Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 70,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
