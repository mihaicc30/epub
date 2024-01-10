import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../App";

export default function ChooseSupplier() {
  const { updStep, logout } = useContext(AppContext);
  return (
    <SafeAreaView>
      <ScrollView>
        <View className={`w-[100%] flex-row flex-wrap justify-center`}>
          <TouchableOpacity className={`basis-[50%]`} onPress={()=>updStep(3)}>
            <View className={`m-4 border-2 border-gray-500/10 px-4 py-2 rounded-3xl shadow shadow-black/10 bg-gray-100`}>
              <Text className={` mt-8 border-2 border-gray-500/5 px-4 py-2`}>
                chooseSupplier
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className={`basis-[50%]`} onPress={()=>updStep(3)}>
            <View className={`m-4 border-2 border-gray-500/10 px-4 py-2 rounded-3xl shadow shadow-black/10 bg-gray-100`}>
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
