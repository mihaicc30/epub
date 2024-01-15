import { API_SERVER, API_SERVER2 } from "@env";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import { CheckBox } from "react-native-btr";
import { AppContext } from "../../../App";
import IM from "./IM";
import { useNavigation } from "@react-navigation/native";

export default function ItemCardOrder({ data }) {
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View
      className={`relative m-2 w-[96%] flex-row overflow-hidden rounded-xl bg-white p-1 shadow shadow-black`}
    >
      <View className={`self-center`}>
        <CheckBox
          borderWidth={1}
          color="green"
          borderRadius={6}
          checked={toggleCheckBox}
          onPress={() => setToggleCheckBox(!toggleCheckBox)}
        />
      </View>
      <Text className={`mx-1 my-auto text-lg`}>x{data.qty}</Text>
      <View className={`basis-[12%]`}>
        <Image
          source={{
            uri: `${API_SERVER}/img/products/${data._id}.jpg`,
          }}
          className={`m-auto h-[40px] w-[40px] rounded-lg`}
        />
      </View>

      <View className={`flex-1`}>
        <Text className={`text-sm `} numberOfLines={3} ellipsizeMode="tail">
          {data.name}
        </Text>
      </View>

      <View className={`basis-[22%]`}>
        <View className={`items-end pr-1`}>
          <Text className={`mt-auto text-sm`}>{data.pack_size}</Text>
        </View>
      </View>
    </View>
  );
}
