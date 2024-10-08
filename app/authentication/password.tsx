import React from "react";
import { ThemedText, ThemedTextInput } from "@/components";
import { View } from "react-native";

interface PasswordProps {
  password: string | undefined;
  handlePassword: (newEmail: string) => void;
}

const Password: React.FC<PasswordProps> = ({ password, handlePassword }) => {
  return (
    <View>
      <ThemedText>What's your password</ThemedText>
      <ThemedTextInput
        value={password}
        onChangeText={handlePassword}
        isPassword
      />
    </View>
  );
};

export default Password;
