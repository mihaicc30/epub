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
import { query } from "../../api/cmd";
import ItemCardSmall from "../itemManagement/ItemCardSmall";

export default function Products() {
  const { user, supplier,all, favs, cart, setAll, setFavs, setCart } = useContext(AppContext);

  return (
    <SafeAreaView>
      <CustomHeader />
    {/* filters */}
      <View>

        <View></View>

        
        <View></View>

      </View>

      <Suspense fallback={"Loading..."}>
        <Text className="text-lg font-bold pl-2">
          {/* to put a spinner instead */}
          All Products ({all.length || "  "})
        </Text>
        <FlatList
        className={`mb-[50px]`}
          data={all}
          renderItem={({ item }) => <ItemCardSmall data={item} />}
          keyExtractor={(offer) => "allProd"+offer._id}
        />
      </Suspense>
    </SafeAreaView>
  );
}
