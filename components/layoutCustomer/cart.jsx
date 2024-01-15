import { API_SERVER, API_SERVER2 } from "@env";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CustomHeader } from "./Nav/CustomHeader";
import { AppContext } from "../../App";
import { query } from "../../api/cmd";
import ItemCardSmall from "./itemManagement/ItemCardSmall";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Cart() {
  const { user, supplier, all, favs, cart, setAll, setFavs, setCart } =
    useContext(AppContext);

  const navigation = useNavigation();
  const route = useRoute();
  const [confirmationModal, setconfirmationModal] = useState(false);

  useEffect(() => {
    if (route?.params?.message) {
      handleDeleteCart();
      setconfirmationModal(true);
    }
  }, [route]);

  const handleDeleteCart = () => {
    query("removeallfrombasket", {
      sup: supplier,
      user: user,
    }).then(() => setCart([]));
  };

  const handleCheckoutCart = () => {
    navigation.navigate("checkout");
  };

  useEffect(() => {
    query("grabbasket", { sup: supplier._id, user: user._id }).then(
      async (cartData) => setCart(cartData),
    );
  }, []);

  return (
    <>
      <StatusBar animated={true} backgroundColor="#9d9d9de0" />
      <SafeAreaView className={`pb-[33vh]`}>
        {route?.params && confirmationModal && (
          <TouchableOpacity
            onPress={() => {
              setconfirmationModal(false);
            }}
            className={`absolute inset-0 z-20 h-[100vh] w-[100vw] items-center justify-center bg-black/50`}
          >
            <View className={`rounded-xl bg-white p-10`}>
              <Text className="text-center">
                <Ionicons
                  name="checkmark-circle-outline"
                  size={32}
                  color="green"
                />
              </Text>
              <Text>{route.params.message}</Text>
            </View>
          </TouchableOpacity>
        )}
        <CustomHeader />

        <Suspense fallback={<Text>Loading...</Text>}>
          <Text className="pl-2 text-lg font-bold">
            {/* to put a spinner instead */}
            Cart ({cart.reduce((total, item) => total + item.qty, 0) || " 0 "})
          </Text>

          <TouchableOpacity disabled={cart.reduce((total, item) => total + item.qty, 0) < 1} onPress={handleDeleteCart} className={`px-2`}>
            <Text
              className={`my-4 rounded-3xl border-transparent ${
                cart.reduce((total, item) => total + item.qty, 0) < 1
                  ? "bg-gray-200 text-gray-400"
                  : "bg-orange-500 text-white"
              }  py-2 text-center font-[400] tracking-wider shadow-lg shadow-black`}
            >
              Delete All
            </Text>
          </TouchableOpacity>

          {cart.length > 0 && (
            <FlatList
              data={cart}
              renderItem={({ item }) => (
                <ItemCardSmall data={item} cart={cart} />
              )}
              keyExtractor={(offer, index) => "cart" + index + offer._id}
            />
          )}

          {cart.length < 1 && (
            <Text className={`text-center`}> Your cart is empty.</Text>
          )}

          <Text className={`text-center text-lg font-bold`}>
            Total: £
            {cart
              .reduce(
                (total, item) =>
                  total + (item.price_offer || item.price) * item.qty,
                0,
              )
              .toFixed(2) || " 0 "}
          </Text>

          <TouchableOpacity
            disabled={cart.reduce((total, item) => total + item.qty, 0) < 1}
            onPress={handleCheckoutCart}
            className={`px-2 pb-4`}
          >
            <Text
              className={`my-4 rounded-3xl border-transparent ${
                cart.reduce((total, item) => total + item.qty, 0) < 1
                  ? "bg-gray-200 text-gray-400"
                  : "bg-green-500 text-white"
              } py-2 text-center font-[400] tracking-wider shadow-lg shadow-black `}
            >
              Checkout
            </Text>
          </TouchableOpacity>
        </Suspense>
      </SafeAreaView>
    </>
  );
}
