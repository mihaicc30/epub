import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";

import { BackHandler, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { BotNavCustomer } from "./components/layoutCustomer/Nav/BotNavCustomer";
import { BotNavBusiness } from "./components/layoutSupplier/Nav/BotNavBusiness";

const Nav1 = createNativeStackNavigator();
const Nav2 = createNativeStackNavigator();
const Nav3 = createBottomTabNavigator();
const Nav4 = createBottomTabNavigator();

export const AppContext = createContext(null);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export default function App() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(false);
  const [supplier, setSupplier] = useState(false);

  const [all, setAll] = useState([]);
  const [favs, setFavs] = useState([]);
  const [cart, setCart] = useState([]);
  const timer = useRef(null);

  const updStep = (val) => {
    setStep(val);
  };

  const logout = () => {
    setAll([]);
    setFavs([]);
    setCart([]);
    setUser(false);
    setSupplier(false);
    setStep(1);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (user.type === "customer") {
          setStep((prevStep) => Math.max(1, prevStep - 1)); // Ensure step is not negative
          return true; // Returning true prevents the default back button behavior
        }
      },
    );

    return () => backHandler.remove(); // Cleanup the event listener on component unmount
  }, [step]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          step,
          setStep,
          setUser,
          setSupplier,
          updStep,
          logout,
          user,
          supplier,
          all,
          favs,
          cart,
          setAll,
          setFavs,
          setCart,
          timer,
        }}
      >
        <NavigationContainer>
          {/* supplier layout */}
          {(step == 4 || step == 5) && (
            <Nav4.Navigator
              tabBar={(state) => <BotNavBusiness {...state} />}
              screenOptions={{
                headerShown: false,
              }}
            >
              <Nav4.Screen
                name="products"
                getComponent={() =>
                  require("./components/layoutSupplier/products").default
                }
              />
              <Nav4.Screen
                name="product-detail"
                getComponent={() =>
                  require("./components/layoutSupplier/itemManagement/ItemCardBig")
                    .default
                }
              />
              <Nav4.Screen
                name="product-new"
                getComponent={() =>
                  require("./components/layoutSupplier/itemManagement/ItemCardNew")
                    .default
                }
              />
              <Nav4.Screen
                name="businesses"
                getComponent={() =>
                  require("./components/layoutSupplier/businesses").default
                }
              />
              <Nav4.Screen
                name="invoices"
                getComponent={() =>
                  require("./components/layoutSupplier/invoices").default
                }
              />
              <Nav4.Screen
                name="forum"
                getComponent={() =>
                  require("./components/layoutSupplier/forum").default
                }
              />
            </Nav4.Navigator>
          )}
          {/* customer layout */}
          {step == 3 && (
            <Nav3.Navigator
              tabBar={(state) => <BotNavCustomer {...state} />}
              screenOptions={{
                headerShown: false,
              }}
            >
              <Nav3.Screen
                name="home"
                getComponent={() =>
                  require("./components/layoutCustomer/home").default
                }
              />
              <Nav3.Screen
                name="products"
                getComponent={() =>
                  require("./components/layoutCustomer/products").default
                }
              />
              <Nav3.Screen
                name="favorites"
                getComponent={() =>
                  require("./components/layoutCustomer/favorites").default
                }
              />
              <Nav3.Screen
                name="cart"
                getComponent={() =>
                  require("./components/layoutCustomer/cart").default
                }
              />
              <Nav3.Screen
                name="forum"
                getComponent={() =>
                  require("./components/layoutCustomer/forum").default
                }
              />
              <Nav3.Screen
                name="checkout"
                getComponent={() =>
                  require("./components/layoutCustomer/checkout").default
                }
              />
            </Nav3.Navigator>
          )}
          {/* customer choice of supplier */}
          {step == 2 && (
            <Nav2.Navigator
              initialRouteName="Supplier"
              screenOptions={{
                headerShown: false,
              }}
              options={{
                // This tab will no longer show up in the tab bar.
                href: null,
              }}
            >
              <Nav2.Screen
                name="Supplier"
                getComponent={() =>
                  require("./components/layoutCustomer/chooseSupplier").default
                }
              />
            </Nav2.Navigator>
          )}
          {/* auth screen */}
          {step == 1 && (
            <Nav1.Navigator
              initialRouteName="Auth"
              screenOptions={{
                headerShown: false,
              }}
              options={{
                // This tab will no longer show up in the tab bar.
                href: null,
              }}
            >
              <Nav1.Screen
                name="Auth"
                getComponent={() =>
                  require("./components/layoutGuest/auth").default
                }
              />
            </Nav1.Navigator>
          )}
        </NavigationContainer>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}
