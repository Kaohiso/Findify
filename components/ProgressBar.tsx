import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface ProgressBarProps {
  step: number;
  steps: number;
  lightColor?: string;
  darkColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  lightColor,
  darkColor,
  step,
  steps,
}) => {
  const progress = (step + 1) / steps;
  const width = useSharedValue(0);
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  useEffect(() => {
    width.value = withTiming(progress, {
      duration: 500,
      easing: Easing.bezier(0.25, 1, 0.25, 1),
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${width.value * 100}%`,
    };
  });

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Animated.View style={[styles.progressBar, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 10,
    borderRadius: 5,
    marginTop: "2%",
    marginBottom: "5%",
  },
  progressBar: {
    height: "100%",
    backgroundColor: Colors.brand.primary,
    borderRadius: 5,
  },
});

export default ProgressBar;
