import { API_SERVER } from "@env";

import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import IM from "./IM";

export default function ItemCardBig({ data }) {
  return (
    <View
      className={`relative m-2 w-[170px] overflow-hidden rounded-xl bg-white px-2 shadow shadow-black`}
    >
      {data.price_offer && (
        <Text
          className={` absolute left-0 top-0 z-10 rounded-br-xl bg-red-500 p-2 text-white`}
        >
          -{(((data.price - data.price_offer) / data.price) * 100).toFixed(0)}%
        </Text>
      )}
      <TouchableOpacity>
        <Image
          source={{
            uri: `${API_SERVER}/img/products/${data._id}.jpg`,
          }}
          className={`m-auto h-[150px] w-[150px] rounded-lg`}
        />
      </TouchableOpacity>
      <View className={`flex-row flex-nowrap items-center justify-center`}>
        <Text
          className={` ${
            parseFloat(data.price_offer) > 0 ? "text-sm line-through" : ""
          }`}
        >
          £{data.price}
        </Text>
        {parseFloat(data.price_offer) > 0 && (
          <Text className={`text-lg font-[600]`}>£{data.price_offer}</Text>
        )}
      </View>
      <Text className={`text-sm`}>{data.name}</Text>

      <IM data={data} />
    </View>
  );
}