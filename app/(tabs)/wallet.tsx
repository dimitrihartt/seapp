import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Wallet() {
  return (
    <>
      <Stack.Screen options={{ title: 'Wallet' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/index.tsx" title="Wallet" />
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
