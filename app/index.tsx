// app/index.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

const { width, height } = Dimensions.get('window');

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // Wait 1.2s so splash is visible
      setTimeout(() => {
        if (user) {
         // router.replace('/(tabs)/orders'); // or your start screen
        } else {
          router.replace('/auth/login');
        }
      }, 1200);
    });

    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC800', // brand yellow background
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Make logo scale nicely (70-80% width)
  logo: {
    width: width * 0.7,
    height: height * 0.3,
  },
});
