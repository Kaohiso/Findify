import React, { useRef } from "react";
import { Text, Animated, Pressable, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

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
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const backgroundColor = Colors.brand.primary;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
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
        style={[
          styles.button,
          { backgroundColor, transform: [{ scale: scaleAnim }] },
        ]}
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
