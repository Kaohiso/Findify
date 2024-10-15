import { ThemedText } from "@/components";
import { LinearGradient } from "expo-linear-gradient";
import React, { forwardRef, useMemo } from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type CardProps = {
  id: number;
  title: string;
  image: string;
  ref: React.RefObject<unknown>;
  action: () => void;
};

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const DEGREE = 45;
const ACTION_OFFSET = 150;
const CARD_HEIGHT = height * 0.8;
const CARD_WIDTH = width * 0.85;
const CARD_BORDER_RADIUS = 30;

const Card = forwardRef<null, CardProps>(
  ({ id, title, image, action }, ref) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const randomDegreeValue: number = useMemo(() => {
      return Math.floor(
        Math.random() * (DEGREE - -DEGREE + 1) + -DEGREE
      );
    }, []);

    const rCard = useAnimatedStyle(() => {
      const rotate = interpolate(
        translateX.value + randomDegreeValue,
        [-width, 0, width],
        [-DEGREE, 0, DEGREE],
        Extrapolation.CLAMP
      );

      return {
        transform: [
          { rotate: `${rotate}deg` },
          { translateX: translateX.value },
          { translateY: translateY.value },
        ],
      };
    });

    const panGesture = Gesture.Pan()
      .onUpdate((event) => {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
      })
      .onEnd((event) => {
        const isActionActive = Math.abs(event.translationX) > ACTION_OFFSET;
        if (isActionActive) {
          const direction = Math.sign(event.translationX);
          translateX.value = withTiming(
            direction * 1000,
            { duration: 400 },
            () => runOnJS(action)()
          );
          translateY.value = withTiming(event.translationY / 2, {
            duration: 400,
          });
        } else {
          translateX.value = withSpring(0, { damping: 8 });
          translateY.value = withSpring(0, { damping: 8 });
        }
      });

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, rCard]} ref={ref}>
          <ImageBackground
            source={{ uri: `https://picsum.photos/id/${id}/200/300` }}
            style={styles.image}
          >
            <LinearGradient
              colors={["transparent", "rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 1)"]}
              style={styles.gradient}
            />
            <ThemedText type="title" weight="bold" style={{ padding: 20 }}>
              {title}
            </ThemedText>
          </ImageBackground>
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "gray",
    borderRadius: CARD_BORDER_RADIUS,
    overflow: "hidden",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: CARD_HEIGHT,
  },
  card: {
    position: "absolute",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_BORDER_RADIUS,
  },
});

export default Card;
