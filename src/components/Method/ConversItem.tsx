import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";
import { Feather } from "@expo/vector-icons";

type ConversItemProps = {
  name: string;
  number: string;
  bank: string;
};

const ConversItem = ({ name, number, bank }: ConversItemProps) => {
  const font = getFonts();
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 10,
        alignItems: "flex-start",
        justifyContent: 'space-between',
        gap: 10,
        borderBottomWidth: 1,
        borderColor: "#f8f8f8",
      }}
    >
      <View  style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
      }}>
        <Image
          style={{ width: 40, height: 40, objectFit: "contain" }}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/bank-icon%2FLogo_MB_new.png?alt=media&token=c920e3f1-9cd3-4ee0-8f1b-b9b14c183247",
          }}
        ></Image>
        <View>
          <Text
            style={{ fontFamily: font?.semiBold600, fontSize: 16, width: 250 }}
          >
            {name}
          </Text>
          <Text style={{ fontFamily: font?.regular400, fontSize: 14 }}>
            {number}
          </Text>
          <Text style={{ fontFamily: font?.regular400, fontSize: 14 }}>
            {bank}
          </Text>
        </View>
      </View>

      <View>
        <Feather name="more-horizontal" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default ConversItem;
