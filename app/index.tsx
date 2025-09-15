// app/index.tsx (Login gate -> Tabs)
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useState } from 'react';
import { useAuthGate } from '../hooks/useAuthGate';


export default function Index() {
const { user, loading, isAdmin } = useAuthGate();
const [busy, setBusy] = useState(false);


if (loading) return <ActivityIndicator style={{ marginTop: 80 }} />;
if (user && isAdmin) return <Redirect href="/(tabs)/orders" />;


return (
<View style={{ padding: 24, flex: 1, justifyContent: 'center', gap: 16, backgroundColor: '#FFF2B8' }}>
<Text style={{ fontSize: 28, fontWeight: '800' }}>Lava Pizza Admin</Text>
<Text>Admins only. Use your staff account.</Text>


{/* Quick demo login UI – replace with proper form */}
<TouchableOpacity
style={{ backgroundColor: '#FFC800', padding: 14, borderRadius: 12, alignItems: 'center' }}
disabled={busy}
onPress={async () => {
try {
setBusy(true);
// TODO: replace demo creds
await signInWithEmailAndPassword(auth, 'admin@example.com', 'password123');
} catch (e: any) {
alert(e.message);
} finally { setBusy(false); }
}}
>
<Text style={{ fontWeight: '700' }}>{busy ? 'Signing in…' : 'Sign in (demo)'}</Text>
</TouchableOpacity>


<Link href="https://" asChild>
<Text style={{ textDecorationLine: 'underline', marginTop: 12 }}>Need help?</Text>
</Link>
</View>
);
}