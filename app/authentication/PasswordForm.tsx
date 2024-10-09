import React, { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { ThemedTextInput } from "@/components";
import PasswordRequirements from "./PasswordRequirements";

interface PasswordProps {
  password: string | undefined;
  handlePassword: (password: string) => void;
  onValidationChange: Dispatch<SetStateAction<boolean>>;
}

const Password: React.FC<PasswordProps> = ({ 
  password, 
  handlePassword,
  onValidationChange
}) => {
  return (
    <View>
      <ThemedTextInput
        value={password}
        onChangeText={handlePassword}
        placeholder="Password"
        secureTextEntry
      />
      <PasswordRequirements 
        password={password} 
        onValidationChange={onValidationChange}
      />
    </View>
  );
};

export default Password;
