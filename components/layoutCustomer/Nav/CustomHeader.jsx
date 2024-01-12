import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../App";
import { query } from "../../../api/cmd";

export const CustomHeader = () => {
  const { logout, cart, timer, supplier, user } = useContext(AppContext);

  useEffect(() => {
    const handleDelayedUpdate = () => {
      // Clear existing timer
      if (timer.current) {
        clearTimeout(timer.current);
      }

      // Set a new timer for 1000ms (1 second)
      timer.current = setTimeout(() => {
        // Perform your database update query using the latest cart state
        // ... your database update logic using cart
        // ...
        console.log("Run db cart update.", new Date().toLocaleTimeString())
        query("updateiteminbasket", {
          sup: supplier,
          user: user,
          basket: cart.length > 0 ? cart : [],
        });

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
  }, [cart, timer]);

  return (
    <View className={`w-[100vw] flex-row justify-between`}>
      <TouchableOpacity
        className={`m-1 border-b-2 border-red-400 p-1`}
        accessibilityRole="button"
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className={`text-xs text-black`}>Account</Text>
        </View>
      </TouchableOpacity>
      <Image
        source={require("../../../assets/logobg.png")}
        className={`h-[50px] w-[50px]`}
      />
      <TouchableOpacity
        className={`m-1 border-b-2 border-red-400 p-1`}
        accessibilityRole="button"
        onPress={logout}
        onLongPress={logout}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className={`text-xs text-black`}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
