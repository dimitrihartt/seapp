import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../../components/HeaderButton';
import { TabBarIconFontAwesome5 } from '~/components/TabBarIconF5';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIconFontAwesome5 name="home" color={color} />,
          tabBarLabel: 'Home',
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'My Wallet',
          tabBarLabel: 'My Wallet',
          tabBarIcon: ({ color }) => <TabBarIconFontAwesome5 name="wallet" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => <TabBarIconFontAwesome5 name="history" color={color} />,
        }}
      />
    </Tabs>
  );
}
