import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
} from "react-native";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../App";
import { CustomHeader } from "./Nav/CustomHeader";
import { query } from "../../api/cmd";
import ItemCardBig from "./itemManagement/ItemCardBig";

export default function home() {
  const { user, supplier, all, favs, cart, setAll, setFavs, setCart } =
    useContext(AppContext);

  const offers = all
    .filter(
      (product) => product.price_offer !== null && product.price_offer > 0,
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date in descending order

  const newest = all
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
    .slice(0, 10); // Take the first 5 products


  return (
    <>
      <StatusBar animated={true} backgroundColor="#9d9d9de0" />
      <SafeAreaView>
        <CustomHeader />

        <ScrollView>
          <Suspense fallback={<Text>Loading...</Text>}>
            <Text className="pl-2 text-lg font-bold">
              {/* to put a spinner instead */}
              Offers ({offers.length || " 0 "})
            </Text>

            {offers.length < 1 && (
              <Text className={`text-center`}>
                There are no offers at the moment.
              </Text>
            )}
            <FlatList
              horizontal={true}
              data={offers}
              renderItem={({ item }) => <ItemCardBig data={item} />}
              keyExtractor={(offer) => offer._id}
            />
          </Suspense>

          <Suspense fallback={<Text>Loading...</Text>}>
            <Text className="pl-2 text-lg font-bold">
              {/* to put a spinner instead */}
              Newest ({newest.length || " 0 "})
            </Text>
            {newest.length < 1 && (
              <Text className={`text-center`}>There are no new products.</Text>
            )}
            <FlatList
              className={`mb-[140px]`}
              horizontal={true}
              data={newest}
              renderItem={({ item }) => <ItemCardBig data={item} />}
              keyExtractor={(prod) => prod._id}
            />
          </Suspense>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
