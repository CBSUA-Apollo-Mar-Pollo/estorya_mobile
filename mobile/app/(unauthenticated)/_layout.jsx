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
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className="items-center ">
              <Icons.Home fill="#2563eb" width={29} height={29} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="watch"
        options={{
          title: "Watch",
          headerShown: false,
          tabBarIcon: ({ focused }) => <Play color="#a1a1a1" size={29} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ focused }) => <PlusCircle color="#a1a1a1" size={26} />,
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: "Communities",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icons.Group fill="#a1a1a1" width={29} height={29} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu ",
          headerShown: false,
          tabBarIcon: ({ focused }) => <Menu color="#a1a1a1" size={27} />,
        }}
      />
    </Tabs>
  );
};

export default _layout;
