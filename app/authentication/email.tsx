import React from "react";
import { ThemedText, ThemedTextInput } from "@/components";
import { View } from "react-native";
import { useSignUpContext } from "@/context/signupContext";

interface EmailmProps {
  email: string | undefined;
  handleEmail: (newEmail: string) => void;
}

const Email: React.FC<EmailmProps> = ({ email, handleEmail }) => {
  const { handleNext } = useSignUpContext();
  return (
    <View>
      <ThemedText>What's your email adress</ThemedText>
      <ThemedTextInput
        value={email}
        onChangeText={handleEmail}
        keyboardType="email-address"
        onSubmitEditing={handleNext}
      />
    </View>
  );
};

export default Email;
