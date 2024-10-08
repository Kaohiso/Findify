import React from "react";
import { KeyboardAvoidingViewCustom } from "@/components";
import SignUp from "./signup";

interface FirstPageFormProps {}

const FirstPageForm: React.FC<FirstPageFormProps> = () => {
  return (
    <KeyboardAvoidingViewCustom>
      <SignUp />
    </KeyboardAvoidingViewCustom>
  );
};

export default FirstPageForm;
