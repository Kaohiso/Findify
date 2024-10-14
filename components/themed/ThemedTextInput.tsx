import React, { useRef, useEffect, useState, memo } from "react";
import { TextInput, TextInputProps, Animated, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import AnimatedIcon from "../button/AnimatedIcon";
import { styles } from "./styles";

const DURATION = 50;
const TO_VALUE = 5;

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
  lightPlaceholderColor?: string;
  darkPlaceholderColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  error?: boolean;
  isPassword?: boolean;
  leftIcon?: React.ReactNode;
};

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  style,
  lightColor,
  darkColor,
  lightBackgroundColor,
  darkBackgroundColor,
  lightPlaceholderColor,
  darkPlaceholderColor,
  lightBorderColor,
  darkBorderColor,
  type = "default",
  placeholder,
  error = false,
  isPassword = false,
  leftIcon,
  ...rest
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const backgroundColor = useThemeColor(
    { light: lightBackgroundColor, dark: darkBackgroundColor },
    "background"
  );
  const placeholderColor = useThemeColor(
    { light: lightPlaceholderColor, dark: darkPlaceholderColor },
    "placeholderText"
  );
  const borderColor = useThemeColor(
    { light: lightBorderColor, dark: darkBorderColor },
    "border"
  );
  const [showPassword, setShowPassword] = useState(false);

  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: -TO_VALUE,
          duration: DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: TO_VALUE,
          duration: DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error]);

  return (
    <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
      <TextInput
        style={[
          styles.input,
          {
            color,
            backgroundColor,
            borderColor: error ? "red" : borderColor,
          },
          type === "default" ? styles.default : undefined,
          type === "title" ? styles.title : undefined,
          type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
          type === "subtitle" ? styles.subtitle : undefined,
          type === "link" ? styles.link : undefined,
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        secureTextEntry={isPassword && !showPassword}
        {...rest}
      />
      {isPassword && (
        <View style={styles.rightIcon}>
          <AnimatedIcon
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            onPress={togglePasswordVisibility}
          />
        </View>
      )}
    </Animated.View>
  );
};

export default memo(ThemedTextInput);
