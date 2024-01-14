import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { CustomHeader } from "./Nav/CustomHeader";
import { AppContext } from "../../App";
import ItemCardSmall from "./itemManagement/ItemCardSmall";

export default function Favorites() {
  const { user, supplier, all, favs, cart, setAll, setFavs, setCart } =
    useContext(AppContext);

  const [filters, setFilters] = useState({
    name: "",
  });

  let filteredFavs =
    favs.length < 1
      ? []
      : all
          .filter((product) =>
            filters.name !== ""
              ? String(product.name)
                  .toLowerCase()
                  .indexOf(String(filters.name).toLowerCase()) >= 0
              : product,
          )
          .filter((product) => {
            // Find the matching product in all based on _id
            const foundProduct = favs.find((favid) => product._id === favid);
            return foundProduct;
          });

  return (
    <>
      <StatusBar animated={true} backgroundColor="#9d9d9de0" />
      <SafeAreaView>
        <CustomHeader />
        {/* filters */}
        <View>
          <TextInput
            onChangeText={(text) => {
              setFilters((prev) => ({
                ...prev,
                name: text,
              }));
            }}
            value={filters.name}
            placeholder="Search by name..."
            className={`mx-2 rounded-xl bg-white px-4 py-2`}
          />
        </View>

        <Suspense fallback={<Text>Loading...</Text>}>
          <Text className="pl-2 text-lg font-bold">
            {/* to put a spinner instead */}
            Favorite Products ({filteredFavs.length || " 0 "})
          </Text>
          {filteredFavs.length < 1 && (
            <Text className={`text-center`}> You have no favorites.</Text>
          )}
          {filteredFavs.length > 0 && (
            <FlatList
              className={`mb-[200px]`}
              data={filteredFavs}
              renderItem={({ item }) => (
                <ItemCardSmall data={item} cart={cart} />
              )}
              keyExtractor={(offer, index) => "fav" + index + offer}
            />
          )}
        </Suspense>
      </SafeAreaView>
    </>
  );
}
