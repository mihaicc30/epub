import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../App";

export default function auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = (type) => {
    if (type === "Supplier") {
      setUser({
        _id: "63808495f18bda2871e37f4a",
        email: "1alemihai25@gmail.com",
        name: "Mega_Supplier",
        phone: "07443399999999",
        type: "Supplier",
      });
      setStep(4);
    } else if (type === "Customer") {
      setUser({
        _id: "637e738dd96302710a205a28",
        email: "alemihai25@gmail.com",
        password: "alemihai25@gmail.com",
        password_reset: false,
        password_reset_code: null,
        business: "BlackHartX",
        phone: "07111443350891",
        address: {
          number: "7",
          street: "Dove Close",
          pc: "WR4 9EA",
          city: "Worcester",
          country: "United Kingdom",
        },
        favitems: ["637dd77ab292e14321338e9f", "637dd882b292e14321338ed2"],
        items: [],
        type: "Customer",
        suppliers: [
          {
            email: "1alemihai25@gmail.com",
            business: "Mega_Supplier",
            phone: "07443399999999",
            _id: "63808495f18bda2871e37f4a",
          },
          {
            email: "butcheralemihai25@gmail.com",
            business: "Pro Butcher",
            phone: "07443350891",
            _id: "63aadd097fac4b21c5991b1a",
          },
          {
            email: "fishalemihai25@gmail.com",
            business: "Fish Man Supplier",
            phone: "07443350891",
            _id: "63ac821e3816593d6fb55a03",
          },
        ],
      });
      setStep(2);
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     query("getOrders", { supplier: user }).then((res) => setOrders(res));
  //   }, []),
  // );

  return (
    <>
      <SafeAreaView>
        <StatusBar animated={true} backgroundColor="#9d9d9de0" />
        <View className={`h-100`}>
          <Image
            source={require("../../assets/logobg.png")}
            className={`mx-auto my-[5vh] h-[150px] w-[150px]`}
          />

          <View className={`h-100 items-center gap-4 px-4`}>
            <View className={`w-[80%]`}>
              <Text aria-label="email">Email</Text>
              <Text
                className={` rounded-3xl border-2 border-gray-300/10 bg-gray-200 text-gray-400 px-4 py-2 shadow-lg shadow-black`}
              >
                Email...
              </Text>
              {/* <TextInput
                autoComplete="email"
                className={` rounded-3xl border-2 border-gray-300/10 bg-gray-100 px-4 py-2 shadow-lg shadow-black`}
                placeholder="Email..."
                // onChangeText={(text) => {
                //   setEmail(text);
                // }}
                // value={email}
              /> */}
            </View>
            <View className={`w-[80%]`}>
              <Text aria-label="password">Password</Text>
              <Text
                className={` rounded-3xl border-2 border-gray-300/10 bg-gray-200 text-gray-400 px-4 py-2 shadow-lg shadow-black`}
              >
                Password...
              </Text>
              {/* <TextInput
                autoComplete="password"
                className={` rounded-3xl border-2 border-gray-300/10 bg-gray-100 px-4 py-2 shadow-lg shadow-black`}
                placeholder="Password..."
                secureTextEntry
                // value={password}
                // onChangeText={(text) => setPassword(text)}
              /> */}
            </View>

            <TouchableOpacity onPress={() => handleLogin("Customer")}>
              <Text
                className={`rounded-3xl border-transparent bg-yellow-500 px-16 py-2 text-center font-[400] tracking-wider text-white shadow-lg shadow-black`}
              >
                Sign In as Test Customer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleLogin("Supplier")}>
              <Text
                className={`rounded-3xl border-transparent bg-yellow-500 px-16 py-2 text-center font-[400] tracking-wider text-white shadow-lg shadow-black`}
              >
                Sign In as Test Supplier
              </Text>
            </TouchableOpacity>

            <View className={`flex-row gap-2 px-4`}>
              <TouchableOpacity className={`basis-[45%] `}>
                <Text
                  className={`rounded-3xl border-transparent bg-gray-200 py-2 text-center font-[400] tracking-wider shadow-lg shadow-black`}
                >
                  Forgot Password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className={`basis-[45%] `}>
                <Text
                  className={`rounded-3xl border-transparent bg-gray-200 py-2 text-center font-[400] tracking-wider shadow-lg shadow-black`}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <View className={`flex-row gap-2 px-4 pt-[10vh]`}>
              <TouchableOpacity className={`basis-[30%] `}>
                <Text
                  className={`rounded-3xl border-transparent bg-gray-200 py-2 text-center font-[400] tracking-wider shadow-lg shadow-black`}
                >
                  Info
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className={`basis-[30%] `}>
                <Text
                  className={`rounded-3xl border-transparent bg-gray-200 py-2 text-center font-[400] tracking-wider shadow-lg shadow-black`}
                >
                  Settings
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className={`basis-[30%] `}>
                <Text
                  className={`rounded-3xl border-transparent bg-gray-200 py-2 text-center font-[400] tracking-wider shadow-lg shadow-black`}
                >
                  Feedback
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
