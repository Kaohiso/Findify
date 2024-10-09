import React, { useState, useCallback } from "react";
import { View } from "react-native";
import {
  ProgressBar,
  ThemedSafeAreaView,
  AnimatedButton,
  ThemedText,
} from "@/components";
import Email from "./EmailForm";
import Password from "./PasswordForm";
import { useSignUpContext } from "@/context/signupContext";
import { useLocalSearchParams } from "expo-router";
import * as valid from "@/utils/validation";

interface FirstPageFormProps {}
interface DataProps {
  email: string | undefined;
  password: string | undefined;
}

const SignUp: React.FC<FirstPageFormProps> = () => {
  const { email: initialEmail } = useLocalSearchParams<{ email: string }>();
  const { step, handleNext } = useSignUpContext();
  const [data, setData] = useState<DataProps>({
    email: initialEmail,
    password: undefined,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleContinue = () => {
    if (step === 0 && !isFormValid) {
      setShowError(true);
    } else {
      handleNext();
    }
  };

  const Form = [
    <Email
      email={data.email}
      handleEmail={(newEmail: string) => setData({ ...data, email: newEmail })}
      onValidationChange={setIsFormValid}
    />,
    <Password
      password={data.password}
      handlePassword={(newPassword: string) =>
        setData({ ...data, password: newPassword })
      }
      onValidationChange={setIsFormValid}
    />,
  ];

  return (
    <ThemedSafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, justifyContent: "space-between" }}
    >
      <View>
        <ProgressBar step={step} steps={6} />
        {Form[step]}
        {showError && (
          <ThemedText style={{ color: "red" }}>
            {step === 0
              ? "Please enter a valid email address before continuing."
              : "Please meet all password requirements before continuing."}
          </ThemedText>
        )}
      </View>
      <AnimatedButton
        title="continue"
        onPress={handleContinue}
        disabled={!isFormValid}
      />
    </ThemedSafeAreaView>
  );
};

export default SignUp;
