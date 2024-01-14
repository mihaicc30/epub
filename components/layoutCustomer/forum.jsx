import { API_SERVER, API_SERVER2 } from "@env";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { CustomHeader } from "./Nav/CustomHeader";
import { AppContext } from "../../App";
import { query } from "../../api/cmd";

export default function Forum() {
  const { user, supplier, all, favs, cart, setAll, setFavs, setCart } =
    useContext(AppContext);

  const [forumPosts, setForumPosts] = useState([]);

  useEffect(() => {
    query("forumUpdates", { sup: supplier._id }).then((res) =>
      setForumPosts(res.sort((a, b) => new Date(b.date) - new Date(a.date))),
    );
  }, []);

  return (
    <>
   <StatusBar
        animated={true}
        backgroundColor="#9d9d9de0"
      />
    <SafeAreaView>
      <CustomHeader />
      {/* filters */}
      <View>
        <View></View>

        <View></View>
      </View>

      <Suspense fallback={<Text>Loading...</Text>}>
        <Text className="pl-2 text-lg font-bold">
          {/* to put a spinner instead */}
          Forum
        </Text>
        {forumPosts.length < 1 && (
          <Text className={`text-center`}>
            Supplier has not made any announcements.
          </Text>
        )}

        {forumPosts.length > 0 && (
          <FlatList
            className={`mb-[140px]`}
            data={forumPosts}
            renderItem={({ item }) => (
              <ForumPost data={item} supplier={supplier} />
            )}
            keyExtractor={(post) => "post" + post._id}
          />
        )}
      </Suspense>
    </SafeAreaView>
    </>
  );
}

const ForumPost = ({ data, supplier }) => {
  return (
    <View className={`m-1 rounded-lg bg-white`}>
      <Text className={`m-[2px] p-0 text-right text-[10px]`}>
        {new Date(data.date).toLocaleDateString()}
      </Text>
      <Text className={`m-[2px] p-0 text-right text-[10px]`}>
        {supplier.name}
      </Text>
      <Text className={`border-b-2 border-b-black/10 p-1`}>{data.message}</Text>
      <Image
        source={{
          uri: `${API_SERVER}/${data.image}`,
        }}
        className={`m-auto aspect-square h-[300px] rounded-lg`}
      />
    </View>
  );
};
