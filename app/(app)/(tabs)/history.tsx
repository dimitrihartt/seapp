import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function History() {
  return (
    <>
      <Stack.Screen options={{ title: 'Transaction History' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/history.tsx" title="Transaction History" />
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
