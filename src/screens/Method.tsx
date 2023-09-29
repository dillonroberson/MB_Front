import { StatusBar } from "expo-status-bar";
import React from "react";
import { TextInput, View } from "react-native";
import FilterItem from "../components/Method/FilterItem";
import { Ionicons } from "@expo/vector-icons";
import { methodFilterItem } from "../constant/FilterItem";
import Conversation from "../components/Method/Conversation";
import Buttons from "../components/Method/Buttons";

const Method = () => {
  return (
    <View>
      <StatusBar style="light" />
      <Buttons />
      {/* Tìm kiếm */}
      <View
        style={{
          backgroundColor: "#fff",
          height: 800,
          padding: 20,
        }}
      >
        {/* Filter */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {methodFilterItem.map((item, index) => {
            return <FilterItem key={index} content={item} />;
          })}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            padding: 7,
            borderRadius: 3,
            backgroundColor: "#F5F7FA",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1,
          }}
        >
          <Ionicons name="search" size={24} color="#BFC0C4" />
          <TextInput
            placeholder="Tìm tên người thụ hưởng"
            placeholderTextColor="#BFC0C4"
            style={{
              width: "100%",
              fontWeight: "900",
              fontSize: 16,
              color: "#BFC0C4",
            }}
          />
        </View>
        <Conversation />
      </View>
    </View>
  );
};

export default Method;
