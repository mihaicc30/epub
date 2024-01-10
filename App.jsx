import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BotNav from "./components/botNav/BotNav";
import { createContext, useContext, useState } from "react";

const Nav1 = createNativeStackNavigator();
const Nav2 = createNativeStackNavigator();
const Nav3 = createBottomTabNavigator();

export const AppContext = createContext(null);

export default function App() {
  const [step, setStep] = useState(1);
  const [isAuthenticated, setIfirstenticated] = useState(false);

  const updStep = (val) => {
    setStep(val);
  };

  const logout = () => {
    setStep(1);
  };

  return (
    <PaperProvider>
      <AppContext.Provider value={{ step, updStep, logout }}>
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
      </AppContext.Provider>
    </PaperProvider>
  );
}
