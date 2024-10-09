/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    border: "#E1E3E5",
    placeholderText: "#9BA1A6",
    inputBackground: "#F7F8F9",
    error: "#ff0000",
    success: "#006400",
    disable: "#d3d3d3",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    border: "#2E3235",
    placeholderText: "#687076",
    inputBackground: "#1C1E1F",
    error: "rgba(255, 0, 0, 1)",
    success: "rgba(0, 255, 0, 0.8)",
    disable: "#333333",
  },
  brand: {
    primary: "#5201FE",
    secondary: "#fcd8e4",
  },
};
