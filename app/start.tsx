// app/start.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function Start() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Lava Pizza Admin!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff7e6' },
  text: { fontSize: 20, fontWeight: '700' },
});
