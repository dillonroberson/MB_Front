import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { RootStackParamList } from "../../App";

const Splash = () => {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;
  useEffect(() => {
    setTimeout(() => {
      navigate("Login");
    }, 2000);
  }, []);
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Image
        style={{ width: 200, height: 80 }}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/md2-test.appspot.com/o/mb%2FLogo_MB_new.png?alt=media&token=44320c96-b304-4770-937f-5fc62cc32809",
        }}
      ></Image>
    </View>
  );
};

export default Splash;
