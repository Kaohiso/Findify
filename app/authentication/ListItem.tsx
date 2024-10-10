// ListItem.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  Pressable,
  ImageBackground,
  LayoutChangeEvent,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components";
import AnimatedHeart from "./AnimatedHeart";

interface CategoryProps {
  id: number;
  name: string;
}

const ListItem = ({ item }: { item: CategoryProps }) => {
  const [showHeart, setShowHeart] = React.useState(false);
  const [itemWidth, setItemWidth] = useState(0);
  const height = React.useMemo(
    () => Math.floor(Math.random() * (230 - 170 + 1) + 170),
    []
  );
  const id = item.id + 10;
  const source = `https://picsum.photos/id/${id.toString()}/200/300`;

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
  };

  const handlePress = () => {
    setShowHeart(!showHeart);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setItemWidth(width);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View style={[styles.item, { height }, animatedStyle]}>
        <ImageBackground
          source={{ uri: source }}
          resizeMode="cover"
          style={styles.image}
        >
          <LinearGradient
            colors={["transparent", "black"]}
            style={styles.linearGradient}
          >
            <ThemedText
              type="subtitle"
              weight="bold"
              numberOfLines={2}
              style={{ color: "white" }}
            >
              {item?.name}
            </ThemedText>
          </LinearGradient>
        </ImageBackground>
        <AnimatedHeart show={showHeart} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 5,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  linearGradient: {
    padding: 10,
  },
});

export default ListItem;
