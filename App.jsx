import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";

import { BackHandler } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BotNav from "./components/Nav/BotNav";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const Nav1 = createNativeStackNavigator();
const Nav2 = createNativeStackNavigator();
const Nav3 = createBottomTabNavigator();

export const AppContext = createContext(null);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export default function App() {
  const [step, setStep] = useState(3);
  const [user, setUser] = useState({
    _id: "637e738dd96302710a205a28",
    email: "alemihai25@gmail.com",
    name: "BlackHartX",
    phone: "07111443350891",
  });
  const [supplier, setSupplier] = useState({
    _id: "63808495f18bda2871e37f4a",
    email: "1alemihai25@gmail.com",
    name: "Mega_Supplier",
    phone: "07443399999999",
  });

  const [all, setAll] = useState([]);
  const [favs, setFavs] = useState([]);
  const [cart, setCart] = useState([]);
  const timer = useRef(null);

  const updStep = (val) => {
    setStep(val);
  };

  const logout = () => {
    setStep(1);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setStep((prevStep) => Math.max(1, prevStep - 1)); // Ensure step is not negative
        return true; // Returning true prevents the default back button behavior
      },
    );

    return () => backHandler.remove(); // Cleanup the event listener on component unmount
  }, [step]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          step,
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
        <AppContainer />
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

const AppContainer = () => {
  const { user, supplier, step, all, favs, cart, setAll, setFavs, setCart } =
    useContext(AppContext);

  useEffect(() => {
    if (!user || !supplier) return;

    require("./api/cmd")
      .query("all", { sup: supplier.name })
      .then((res) => setAll(res));
    require("./api/cmd")
      .query("requestfavs", { sup: supplier, user: user })
      .then((res) => setFavs(res));
    require("./api/cmd")
      .query("grabbasket", { sup: supplier._id, user: user._id })
      .then((res) => setCart(res));
  }, [user, supplier]);

  return (
    <NavigationContainer>
      {step == 3 && ( // Render this when the user is authenticated
        <Nav3.Navigator
          tabBar={(state) => <BotNav {...state} />}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Nav3.Screen
            name="home"
            getComponent={() =>
              require("./components/layoutAuthed/home").default
            }
          />
          <Nav3.Screen
            name="products"
            getComponent={() =>
              require("./components/layoutAuthed/products").default
            }
          />
          <Nav3.Screen
            name="favorites"
            getComponent={() =>
              require("./components/layoutAuthed/favorites").default
            }
          />
          <Nav3.Screen
            name="cart"
            getComponent={() =>
              require("./components/layoutAuthed/cart").default
            }
          />
          <Nav3.Screen
            name="forum"
            getComponent={() =>
              require("./components/layoutAuthed/forum").default
            }
          />
        </Nav3.Navigator>
      )}

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
              require("./components/layoutAuthed/chooseSupplier").default
            }
          />
        </Nav2.Navigator>
      )}
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
  );
};
