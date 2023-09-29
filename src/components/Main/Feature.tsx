import React from "react";
import { FlatGrid } from "react-native-super-grid";
import { features } from "../../constant/Features";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from "react-native";
import { getFonts } from "../../hooks/getFonts";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

const Feature = () => {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;

  const font = getFonts();
  const toExchange = (id: number) => {
    if (id === 1) {
      navigate("Method");
    }
  };
  return (
    <ScrollView>
      <View
        style={{
          paddingHorizontal: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontFamily: font?.semiBold600 }}>
          Tính năng chính
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#BBB4BF",
            fontFamily: font?.medium500,
          }}
        >
          Tuỳ chỉnh
        </Text>
      </View>
      <FlatGrid
        style={styles.featureContainer}
        itemDimension={100}
        data={features}
        spacing={10}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => toExchange(item.id)}
              style={styles.featureItem}
              activeOpacity={0.92}
            >
              <View>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri: item.icon,
                  }}
                ></Image>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: font?.medium500,
                  fontSize: 14,
                  textAlign: "center",
                  paddingHorizontal: 10,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  featureContainer: {
    margin: "auto",
  },
  featureItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 3,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    height: 115,
    elevation: 1,
  },
});

export default Feature;
