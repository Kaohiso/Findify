import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { SignUpProvider, useSignUpContext } from "@/context/signupContext";

function LayoutContent() {
  const { handlePrevious, step } = useSignUpContext();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleAction = () => {
    if (step > 0) handlePrevious();
    else router.back();
  };

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "transparent", // Makes the header background transparent
        },
        headerShadowVisible: false, // Removes the shadow
        headerTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={handleAction}>
            <Ionicons
              name="chevron-back"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        ),
      }}
    />
  );
}

export default function AuthenticationLayout() {
  return (
    <SignUpProvider>
      <LayoutContent />
    </SignUpProvider>
  );
}
