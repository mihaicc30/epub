import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { CustomHeader } from "./Nav/CustomHeader";
import { AppContext } from "../../App";
import { query } from "../../api/cmd";
import ItemCardSmall from "./itemManagement/ItemCardSmall";
import { useNavigation } from "@react-navigation/native";

export default function Products() {
  const navigation = useNavigation();

  const { user, supplier, all, favs, cart, setAll, setFavs, setCart, updStep } =
    useContext(AppContext);

  const handleAddProduct = () => {
    navigation.navigate("product-new");
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#9d9d9de0" />
      <SafeAreaView>
        <CustomHeader />
        {/* filters chilled/frozen/dry*/}
        {/* on offer , price range */}
        <View>
          <View></View>

          <View></View>
        </View>

        <Suspense fallback={<Text>Loading...</Text>}>
          <View className={`flex-row justify-between px-2`}>
            <Text className="pl-2 text-lg font-bold">
              {/* to put a spinner instead */}
              All Products ({all.length || " 0 "})
            </Text>
            <TouchableOpacity onPress={handleAddProduct}>
              <Text
                className={`rounded-3xl border-transparent bg-yellow-500 px-4 py-2 text-center font-[400] text-white shadow-lg shadow-black`}
              >
                + Add Product
              </Text>
            </TouchableOpacity>
          </View>
          {all.length < 1 && (
            <Text className={`text-center`}>
              Supplier has not added any products.
            </Text>
          )}
          <FlatList
            className={`mb-[140px]`}
            data={all}
            renderItem={({ item }) => <ItemCardSmall data={item} cart={cart} />}
            keyExtractor={(offer) => "allProd" + offer._id}
          />
        </Suspense>
      </SafeAreaView>
    </>
  );
}
