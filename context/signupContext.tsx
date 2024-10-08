import React, { ReactNode, createContext, useContext, useState } from "react";

interface SignUpContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handlePrevious: () => void;
  handleNext: () => void;
}

interface SignUpProviderProps {
  children: ReactNode;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export const SignUpProvider: React.FC<SignUpProviderProps> = ({ children }) => {
  const [step, setStep] = useState<number>(1);

  const handlePrevious = () => {
    setStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const value = { step, setStep, handlePrevious, handleNext };

  return (
    <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>
  );
};

export function useSignUpContext(): SignUpContextType {
  const context = useContext(SignUpContext);
  if (context === undefined) {
    throw new Error("useSignUpContext must be used within a SignUpProvider");
  }
  return context;
}
