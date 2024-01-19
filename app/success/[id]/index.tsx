import { View, Text, SafeAreaView, Image, Pressable } from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import anejo from "../../../assets/images/anejo.jpg";
import brooklynDiner from "../../../assets/images/brooklyn-diner.jpg";
import theJunction from "../../../assets/images/the-junction.jpg";
import theModern from "../../../assets/images/the-modern.jpg";
import balthazar from "../../../assets/images/balthazar.jpg";
import gotham from "../../../assets/images/gotham.jpg";
import gramercyTavern from "../../../assets/images/gramercy-tavern.jpg";
import { ChevronLeft, MessageCircleHeart } from "lucide-react-native";

const restaurants = [
  {
    locationName: "Balthazar",
    image: balthazar,
  },
  {
    locationName: "Gramercy Tavern",
    image: gramercyTavern,
  },
  {
    locationName: "The Modern",
    image: theModern,
    like: true,
  },
  {
    locationName: "Gotham",
    image: gotham,
    like: true,
  },
  {
    locationName: "Brooklyn Diner",
    image: brooklynDiner,
    like: true,
  },
  {
    locationName: "Anejo",
    image: anejo,
  },
  {
    locationName: "The Junction",
    image: theJunction,
    like: true,
  },
];

const index = () => {
  const { id } = useLocalSearchParams();

  const restaurant = restaurants.find(
    (restaurant) =>
      restaurant.locationName.toLowerCase().replace(/ /g, "-") === id
  );

  const image = restaurant?.image;

  return (
    <SafeAreaView className="bg-[#ec8dd169] w-screen h-screen p-5 relative flex items-center justify-center">
      <Link href="/" asChild>
        <Pressable className="absolute left-5 top-5 bg-white w-10 h-10 rounded-full flex items-center justify-center">
          <ChevronLeft size={20} color="#000000" strokeWidth={3} />
        </Pressable>
      </Link>
      <View>
        {image && (
          <Image
            source={image}
            style={{ width: 250, height: 320, borderRadius: 20 }}
          />
        )}
      </View>
      <Text className="mt-10 mb-5 text-[40px] text-center font-bold">
        You proposed a location
      </Text>
      <View className="absolute bottom-14 flex justify-center items-center gap-3">
        <Pressable className="bg-white w-14 h-14 rounded-full flex items-center justify-center">
          <MessageCircleHeart size={25} color="#000000" strokeWidth={2} />
        </Pressable>
        <Text>Proceed to chat</Text>
      </View>
    </SafeAreaView>
  );
};

export default index;
