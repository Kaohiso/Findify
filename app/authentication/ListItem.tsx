import React, { memo } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { StyleSheet, Pressable, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components";
import AnimatedHeart from "./AnimatedHeart";
import { useLikedCategories } from "@/context/likedCategoriesContext";

interface CategoryProps {
  id: number;
  name: string;
}

interface ListItemProps {
  item: CategoryProps;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const { liked, toggleLike, isLiked } = useLikedCategories();

  const height = React.useMemo(
    () => Math.floor(Math.random() * (230 - 170 + 1) + 170),
    []
  );

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

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => toggleLike(item.id)}
    >
      <Animated.View style={[styles.item, { height }, animatedStyle]}>
        <ImageBackground
          source={{ uri: `https://picsum.photos/id/${item.id + 10}/200/300` }}
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
        <AnimatedHeart show={isLiked(item.id)} />
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

export default memo(ListItem);
