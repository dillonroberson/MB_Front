import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, TextInput, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";

const Filter = () => {
  const font = getFonts();
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 12,
        display: "flex",
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          backgroundColor: "#F3F3F3",
          gap: 5,
          borderRadius: 500,
          paddingLeft: 12,
          paddingRight: 20,
          flex: 8,
        }}
      >
        <Ionicons name="search" size={20} color="black" />
        <TextInput
          style={{
            marginRight: 12,
            fontFamily: font?.regular400,
            fontSize: 12,
            textDecorationLine: "none",
            width: "100%",
          }}
          placeholder="Tìm kiếm theo nội dung hoặc ngày nhận"
        />
      </View>
      <View
        style={{
          padding: 15,
          backgroundColor: "#f3f3f3",
          borderRadius: 500,
        }}
      >
        <Image
          style={{ height: 20, width: 20 }}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/package-lock.png?alt=media&token=ec9b1cb3-11ea-400e-83d4-715d69e7a138",
          }}
        />
      </View>
    </View>
  );
};

export default Filter;
