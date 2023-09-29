import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { getFonts } from "../../hooks/getFonts";
import Swiper from "react-native-swiper";
import { images } from "../../constant/ImageSlider";

const Promotion = () => {
  const font = getFonts();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontFamily: font?.semiBold600 }}>Khuyến mãi cho bạn</Text>
        <Text
          style={{
            fontFamily: font?.semiBold600,
            color: "blue",
            textDecorationLine: "underline",
          }}
        >
          KHUYẾN MÃI
        </Text>
      </View>
      <View style={{marginBottom: 20}}>
        <Swiper
          dotColor="#ffffff"
          autoplay={true}
          activeDotColor="red"
          showsPagination={true}
          style={{ height: 200 }}
        >
          {images?.map((image) => (
            <View
              key={image.id}
              style={{ overflow: "hidden", borderRadius: 3 }}
            >
              <Image
                source={{ uri: image.img }}
                style={{ width: "100%", height: "100%", objectFit: "fill" }}
              />
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default Promotion;
