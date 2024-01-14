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
import { RangeSlider } from "@react-native-assets/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CustomHeader } from "./Nav/CustomHeader";
import { AppContext } from "../../App";
import { query } from "../../api/cmd";
import ItemCardSmall from "./itemManagement/ItemCardSmall";

export default function Products() {
  const { user, supplier, all, favs, cart, setAll, setFavs, setCart } =
    useContext(AppContext);

  const [filters, setFilters] = useState({
    offer: false,
    type: false,
    name: "",
    sorting: "price, asc",
  });

  const processSorting = (a, b) => {
    switch (filters.sorting) {
      case "price, asc":
        return (
          parseFloat(
            parseFloat(a.price_offer) > 0
              ? parseFloat(a.price_offer)
              : parseFloat(a.price),
          ) -
          parseFloat(
            parseFloat(b.price_offer) > 0
              ? parseFloat(b.price_offer)
              : parseFloat(b.price),
          )
        );
      case "price, desc":
        return (
          parseFloat(
            parseFloat(b.price_offer) > 0
              ? parseFloat(b.price_offer)
              : parseFloat(b.price),
          ) -
          parseFloat(
            parseFloat(a.price_offer) > 0
              ? parseFloat(a.price_offer)
              : parseFloat(a.price),
          )
        );
      case "name, asc":
        return a.name.localeCompare(b.name);
      case "name, desc":
        return b.name.localeCompare(a.name);
      default:
        break;
    }
  };

  const filteredAll = all
    .filter((product) =>
      filters.offer
        ? product.price_offer !== null && parseFloat(product.price_offer) > 0
        : product,
    )
    .filter((product) =>
      filters.name !== ""
        ? String(product.name)
            .toLowerCase()
            .indexOf(String(filters.name).toLowerCase()) >= 0
        : product,
    )
    .filter((product) =>
      filters.type ? product.product_type === filters.type : product,
    )
    .sort((a, b) => processSorting(a, b));

  const [minv, setminv] = useState(
    parseFloat(
      Math.min(...all.map((item) => parseFloat(item.price))).toFixed(2),
    ),
  );
  const [maxv, setmaxv] = useState(
    parseFloat(
      Math.max(...all.map((item) => parseFloat(item.price))).toFixed(2),
    ),
  );

  const [priceRange, setPriceRange] = useState({
    setmin: parseFloat(
      Math.min(...all.map((item) => parseFloat(item.price))).toFixed(2),
    ),
    setmax: parseFloat(
      Math.max(...all.map((item) => parseFloat(item.price))).toFixed(2),
    ),
  });

  const handlePriceRangeUpdate = (value) => {
    setPriceRange((prev) => ({
      ...prev,
      setmin: parseFloat(parseFloat(value[0]).toFixed(2)),
      setmax: parseFloat(parseFloat(value[1]).toFixed(2)),
    }));
  };

  const CustomThumb = ({ value }) => {
    return (
      <Text
        className={`h-[20px] w-[40px] flex-row whitespace-nowrap rounded-full bg-orange-400/50 text-center text-xs leading-5 text-black`}
      >
        £{value}
      </Text>
    );
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    query("all", { sup: supplier.business }).then(async (productData) =>
      setAll(productData),
    );
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <StatusBar animated={true} backgroundColor="#9d9d9de0" />
      <SafeAreaView>
        <CustomHeader />

          {/* filters */}
          <View>
            <View className={`w-full px-8`}>
              <RangeSlider
                onSlidingComplete={handlePriceRangeUpdate}
                range={[priceRange.setmin, priceRange.setmax]} // set the current slider's value
                minimumValue={minv} // Minimum value
                maximumValue={maxv} // Maximum value
                step={1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
                minimumRange={parseFloat(((maxv - minv) * 0.1).toFixed(2))} // Minimum range between the two thumbs (defaults as "step")
                outboundColor="white" // The track color outside the current range value
                inboundColor="#EAEAEA" // The track color inside the current range value
                thumbTintColor="orange" // The color of the slider's thumb
                enabled={true} // If false, the slider won't respond to touches anymore
                trackHeight={15} // The track's height in pixel
                thumbSize={10} // The thumb's size in pixel
                slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
                // onValueChange={handlePriceRangeUpdate} // Called each time the value changed. The type is (range: [number, number]) => void
                CustomThumb={CustomThumb} // Provide your own component to render the thumb. The type is a component: ({ value: number, thumb: 'min' | 'max' }) => JSX.Element
              />
            </View>

            <FlatList
              className={`w-[100vw] flex-row p-2`}
              horizontal={true}
              data={[
                { Ambient: "id123" },
                { Chilled: "id456" },
                { Frozen: "id789" },
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    filters.type === `${Object.keys(item)}`
                      ? setFilters((prev) => ({
                          ...prev,
                          type: false,
                        }))
                      : setFilters((prev) => ({
                          ...prev,
                          type: `${Object.keys(item)}`,
                        }));
                  }}
                  className={`${
                    filters.type === `${Object.keys(item)}`
                      ? " bg-orange-400"
                      : " bg-orange-200"
                  }  mr-2 flex-1 rounded-xl px-12 py-2`}
                >
                  <Text>{Object.keys(item)}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(type) => Object.values(type)}
            />

            <TextInput
              onChangeText={(text) => {
                setFilters((prev) => ({
                  ...prev,
                  name: text,
                }));
              }}
              value={filters.name}
              placeholder="Search by name..."
              className={`mx-2 rounded-xl bg-white px-4 py-2`}
            />
          </View>
        <Suspense fallback={<Text>Loading...</Text>}>
          <View
            className={`my-2 flex-row items-center justify-between gap-x-2 px-2`}
          >
            <Text className="pl-2 font-bold">
              {/* to put a spinner instead */}
              Products ({filteredAll.length || "0"}/{all.length || "0"})
            </Text>
            <View className={`flex-row items-center gap-x-2`}>
              <TouchableOpacity
                onPress={() =>
                  setFilters((prev) => ({ ...prev, offer: !filters.offer }))
                }
                className={`${
                  filters.offer ? " bg-orange-400" : " bg-orange-200"
                }  rounded-xl p-2`}
              >
                <Text className={`px-2 font-bold`}>%</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setFilters((prev) => ({
                    ...prev,
                    sorting:
                      filters.sorting === "name, asc"
                        ? "name, desc"
                        : "name, asc",
                  }))
                }
                className={`${
                  filters.sorting.startsWith("name")
                    ? " bg-orange-400"
                    : " bg-orange-200"
                }  flex-row rounded-xl p-2`}
              >
                <Text>Name</Text>
                <Text
                  className={`${
                    filters.sorting === "name, asc" ? "" : "hidden"
                  }`}
                >
                  🔼
                </Text>
                <Text
                  className={`${
                    filters.sorting === "name, desc" ? "" : "hidden"
                  }`}
                >
                  🔽
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  setFilters((prev) => ({
                    ...prev,
                    sorting:
                      filters.sorting === "price, asc"
                        ? "price, desc"
                        : "price, asc",
                  }))
                }
                className={`${
                  filters.sorting.startsWith("price")
                    ? " bg-orange-400"
                    : " bg-orange-200"
                }  flex-row rounded-xl p-2`}
              >
                <Text>Price</Text>
                <Text
                  className={`${
                    filters.sorting === "price, asc" ? "" : "hidden"
                  }`}
                >
                  🔼
                </Text>
                <Text
                  className={`${
                    filters.sorting === "price, desc" ? "" : "hidden"
                  }`}
                >
                  🔽
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {all.length < 1 && (
            <Text className={`text-center`}>
              Supplier has not added any products.
            </Text>
          )}

          <FlatList
            className={`mb-[290px]`}
            data={filteredAll.filter((product) =>
              parseFloat(product.price_offer) > 0
                ? priceRange.setmin <= parseFloat(product.price_offer) &&
                  priceRange.setmax >= parseFloat(product.price_offer)
                : priceRange.setmin <= parseFloat(product.price) &&
                  priceRange.setmax >= parseFloat(product.price),
            )}
            renderItem={({ item }) => <ItemCardSmall data={item} cart={cart} />}
            keyExtractor={(offer) => "allProd" + offer._id}
          />
        </Suspense>
      </SafeAreaView>
    </>
  );
}
