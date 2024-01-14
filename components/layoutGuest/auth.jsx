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
    if (type === "supplier") {
      setUser({
        _id: "63808495f18bda2871e37f4a",
        email: "1alemihai25@gmail.com",
        name: "Mega_Supplier",
        phone: "07443399999999",
        type: "supplier",
      });
      setStep(4);
    } else if (type === "customer") {
      setUser({
        _id: "637e738dd96302710a205a28",
        email: "alemihai25@gmail.com",
        name: "BlackHartX",
        phone: "07111443350891",
        type: "customer",
      });
      setStep(2);
    }
  };

  return (
    <>
    <StatusBar
        animated={true}
        backgroundColor="#9d9d9de0"
      />
      <SafeAreaView>
        <View className={`h-100`}>
          <Image
            source={require("../../assets/logobg.png")}
            className={`mx-auto my-[5vh] h-[150px] w-[150px]`}
          />

          <View className={`h-100 items-center gap-4 px-4`}>
            <View className={`w-[80%]`}>
              <Text aria-label="email">Email</Text>
              <TextInput
                autoComplete="email"
                className={` rounded-3xl border-2 border-gray-300/10 bg-gray-100 px-4 py-2 shadow-lg shadow-black`}
                placeholder="Email..."
                // onChangeText={(text) => {
                //   setEmail(text);
                // }}
                // value={email}
              />
            </View>
            <View className={`w-[80%]`}>
              <Text aria-label="password">Password</Text>
              <TextInput
                autoComplete="password"
                className={` rounded-3xl border-2 border-gray-300/10 bg-gray-100 px-4 py-2 shadow-lg shadow-black`}
                placeholder="Password..."
                secureTextEntry
                // value={password}
                // onChangeText={(text) => setPassword(text)}
              />
            </View>

            <TouchableOpacity onPress={() => handleLogin("customer")}>
              <Text
                className={`rounded-3xl border-transparent bg-yellow-500 px-16 py-2 text-center font-[400] tracking-wider text-white shadow-lg shadow-black`}
              >
                Sign In as Test Customer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleLogin("supplier")}>
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
