import { useActionSheet } from '@expo/react-native-action-sheet';
import { useHeaderHeight } from '@react-navigation/elements';
import { Icon } from '@roninoss/icons';
import { TabBarIcon } from '~/components/TabBarIcon';
import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import * as StoreReview from 'expo-store-review';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import {
  Button as RNButton,
  ButtonProps,
  Linking,
  Platform,
  Share,
  useWindowDimensions,
  View,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import elliptic from 'elliptic';

import { Block } from '~/components/blockchain/Block';
import { Blockchain } from '~/components/blockchain/Blockchain';
import { Transaction } from '~/components/blockchain/Transaction';

import { Container } from '~/components/Container';
import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import { DatePicker } from '~/components/nativewindui/DatePicker';
import { Picker, PickerItem } from '~/components/nativewindui/Picker';
import { ProgressIndicator } from '~/components/nativewindui/ProgressIndicator';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Slider } from '~/components/nativewindui/Slider';
import { Text } from '~/components/nativewindui/Text';
import { Toggle } from '~/components/nativewindui/Toggle';
import { useColorScheme } from '~/lib/useColorScheme';
import { useHeaderSearchBar } from '~/lib/useHeaderSearchBar';

export default function Home() {
  const searchValue = useHeaderSearchBar({ hideWhenScrolling: COMPONENTS.length === 0 });

  const data = searchValue
    ? COMPONENTS.filter((c) => c.name.toLowerCase().includes(searchValue.toLowerCase()))
    : COMPONENTS;

  return (
    <>
      <Stack.Screen options={{ title: 'MyWallet' }} />
      <Container>
        <FlashList
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          data={data}
          estimatedItemSize={200}
          contentContainerClassName="py-4 android:pb-12"
          extraData={searchValue}
          removeClippedSubviews={false} // used for selecting text on android
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={renderItemSeparator}
          renderItem={renderItem}
          ListEmptyComponent={COMPONENTS.length === 0 ? ListEmptyComponent : undefined}
        />
      </Container>
    </>
  );
}

cssInterop(FlashList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

function DefaultButton({ color, ...props }: ButtonProps) {
  const { colors } = useColorScheme();
  return <RNButton color={color ?? colors.primary} {...props} />;
}

function ListEmptyComponent() {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const { colors } = useColorScheme();
  const height = dimensions.height - headerHeight - insets.bottom - insets.top;

  return (
    <View style={{ height }} className="flex-1 items-center justify-center gap-1 px-12">
      <Icon name="file-plus-outline" size={42} color={colors.grey} />
      <Text variant="title3" className="pb-1 text-center font-semibold">
        No Components Installed
      </Text>
      <Text color="tertiary" variant="subhead" className="pb-4 text-center">
        You can install any of the free components from the{' '}
        <Text
          onPress={() => Linking.openURL('https://nativewindui.com')}
          variant="subhead"
          className="text-primary">
          NativeWindUI
        </Text>
        {' website.'}
      </Text>
    </View>
  );
}

type ComponentItem = { name: string; component: React.FC };

function keyExtractor(item: ComponentItem) {
  return item.name;
}

function renderItemSeparator() {
  return <View className="p-2" />;
}

function renderItem({ item }: { item: ComponentItem }) {
  return (
    <Card title={item.name}>
      <item.component />
    </Card>
  );
}

function Card({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <View className="px-4">
      <View className="gap-4 rounded-xl border border-border bg-card p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none">
        <Text className="text-center text-sm font-medium tracking-wider opacity-60">{title}</Text>
        {children}
      </View>
    </View>
  );
}

let hasRequestedReview = false;

function getPublicKey() {
  const ec = new elliptic.ec('secp256k1');
  //const myKey = ec.genKeyPair(); // This is your wallet's key pair
  const myKey = ec.keyFromPrivate(
    '7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf'
  );
  // From that we can calculate your public key (which doubles as your wallet address)
  const publicKey = myKey.getPublic('hex');
  return publicKey;
}

const COMPONENTS: ComponentItem[] = [
  {
    name: 'Your Wallet Data',
    component: function SelectableTextExample() {
      return (
        <View>
          <Text uiTextView>Address:</Text>
          <Text uiTextView selectable>
            My Public Key is: {getPublicKey()}
          </Text>
          <Text uiTextView>Balance:</Text>
          <Text uiTextView selectable>
            US$ 19,00
          </Text>
        </View>
      );
    },
  },

  {
    name: 'Account Statement',
    component: function RatingsIndicatorExample() {
      return (
        <View className="gap-3">
          <Text className="pb-2 text-center font-semibold">Last 5 Transactions.</Text>
          <View className="flex-row">
            <TabBarIcon name="arrow-up" color="green" />
            <View className="flex-1">
              <Text variant="caption1" className="text-muted-foreground">
                US$ 12,00 to X123123123123123123123 on 12/12/2025 at 12:00
              </Text>
            </View>
          </View>
          <View className="flex-row">
            <TabBarIcon name="arrow-down" color="blue" />
            <View className="flex-1">
              <Text variant="caption1" className="text-muted-foreground">
                US$ 12,00 to X123123123123123123123 on 12/12/2025 at 12:00
              </Text>
            </View>
          </View>
          <View className="flex-row">
            <TabBarIcon name="arrow-up" color="green" />
            <View className="flex-1">
              <Text variant="caption1" className="text-muted-foreground">
                US$ 12,00 to
              </Text>
              <Text variant="caption1" className="text-muted-foreground">
                Cassia J.
              </Text>
              <Text variant="caption1" className="text-primary-foreground">
                on 12/12/2025 at 12:00
              </Text>
            </View>
          </View>
        </View>
      );
    },
  },

  {
    name: 'Bottom Sheet',
    component: function BottomSheetExample() {
      const { colorScheme } = useColorScheme();
      const bottomSheetModalRef = useSheetRef();

      return (
        <View className="items-center">
          <DefaultButton
            color={colorScheme === 'dark' && Platform.OS === 'ios' ? 'white' : 'black'}
            title="Open Bottom Sheet"
            onPress={() => bottomSheetModalRef.current?.present()}
          />
          <Sheet ref={bottomSheetModalRef} snapPoints={[200]}>
            <View className="flex-1 items-center justify-center pb-8">
              <Text>@gorhom/bottom-sheet 🎉</Text>
            </View>
          </Sheet>
        </View>
      );
    },
  },
];
