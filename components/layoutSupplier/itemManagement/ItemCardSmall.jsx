import { API_SERVER, API_SERVER2 } from "@env";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import React, { useContext } from "react";
import { AppContext } from "../../../App";
import IM from "./IM";
import { useNavigation } from "@react-navigation/native";

export default function ItemCardSmall({ data }) {
  const navigation = useNavigation();

  const handleProductPress = (productData) => {
    navigation.navigate("product-detail", { data: productData });
  };

  return (
    <TouchableOpacity onPress={() => handleProductPress(data)}>
      <View
        className={`relative m-2 w-[96%] flex-row overflow-hidden rounded-xl bg-white p-1 shadow shadow-black`}
      >
        {data.price_offer &&
          parseFloat(data.price_offer) &&
          parseFloat(data.price_offer) !== "" &&
          data.price_offer !== "0" &&
          parseFloat(data.price_offer) !== null &&
          parseFloat(parseFloat(data.price_offer)) <=
            parseFloat(data.price) && (
            <Text
              className={` absolute left-0 top-0 z-10 rounded-br-xl bg-red-500 p-2 text-white`}
            >
              -
              {(
                ((parseFloat(data.price) - parseFloat(data.price_offer)) /
                  parseFloat(data.price)) *
                100
              ).toFixed(0)}
              %
            </Text>
          )}
        <View className={`basis-[20%]`}>
          <Image
            source={{
              uri: `${API_SERVER}/img/products/${data._id}.jpg`,
            }}
            className={`m-auto h-[60px] w-[60px] rounded-lg`}
          />
        </View>

        <View className={`flex-1`}>
          <Text className={`text-sm `} numberOfLines={3} ellipsizeMode="tail">
            {data.name}
          </Text>
        </View>

        <View className={`basis-[22%]`}>
          <View className={`items-end pr-1`}>
            <Text className={`mt-auto text-sm`}>{data.pack_size}</Text>
            <Text
              className={` ${
                parseFloat(data.price_offer) > 0 ? "text-sm line-through" : ""
              }`}
            >
              £{parseFloat(data.price).toFixed(2)}
            </Text>
            {parseFloat(data.price_offer).toFixed(2) > 0 && (
              <Text className={`font-[600]`}>
                £{parseFloat(data.price_offer).toFixed(2)}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
