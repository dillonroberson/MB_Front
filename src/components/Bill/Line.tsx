import React from "react";
import { Text, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";

type LineProps = {
  title: string;
  subtitle?: string;
  content?: string;
};

const Line = ({ title, subtitle, content }: LineProps) => {
  const font = getFonts();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 5
      }}
    >
      <Text
        style={{
          fontFamily: font?.regular400,
          fontSize: 14,
          color: "#9B9B9B",
        }}
      >
        {title}
      </Text>
      <View>
        {subtitle && (
          <Text
            style={{
              fontFamily: font?.regular400,
              fontSize: 14,
              textAlign: "right",
              width: 180,
            }}
          >
            {subtitle}
          </Text>
        )}
        {content && (
          <Text
            style={{
              fontSize: 18,
              fontFamily: font?.medium500,
              width: 180,
              textAlign: "right",
            }}
          >
            {content}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Line;
