import { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

async function save(key: string, value: string): Promise<void> {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string): Promise<void> {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    result;
  } else {
    null;
  }
}
