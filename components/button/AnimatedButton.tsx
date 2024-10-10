import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface AnimatedButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export default function AnimatedButton({
  onPress,
  title,
  disabled,
  ...rest
}: AnimatedButtonProps) {
  const scale = useSharedValue(1);
  const backgroundColorDisable = useThemeColor({}, "disable");
  const backgroundColor = disabled
    ? backgroundColorDisable
    : Colors.brand.primary;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      <Animated.View
        style={[styles.button, { backgroundColor }, animatedStyle]}
      >
        <Text style={[styles.text, { color: "white" }]}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
