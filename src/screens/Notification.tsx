import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { getFonts } from "../hooks/getFonts";
import Subnav from "../components/Notification/Subnav";
import Notify from "../components/Notification/Notify";
import History from "../components/Notification/History";

const Notification = () => {
  const [active, setActive] = useState("notify");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          backgroundColor: "#fff",
        }}
      >
        <StatusBar style="light" />
        <Subnav active={active} setActive={setActive} />
        {active === "notify" ? <Notify /> : <History />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Notification;
