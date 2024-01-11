import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { AppContext } from "../../App";

export const CustomHeader = () => {
  const { logout } = useContext(AppContext);
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
        source={require("../../assets/logobg.png")}
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
