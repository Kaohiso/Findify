import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AnimatedHeartProps {
  show: boolean;
}

const line = {
  width: 3,
  height: 15,
};

const AnimatedHeart: React.FC<AnimatedHeartProps> = ({ show }) => {
  const heartOpacity = useSharedValue(0);
  const linesOpacity = useSharedValue(0);
  const linesScale = useSharedValue(0.5);

  const heartStyle = useAnimatedStyle(() => ({
    position: "absolute",
    bottom: 5,
    right: 5,
    opacity: heartOpacity.value,
  }));

  const linesStyle = useAnimatedStyle(() => ({
    position: "absolute",
    bottom: 0,
    right: 0,
    opacity: linesOpacity.value,
    transform: [{ scale: linesScale.value }],
  }));

  useEffect(() => {
    if (show) {
      heartOpacity.value = withTiming(1, { duration: 200 });
      linesOpacity.value = withSequence(
        withDelay(100, withTiming(1, { duration: 100 })),
        withDelay(300, withTiming(0, { duration: 200 }))
      );
      linesScale.value = withSequence(
        withDelay(
          100,
          withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) })
        ),
        withDelay(100, withTiming(1.2, { duration: 200 }))
      );
    } else {
      heartOpacity.value = withTiming(0, { duration: 500 });
      linesOpacity.value = withTiming(0, { duration: 200 });
      linesScale.value = withTiming(0.5, { duration: 200 });
    }
  }, [show]);

  const renderLines = () => {
    const lines = [];
    for (let i = 0; i < 8; i++) {
      lines.push(
        <View
          key={i}
          style={[
            styles.line,
            {
              transform: [
                { translateX: -(line.width / 2) },
                { translateY: -10 },
                { rotate: `${i * 45}deg` },
                { translateY: -40 },
              ],
            },
          ]}
        />
      );
    }
    return lines;
  };

  return (
    <>
      <Animated.View style={linesStyle}>
        <View style={{ position: "relative", width: 50, height: 50 }}>
          {renderLines()}
        </View>
      </Animated.View>
      <Animated.View style={heartStyle}>
        <Ionicons name="heart" size={40} color="red" />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    position: "absolute",
    top: 25,
    left: 25,
    width: line.width,
    height: line.height,
    backgroundColor: "red",
    borderRadius: 100,
  },
});

export default AnimatedHeart;
