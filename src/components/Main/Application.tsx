import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { getFonts } from '../../hooks/getFonts';
import Swiper from 'react-native-swiper';

const Application = () => {
  const font = getFonts()?.semiBold600;
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontFamily: font }}>Chợ ứng dụng</Text>
      </View>
      <View style={{marginBottom: 20}}>
        <Image style={{height: 270, objectFit: 'cover'}} source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/z4699417329646_d7bb617a06a7bd2d39e8d1b77c4f6f6a.jpeg?alt=media&token=cd5b3745-5ff4-411d-a8eb-34d72dc39762'
        }}></Image>
      </View>
    </View>
  )
}

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

export default Application