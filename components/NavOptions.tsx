import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

export default function NavOptions() {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`pr-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
          onPress={() => navigation.navigate<string>(item.screen)}
          disabled={!origin}
        >
          <View style={tw`${!origin ? "opacity-20" : ""}`}>
            <View>
              <Image
                source={{ uri: item.image }}
                style={{ width: 120, height: 120, resizeMode: "contain" }}
              />
            </View>
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              tvParallaxProperties={{}}
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              type="antdesign"
              color="white"
              name="arrowright"
            />
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
