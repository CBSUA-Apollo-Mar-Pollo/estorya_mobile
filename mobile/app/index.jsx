import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-700 text-2xl">
        Edit app/index.tsx to edit this screen.
      </Text>

      <Link href="/(auth)/signin">Sign in</Link>
      <Link href="/(auth)/signup">Sign up</Link>
    </View>
  );
}
