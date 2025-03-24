import { View, Text, Image, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    
    <SafeAreaView className="flex-1 bg-white p-4">
      <Stack.Screen options={{ title: 'My Profile' }} />
      <View className="items-center mb-6">        
      </View>

      {/* Profile Card */}
      <View className="bg-gray-100 m-4 p-4 rounded-xl items-center">
        <Image 
          source={{ uri: user.profilePicture }} 
          className="w-20 h-20 rounded-full border-2 border-gray-300"
        />
        <Text className="text-lg font-semibold mt-2">{user.firstName} {user.familyName}</Text>
        <Text className="text-gray-600">{user.email}</Text>
        <Text className="text-gray-600">{user.phone}</Text>
      </View>

      <View className="mt-6 bg-white rounded-xl p-4">
        <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
          <View className="flex-row items-center">
            <MaterialIcons name="dark-mode" size={20} className="text-gray-500 mr-4" />
            <Text className="text-gray-700">Dark Mode</Text>
          </View>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>

        {[{ label: 'Personal Info', icon: 'person' }, { label: 'Bank & Cards', icon: 'card' }, { label: 'Transaction', icon: 'cash' }, { label: 'Settings', icon: 'settings' }, { label: 'Data Privacy', icon: 'lock-closed' }].map((item, index) => (
          <TouchableOpacity key={index} className="flex-row items-center py-3 border-b border-gray-200">
            <Ionicons name={item.icon} size={20} className="text-gray-500 mr-4" />
            <Text className="text-gray-700">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="absolute bottom-6 w-full flex-row justify-center">
        <TouchableOpacity className="bg-blue-500 p-4 rounded-full">
          <Ionicons name="scan" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
