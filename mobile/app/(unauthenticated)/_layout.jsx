import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter, withLayoutContext } from "expo-router";
import { Play, Search } from "lucide-react-native";
import { Icons } from "../../components/utils/Icons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigationState } from "@react-navigation/native";
import Animated, {
  SlideInDown,
  SlideInUp,
  SlideOutUp,
} from "react-native-reanimated";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

const _layout = () => {
  const router = useRouter();
  const currentRoute = useNavigationState((state) => state.routes[state.index]);

  return (
    <View style={{ flex: 1 }}>
      {/* Custom Header */}
      {currentRoute.state?.index === 0 && (
        <Animated.View
          entering={SlideInUp.duration(200)}
          exiting={SlideOutUp.duration(200)}
          className="flex-row items-center justify-between px-4 py-2 bg-white"
        >
          <Text className="text-4xl font-extrabold">Estorya</Text>
          <View className="flex-row gap-x-4 items-center">
            <TouchableOpacity onPress={() => router.push("/search")}>
              <Search color="black" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/signin")}>
              <Text className="text-xl">Sign in</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      {currentRoute.state?.index === undefined && (
        <Animated.View
          entering={SlideInUp.duration(200)}
          exiting={SlideOutUp.duration(200)}
          className="flex-row items-center justify-between px-4 py-2 bg-white"
        >
          <Text className="text-4xl font-extrabold">Estorya</Text>
          <View className="flex-row gap-x-4 items-center">
            <TouchableOpacity onPress={() => router.push("/search")}>
              <Search color="black" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/signin")}>
              <Text className="text-xl">Sign in</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Tabs */}
      <MaterialTopTabs
        screenOptions={{
          tabBarActiveTintColor: "#131620",
          tabBarShowLabel: false,
          lazy: false,
        }}
      >
        <MaterialTopTabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <View className="items-center">
                <Icons.Home
                  fill={focused ? "#2563eb" : "black"}
                  width={29}
                  height={29}
                />
              </View>
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="watch"
          options={{
            title: "Watch",
            tabBarIcon: ({ focused }) => (
              <Play color={focused ? "#2563eb" : "black"} size={29} />
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="communities"
          options={{
            title: "Communities",
            tabBarIcon: ({ focused }) => (
              <Icons.Group
                fill={focused ? "#2563eb" : "black"}
                width={29}
                height={29}
              />
            ),
          }}
        />
      </MaterialTopTabs>
    </View>
  );
};

export default _layout;
