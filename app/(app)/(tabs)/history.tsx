import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import Blockchain from '~/components/blockchain/Blockchain';
import Transaction from '~/components/blockchain/Transaction';

export default function History() {

  let savjeeBlockchain = new Blockchain();
  let transaction = new Transaction('address1', 'address2', 101);
  //savjeeBlockchain.addTransaction(transaction);

  return (
    <>
      <Stack.Screen options={{ title: 'Transaction History' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/history.tsx" title="Transaction History" />        
        <Text>Blockchain:{transaction.}</Text>
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
