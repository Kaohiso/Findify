import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible, HelloWave, Logo, ThemedText ,ThemedView } from '@/components';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Logo />}>
    </ParallaxScrollView>
  );
}

