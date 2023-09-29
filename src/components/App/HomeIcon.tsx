import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../../App";

const HomeIcon = () => {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;
  return (
    <TouchableOpacity onPress={() => navigate("Main")}>
      <Foundation name="home" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default HomeIcon;
