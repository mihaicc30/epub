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
import { query } from "../../api/cmd";
import IM from "../itemManagement/IM";
import ItemCardSmall from "../itemManagement/ItemCardSmall";

export default function Favorites() {
  const { user, supplier, all, favs, cart, setAll, setFavs, setCart } =
    useContext(AppContext);

  const filteredFavs =
    favs.lenght < 1
      ? []
      : favs.map((fav) => {
          // Find the matching product in all based on _id
          const matchingProduct = all.find((product) =>
            fav.includes(product._id),
          );

          // Return the matching product or null if not found
          return matchingProduct || null;
        });

  return (
    <SafeAreaView>
      <CustomHeader />
      {/* filters */}
      <View>
        <View></View>

        <View></View>
      </View>

      <Suspense fallback={"Loading..."}>
        <Text className="pl-2 text-lg font-bold">
          {/* to put a spinner instead */}
          Favorite Products ({filteredFavs.length || "  "})
        </Text>
        {filteredFavs.length > 0 && (
          <FlatList
            className={`mb-[50px]`}
            data={filteredFavs}
            renderItem={({ item }) => <ItemCardSmall data={item} />}
            keyExtractor={(offer, index) => "fav" + index + offer._id}
          />
        )}
      </Suspense>
    </SafeAreaView>
  );
}
