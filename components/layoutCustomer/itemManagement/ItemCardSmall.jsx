
import {API_SERVER, API_SERVER2} from "@env"
import { View, Text, TouchableOpacity, Image , StatusBar } from "react-native";
import React, { useContext } from "react";
import { AppContext } from "../../../App";
import IM from "./IM";

export default function ItemCardSmall({ data }) {
  const { cart } = useContext(AppContext);
  return (
    <View
      className={`relative m-2 w-[96%] flex-row overflow-hidden rounded-xl bg-white p-1 shadow shadow-black`}
    >
      {data.price_offer && (
        <Text
          className={` absolute left-0 top-0 z-10 rounded-br-xl bg-red-500 p-2 text-white`}
        >
          -{(((data.price - data.price_offer) / data.price) * 100).toFixed(0)}%
        </Text>
      )}
      <TouchableOpacity className={`basis-[20%]`}>
        <Image
          source={{
            uri: `${API_SERVER}/img/products/${data._id}.jpg`,
          }}
          className={`m-auto h-[60px] w-[60px] rounded-lg`}
        />
      </TouchableOpacity>

      <View className={`flex-1`}>
        <Text className={`text-sm `} numberOfLines={2} ellipsizeMode="tail">
          {data.name}
        </Text>
        <Text
          className={`mt-auto text-sm`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {data.pack_size}
        </Text>
      </View>

      <View className={`basis-[22%]`}>
        <View className={`items-end pr-1`}>
          <Text
            className={` ${
              parseFloat(data.price_offer) > 0 ? "text-sm line-through" : ""
            }`}
          >
            £{data.price}
          </Text>
          {parseFloat(data.price_offer) > 0 && (
            <Text className={`font-[600]`}>£{data.price_offer}</Text>
          )}
        </View>

        <IM data={data} cart={cart}/>
      </View>
    </View>
  );
}
