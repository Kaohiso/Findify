import { Colors } from "@/constants/Colors";
import React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
  step: number;
  steps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, steps }) => {
  const progress = (step / steps) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 10,
    backgroundColor: "#fff",
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
