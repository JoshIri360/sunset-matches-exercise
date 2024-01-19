import { View, Text, Touchable, Pressable, Image } from "react-native";
import React from "react";
import { MapPinned, MessageCircleHeart, X } from "lucide-react-native";
import { ImageSourcePropType } from "react-native";
import { Link, Redirect } from "expo-router";

type Data = {
  user: ImageSourcePropType;
  match: ImageSourcePropType;
};
const data: Data = {
  user: require("../assets/images/user.png"),
  match: require("../assets/images/match.png"),
};

const index = () => {
  return (
    <View className="bg-[#ec8dd169] w-screen h-screen p-5 relative flex items-center justify-center">
      <Pressable className="bg-white absolute left-5 top-5 w-10 h-10 rounded-full flex items-center justify-center">
        <X size={20} color="#000000" strokeWidth={3} />
      </Pressable>
      <View className="relative flex items-center justify-center mt-16">
        <View className="flex flex-row">
          <View className="-rotate-[20deg] rounded-[29px] overflow-hidden">
            <Image
              source={data.match}
              style={{
                resizeMode: "cover",
                height: 230,
                width: 180,
              }}
            />
          </View>
          <View className="rotate-[15deg] rounded-[29px] overflow-hidden">
            <Image
              source={data.user}
              style={{
                resizeMode: "cover",
                height: 230,
                width: 180,
              }}
            />
          </View>
        </View>
        <Text className="mt-20 text-5xl font-black">You matched!</Text>
        <Text className="">You and Julia have been matched</Text>
      </View>
      <View className="mt-7">
        <View className="flex flex-row justify-between gap-20">
          <View className="flex justify-center items-center gap-3">
            <Pressable className="bg-white w-14 h-14 rounded-full flex items-center justify-center">
              <MessageCircleHeart size={25} color="#000000" strokeWidth={2} />
            </Pressable>
            <Text>Proceed to chat</Text>
          </View>
          <View className="flex justify-center items-center gap-3">
            <Link href="/locations" asChild>
              <Pressable className="bg-white w-14 h-14 rounded-full flex items-center justify-center">
                <MapPinned size={25} color="#000000" strokeWidth={2} />
              </Pressable>
            </Link>
            <Text>Choose location</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default index;
