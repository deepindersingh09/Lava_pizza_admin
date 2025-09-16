// app/auth/choose.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ChooseRole() {
  const router = useRouter();
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Who’s signing in?</Text>
      <Text style={styles.sub}>Choose your portal to continue</Text>

      <TouchableOpacity
        style={[styles.btn, styles.admin]}
        onPress={() => router.push('/auth/login?role=admin')}
      >
        <Text style={styles.btnText}>Admin Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, styles.staff]}
        onPress={() => router.push('/auth/login?role=staff')}
      >
        <Text style={styles.btnText}>Staff Login</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Use your work email. Unverified accounts will be blocked.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff7e6', padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '900', textAlign: 'center', color: '#111' },
  sub: { textAlign: 'center', color: '#555', marginTop: 6, marginBottom: 24 },
  btn: { padding: 16, borderRadius: 14, alignItems: 'center', marginBottom: 12 },
  admin: { backgroundColor: '#FFC107' },
  staff: { backgroundColor: '#FFD54F' },
  btnText: { fontWeight: '800', color: '#111' },
  note: { textAlign: 'center', color: '#666', marginTop: 12 },
});
