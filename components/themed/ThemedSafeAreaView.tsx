import { ReactNode } from "react";
import { View, type ViewProps } from "react-native";
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps &
  NativeSafeAreaViewProps & {
    lightColor?: string;
    darkColor?: string;
  };

function ThemedSafeAreaViewHorizontal({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps): ReactNode {
  return (
    <View
      style={[{ flex: 1, paddingHorizontal: "5%" }, style]}
      {...otherProps}
    />
  );
}

export default function ThemedSafeAreaView({
  style,
  lightColor,
  darkColor,
  children,
  ...otherProps
}: ThemedViewProps): ReactNode {
  return (
    <SafeAreaView style={[{ flex: 1 }]} {...otherProps}>
      <ThemedSafeAreaViewHorizontal style={style}>{children}</ThemedSafeAreaViewHorizontal>
    </SafeAreaView>
  );
}
