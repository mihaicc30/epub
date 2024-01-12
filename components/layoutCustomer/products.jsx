
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
import { CustomHeader } from "./Nav/CustomHeader";
import { AppContext } from "../../App";
import { query } from "../../api/cmd";
import ItemCardSmall from "./itemManagement/ItemCardSmall";

export default function Products() {
  const { user, supplier, all, favs, cart, setAll, setFavs, setCart } =
    useContext(AppContext);

  return (
    <SafeAreaView>
      <CustomHeader />
      {/* filters */}
      <View>
        <View></View>

        <View></View>
      </View>

      <Suspense fallback={<Text>Loading...</Text>}>
        <Text className="pl-2 text-lg font-bold">
          {/* to put a spinner instead */}
          All Products ({all.length || " 0 "})
        </Text>
        {all.length < 1 && (
          <Text className={`text-center`}>
            Supplier has not added any products.
          </Text>
        )}
        <FlatList
          className={`mb-[140px]`}
          data={all}
          renderItem={({ item }) => <ItemCardSmall data={item} cart={cart}/>}
          keyExtractor={(offer) => "allProd" + offer._id}
        />
     
      </Suspense>
    </SafeAreaView>
  );
}
