import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-x",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-xl",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-lux",
    title: "Uber Lux",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];
export default function RideOptionsCard() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={[tw`absolute top-3 left-5 p-3 rounded-full z-10`]}
          onPress={() => {
            navigation.navigate("NavigateCard");
          }}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={tw`flex-row items-center justify-between px-10 pb-2 ${
                item.id === selected?.id ? "bg-gray-200" : ""
              }`}
              onPress={() => setSelected(item)}
            >
              <View style={tw`flex-row items-center`}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                  }}
                  source={{ uri: item.image }}
                />
                <View>
                  <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
                  <Text>{travelTimeInformation?.duration.text}</Text>
                </View>
              </View>
              <Text style={tw`text-xl`}>
                {Intl.NumberFormat("en", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  (travelTimeInformation?.duration.value * item?.multiplier) /
                    60
                )}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${selected ? "" : "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected ? selected.title : "a ride"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
