import { Redirect } from "expo-router";
import { useState } from "react";

const Page = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  if (isSignedIn) return <Redirect href="/(authenticated)/home" />;

  return <Redirect href="/(unauthenticated)/home" />;
};

export default Page;
