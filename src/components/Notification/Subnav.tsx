import React, { SetStateAction, useState } from "react";
import { getFonts } from "../../hooks/getFonts";
import { Text, TouchableOpacity, View } from "react-native";

type SubnavProps = {
  active: string;
  setActive: React.Dispatch<SetStateAction<string>>;
};

const Subnav = ({ active, setActive }: SubnavProps) => {
  const font = getFonts();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        onPress={() => setActive("notify")}
        activeOpacity={0.8}
        style={{
          flex: 1,
          padding: 15,
          borderBottomWidth: 4,
          borderColor: active === "notify" ? "#1F2DEC" : "#fff",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: font?.semiBold600,
            color: active === "notify" ? "#1F2DEC" : "#7B7B7B",
          }}
        >
          Thông báo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActive("history")}
        activeOpacity={0.8}
        style={{
          flex: 1,
          padding: 15,
          borderBottomWidth: 4,
          borderColor: active === "history" ? "#1F2DEC" : "#fff",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: font?.semiBold600,
            color: active === "history" ? "#1F2DEC" : "#7B7B7B",
          }}
        >
          Biến động số dư
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Subnav;
