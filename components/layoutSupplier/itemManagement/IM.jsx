import { View, Text, TouchableOpacity , StatusBar } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../App";

// IM = item management 😉

const IM = ({ data, cart }) => {
  if (!cart) return;

  const { all, setCart } = useContext(AppContext);
  const [adjustedQty, setAdjustedQty] = useState(0);

  const cartItemQty =
    cart.length > 0 ? cart.find((item) => item._id === data._id)?.qty || 0 : 0;

  const handleAdd = () => {
    // Later on to add a qty available value to compare with
    setAdjustedQty(adjustedQty + 1);
  };

  const handleRemove = () => {
    setAdjustedQty(
      cartItemQty + adjustedQty - 1 >= 0 ? adjustedQty - 1 : adjustedQty,
    );
  };

  const handleUpdateContextLogic = async() => {
    // No need to update the cart if user is not increasing or decreasing the qty
    if (adjustedQty === 0) return;

    const typeOfOperation =
      cartItemQty + adjustedQty > 0 ? "update" : "removal";

    if (typeOfOperation === "update") {
      // Check if the product is already in the cart
      const existingProduct = cart.find((item) => item._id === data._id);

      if (existingProduct) {
        // If the product is already in the cart, update the quantity
        const updatedCart = cart.map((item) =>
          item._id === data._id
            ? { ...item, qty: item.qty + adjustedQty }
            : item,
        );
        setCart(updatedCart);
      } else {
        // If the product is not in the cart, add it with the adjusted quantity
        const productToAdd = all.find((item) => item._id === data._id);
        if (productToAdd) {
          setCart([...cart, { ...productToAdd, qty: adjustedQty }]);
        }
      }
    } else if (typeOfOperation === "removal") {
      // Product already exists in the cart
      // If user wants to remove qty, set qty to 0
      const updatedCart = cart.map((item) =>
        item._id === data._id ? { ...item, qty: 0 } : item,
      );

      setCart(
        updatedCart.filter((item) => item.qty > 0).length > 0
          ? updatedCart.filter((item) => item.qty > 0)
          : [],
      );
    }
    setAdjustedQty(0);
  };

  useEffect(() => {
    handleUpdateContextLogic();
  }, [adjustedQty]);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
      }}
      className={`relative mt-auto gap-x-1`}
    >
      <Text>{cartItemQty + adjustedQty}</Text>
      <TouchableOpacity
        onPress={handleRemove}
        style={{ alignItems: "center"}}
      >
        <Text className={`border-[1px] border-black/10 text-center rounded-lg p-2 my-1`}>➖</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleAdd}
        style={{ alignItems: "center"}}
      >
        <Text className={`border-[1px] border-black/10 text-center rounded-lg p-2`}>➕</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IM;
