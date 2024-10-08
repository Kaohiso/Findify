import React from "react";
import { Colors } from "@/constants/Colors";
import ThemedText from "./themed/ThemedText";

const Logo: React.FC = () => {
  return (
    <ThemedText
      style={{
        alignSelf: "center",
        fontFamily: "Vibur",
        lineHeight: 65,
        fontSize: 54,
        color: Colors.brand.primary,
      }}
    >
      Findify
    </ThemedText>
  );
};

export default Logo;
