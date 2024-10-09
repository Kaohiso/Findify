import React, { useState, useRef } from "react";
import { Animated, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AnimatedIconProps {
  onPress: () => void;
  name: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
}

export default function AnimatedIcon({
  onPress,
  name,
  disabled,
  ...rest
}: AnimatedIconProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

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
      style={{ padding: 10 }}
      {...rest}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons name={name} size={24} />
      </Animated.View>
    </Pressable>
  );
}
