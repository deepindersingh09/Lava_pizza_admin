// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';


export default function TabsLayout() {
return (
<Tabs
screenOptions={{
headerStyle: { backgroundColor: '#FFF2B8' },
headerShadowVisible: false,
tabBarActiveTintColor: '#111',
tabBarStyle: { backgroundColor: '#FFC800' },
}}
>
<Tabs.Screen name="orders" options={{ title: 'Orders' }} />
<Tabs.Screen name="menu" options={{ title: 'Menu' }} />
<Tabs.Screen name="promos/coupons" options={{ title: 'Coupons' }} />
<Tabs.Screen name="promos/rewards" options={{ title: 'Rewards' }} />
<Tabs.Screen name="analytics" options={{ title: 'Analytics' }} />
</Tabs>
);
}