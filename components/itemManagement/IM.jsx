import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { query } from "../../api/cmd";

// IM = item management 😉

export default function IM({ data }) {
  const { user, supplier, all, favs, cart, setAll, setFavs, setCart, timer } =
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

      if (timer.current) {
        clearTimeout(timer.current);
      }

      // Set a new timer for 1000ms (1 second)
      timer.current = setTimeout(() => {
        // Perform your database update query using the cart
        console.log("Performing database update with cart:", updatedCart);
        // ... your database update logic
        // ...
        query("updateiteminbasket", {
          sup: supplier,
          user: user,
          basket: updatedCart,
        });

        // Clear the timer reference
        timer.current = null;
      }, 1000);
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const productToAdd = all.find((item) => item._id === data._id);
      if (productToAdd) {
        if (cart.length > 0) {
          setCart([...cart, { ...productToAdd, qty: 1 }]);

          if (timer.current) {
            clearTimeout(timer.current);
          }

          // Set a new timer for 1000ms (1 second)
          timer.current = setTimeout(() => {
            // Perform your database update query using the cart
            console.log("Performing database update with cart:", [
              ...cart,
              { ...productToAdd, qty: 1 },
            ]);
            // ... your database update logic
            // ...
            query("updateiteminbasket", {
              sup: supplier,
              user: user,
              basket: [...cart, { ...productToAdd, qty: 1 }],
            });

            // Clear the timer reference
            timer.current = null;
          }, 1000);
        } else {
          setCart([{ ...productToAdd, qty: 1 }]);
          if (timer.current) {
            clearTimeout(timer.current);
          }

          // Set a new timer for 1000ms (1 second)
          timer.current = setTimeout(() => {
            // Perform your database update query using the cart
            console.log("Performing database update with cart:", [
              { ...productToAdd, qty: 1 },
            ]);
            // ... your database update logic
            // ...
            query("updateiteminbasket", {
              sup: supplier,
              user: user,
              basket: [{ ...productToAdd, qty: 1 }],
            });

            // Clear the timer reference
            timer.current = null;
          }, 1000);
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

    setCart(
      updatedCart.filter((item) => item.qty > 0).length > 0
        ? updatedCart.filter((item) => item.qty > 0)
        : [],
    );

    if (timer.current) {
      clearTimeout(timer.current);
    }

    // Set a new timer for 1000ms (1 second)
    timer.current = setTimeout(() => {
      // Perform your database update query using the cart
      console.log(
        "Performing database update with cart:",
        updatedCart.filter((item) => item.qty > 0).length > 0
          ? updatedCart.filter((item) => item.qty > 0)
          : [],
      );
      // ... your database update logic
      // ...
      query("updateiteminbasket", {
        sup: supplier,
        user: user,
        basket:
          updatedCart.filter((item) => item.qty > 0).length > 0
            ? updatedCart
            : [],
      });

      // Clear the timer reference
      timer.current = null;
    }, 2000);
  };

  return (
    <View className={`mt-auto flex-row justify-between`}>
      <TouchableOpacity
        onPress={handleRemove}
        className={`items-center justify-center`}
      >
        <Text className={`p-2`}>➖</Text>
      </TouchableOpacity>
      <TouchableOpacity className={`items-center justify-center`}>
        <Text className={`p-2`}>{cartItemQty}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleAdd}
        className={`items-center justify-center`}
      >
        <Text className={`p-2`}>➕</Text>
      </TouchableOpacity>
    </View>
  );
}
