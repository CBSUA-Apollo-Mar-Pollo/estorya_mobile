import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Home, Menu, Play, PlusCircle } from "lucide-react-native";
import { Icons } from "../../components/utils/Icons";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        // tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          height: 50,
          backgroundColor: "white",
        },
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View className="items-center ">
                <Icons.Home
                  fill={focused ? "#2563eb" : "#262626"}
                  width={29}
                  height={29}
                />
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name="watch"
        options={{
          title: "Watch",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Play color={focused ? "#2563eb" : "#262626"} size={29} />
          ),
        }}
      />

      <Tabs.Screen
        name="communities"
        options={{
          title: "Communities",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icons.Group
              fill={focused ? "#2563eb" : "#262626"}
              width={29}
              height={29}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
