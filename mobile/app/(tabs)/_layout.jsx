import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Home, Menu, Play } from "lucide-react-native";
import { Icons } from "../../components/utils/Icons";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          paddingTop: 6,
          height: 57,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => <Home color="black" size={30} />,
        }}
      />
      <Tabs.Screen
        name="watch"
        options={{
          title: "Watch",
          headerShown: false,
          tabBarIcon: ({ focused }) => <Play color="black" size={30} />,
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: "Communities",
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icons.Group color="black" />,
        }}
      />
      <Tabs.Screen
        name="chatbox"
        options={{
          title: "Chatbox",
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icons.Messager color="black" />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icons.Bell color="black" />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Notification",
          headerShown: false,
          tabBarIcon: ({ focused }) => <Menu color="black" size={30} />,
        }}
      />
    </Tabs>
  );
};

export default _layout;
