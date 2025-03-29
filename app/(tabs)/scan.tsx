import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Scan() {
  return (
    <>
      <Stack.Screen options={{ title: 'Scan' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/index.tsx" title="QR Code Scanner" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
