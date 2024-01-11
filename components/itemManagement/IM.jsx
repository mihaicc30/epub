import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AppContext } from "../../App";

// IM = item management 😉

export default function IM({ data }) {
  const { user, supplier, all, favs, cart, setAll, setFavs, setCart } =
    useContext(AppContext);

  const cartItemQty =
    cart.length > 0 ? cart.find((item) => item._id === data._id)?.qty || 0 : 0;

  const handleAdd = () => {
    // Check if the product is already in the cart
    const existingProduct =
      cart.length > 0 && cart.find((item) => item._id === data._id);
    if (existingProduct) {
      // If the product is already in the cart, update the quantity
      const updatedCart = cart.map((item) =>
        item._id === data._id ? { ...item, qty: item.qty + 1 } : item,
      );
      setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const productToAdd = all.find((item) => item._id === data._id);
      if (productToAdd) {
        if (cart.length > 0) {
          setCart([...cart, { ...productToAdd, qty: 1 }]);
        } else {
          setCart([{ ...productToAdd, qty: 1 }]);
        }
      }
    }
  };

  const handleRemove = () => {
    const updatedCart = cart.map((item) =>
      item._id === data._id
        ? { ...item, qty: Math.max(0, item.qty - 1) }
        : item,
    );

    setCart(updatedCart.filter((item) => item.qty > 0));
  };

  return (
    <View className={`mt-auto flex-row justify-between`}>
      <TouchableOpacity
        onPress={() => handleRemove(data._id)}
        className={`items-center justify-center`}
      >
        <Text className={`p-2`}>➖</Text>
      </TouchableOpacity>
      <TouchableOpacity className={`items-center justify-center`}>
        <Text className={`p-2`}>{cartItemQty}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleAdd(data._id)}
        className={`items-center justify-center`}
      >
        <Text className={`p-2`}>➕</Text>
      </TouchableOpacity>
    </View>
  );
}
