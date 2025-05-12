import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as Keychain from "react-native-keychain";
import useKeychainSession from "../hooks/useKeychainSession";
import { Text } from "react-native";

const Page = () => {
  const { isSignedIn, loading } = useKeychainSession();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (isSignedIn) return <Redirect href="/(authenticated)/home" />;

  return <Redirect href="/(unauthenticated)/home" />;
};

export default Page;
