import React from 'react'
import { Dimensions, ImageBackground, Text, View } from 'react-native';
const heightScreen = Dimensions.get('window').height;

const Product = () => {
  return (
    <ImageBackground 
      resizeMode="stretch"
      style={{
        width: "100%",
        height: heightScreen,
      }}
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/sanpham.jpeg?alt=media&token=f163f3ee-fcd8-4e4a-b51b-d68c26f55221&_gl=1*13x1ill*_ga*MjAzODE1ODgwLjE2OTU4OTkyODU.*_ga_CW55HF8NVT*MTY5NjE3ODkzMy4zLjEuMTY5NjE3OTAxMS41Mi4wLjA."
    }}/>
  )
}

export default Product