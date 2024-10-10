import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

interface AnimatedHeartProps {
  show: boolean;
}

const AnimatedHeart: React.FC<AnimatedHeartProps> = ({ show }) => {
  const heartOpacity = useSharedValue(0);

  const heartStyle = useAnimatedStyle(() => ({
    position: "absolute",
    bottom: 5,
    right: 5,
    opacity: heartOpacity.value,
  }));

  useEffect(() => {
    if (show) {
      heartOpacity.value = withTiming(1, { duration: 200 });
    } else {
      heartOpacity.value = withTiming(0, { duration: 500 });
    }
  }, [show]);

  return (
    <Animated.View style={heartStyle}>
      <Ionicons name="heart" size={40} color="red" />
    </Animated.View>
  );
};

export default AnimatedHeart;
