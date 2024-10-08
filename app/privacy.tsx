import { ThemedText } from "@/components";

const Privacy = () => (
  <ThemedText type="label">
    By pressing on{" "}
    <ThemedText type="label" weight="bold">
      Continue
    </ThemedText>
    , you accept our{" "}
    <ThemedText type="label" weight="bold">
      Terms and Conditions
    </ThemedText>{" "}
    and our{" "}
    <ThemedText type="label" weight="bold">
      Privacy Policy
    </ThemedText>
    .
  </ThemedText>
);

export default Privacy;
