import { API_SERVER, API_SERVER2 } from "@env";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import React, { Suspense, useContext, useEffect, useState } from "react";
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

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    query("getSuppliers", { user }).then(async (res) =>
      setSuppliers(await res.suppliers),
    );
  }, []);

  const handleChooseSupplier = async (sup) => {
    setSupplier(sup);

    try {
      const [tempallData, tempfavsData, tempcartData] = await Promise.all([
        query("all", { sup: sup.business }),
        query("requestfavs", { sup: sup, user: user }),
        query("grabbasket", { sup: sup._id, user: user._id }),
      ]);

      setAll(tempallData);
      setFavs(tempfavsData);
      setCart(tempcartData);

      setStep(3);
    } catch (error) {
      alert("Error during supplier selection:", error);
    }
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#9d9d9de0" />
      <SafeAreaView>
        <ScrollView>
          <Suspense fallback={"loading"}>
            <View className={`w-[100%] flex-row flex-wrap justify-center`}>
              {suppliers.map((sup, index) => (
                <TouchableOpacity
                  key={sup._id + "supChoices"}
                  className={`basis-[50%]`}
                  onPress={() => handleChooseSupplier(sup)}
                >
                  <View
                    className={`m-4 rounded-3xl border-2 border-gray-500/10 bg-gray-100 px-4 py-2 shadow shadow-black/10`}
                  >
                    <Text className={`text-center`}>{sup.business}</Text>
                    <Image
                      source={{
                        uri: `${API_SERVER}/img/suppliers/${sup._id}.jpg`,
                      }}
                      className={`m-auto h-[100px] w-full rounded-lg`}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Suspense>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
