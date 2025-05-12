import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import * as Keychain from "react-native-keychain";
import { jwtDecode } from "jwt-decode";

const useKeychainSession = () => {
  const [session, setSession] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getDataFromKeychain = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        const data = JSON.parse(credentials.password);
        const decoded = jwtDecode(data.token);

        const isExpired = Date.now() >= decoded.exp * 1000;
        if (isExpired) {
          return router.push("/signin");
        } else {
          setSession(data);
          setIsSignedIn(true);
          console.log("Token and user retrieved from Keychain:", data);
        }
      } else {
        console.log("No data stored in Keychain");
        setSession(null);
        setIsSignedIn(false);
      }
    } catch (error) {
      console.log("Error retrieving data from Keychain:", error);
      setSession(null);
      setIsSignedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFromKeychain();
  }, []);

  return { session, isSignedIn, loading };
};

export default useKeychainSession;
