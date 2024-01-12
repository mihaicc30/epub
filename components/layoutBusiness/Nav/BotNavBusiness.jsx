import { Fragment, useContext, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Text,
} from "react-native";
import { AppContext } from "../../../App";

export function BotNavBusiness({ state, descriptors, navigation }) {
  const [translateValue] = useState(new Animated.Value(0));
  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / state.routes.length;

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
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

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
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityStates={isFocused ? ["selected"] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1 }}
              >
                <BottomMenuItem
                  pathName={label.toString()}
                  isCurrent={isFocused}
                />
              </TouchableOpacity>
            </Fragment>
          );
        })}
      </View>
    </View>
  );
}

const BottomMenuItem = ({ pathName, isCurrent }) => {
  const { cart } = useContext(AppContext);

  return (
    <View className={`relative h-[100%] items-center justify-center`}>
      <Text
        style={{
          textShadowColor: "#000000aa",
          textShadowOffset: { width: 0.6, height: 0.8 },
          textShadowRadius: 0.1,
        }}
        className={` ${
          isCurrent ? "text-[#4f7eff]" : "text-black"
        } text-xs capitalize `}
      >
        {pathName}
      </Text> 
    </View>
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
    backgroundColor: "#DFB101",
    borderRadius: 10,
  },
});
