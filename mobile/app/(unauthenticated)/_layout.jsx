import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { usePathname, withLayoutContext } from "expo-router";
import { Play, Search } from "lucide-react-native";
import { Icons } from "../../components/utils/Icons";
import { useRoute } from "@react-navigation/native";

import CustomHeader from "../../components/CustomHeader";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

const _layout = () => {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: "#131620",
        tabBarShowLabel: false,
      }}
    >
      <MaterialTopTabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return (
              <View className="items-center ">
                <Icons.Home
                  fill={focused ? "#2563eb" : "black"}
                  width={29}
                  height={29}
                />
              </View>
            );
          },
        }}
      />

      <MaterialTopTabs.Screen
        name="watch"
        options={{
          title: "Watch",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Play color={focused ? "#2563eb" : "black"} size={29} />
          ),
        }}
      />

      <MaterialTopTabs.Screen
        name="communities"
        options={{
          title: "Communities",
          headerShown: false,
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
  );
};

export default _layout;
