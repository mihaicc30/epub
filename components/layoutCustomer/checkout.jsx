import { API_SERVER, API_SERVER2 } from "@env";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
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

export default function Checkout() {
  const { user, supplier, all, favs, cart, setAll, setFavs, setCart } =
    useContext(AppContext);

  const [marked, setMarked] = useState({});
  const [loading, setLoading] = useState(true);

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

        Object.keys(days).forEach((day) => {
          const currentDate = new Date();
          const currentYear = lookedUpYear || currentDate.getFullYear();
          const currentMonth = lookedUpMonth || currentDate.getMonth() + 1; // Month is zero-based
          const currentDay = currentDate.getDate();
          if (String(year) === String(currentYear) && month >= currentMonth) {
            if (currentDate.getMonth() + 1 == month) {
              // simply put, if the present month is the same as the query month, i only want to show the available dates LEFT
              if (day >= currentDay) {
                const paddedMonth = String(month).padStart(2, "0");
                const paddedDay = String(day).padStart(2, "0");
                const date = `${year}-${paddedMonth}-${paddedDay}`;
                markedDates[date] = { marked: true };
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

      setMarked(buildMarked(tempMarked, monthData, yearData));

      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ getData ~ error:", error);
      alert("Error: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView className={`pb-[33vh]`}>
      <StatusBar animated={true} backgroundColor="#9d9d9de0" />
      <ScrollView>
        <RefreshControl refreshing={refreshing} onRefresh={getData}>
          <View>
            <Calendar
              theme={{
                todayTextColor: "#d9e1e8",
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
        </RefreshControl>
        <View>
          <Text>payment method</Text>
        </View>
        <View>
          <Text>account address</Text>
        </View>
        <View>
          <Text>confirm</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
