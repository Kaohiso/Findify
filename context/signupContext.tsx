import React, { ReactNode, createContext, useContext, useState } from "react";

interface SignUpContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setSteps: React.Dispatch<React.SetStateAction<number | undefined>>;
  handlePrevious: () => void;
  handleNext: () => void;
}

interface SignUpProviderProps {
  children: ReactNode;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export const SignUpProvider: React.FC<SignUpProviderProps> = ({ children }) => {
  const [step, setStep] = useState<number>(1); // TODO CHANGE
  const [steps, setSteps] = useState<number | undefined>(undefined); // TODO CHANGE

  const handlePrevious = () => {
    setStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const handleNext = () => {
    if (!steps) return;
    if (step === steps) console.log("NON");
    else setStep((prevStep) => Math.min(steps, prevStep + 1));
  };

  const value = { step, setStep, handlePrevious, handleNext, setSteps };

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
