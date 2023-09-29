import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type ItemProps = {
  content: string;
  imageUrl: string;
};

const MethodItem = ({ content, imageUrl }: ItemProps) => {
  const isThuhuong = content === "Người thụ hưởng mới" ? true : false;

  const css = !isThuhuong ? styles.container : styles.otherContainer;
  return (
    <View style={css}>
      <Image
        style={{ width: 40, height: 40 }}
        source={{uri: imageUrl}}
      ></Image>
      <Text
        style={{
          fontWeight: "900",
          fontSize: 16,
          width: isThuhuong ? "100%" : 80,
        }}
      >
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 5,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  otherContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

export default MethodItem;
