import { useActionSheet } from '@expo/react-native-action-sheet';
import { useHeaderHeight } from '@react-navigation/elements';
import { Icon } from '@roninoss/icons';
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
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const { colors } = useColorScheme();
  const height = dimensions.height - headerHeight - insets.bottom - insets.top;

  function DefaultButton({ color, ...props }: ButtonProps) {
    const { colors } = useColorScheme();
    return <RNButton color={color ?? colors.primary} {...props} />;
  }

  function Card({ children, title }: { children: React.ReactNode; title: string }) {
    return (
      <View className="mt-4 px-4">
        <View className="gap-4 rounded-xl border border-border bg-card p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none">
          <Text className="text-center text-sm font-medium tracking-wider opacity-60">{title}</Text>
          {children}
        </View>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'MillionRay Wallet' }} />
      <Container>
        <ScrollView className="flex-1">
          <Card title="Welcome to MillionRay Wallet">
            <Text variant="largeTitle" className="text-center">
              Welcome to MillionRay Wallet!
            </Text>
            <Text variant="body" className="text-center">
              We are thrilled to have you join us on this exciting journey to revolutionize how we
              handle digital transactions. You've been specially invited to experience MillionRay
              Wallet, a cutting-edge decentralized wallet powered by the Sole-Blockchain, where your
              money is more secure and valuable than ever before.
            </Text>
            <Text variant="body" className="text-center">
              With MillionRay, you no longer have to worry about intermediaries or the safety of
              your assets. Your funds are protected by the strength of blockchain technology,
              ensuring that your transactions are private, fast, and irreversible.
            </Text>
            <Text variant="body" className="text-center">
              Sending and receiving funds has never been easier. Simply tap your phone against
              someone else’s, or scan their QR code, and your transfer is completed in seconds.
              Whether you're sending money to a friend or receiving payments, you can do it securely
              with just a few taps.
            </Text>
            <Text variant="body" className="text-center">
              Your funds are in your control at all times. This is the future of money—secure, fast,
              and decentralized.
            </Text>
            <Text variant="body" className="text-center">
              Thank you for being a part of MillionRay Wallet. We're excited to have you here!
            </Text>
          </Card>

          <Card title="Share and Win 10 Dollars">
            <DefaultButton
              onPress={async () => {
                try {
                  const result = await Share.share({
                    message: 'Be part of the MillionRay Way!',
                  });
                  if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                      // shared with activity type of result.activityType
                    } else {
                      // shared
                    }
                  } else if (result.action === Share.dismissedAction) {
                    // dismissed
                  }
                } catch (error: any) {
                  Alert.alert(error.message);
                }
              }}
              title="Share and Win"
            />
          </Card>
        </ScrollView>
      </Container>
    </>
  );
}
