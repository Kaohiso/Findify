import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { fontWeights, styles } from "./styles";

type FontWeight = "normal" | "medium" | "semibold" | "bold";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "label";
  weight?: FontWeight;
};

export default function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  weight = "normal",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "label" ? styles.label : undefined,
        fontWeights[weight],
        style,
      ]}
      {...rest}
    />
  );
}
