import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../App";
import { CustomHeader } from "../Nav/CustomHeader";
import { query } from "../../api/cmd";
import ItemCardBig from "../itemManagement/ItemCardBig";

export default function home() {
  const { user, supplier, all, favs, cart, setAll, setFavs, setCart } =
    useContext(AppContext);

  const offers = all
    .filter(
      (product) => product.price_offer !== null && product.price_offer > 0,
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date in descending order

  const newest = all
    .filter(
      (product) => product.price_offer !== null && product.price_offer > 0,
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
    .slice(0, 5); // Take the first 5 products

  return (
    <SafeAreaView>
      <CustomHeader />

      <ScrollView>
        <Suspense fallback={"Loading..."}>
          <Text className="pl-2 text-lg font-bold">
            {/* to put a spinner instead */}
            Offers ({offers.length || "  "})
          </Text>
          <FlatList
            horizontal={true}
            data={offers}
            renderItem={({ item }) => <ItemCardBig data={item} />}
            keyExtractor={(offer) => offer._id}
          />
        </Suspense>

        <Suspense fallback={"Loading..."}>
          <Text className="pl-2 text-lg font-bold">
            {/* to put a spinner instead */}
            Newest ({newest.length || "  "})
          </Text>
          <FlatList
            className={`mb-[50px]`}
            horizontal={true}
            data={newest}
            renderItem={({ item }) => <ItemCardBig data={item} />}
            keyExtractor={(prod) => prod._id}
          />
        </Suspense>
      </ScrollView>
    </SafeAreaView>
  );
}
