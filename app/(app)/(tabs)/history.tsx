import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import Blockchain from '~/components/blockchain/Blockchain';
import Transaction from '~/components/blockchain/Transaction';



export default function History() {

  let savjeeCoin = new Blockchain();
  
  console.log('Creating Transactions (2)...');
  savjeeCoin.createTransaction(new Transaction('address1', 'address2', 100));  
  savjeeCoin.createTransaction(new Transaction('address2', 'address1', 50));
  console.log('\n Starting the miner...');
  savjeeCoin.minePendingTransactions('xaviers-address');
  console.log('\nBalance of xavier is', savjeeCoin.getBalanceOfAddress('xaviers-address'));
  console.log('\n Starting the miner again...');
  savjeeCoin.minePendingTransactions('xaviers-address');
  console.log('\nBalance of xavier is', savjeeCoin.getBalanceOfAddress('xaviers-address'));

  return (
    <>
      <Stack.Screen options={{ title: 'Transaction History' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/history.tsx" title="Transaction History" />        
        <Text>Blockchain:</Text>
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
