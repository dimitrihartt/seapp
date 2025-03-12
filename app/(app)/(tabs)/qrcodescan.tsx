import React from 'react';
import { Stack } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import { useCameraPermissions } from 'expo-camera';

//https://www.youtube.com/watch?v=PZIEqcdFjpQ
export default function QRCodeScan() {
  const [permission, requestPermission] = useCameraPermissions();
  return (
    <>
      <Stack.Screen options={{ title: 'Transaction History' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/history.tsx" title="Transaction History" />
        <Button title="Request Camera Permission" onPress={requestPermission} />
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
