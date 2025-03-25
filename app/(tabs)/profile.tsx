import { View, Text, Image, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface User {
  firstName: string;
  familyName: string;
  email: string;
  phone: string;
  profilePicture: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<User>({
    firstName: 'Dimitri',
    familyName: 'Hartt',
    email: 'dimitrihartt@gmail.com',
    phone: '+5561999887755',
    profilePicture: 'https://picsum.photos/100',
  });

  const handleLogout = (): void => {
    router.push('/');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'My Profile' }} />
      <View className="mb-6 items-center"></View>

      {/* Profile Card */}
      <View className="m-4 items-center rounded-xl bg-gray-100 p-4">
        <Image
          source={{ uri: user.profilePicture }}
          className="h-20 w-20 rounded-full border-2 border-gray-300"
        />
        <Text className="mt-2 text-lg font-semibold">
          {user.firstName} {user.familyName}
        </Text>
        <Text className="text-gray-600">{user.email}</Text>
        <Text className="text-gray-600">{user.phone}</Text>
      </View>

      <View className="mt-6 rounded-xl bg-white p-4">
        <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
          <View className="flex-row items-center">
            <MaterialIcons name="dark-mode" size={20} className="mr-4 text-gray-500" />
            <Text className="text-gray-700">Dark Mode</Text>
          </View>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>

        {[
          { label: 'Personal Info', icon: 'person' as const },
          { label: 'Bank & Cards', icon: 'card' as const },
          { label: 'Transaction', icon: 'cash' as const },
          { label: 'Settings', icon: 'settings' as const },
          { label: 'Data Privacy', icon: 'lock-closed' as const },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between border-b border-gray-200 py-3">
            <View className="flex-row items-start">
              <Ionicons name={item.icon} size={20} className="flex items-center text-gray-500" />
              <Text className="ml-4 text-gray-700">{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} className="text-gray-500" />
          </TouchableOpacity>
        ))}
      </View>

      <View className="absolute bottom-6 w-full flex-row justify-center">
        <TouchableOpacity className="rounded-full bg-blue-500 p-4">
          <Ionicons name="scan" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}
