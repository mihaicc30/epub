import { View, Text, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomHeader } from "./Nav/CustomHeader";

export default function Businesses() {
  return (
    <>
    <StatusBar
        animated={true}
        backgroundColor="#9d9d9de0"
      />
      <SafeAreaView>
        <CustomHeader />
        <View>
          <Text>Businesses</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
