import React, { useState } from "react";
import { View } from "react-native";
import { ProgressBar, ThemedSafeAreaView, AnimatedButton } from "@/components";
import Email from "./email";
import Password from "./password";
import { useSignUpContext } from "@/context/signupContext";
import { useLocalSearchParams } from "expo-router";

interface FirstPageFormProps {}
interface DataProps {
  email: string | undefined;
  password: string | undefined;
}

const SignUp: React.FC<FirstPageFormProps> = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const { step, handleNext } = useSignUpContext();
  const [data, setData] = useState<DataProps>({
    email: email,
    password: undefined,
  });

  const Form = [
    <Email
      email={data.email}
      handleEmail={(newEmail: string) => setData({ ...data, email: newEmail })}
    />,
    <Password
      password={data.password}
      handlePassword={(newPassword: string) =>
        setData({ ...data, password: newPassword })
      }
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
      </View>
      <AnimatedButton title="continue" onPress={handleNext} />
    </ThemedSafeAreaView>
  );
};

export default SignUp;
