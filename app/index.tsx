import React from "react";
import { ThemedSafeAreaView } from "@/components";
import SignIn from "./signin";

interface FirstPageFormProps {}

const FirstPageForm: React.FC<FirstPageFormProps> = () => {
  return <SignIn />;
};

export default FirstPageForm;
