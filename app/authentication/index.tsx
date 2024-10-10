import React from "react";
import { KeyboardAvoidingViewCustom } from "@/components";
import SignUp from "./signup";
import { View } from "react-native";

interface FirstPageFormProps {}

const FirstPageForm: React.FC<FirstPageFormProps> = () => {
  return <SignUp />;
};

export default FirstPageForm;
