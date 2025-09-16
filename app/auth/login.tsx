// app/auth/login.tsx
import { useRouter } from 'expo-router';
import { sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../lib/firebase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Missing info', 'Enter email and password');
    setBusy(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);

      //Block unverified accounts and resend the email
      if (!cred.user.emailVerified) {
        await sendEmailVerification(cred.user);
        await signOut(auth); // sign them out
        Alert.alert(
          'Email not verified',
          'We re-sent the verification link. Please verify your email, then log in again.'
        );
        return;
      }

     
      router.replace('/start'); 
    } catch (e: any) {
      Alert.alert('Sign in failed', e?.message ?? 'Unable to sign in');
    } finally {
      setBusy(false);
    }
  };

  const handleGuest = () => {
    router.replace('/start'); 
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Enter your credentials below</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={busy}>
        <Text style={styles.btnText}>{busy ? 'Signing in…' : 'Sign In'}</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff7e6', padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 3 },
  subtitle: { marginBottom: 18, color: '#555', textAlign: 'center' },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
  btn: { backgroundColor: '#FFC107', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 6 },
  btnText: { fontWeight: '700', color: '#111' },
  guestBtn: { marginTop: 12, alignItems: 'center' },
  guestText: { fontWeight: '700', fontSize: 16, color: '#F4B400' },
  footer: { textAlign: 'center', marginTop: 16, color: '#444' },
  link: { fontWeight: '700', color: '#111' },
});
