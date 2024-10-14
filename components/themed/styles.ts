import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  rightIcon: {
    position: "absolute",
    right: "1%",
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 1,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
  },
});

export const fontWeights = StyleSheet.create({
  normal: {
    fontWeight: "normal",
  },
  medium: {
    fontWeight: "500",
  },
  semibold: {
    fontWeight: "600",
  },
  bold: {
    fontWeight: "bold",
  },
});
