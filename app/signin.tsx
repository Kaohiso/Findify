import React, { useState } from "react";
import {
  ThemedText,
  ThemedTextInput,
  AnimatedButton,
  Logo,
  ThemedSafeAreaView,
} from "@/components";
import { View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useRouter } from "expo-router";
import Privacy from "./privacy";
import { isValidEmail } from "@/utils/validation";

interface FirstPageFormProps {}

const SignIn: React.FC<FirstPageFormProps> = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePressContinue = async () => {
    setLoading(true);
    if (isValidEmail(email)) {
      setError(false);
      router.push({
        pathname: "/home",
        params: {
          email: email,
        },
      });
    } else {
      console.log("Email invalid");
      setError(true);
    }
    setLoading(false);
  };

  const handleChangeText = (value: string) => {
    if (error) setError(false);
    setEmail(value);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <ThemedSafeAreaView style={{ justifyContent: "center", gap: 50 }}>
          <View>
            <Logo />
          </View>
          <View style={{ gap: 5 }}>
            <ThemedText type="subtitle">Sign in to Findify</ThemedText>
            <ThemedTextInput
              placeholder="Adress mail"
              value={email}
              onChangeText={handleChangeText}
              autoCapitalize="none"
              keyboardType="email-address"
              error={error}
            />
            {/* <ThemedText style={{ color: "red" }}>{email}</ThemedText> */}
          </View>
          <View style={{ gap: 10 }}>
            <AnimatedButton
              title="Continue"
              onPress={handlePressContinue}
              disabled={loading}
            />
            <Privacy />
          </View>
        </ThemedSafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
