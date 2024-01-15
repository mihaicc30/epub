import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { Suspense, useCallback, useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomHeader } from "./Nav/CustomHeader";
import { useFocusEffect } from "@react-navigation/native";
import { AppContext } from "../../App";
import { query } from "../../api/cmd";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ItemCardOrder from "./itemManagement/ItemCardOrder";
import { Calendar } from "react-native-calendars";

export default function Orders() {
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [dateQuery, setDateQuery] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    return tomorrow;
  });
  const [calendar, showCalendar] = useState(false);
  const [dummyData, setDummyData] = useState(false);

  const handleDateChange = (daysToAdd) => {
    setDateQuery((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + daysToAdd);
      return newDate;
    });
  };

  const handleCalendarDateChange = (data) => {
    setDateQuery((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(data.day);
      newDate.setMonth(data.month - 1);
      newDate.setFullYear(data.year);
      return newDate;
    });
    showCalendar(!calendar);
  };

  useFocusEffect(
    useCallback(() => {
      setDummyData(false);
      query("getOrders", {
        supplier: user,
        dateQuery: dateQuery.toLocaleDateString("en-GB"),
      }).then((res) => {
        setOrders(res);

        if (res.length > 0) return;
        setDummyData(true);
        setOrders([
          {
            __v: 0,
            _id: "65a52aef395a4256691eeac2",
            cart: [
              {
                __v: 0,
                _id: "637ddb71b292e14321338f01",
                date: "2022-11-23T08:36:01.959Z",
                from_supplier: "Mega_Supplier",
                img: "/img/products/stock.png",
                ingredients: "",
                name: "CB Dust Pan & Brush Soft",
                pack_size: "1 x 1",
                price: "4.59",
                price_offer: null,
                product_type: "Misc",
                qty: 4,
                qty_available: "-1",
              },
            ],
            customer: {
              _id: "637e738dd96302710a205a28",
              address: {
                city: "Worcester",
                country: "United Kingdom",
                number: "7",
                pc: "WR4 9EA",
                street: "Dove Close",
              },
              business: "BlackHartX - (Dummy Data) ",
              email: "alemihai25@gmail.com",
              favitems: [
                "637dd77ab292e14321338e9f",
                "637dd882b292e14321338ed2",
              ],
              items: [],
              password: "alemihai25@gmail.com",
              password_reset: false,
              password_reset_code: null,
              phone: "07111443350891",
              suppliers: [[Object], [Object], [Object]],
              type: "Customer",
            },
            date: "2024-01-15T12:54:07.192Z",
            deliveryDate: "16/01/2024",
            message: "",
            payment: "Balance",
            placedOrder: "15/01/2024 12:54:06",
            processed: {
              confirmed: false,
              invoiced: false,
              packed: false,
              paid: false,
              shipped: false,
            },
            supplier: {
              _id: "63808495f18bda2871e37f4a",
              address: {
                city: "Gloucester",
                country: "United Kingdom",
                number: "105",
                pc: "GL2 5JU",
                street: "hempsted lane",
              },
              business: "Mega_Supplier",
              email: "1alemihai25@gmail.com",
              phone: "07443399999999",
            },
            total: "18.36",
            totalProducts: "4",
            uniqueProducts: "1",
          },
          {
            __v: 0,
            _id: "65a529ee395a4256691eea9f",
            cart: [
              {
                __v: 0,
                _id: "637ddbb6b292e14321338f03",
                date: "2022-11-23T08:37:10.523Z",
                from_supplier: "Mega_Supplier",
                img: "/img/products/stock.png",
                ingredients:
                  "Chef's Essentials Original Washing Up Liquid contains amongst other ingredients: 5-15% Anionic Surfactants, Less than 5% Amphoteric Surfactants, Also contains: Perfumes, Preservatives: Methylchloroisothiazolinone and Methylisothiazolinone",
                name: "Chef's Essentials Washing Up Liquid",
                pack_size: "1 x 5L",
                price: "4.49",
                price_offer: null,
                product_type: "Misc",
                qty: 2,
                qty_available: "-1",
              },
              {
                __v: 0,
                _id: "637ddb71b292e14321338f01",
                date: "2022-11-23T08:36:01.959Z",
                from_supplier: "Mega_Supplier",
                img: "/img/products/stock.png",
                ingredients: "",
                name: "CB Dust Pan & Brush Soft",
                pack_size: "1 x 1",
                price: "4.59",
                price_offer: null,
                product_type: "Misc",
                qty: 1,
                qty_available: "-1",
              },
              {
                __v: 0,
                _id: "637dd966b292e14321338ee4",
                date: "2022-11-23T08:27:18.875Z",
                from_supplier: "Mega_Supplier",
                img: "/img/products/stock.png",
                ingredients:
                  "Water, Red Onions (12%), Cherry Tomatoes (10%), Plain Flour (Wheat Flour, Calcium, Iron, Niacin, Thiamin), Corn Meal, Yellow Peppers (6%), Red Peppers (6%), Grilled Courgette (6%), Vegetable Suet (Non-Hydrogenated Vegetable Oils (Palm, Sunflower), Wheat Flour), Tomatoes, Tomato Paste, Margarine (Palm Oil, Rapeseed Oil, Water, Emulsifier (Mono and Diglycerides of Fatty Acids), Natural Colours (Annatto, Curcumin), Natural Flavouring), Modified Maize Starch, Rapeseed Oil, Bread Crumbs (Wheat Flour, Calcium Carbonate, Thiamin, Niacin, Iron), Water, Salt, Yeast), Slow Roasted Tomatoes (1%) (Tomatoes, Rapeseed Oil, Salt, Garlic, Oregano), Basil (1%), Balsamic Vinegar (Red Wine Vinegar, Concentrated Cooked Grape Must), Parsley, Pumpkin Seeds (0.5%), Light Brown Sugar, Salt, Red Chillies, Garlic, Black Pepper. For allergens, including Cereals containing Gluten, see ingredients in bold. May also contain Nuts and Peanuts",
                name: "The Fat Chef Mediterranean Vegetable Tart (Vegan) 12 x 260g",
                pack_size: "1 x 3.12kg",
                price: "13.49",
                price_offer: "11.99",
                product_type: "Frozen",
                qty: 1,
                qty_available: "-1",
              },
              {
                __v: 0,
                _id: "637dd9d3b292e14321338ee6",
                date: "2022-11-23T08:29:07.750Z",
                from_supplier: "Mega_Supplier",
                img: "/img/products/stock.png",
                ingredients:
                  "Puff Pastry (35%) (Wheat Flour (Calcium, Iron, Niacin, Thiamin), Margarine (Palm and Rapeseed Oil, Water, Salt), Water, Salt, Preservative (Potassium Sorbate), Water, Mushroom Mince (12%) (Oyster Mushrooms, Water, Pea Protein, Modified Cellulose, Vegetable Oil (Sunflower or Rapeseed Oil), Red Onions (6%), Pea Protein (6%), Vegetable Suet (Vegetable Oil (Palm Oil, Sunflower Oil), Wheat Flour (Wheat Flour, Calcium Carbonate, Iron, Niacin, Thiamin), Wheat Protein, Garlic, Onion Powder, Balsamic Vinegar (Red Wine Vinegar, Concentrated Grape Must), Red Wine Vinegar, Sugar, Soft Dark Brown Sugar, Stabiliser (Methylcellulose), Tapioca Starch, Sage, Savoury Stock (Water, Yeast Extract, Dried Vegetables (Potato, Leek, Onion), Natural Flavouring, Sunflower Oil, Sugar, Salt, Concentrated Lemon Juice, Black Pepper, Bay Leaf, Sage Oil), Modified Maize Starch, Salt, Parsley, Invert Sugar Syrup, White Pepper, Poppy Seeds (0.3%), Wheat Flour (Wheat Flour, Calcium, Iron, Niacin, Thiamin), Yeast Extract, Flavouring (Salt, Natural Flavouring, Sugar, Sunflower Oil), Lemon Zest, Black Pepper, Colour (Plain Caramel). May also contain Nuts.",
                name: "The Fat Chef Vegan Sausage Roll 16 x 120g",
                pack_size: "1 x 1.92kg",
                price: "24.99",
                price_offer: "20.99",
                product_type: "Frozen",
                qty: 1,
                qty_available: "-1",
              },
            ],
            customer: {
              _id: "637e738dd96302710a205a28",
              address: {
                city: "Worcester",
                country: "United Kingdom",
                number: "7",
                pc: "WR4 9EA",
                street: "Dove Close",
              },
              business: "BlackHartX - (Dummy Data) ",
              email: "alemihai25@gmail.com",
              favitems: [
                "637dd77ab292e14321338e9f",
                "637dd882b292e14321338ed2",
              ],
              items: [],
              password: "alemihai25@gmail.com",
              password_reset: false,
              password_reset_code: null,
              phone: "07111443350891",
              suppliers: [[Object], [Object], [Object]],
              type: "Customer",
            },
            date: "2024-01-15T12:49:50.416Z",
            deliveryDate: "16/01/2024",
            message: "",
            payment: "Balance",
            placedOrder: "15/01/2024 12:49:06",
            processed: {
              confirmed: true,
              invoiced: false,
              packed: false,
              paid: false,
              shipped: false,
            },
            supplier: {
              _id: "63808495f18bda2871e37f4a",
              address: {
                city: "Gloucester",
                country: "United Kingdom",
                number: "105",
                pc: "GL2 5JU",
                street: "hempsted lane",
              },
              business: "Mega_Supplier",
              email: "1alemihai25@gmail.com",
              phone: "07443399999999",
            },
            total: "46.55",
            totalProducts: "5",
            uniqueProducts: "4",
          },
        ]);
      });
    }, [dateQuery]),
  );
  return (
    <>
      <StatusBar animated={true} backgroundColor="#9d9d9de0" />
      <SafeAreaView>
        <CustomHeader />
        {calendar && (
          <Calendar
            onDayPress={(day) => handleCalendarDateChange(day)}
            theme={{
              todayTextColor: "blue",
            }}
            current={dateQuery.toString()}
            disableAllTouchEventsForDisabledDays
          />
        )}
        <View className={`mt-2 flex-row justify-center gap-x-6 border-[1px]`}>
          <TouchableOpacity onPress={() => handleDateChange(-2)}>
            <Text
              style={{ fontSize: 20, textAlign: "center", color: "lightgray" }}
            >
              <MaterialCommunityIcons
                name="chevron-double-left"
                color="lightgray"
                style={{ fontSize: 20 }}
              />
              {dateQuery.getDate() - 2}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDateChange(-1)}>
            <Text style={{ fontSize: 20, textAlign: "center", color: "gray" }}>
              <MaterialCommunityIcons
                name="chevron-left"
                color="gray"
                style={{ fontSize: 20 }}
              />
              {dateQuery.getDate() - 1}
            </Text>
          </TouchableOpacity>
          <Text
            className={`text-center`}
            style={{ fontSize: 20 }}
            onPress={() => showCalendar(!calendar)}
          >
            {dateQuery.toLocaleDateString("en-GB")}
          </Text>

          <TouchableOpacity onPress={() => handleDateChange(1)}>
            <Text style={{ fontSize: 20, textAlign: "center", color: "gray" }}>
              {dateQuery.getDate() + 1}
              <MaterialCommunityIcons
                name="chevron-right"
                color="gray"
                style={{ fontSize: 20 }}
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDateChange(2)}>
            <Text
              style={{ fontSize: 20, textAlign: "center", color: "lightgray" }}
            >
              {dateQuery.getDate() + 2}
              <MaterialCommunityIcons
                name="chevron-double-right"
                color="lightgray"
                style={{ fontSize: 20 }}
              />
            </Text>
          </TouchableOpacity>
        </View>
        {dummyData && (
          <Text className={`my-2 px-2`}>
            No available data. For testing purposes, dummy data has been set in
            place to play with.
          </Text>
        )}
        {orders.length > 0 && (
          <FlatList
            className={`mb-[130px]`}
            data={orders}
            renderItem={({ item }) => (
              <OrderCard
                data={item}
                orderID={item._id}
                deliveryDate={item.deliveryDate}
              />
            )}
            keyExtractor={(order, index) => "order" + order._id}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const OrderCard = ({ data, orderID, deliveryDate }) => {
  const { user } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [processed, setProcessed] = useState(data.processed);

  const toggleProcessedState = (process, state) => {
    let tempData = data.processed;
    tempData[process] = state;

    query("setProcessedState", {
      supplier: user,
      orderID,
      process: tempData,
      deliveryDate,
    }).then(() => {
      setProcessed((prev) => ({ ...prev, [process]: state }));
    });
  };

  return (
    <View
      className={`mb-2 w-full border-[1px] border-black/10 bg-blue-100 p-1 `}
    >
      <TouchableOpacity
        className={`flex-row justify-between`}
        onPress={() => setShow(!show)}
      >
        <View className={`flex-row gap-x-2`}>
          <Text>£{data.total}</Text>
          <Text>({data.totalProducts})</Text>
          <Text>
            {data.customer.business} - {data.customer.address.city}
          </Text>
        </View>
        <View>
          {show && (
            <MaterialCommunityIcons
              name="arrow-down-drop-circle-outline"
              color="#ADADAD"
              style={{ fontSize: 24 }}
            />
          )}
          {!show && (
            <MaterialCommunityIcons
              name="arrow-right-drop-circle-outline"
              color="black"
              style={{ fontSize: 24 }}
            />
          )}
        </View>
      </TouchableOpacity>
      {show && (
        <View className={`w-full`}>
          <View className={`w-full flex-row justify-end`}>
            <Text className={`text-sm text-gray-500`}>{data.placedOrder}</Text>
          </View>
          <View className={`w-full flex-row justify-evenly`}>
            <Text
              onPress={() =>
                toggleProcessedState("confirmed", !processed.confirmed)
              }
              className={`${
                processed.confirmed ? "" : "opacity-20"
              } rounded-xl  border-[1px] border-black/10 px-2 py-1 text-sm`}
            >
              Confirmed
            </Text>
            <Text
              onPress={() => toggleProcessedState("packed", !processed.packed)}
              className={`${
                processed.packed ? "" : "opacity-20"
              } rounded-xl  border-[1px] border-black/10 px-2 py-1 text-sm`}
            >
              Packed
            </Text>
            <Text
              onPress={() =>
                toggleProcessedState("shipped", !processed.shipped)
              }
              className={`${
                processed.shipped ? "" : "opacity-20"
              } rounded-xl  border-[1px] border-black/10 px-2 py-1 text-sm`}
            >
              Shipped
            </Text>
            <Text
              onPress={() =>
                toggleProcessedState("invoiced", !processed.invoiced)
              }
              className={`${
                processed.invoiced ? "" : "opacity-20"
              } rounded-xl  border-[1px] border-black/10 px-2 py-1 text-sm`}
            >
              Invoiced
            </Text>
            <Text
              onPress={() => toggleProcessedState("paid", !processed.paid)}
              className={`${
                processed.paid ? "" : "opacity-20"
              } rounded-xl  border-[1px] border-black/10 px-2 py-1 text-sm`}
            >
              Paid
            </Text>
          </View>
          <View className={`flex-row`}>
            <Text className={`basis-[20%]`}>Deliver to:</Text>
            <View className={`w-full`}>
              <Text>{data.customer.business}</Text>
              <Text>
                {data.customer.address.number} {data.customer.address.street},{" "}
                {data.customer.address.city}
              </Text>
              <Text>
                {data.customer.address.pc}, {data.customer.address.country}
              </Text>
            </View>
          </View>

          <Text className={`basis-[20%]`}>{data.totalProducts} Products</Text>
          <FlatList
            className={``}
            data={data.cart}
            renderItem={({ item }) => <ItemCardOrder data={item} />}
            keyExtractor={(item) => "allProd" + item._id}
          />
        </View>
      )}
    </View>
  );
};
