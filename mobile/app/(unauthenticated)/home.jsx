import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  ArrowBigDown,
  ArrowBigUp,
  Dot,
  Ellipsis,
  Forward,
  Globe,
  MessageCircle,
  Search,
  X,
} from "lucide-react-native";
import { images } from "../../constants/images";
import AutoSizedAssetImage from "../../components/auto-size-assset-image";

const HomeScreen = () => {
  const router = useRouter();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="bg-neutral-300 h-full">
      <View className="flex-row items-center justify-between pt-2 pb-3 px-4 bg-white  border-b border-neutral-200">
        <Text className="text-4xl font-extrabold">Estorya</Text>
        <View className="flex-row gap-x-4 items-center">
          <Search color="black" size={20} />
          <TouchableOpacity onPress={() => router.push("/signin")}>
            <Text className="text-xl">Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View className="flex-col gap-y-1">
          <View className="bg-white ">
            <View className="flex-row items-start justify-between  px-4">
              <View className="flex-row py-2 gap-x-2">
                <Image
                  source={images.cryingcat}
                  className="w-12 h-12 rounded-full"
                  resizeMode="cover"
                />
                <View>
                  <Text className="text-2xl font-extrabold">John Doe</Text>
                  <View className="flex-row items-center justify-start">
                    <Text>3d</Text>
                    <Dot color="black" size={15} />
                    <Globe color="black" size={12} />
                  </View>
                </View>
              </View>

              <View className="flex-row items-center mt-2 gap-x-6">
                <TouchableOpacity>
                  <Ellipsis color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <X color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View className=" ">
              <AutoSizedAssetImage source={images.catflying} />
            </View>

            <View className="flex-row justify-between py-2 px-4">
              <View className="flex-row items-center gap-x-2">
                <TouchableOpacity>
                  <ArrowBigUp color="black" />
                </TouchableOpacity>
                <Text className="text-xl">0</Text>
                <TouchableOpacity>
                  <ArrowBigDown color="black" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity className="flex-row items-center gap-x-2">
                <MessageCircle color="black" />
                <Text className="text-xl font-medium">Comment</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center gap-x-2">
                <Forward color="black" />
                <Text className="text-xl font-medium">Share</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-white ">
            <View className="flex-row items-start justify-between  px-4">
              <View className="flex-row py-2 gap-x-2">
                <Image
                  source={images.cryingcat}
                  className="w-12 h-12 rounded-full"
                  resizeMode="cover"
                />
                <View>
                  <Text className="text-2xl font-extrabold">John Doe</Text>
                  <View className="flex-row items-center justify-start">
                    <Text>3d</Text>
                    <Dot color="black" size={15} />
                    <Globe color="black" size={12} />
                  </View>
                </View>
              </View>

              <View className="flex-row items-center mt-2 gap-x-6">
                <TouchableOpacity>
                  <Ellipsis color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <X color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <AutoSizedAssetImage source={images.March7} />
            </View>

            <View className="flex-row justify-between py-2 px-4">
              <View className="flex-row items-center gap-x-2">
                <TouchableOpacity>
                  <ArrowBigUp color="black" />
                </TouchableOpacity>
                <Text className="text-xl">0</Text>
                <TouchableOpacity>
                  <ArrowBigDown color="black" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity className="flex-row items-center gap-x-2">
                <MessageCircle color="black" />
                <Text className="text-xl font-medium">Comment</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center gap-x-2">
                <Forward color="black" />
                <Text className="text-xl font-medium">Share</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-white ">
            <View className="flex-row items-start justify-between  px-4">
              <View className="flex-row py-2 gap-x-2">
                <Image
                  source={images.cryingcat}
                  className="w-12 h-12 rounded-full"
                  resizeMode="cover"
                />
                <View>
                  <Text className="text-2xl font-extrabold">John Doe</Text>
                  <View className="flex-row items-center justify-start">
                    <Text>3d</Text>
                    <Dot color="black" size={15} />
                    <Globe color="black" size={12} />
                  </View>
                </View>
              </View>

              <View className="flex-row items-center mt-2 gap-x-6">
                <TouchableOpacity>
                  <Ellipsis color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <X color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <AutoSizedAssetImage source={images.Heroic} />
            </View>

            <View className="flex-row justify-between py-2 px-4">
              <View className="flex-row items-center gap-x-2">
                <TouchableOpacity>
                  <ArrowBigUp color="black" />
                </TouchableOpacity>
                <Text className="text-xl">0</Text>
                <TouchableOpacity>
                  <ArrowBigDown color="black" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity className="flex-row items-center gap-x-2">
                <MessageCircle color="black" />
                <Text className="text-xl font-medium">Comment</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center gap-x-2">
                <Forward color="black" />
                <Text className="text-xl font-medium">Share</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-white ">
            <View className="flex-row items-start justify-between  px-4">
              <View className="flex-row py-2 gap-x-2">
                <Image
                  source={images.cryingcat}
                  className="w-12 h-12 rounded-full"
                  resizeMode="cover"
                />
                <View>
                  <Text className="text-2xl font-extrabold">John Doe</Text>
                  <View className="flex-row items-center justify-start">
                    <Text>3d</Text>
                    <Dot color="black" size={15} />
                    <Globe color="black" size={12} />
                  </View>
                </View>
              </View>

              <View className="flex-row items-center mt-2 gap-x-6">
                <TouchableOpacity>
                  <Ellipsis color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <X color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <AutoSizedAssetImage source={images.Boa} />
            </View>

            <View className="flex-row justify-between py-2 px-4">
              <View className="flex-row items-center gap-x-2">
                <TouchableOpacity>
                  <ArrowBigUp color="black" />
                </TouchableOpacity>
                <Text className="text-xl">0</Text>
                <TouchableOpacity>
                  <ArrowBigDown color="black" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity className="flex-row items-center gap-x-2">
                <MessageCircle color="black" />
                <Text className="text-xl font-medium">Comment</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center gap-x-2">
                <Forward color="black" />
                <Text className="text-xl font-medium">Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
