import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Feature from "./Feature";
import Promotion from "./Promotion";
import Account from "./Account";
import { useAnimation } from "../../hooks/useAnimation";
import Application from "./Application";

const Body = () => {
  const [showInfo, setShowInfo] = useState(true);
  const animated = useAnimation(showInfo);

  return (
    <View>
      <Animated.View
        style={{
          width: "100%",
          height: animated.heightValue,
          backgroundColor: "#CDD5F4",
          paddingVertical: animated.paddingValue,
          opacity: animated.opacityValue,
        }}
      >
        <Account />
      </Animated.View>
      <View>
        <TouchableOpacity
          onPress={() => setShowInfo((pre) => !pre)}
          activeOpacity={0.9}
          style={styles.toggleButton}
        >
          {showInfo ? (
            <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          ) : (
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          )}
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 10, paddingVertical: 30 }}>
          {/* Feature */}
          <Feature />
          {/* Application */}
          <Application />
          {/* Promotions */}
          <Promotion />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    position: "absolute",
    top: -20,
    zIndex: 10,
    left: "50%",
    transform: [{ translateX: -20 }],
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 500,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4,
  },
});

export default Body;
