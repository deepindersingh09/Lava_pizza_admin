// hooks/useAuthGate.ts
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';


export function useAuthGate() {
const [user, setUser] = useState<User|null>(null);
const [loading, setLoading] = useState(true);
const [isAdmin, setIsAdmin] = useState<boolean>(false);


useEffect(() => {
const unsub = onAuthStateChanged(auth, async (u) => {
setUser(u);
if (!u) { setIsAdmin(false); setLoading(false); return; }
// refresh ID token to get latest custom claims
const token = await u.getIdTokenResult(true);
setIsAdmin(['admin','staff'].includes(token.claims.role as string));
setLoading(false);
});
return () => unsub();
}, []);


return { user, loading, isAdmin };
}