import { Image, Text, TouchableOpacity, View , StatusBar } from "react-native";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../App";
import { query } from "../../../api/cmd";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export const CustomHeader = () => {
  const { logout, user, setAll } = useContext(AppContext);

  useEffect(() => {
    query("all", { sup: user.name }).then((res) => setAll(res));
  }, []);

  // useEffect(() => {
  //   const handleDelayedUpdate = () => {
  //     // Clear existing timer
  //     if (timer.current) {
  //       clearTimeout(timer.current);
  //     }

  //     // Set a new timer for 1000ms (1 second)
  //     timer.current = setTimeout(() => {
  //       // Perform your database update query using the latest cart state
  //       // ... your database update logic using cart
  //       // ...
  //       console.log("Run db cart update.", new Date().toLocaleTimeString())
  //       query("updateiteminbasket", {
  //         sup: supplier,
  //         user: user,
  //         basket: cart.length > 0 ? cart : [],
  //       });

  //       // Clear the timer reference
  //       timer.current = null;
  //     }, 2000);
  //   };

  //   handleDelayedUpdate();
  //   // Cleanup function to clear the timer on component unmount
  //   return () => {
  //     if (timer.current) {
  //       clearTimeout(timer.current);
  //     }
  //   };
  // }, [cart, timer]);

  return (
    <View className={`w-[100vw] flex-row justify-between`}>
     <TouchableOpacity className={`m-1 p-1  border-b-[1px] border-b-black/20`} accessibilityRole="button">
        <View className={`p-1`}>
          <Text className={`text-black`}>
            <MaterialCommunityIcons
              name="account-cog"
              color="black"
              style={{ fontSize: 24 }}
            />
          </Text>
        </View>
      </TouchableOpacity>
      <Image
        source={require("../../../assets/logobg.png")}
        className={`h-[50px] w-[50px]`}
      />
      <TouchableOpacity
        className={`m-1 p-1 border-b-[1px] border-b-black/20`}
        accessibilityRole="button"
        onPress={logout}
        onLongPress={logout}
      >
        <View className={`p-1`}>
          <Text className={`text-black`}>
            <MaterialCommunityIcons
              name="logout-variant"
              color="black"
              style={{ fontSize: 24 }}
            />
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
