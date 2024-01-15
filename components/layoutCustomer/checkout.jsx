import { API_SERVER, API_SERVER2 } from "@env";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "../../App";
import { Calendar } from "react-native-calendars";
import { query } from "../../api/cmd";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

export default function Checkout() {
  const { user, supplier, all, favs, cart, setAll, setFavs, setCart } =
    useContext(AppContext);

  const route = useRoute();
  const navigation = useNavigation();
  const [marked, setMarked] = useState({});
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [paymentType, setPaymentType] = useState("Balance");
  const [message, setMessage] = useState("");
  const [deliveryDay, setDeliveryDay] = useState(false);
  const currentDate = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(currentDate.getDate() + 1);

  const buildMarked = (tempMarked, lookedUpMonth, lookedUpYear) => {
    const markedDates = {};

    tempMarked.forEach((yearObj) => {
      const year = Object.keys(yearObj)[0];
      const months = yearObj[year];

      Object.keys(months).forEach((month) => {
        const days = months[month];

        Object.keys(days)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .forEach((day) => {
            const currentDate = new Date();
            const currentYear = lookedUpYear || currentDate.getFullYear();
            const currentMonth = lookedUpMonth || currentDate.getMonth() + 1; // Month is zero-based
            const currentDay = currentDate.getDate();
            if (String(year) === String(currentYear) && month >= currentMonth) {
              if (currentDate.getMonth() + 1 == month) {
                // simply put, if the present month is the same as the query month, i only want to show the available dates LEFT
                if (parseInt(day) >= parseInt(currentDay) + 1) {
                  if (parseInt(day) == parseInt(currentDay) + 1) {
                    //if its the same day+1, must check current time ! user is too late = no more ordering
                    const currentTime = new Date();
                    const cutOffTime = new Date(
                      currentTime.getFullYear(),
                      currentTime.getMonth(),
                      currentTime.getDate(),
                      days[day].split(":")[0], // hours
                      days[day].split(":")[1], // minutes
                      0, // seconds
                    );
                    if (currentTime < cutOffTime) {
                      const paddedMonth = String(month).padStart(2, "0");
                      const paddedDay = String(day).padStart(2, "0");
                      const date = `${year}-${paddedMonth}-${paddedDay}`;
                      if (!deliveryDay)
                        setDeliveryDay(`${year}-${paddedMonth}-${paddedDay}`);
                      markedDates[date] = { marked: true };
                    }
                  } else {
                    const paddedMonth = String(month).padStart(2, "0");
                    const paddedDay = String(day).padStart(2, "0");
                    const date = `${year}-${paddedMonth}-${paddedDay}`;
                    if (!deliveryDay) setDeliveryDay(date);
                    markedDates[date] = { marked: true };
                  }
                }
              } else {
                const paddedMonth = String(month).padStart(2, "0");
                const paddedDay = String(day).padStart(2, "0");
                const date = `${year}-${paddedMonth}-${paddedDay}`;
                markedDates[date] = { marked: true };
              }
            }
          });
      });
    });
    return markedDates;
  };

  const getData = async (monthData, yearData) => {
    try {
      const [tempMarked] = await Promise.all([
        query("fetchDeliveryDates", {
          sup: supplier,
          user: user,
        }),
      ]);
      if (!tempMarked) {
        alert("Supplier has not set any delivery dates yet!");
      } else {
        setMarked(buildMarked(tempMarked, monthData, yearData));
      }

      setLoading(false);
    } catch (error) {
      alert("Error: ", error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData(new Date().getMonth() + 1, new Date().getFullYear());
    }, []),
  );

  const sendOrder = async () => {
    setLoading2(!loading2);
    let order = {
      customer: user,
      supplier: supplier,
      payment: paymentType,
      cart: cart,
      message: message,
      deliveryDate: new Date(deliveryDay).toLocaleDateString("en-GB"),
      // for future use
      processed:{
        confirmed: false,
        packed: false,
        shipped: false,
        invoiced: false,
        paid: false,
      },
      total: cart
        .reduce(
          (total, item) => total + (item.price_offer || item.price) * item.qty,
          0,
        )
        .toFixed(2),
      totalProducts: cart.reduce((total, item) => total + item.qty, 0),
      uniqueProducts: cart.reduce((total, item) => total + 1, 0),
      placedOrder: new Date().toLocaleDateString("en-GB") + " " + new Date().toLocaleTimeString("en-GB"),
    };

    await query("addOrder", { order }).then(async (response) => {
      if (response.message === "ok") {
        setLoading2(false);
        navigation.navigate("cart", {
          message: "Order has been successfully placed!",
        });
      }
    });
  };

  return (
    <SafeAreaView>
      <StatusBar animated={true} backgroundColor="#9d9d9de0" />
      <ScrollView>
        <View>
          <Calendar
            theme={{
              todayTextColor: "#000",
            }}
            current={currentDate.toString()}
            onMonthChange={(date) => {
              setLoading(true);
              getData(date.month, date.year);
            }}
            displayLoadingIndicator={loading}
            disableAllTouchEventsForInactiveDays
            enableSwipeMonths
            minDate={tomorrow.toString()}
            disableAllTouchEventsForDisabledDays
            markedDates={marked}
          />
        </View>

        <View className={`my-4 px-2`}>
          <Text>Paymemt Type</Text>
          <Text
            onPress={() => setPaymentType("Balance")}
            className={`my-1 rounded-lg border-[1px] border-black/10 bg-white px-4 py-2 text-sm ${
              paymentType === "Balance" ? "bg-blue-200" : ""
            }`}
          >
            {paymentType === "Balance" ? "⚫" : "⚪"} Add to Balance
          </Text>
          <Text
            // onPress={() => setPaymentType("Card")}
            className={`my-1 rounded-lg border-[1px] border-black/10 bg-white px-4 py-2 text-sm text-gray-300 ${
              paymentType === "Card" ? "bg-blue-200" : ""
            }`}
          >
            {paymentType === "Card" ? "⚫" : "⚪"} Card
          </Text>
          <Text
            // onPress={() => setPaymentType("Paypal")}
            className={`my-1 rounded-lg border-[1px] border-black/10 bg-white px-4 py-2 text-sm text-gray-300 ${
              paymentType === "Paypal" ? "bg-blue-200" : ""
            }`}
          >
            {paymentType === "Paypal" ? "⚫" : "⚪"} Paypal
          </Text>
        </View>
        <View className={`flex-row self-center`}>
          <View className={`my-4 basis-[45%] pl-4`}>
            <Text>{supplier.business}</Text>
            <Text>
              {supplier.address.number} {supplier.address.street}
            </Text>
            <Text>{supplier.address.city}</Text>
            <Text>{supplier.address.pc}</Text>
            <Text>{supplier.address.country}</Text>
          </View>
          <View className={`my-4 basis-[45%] pl-4`}>
            <Text>{user.business}</Text>
            <Text>
              {user.address.number} {user.address.street}
            </Text>
            <Text>{user.address.city}</Text>
            <Text>{user.address.pc}</Text>
            <Text>{user.address.country}</Text>
          </View>
        </View>
        {deliveryDay && (
          <Text className={`px-2`}>
            Delivering on {new Date(deliveryDay).toLocaleDateString("en-GB")}
          </Text>
        )}

        <TextInput
          editable
          multiline
          numberOfLines={2}
          maxLength={140}
          placeholder="Have a message for the supplier?"
          className={`m-2 rounded-xl bg-white`}
          onChangeText={(text) => setMessage(text)}
          value={message}
          style={{ padding: 10 }}
        />

        <View className={`pb-20`}>
          <Text
            disabled={!deliveryDay}
            onPress={sendOrder}
            className={`m-2 flex-row items-center justify-center whitespace-nowrap rounded-xl  px-4 py-2 text-center text-lg ${
              loading2
                ? "bg-gray-300 text-gray-500"
                : deliveryDay
                  ? "bg-orange-400 "
                  : "bg-gray-300 text-gray-500"
            }`}
          >
            {loading2 && <MaterialIcons name="sync" size={20} color="gray" />}
            Submit Order
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
