import React, { useEffect, useState } from "react";
import { ThemedText, ThemedTextInput } from "@/components";
import { View, StyleSheet } from "react-native";
import { isValidEmail } from "@/utils/validation";

interface EmailProps {
  email: string | undefined;
  handleEmail: (email: string) => void;
  onValidationChange: (isValid: boolean) => void;
}

const Email: React.FC<EmailProps> = ({
  email,
  handleEmail,
  onValidationChange,
}) => {
  const [error, setError] = useState<boolean>();

  useEffect(() => {
    if (email) {
      const valid = isValidEmail(email);
      setError(valid);
      onValidationChange(valid);
    } else {
      setError(undefined);
    }
  }, [email, onValidationChange]);

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">What's your email adress?</ThemedText>
      <ThemedTextInput
        value={email}
        onChangeText={handleEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});

export default Email;
