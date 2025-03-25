import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '~/app/components/ui/gluestack-ui-provider';

import '../global.css';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <GluestackUIProvider mode="light">
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </GluestackUIProvider>
    </SafeAreaView>
  );
}
