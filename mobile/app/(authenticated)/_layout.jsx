import { View, Text, TouchableOpacity } from "react-native";
import { Tabs, useRouter, withLayoutContext } from "expo-router";
import {
  CircleUser,
  Home,
  Menu,
  Play,
  Plus,
  Search,
} from "lucide-react-native";
import { Icons } from "../../components/utils/Icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigationState } from "@react-navigation/native";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

const _layout = () => {
  const router = useRouter();
  const currentRoute = useNavigationState((state) => state.routes[state.index]);
  return (
    <View style={{ flex: 1 }}>
      {/* header */}
      {currentRoute.state?.index === 0 && (
        <Animated.View
          entering={SlideInUp.duration(200)}
          exiting={SlideOutUp.duration(200)}
          className="flex-row items-center justify-between px-4 py-2 bg-white"
        >
          <Text className="text-4xl font-extrabold">Estorya</Text>
          <View className="flex-row gap-x-6 items-center">
            <TouchableOpacity className="bg-black rounded-full">
              <Plus color="black" size={27} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/search")}>
              <Search color="black" size={27} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icons.Messager width={27} height={27} />
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
          <View className="flex-row gap-x-6 items-center">
            <TouchableOpacity className="bg-black rounded-full">
              <Plus color="white" size={27} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/search")}>
              <Search color="black" size={27} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icons.Messager width={27} height={27} />
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
          tabBarStyle: {
            elevation: 0, // Removes the shadow on Android
            shadowOpacity: 0, // Removes the shadow on iOS
            borderBottomWidth: 0.8, // Optionally remove bottom border
            borderBottomColor: "#a8a8a8",
          },
          tabBarItemStyle: {
            paddingBottom: 8, // Remove bottom padding from each tab
            height: 48, // Optional: reduce tab height
          },
          tabBarLabelStyle: {
            marginBottom: 0, // Removes bottom margin from label
            fontSize: 14, // Optional: adjust label size
          },
          tabBarIconStyle: {
            marginBottom: 8, // Removes space under the icon (if icons used)
          },
        }}
      >
        <MaterialTopTabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Home color={focused ? "#2563eb" : "black"} size={28} />
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="watch"
          options={{
            title: "Watch",
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              if (focused) {
                return (
                  <Icons.videoIconFill fill="#2563eb" width={33} height={33} />
                );
              } else {
                return <Icons.videoIcon width={33} height={33} />;
              }
            },
          }}
        />
        <MaterialTopTabs.Screen
          name="communities"
          options={{
            title: "Communities",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icons.Group
                width={33}
                height={33}
                fill={focused ? "#2563eb" : "black"}
              />
            ),
          }}
        />

        <MaterialTopTabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <CircleUser
                width={27}
                height={27}
                color={focused ? "#2563eb" : "black"}
              />
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="notification"
          options={{
            title: "Notification",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icons.Bell
                width={27}
                height={27}
                fill={focused ? "#2563eb" : "black"}
              />
            ),
          }}
        />

        <MaterialTopTabs.Screen
          name="menu"
          options={{
            title: "Menu bar",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Menu color={focused ? "#2563eb" : "black"} size={29} />
            ),
          }}
        />
      </MaterialTopTabs>
    </View>
  );
};

export default _layout;
