import { View, Text, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Contact() {
  return (
    <>
   <StatusBar
        animated={true}
        backgroundColor="#9d9d9de0"
      />
      <SafeAreaView>
        <View>
          <Text>Contact</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
