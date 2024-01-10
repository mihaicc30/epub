

import { Fragment, useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet, Animated, Text } from "react-native";
import { AppContext } from "../../App";

export default function BotNav({ state, descriptors, navigation }) {
  const [translateValue] = useState(new Animated.Value(0));
  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / (state.routes.length + 1);

  const animateSlider = (index) => {
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateSlider(state.index);
  }, [state.index]);

  return (
    <View style={[style.tabContainer, { width: totalWidth }]}>
      <View style={{ flexDirection: "row" }}>
        <Animated.View
          style={[
            style.slider,
            {
              transform: [{ translateX: translateValue }],
              width: tabWidth - 40,
            },
          ]}
        />

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Fragment key={index}>
              <TouchableOpacity accessibilityRole="button" accessibilityStates={isFocused ? ["selected"] : []} accessibilityLabel={options.tabBarAccessibilityLabel} testID={options.tabBarTestID} onPress={onPress} onLongPress={onLongPress} style={{ flex: 1 }}>
                <BottomMenuItem pathName={label.toString()} isCurrent={isFocused} />
              </TouchableOpacity>
            </Fragment>
          );
        })}
        <LogoutButton />
      </View>
    </View>
  );
}

const BottomMenuItem = ({ pathName, isCurrent }) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text className={` ${isCurrent ? "text-green-500" : "text-black"} capitalize text-xs`}>{pathName}</Text>
    </View>
  );
};

const LogoutButton = () => {
  const { logout } = useContext(AppContext);
  return (
    <TouchableOpacity accessibilityRole="button" onPress={logout} onLongPress={logout} style={{ flex: 1 }}>
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text className={`text-black text-xs`}>Logout</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  tabContainer: {
    height: 60,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 10,
    position: "absolute",
    bottom: 0,
  },
  slider: {
    height: 3,
    position: "absolute",
    top: 0,
    left: 20,
    backgroundColor: "gray",
    borderRadius: 10,
  },
});
