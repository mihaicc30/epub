import { API_SERVER, API_SERVER2 } from "@env";
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../App";
import IM from "./IM";
import { CustomHeader } from "../Nav/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { query } from "../../../api/cmd";
import { useNavigation } from "@react-navigation/native";

export default function ItemCardBig() {
  const navigation = useNavigation();
  const { cart, all, setAll, updStep, user } = useContext(AppContext);
  const route = useRoute();
  let params = route.params;
  const [data, setData] = useState({});

  useEffect(() => {
    setData({ ...params.data });
  }, [route.params]);

  const timer = useRef(null);
  const [saving, setSaving] = useState(false);

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 500, // Adjust the duration as needed
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    const handleDelayedUpdate = () => {
      setSaving(true);
      // Clear existing timer
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        // Perform your database update query using the latest cart state
        // ... your database update logic using cart
        // ...
        console.log("Run db cart update.", new Date().toLocaleTimeString());
        query("supdateProduct", {
          sup: user,
          product: {
            ...data,
            price_offer:
              parseFloat(data.price_offer) <= 0 || data.price_offer === ""
                ? "0"
                : data.price_offer,
          },
        });
        setAll((prevAll) =>
          prevAll.map((item) =>
            item._id === data._id ? { ...item, ...data } : item,
          ),
        );

        setSaving(false);

        // Clear the timer reference
        timer.current = null;
      }, 2000);
    };

    handleDelayedUpdate();
    // Cleanup function to clear the timer on component unmount
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [data, timer]);

  const handleDelete = () => {
    query("sdeleteProduct", {
      product: { ...data },
    });
    setAll((prevAll) => prevAll.filter((item) => item._id !== data._id));
    navigation.goBack();
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#9d9d9de0" />
      <SafeAreaView>
        <CustomHeader />
        <ScrollView className={`relative mb-[130px]`}>
          {saving && (
            <View
              style={{
                padding: 3,
                position: "absolute",
                right: 2,
                fontSize: 30,
                zIndex: 10,
              }}
            >
              <Animated.Text
                style={{
                  transform: [{ rotate: spin }],
                  padding: 3,
                  right: 1,
                  fontSize: 30,
                }}
              >
                ⚙
              </Animated.Text>
              <Text className={`text-xs`}>Saving...</Text>
            </View>
          )}
          <View
            className={` m-2 w-[97%] overflow-hidden rounded-xl bg-white p-2 shadow shadow-black`}
          >
            {data.price_offer &&
              data.price_offer !== "" &&
              data.price_offer !== "0" &&
              data.price_offer !== null &&
              parseFloat(data.price_offer) <= parseFloat(data.price) && (
                <Text
                  className={` absolute left-0 top-0 z-10 rounded-br-xl bg-red-500 p-2 text-white`}
                >
                  -
                  {String(
                    (
                      ((data.price - data.price_offer) / data.price) *
                      100
                    ).toFixed(1),
                  )}
                  %
                </Text>
              )}

            <TouchableOpacity>
              <Image
                source={{
                  uri: `${API_SERVER}/img/products/${data._id}.jpg`,
                }}
                className={`m-auto h-[150px] w-[150px] rounded-lg`}
              />
            </TouchableOpacity>
            <View className={`py-2`}>
              <Text>Product name</Text>
              <TextInput
                onChangeText={(text) =>
                  setData((prev) => ({ ...prev, name: text }))
                }
                className={`rounded-lg border-[1px] border-black/10 px-4 py-2 text-sm`}
              >
                {data.name}
              </TextInput>
            </View>

            <View className={`py-2`}>
              <Text>Type</Text>
              <Text
                onPress={() =>
                  setData((prev) => ({ ...prev, product_type: "Ambient" }))
                }
                className={`rounded-lg border-[1px] border-black/10 px-4 py-1 text-sm ${
                  data.product_type === "Ambient" ? "bg-blue-200" : ""
                }`}
              >
                {data.product_type === "Ambient" ? "⚫" : "⚪"} Ambient
              </Text>
              <Text
                onPress={() =>
                  setData((prev) => ({ ...prev, product_type: "Chilled" }))
                }
                className={`rounded-lg border-[1px] border-black/10 px-4 py-1 text-sm ${
                  data.product_type === "Chilled" ? "bg-blue-200" : ""
                }`}
              >
                {data.product_type === "Chilled" ? "⚫" : "⚪"} Chilled
              </Text>
              <Text
                onPress={() =>
                  setData((prev) => ({ ...prev, product_type: "Frozen" }))
                }
                className={`rounded-lg border-[1px] border-black/10 px-4 py-1 text-sm ${
                  data.product_type === "Frozen" ? "bg-blue-200" : ""
                }`}
              >
                {data.product_type === "Frozen" ? "⚫" : "⚪"} Frozen
              </Text>
            </View>

            <View className={`flex-row gap-x-2 py-2`}>
              <View className={`h-[60px] flex-1`}>
                <Text>Packaging size</Text>
                <TextInput
                  onChangeText={(text) =>
                    setData((prev) => ({ ...prev, pack_size: text }))
                  }
                  className={`rounded-lg border-[1px] border-black/10 px-4 py-2 text-sm`}
                >
                  {data.pack_size}
                </TextInput>
              </View>
              <View className={`h-[60px] flex-1`}>
                <Text>Stock</Text>
                <TextInput
                  onChangeText={(text) =>
                    setData((prev) => ({
                      ...prev,
                      qty_available: text === "" ? "" : text,
                    }))
                  }
                  inputMode="decimal"
                  className={`flex-1 rounded-lg border-[1px] border-black/10 px-4 py-2 text-sm`}
                >
                  {data.qty_available}
                </TextInput>
              </View>
            </View>

            <View className={`flex-row gap-x-2 py-2`}>
              <View className={`h-[60px] flex-1`}>
                <Text>Price</Text>
                <TextInput
                  onChangeText={(text) =>
                    setData((prev) => ({
                      ...prev,
                      price: text === "" ? "" : text,
                    }))
                  }
                  keyboardType="numeric"
                  className={`flex-1 rounded-lg border-[1px] border-black/10 px-4 py-2 text-sm`}
                >
                  {data.price}
                </TextInput>
              </View>
              <View className={`h-[60px] flex-1`}>
                <Text>Promo Price</Text>
                <TextInput
                  onChangeText={(text) =>
                    setData((prev) => ({
                      ...prev,
                      price_offer: text === "" ? "" : text,
                    }))
                  }
                  keyboardType="numeric"
                  className={`flex-1 rounded-lg border-[1px] border-black/10 px-4 py-2 text-sm`}
                >
                  {data.price_offer}
                </TextInput>
              </View>
            </View>

            <View className={`py-2`}>
              <Text>Ingredients</Text>
              <TextInput
                onChangeText={(text) =>
                  setData((prev) => ({ ...prev, ingredients: text }))
                }
                rows={8}
                multiline={true}
                className={`rounded-lg border-[1px] border-black/10 px-4 py-2 text-sm`}
              >
                {data.ingredients}
              </TextInput>
            </View>

            <TouchableOpacity onPress={handleDelete} className={`my-12`}>
              <Text
                className={`rounded-3xl border-transparent bg-orange-500 px-16 py-2 text-center font-[400] tracking-wider text-white shadow-lg shadow-black`}
              >
                Delete Product
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
