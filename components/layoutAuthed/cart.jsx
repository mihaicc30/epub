import { API_SERVER } from "@env";

import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { CustomHeader } from "../Nav/CustomHeader";
import { AppContext } from "../../App";
import IM from "../itemManagement/IM";
import { query } from "../../api/cmd";

export default function Cart() {
  const { user, supplier, all, favs, cart, setAll, setFavs, setCart } =
    useContext(AppContext);

  const handleDeleteCart = () => {
    query("removeallfrombasket", {
      sup: supplier,
      user: user,
    }).then(() => setCart([]));
  };

  const handleCheckoutCart = () => {};

  return (
    <SafeAreaView>
      <CustomHeader />

      <Suspense fallback={"Loading..."}>
        <Text className="pl-2 text-lg font-bold">
          {/* to put a spinner instead */}
          Cart ({cart.reduce((total, item) => total + item.qty, 0) || " 0 "})
        </Text>

        <TouchableOpacity onPress={handleDeleteCart}>
          <Text
            className={`my-4 rounded-3xl border-transparent bg-orange-500 py-2 text-center font-[400] tracking-wider text-white shadow-lg shadow-black`}
          >
            Delete All
          </Text>
        </TouchableOpacity>

        {cart.length > 0 && (
          <FlatList
            data={cart}
            renderItem={({ item }) => <AllProductCard data={item} />}
            keyExtractor={(offer, index) => "fav" + index + offer._id}
          />
        )}
      </Suspense>

      {cart.length < 1 && (
        <Text className={`text-center`}> Your cart is empty.</Text>
      )}

      <TouchableOpacity onPress={handleCheckoutCart}>
        <Text
          className={`my-4 rounded-3xl border-transparent bg-green-500 py-2 text-center font-[400] tracking-wider text-white shadow-lg shadow-black`}
        >
          Checkout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const AllProductCard = ({ data }) => {
  return (
    <View
      className={`relative m-2 w-[96%] flex-row overflow-hidden rounded-xl bg-white px-2 shadow shadow-black`}
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
        <Text className={``}>{data.name}</Text>
      </View>

      <View className={`basis-[20%]`}>
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

        <IM data={data} />
      </View>
    </View>
  );
};
