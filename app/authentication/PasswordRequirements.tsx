import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { checkPasswordRequirements, isValidPassword } from "@/utils/validation";

interface PasswordRequirementProps {
  label: string;
  isMet: boolean;
}

const PasswordRequirement: React.FC<PasswordRequirementProps> = ({
  label,
  isMet,
}) => {
  const errorColor = useThemeColor({}, "error");
  const successColor = useThemeColor({}, "success");

  return (
    <View style={styles.requirementRow}>
      <Ionicons
        name={isMet ? "checkmark-circle" : "close-circle"}
        size={20}
        color={isMet ? successColor : errorColor}
      />
      <ThemedText
        weight="bold"
        style={[
          styles.requirementText,
          { color: isMet ? successColor : errorColor },
        ]}
      >
        {label}
      </ThemedText>
    </View>
  );
};

interface PasswordRequirementsState {
  hasEightChars: boolean;
  hasSpecialChar: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
}

interface PasswordRequirementsProps {
  password: string | undefined;
  onValidationChange: Dispatch<SetStateAction<boolean>>;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
  onValidationChange,
}) => {
  const [requirements, setRequirements] = useState<PasswordRequirementsState>({
    hasEightChars: false,
    hasSpecialChar: false,
    hasUpperCase: false,
    hasLowerCase: false,
  });

  useEffect(() => {
    setRequirements(checkPasswordRequirements(password));
    onValidationChange(isValidPassword(password));
  }, [password]);

  return (
    <View>
      <PasswordRequirement
        label="At least 8 characters"
        isMet={requirements.hasEightChars}
      />
      <PasswordRequirement
        label="At least 1 special character"
        isMet={requirements.hasSpecialChar}
      />
      <PasswordRequirement
        label="At least 1 uppercase letter"
        isMet={requirements.hasUpperCase}
      />
      <PasswordRequirement
        label="At least 1 lowercase letter"
        isMet={requirements.hasLowerCase}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  requirementText: {
    marginLeft: 5,
  },
});

export default PasswordRequirements;
