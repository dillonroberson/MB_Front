import React from "react";
import { Image, Text, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";

type ItemProps = {
  title: string;
  bankLogo: string;
  name: string;
  accNumber: string;
  bankName?: string;
};

const Item = ({ title, bankLogo, name, accNumber, bankName }: ItemProps) => {
  const font = getFonts();
  return (
    <View>
      <Text
        style={{
          fontFamily: font?.regular400,
          fontSize: 14,
          color: '#9B9B9B'
        }}
      >
        {title}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
          }}
          source={{
            uri: bankLogo,
          }}
        />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name.toUpperCase()}</Text>
          <Text
            style={{
              fontFamily: font?.regular400,
              fontSize: 14,
            }}
          >
            {accNumber}
          </Text>
          {bankName && (
            <Text
              style={{
                fontFamily: font?.regular400,
                fontSize: 14,
              }}
            >
              {bankName}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Item;
