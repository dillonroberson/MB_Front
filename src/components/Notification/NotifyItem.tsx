import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";
import { convertTimestampTodate } from "../../utils/ConvertTime";

type ItemProps = {
  title: string;
  content: string;
  time: number;
};

const NotifyItem = ({ title, content, time }: ItemProps) => {
  const font = getFonts();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        paddingTop: 12,
        paddingBottom: 8,
        paddingHorizontal: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#CFCFCF",
      }}
    >
      <View style={{ width: 260 }}>
        <View>
          <Text style={{ fontFamily: font?.semiBold600 }}>{title}</Text>
        </View>
        <View>
          <Text style={{ fontFamily: font?.regular400, fontSize: 13 }}>
            {content}
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            textAlign: "right",
            color: "#828282",
            fontFamily: font?.regular400,
            fontSize: 13,
          }}
        >
          {convertTimestampTodate(time).toLocaleDateString("en-GB", {
            hour12: false,
          })}
        </Text>
        <Text
          style={{
            textAlign: "right",
            color: "#828282",
            fontFamily: font?.regular400,
            fontSize: 13,
          }}
        >
          {convertTimestampTodate(time).toLocaleTimeString("en-GB", {
            hour12: false,
          })}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#1F2DEC",
          width: 8,
          height: 8,
          bottom: 15,
          right: 15,
          borderRadius: 500,
        }}
      ></View>
    </TouchableOpacity>
  );
};

export default NotifyItem;
