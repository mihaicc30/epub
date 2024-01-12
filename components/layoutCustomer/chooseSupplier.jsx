import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../App";
import { query } from "../../api/cmd";

export default function ChooseSupplier() {
  const {
    user,
    setUser,
    setSupplier,
    supplier,
    step,
    setStep,
    all,
    favs,
    cart,
    setAll,
    setFavs,
    setCart,
    timer,
  } = useContext(AppContext);

  const handleChooseSupplier = () => {
    let supp = {
      _id: "63808495f18bda2871e37f4a",
      email: "1alemihai25@gmail.com",
      name: "Mega_Supplier",
      phone: "07443399999999",
    };
    setSupplier(supp);

    query("all", { sup: supp.name }).then((res) => setAll(res));
    query("requestfavs", { sup: supp, user: user }).then((res) => setFavs(res));
    query("grabbasket", { sup: supp._id, user: user._id }).then((res) =>
      setCart(res),
    );

    setStep(3);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className={`w-[100%] flex-row flex-wrap justify-center`}>
          <TouchableOpacity
            className={`basis-[50%]`}
            onPress={() => handleChooseSupplier()}
          >
            <View
              className={`m-4 rounded-3xl border-2 border-gray-500/10 bg-gray-100 px-4 py-2 shadow shadow-black/10`}
            >
              <Text className={` mt-8 border-2 border-gray-500/5 px-4 py-2`}>
                chooseSupplier
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className={`basis-[50%]`}
            onPress={() => handleChooseSupplier()}
          >
            <View
              className={`m-4 rounded-3xl border-2 border-gray-500/10 bg-gray-100 px-4 py-2 shadow shadow-black/10`}
            >
              <Text className={` mt-8 border-2 border-gray-500/5 px-4 py-2`}>
                chooseSupplier
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
