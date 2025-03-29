import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ScreenContent } from '~/components/ScreenContent';
import { Button, ButtonText } from '~/components/ui/button';
export default function Home() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/index.tsx" title="Home" />
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
