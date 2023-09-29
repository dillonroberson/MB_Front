import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const useAnimation = (showInfo: any) => {
  const heightValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const paddingValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showInfo) {
      Animated.parallel([
        Animated.timing(heightValue, {
          toValue: 460,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(paddingValue, {
          toValue: 20,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(heightValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(paddingValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [showInfo]);
  return {heightValue, opacityValue, paddingValue}
};
