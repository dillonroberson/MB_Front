import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";

type FilterItemProps = {
  content: string;
};

const FilterItem = ({ content }: FilterItemProps) => {
  const isActive = content === "TK Ngân hàng" ? true : false;
  const font = getFonts();
  return (
    <View style={isActive ? styles.active : styles.inactive}>
      <Text
        style={{
          fontWeight: "900",
          fontSize: 16,
          color: isActive ? "blue" : "#BBB4BF",
          fontFamily: font?.bold700
        }}
      >
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inactive: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 500,
    borderColor: "#BBB4BF",
  },
  active: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 500,
  },
});
export default FilterItem;
