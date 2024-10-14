import React, { useEffect, useState } from "react";
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
import CategorieForm from "./CategorieForm";

interface FirstPageFormProps {}
interface DataProps {
  email: string | undefined;
  password: string | undefined;
}

const SignUp: React.FC<FirstPageFormProps> = () => {
  const { email: initialEmail } = useLocalSearchParams<{ email: string }>();
  const [data, setData] = useState<DataProps>({
    email: initialEmail,
    password: undefined,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const { step, handleNext, setSteps } = useSignUpContext();

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
    <CategorieForm onValidationChange={setIsFormValid} />,
  ];

  const handleContinue = () => {
    if (step === 0 && !isFormValid) {
      setShowError(true);
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    setSteps(Form.length - 1);
  }, []);

  return (
    <ThemedSafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, justifyContent: "space-between" }}
    >
      <ProgressBar step={step} steps={Form.length} />
      <View style={{ flex: 1 }}>
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
