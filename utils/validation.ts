export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

interface PasswordRequirementsProps {
  hasEightChars: boolean;
  hasSpecialChar: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
}

export const checkPasswordRequirements = (
  password: string | undefined
): PasswordRequirementsProps => {
  if (!password)
    return {
      hasEightChars: false,
      hasSpecialChar: false,
      hasUpperCase: false,
      hasLowerCase: false,
    };

  return {
    hasEightChars: password.length >= 8,
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
  };
};

export const isValidPassword = (password: string | undefined): boolean => {
  const requirements = checkPasswordRequirements(password);
  return Object.values(requirements).every(Boolean);
};
