import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
  LogBox,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { X, Search, Heart, ChevronLeft } from "lucide-react-native";
import anejo from "../../assets/images/anejo.jpg";
import brooklynDiner from "../../assets/images/brooklyn-diner.jpg";
import theJunction from "../../assets/images/the-junction.jpg";
import theModern from "../../assets/images/the-modern.jpg";
import balthazar from "../../assets/images/balthazar.jpg";
import gotham from "../../assets/images/gotham.jpg";
import kirby from "../../assets/images/kirby.png";
import gramercyTavern from "../../assets/images/gramercy-tavern.jpg";
import { Link } from "expo-router";

const _matchLikes = [
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

const _userLikes = [
  {
    locationName: "Brooklyn Diner",
    image: brooklynDiner,
    like: true,
  },
];

const _recommendations = [
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
    locationName: "Gotham Bar & Grill",
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

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

const screenWidth = Dimensions.get("window").width;

const index = () => {
  const [search, setSearch] = React.useState("");
  const [matchLikes, setMatchLikes] = React.useState(_matchLikes);
  const [userLikes, setUserLikes] = React.useState(_userLikes);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [recommendations, setRecommendations] =
    React.useState(_recommendations);
  const [chosenDiner, setChosenDiner] = useState("");
  const numColumns = 2;
  const gap = 25;

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <SafeAreaView className="bg-[#ec8dd169] w-screen h-screen p-5 flex">
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        {/* Search bar */}
        <View className="flex-row gap-4 justify-center">
          <Link href="/" asChild>
            <Pressable className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
              <ChevronLeft size={20} color="#000000" strokeWidth={3} />
            </Pressable>
          </Link>
          <View className="bg-white w-[75vw] rounded-full items-center flex-row pl-3 overflow-hidden">
            <Search size={20} color="#000000" strokeWidth={3} />
            <TextInput
              className="pl-2 flex-1"
              placeholder="Search locations"
              returnKeyType="search"
              value={search}
              onChangeText={(text) => {
                // TODO: filter recommendations
                setRecommendations(
                  _recommendations.filter((recommendation) => {
                    if (
                      recommendation.locationName
                        .toLowerCase()
                        .startsWith(text.toLowerCase())
                    ) {
                      return recommendation;
                    }
                  })
                );
                setSearch(text);
              }}
            />
          </View>
        </View>
        {/* Restaurants */}
        {!search && (
          <View>
            {/* Restaurants that your match would like */}
            <View className="mt-5">
              <Text className="text-2xl font-semibold">Julia likes</Text>

              <FlatList
                className="mt-3"
                data={matchLikes}
                keyExtractor={(item) => item.locationName}
                ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      setChosenDiner(item.locationName);
                      setModalVisible(true);
                    }}
                    className="w-[165px] h-[165px] rounded-3xl overflow-hidden relative"
                  >
                    <Image
                      source={item.image}
                      style={{
                        resizeMode: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                    <Text className="absolute text-white font-bold text-xl bottom-3 left-3">
                      {truncate(item.locationName, 14)}
                    </Text>
                    <Pressable
                      className="w-9 h-9 rounded-full bg-white items-center justify-center absolute right-3 top-3"
                      onPress={() => {
                        setMatchLikes(
                          matchLikes.map((matchLike) => {
                            if (matchLike.locationName === item.locationName) {
                              return {
                                ...matchLike,
                                like: !matchLike.like,
                              };
                            }
                            return matchLike;
                          })
                        );
                      }}
                    >
                      <Heart
                        size={20}
                        color={`${item.like ? "#FF5C97" : "#000000"}`}
                        strokeWidth={3}
                      />
                    </Pressable>
                  </Pressable>
                )}
                horizontal
              />
            </View>
            {/* Restaurants you both like */}
            <View className="mt-5">
              <Text className="text-2xl font-semibold">You both like</Text>

              <FlatList
                className="mt-3"
                data={userLikes}
                keyExtractor={(item) => item.locationName}
                ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      setChosenDiner(item.locationName);
                      setModalVisible(true);
                    }}
                    className="w-[165px] h-[165px] rounded-3xl overflow-hidden relative"
                  >
                    <Image
                      source={item.image}
                      style={{
                        resizeMode: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                    <Text className="absolute text-white font-bold text-xl bottom-3 left-3">
                      {truncate(item.locationName, 14)}
                    </Text>
                    <Pressable
                      className="w-9 h-9 rounded-full bg-white items-center justify-center absolute right-3 top-3"
                      onPress={() => {
                        setUserLikes(
                          userLikes.map((userLike) => {
                            if (userLike.locationName === item.locationName) {
                              return {
                                ...userLike,
                                like: !userLike.like,
                              };
                            }
                            return userLike;
                          })
                        );
                      }}
                    >
                      <Heart
                        size={20}
                        color={`${item.like ? "#FF5C97" : "#000000"}`}
                        strokeWidth={3}
                      />
                    </Pressable>
                  </Pressable>
                )}
                horizontal
              />
            </View>
          </View>
        )}
        <View className="mt-5">
          {!search && (
            <Text className="text-2xl font-semibold">Recommendations</Text>
          )}
          <FlatList
            className="mt-3"
            data={recommendations}
            keyExtractor={(item) => item.locationName}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={numColumns}
            contentContainerStyle={{
              gap,
            }}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            key={numColumns}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setChosenDiner(item.locationName);
                  setModalVisible(true);
                }}
                className="w-[165px] h-[165px] rounded-3xl overflow-hidden relative"
              >
                <Image
                  source={item.image}
                  style={{
                    resizeMode: "cover",
                    height: "100%",
                    width: "100%",
                  }}
                />
                <Text className="absolute text-white font-bold text-xl bottom-3 left-3">
                  {truncate(item.locationName, 14)}
                </Text>
                <Pressable
                  className="w-9 h-9 rounded-full bg-white items-center justify-center absolute right-3 top-3"
                  onPress={() => {
                    setRecommendations(
                      recommendations.map((recommendation) => {
                        if (recommendation.locationName === item.locationName) {
                          return {
                            ...recommendation,
                            like: !recommendation.like,
                          };
                        }
                        return recommendation;
                      })
                    );
                  }}
                >
                  <Heart
                    size={20}
                    color={`${item.like ? "#FF5C97" : "#000000"}`}
                    strokeWidth={3}
                  />
                </Pressable>
              </Pressable>
            )}
          />
        </View>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View className="flex-1 items-center justify-center">
              <View className="bg-white w-[70%] rounded-3xl overflow-hidden relative items-center justify-center">
                <Image source={kirby} />
                <Text className="mt-2 text-xl font-semibold">
                  {`Propose '${chosenDiner}'?`}
                </Text>
                <Text className="text-xs text-gray-800">
                  This location will be sent to Julia
                </Text>
                <View className="flex-row gap-10 py-4">
                  <Pressable
                    className="bg-[#F8DEEA] w-20 items-center justify-center py-2 rounded-lg"
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text className="text-[#FF5C97]">No</Text>
                  </Pressable>
                  <Link
                    href={`/success/${chosenDiner
                      .replace(" ", "-")
                      .toLowerCase()}/`}
                    asChild
                  >
                    <Pressable
                      className="bg-[#FF5C97] w-20 items-center justify-center py-2 rounded-lg"
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text className="text-[#F8DEEA]">Yes</Text>
                    </Pressable>
                  </Link>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
