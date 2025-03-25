import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ScreenContent } from '~/app/components/ScreenContent';
import { Button, ButtonText } from '@/components/ui/button';
export default function Home() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Tab One',
        }}
      />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/index.tsx" title="Tab One" />
        <Button action={'primary'} variant={'solid'} size={'md'} isDisabled={false}>
          <ButtonText>Hello World</ButtonText>
        </Button>
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
