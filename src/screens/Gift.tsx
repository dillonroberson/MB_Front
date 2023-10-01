import React from 'react'
import { Dimensions, ImageBackground, Text, View } from 'react-native';
const heightScreen = Dimensions.get('window').height;

const Gift = () => {
  return (
    <ImageBackground 
      resizeMode="stretch"
      style={{
        width: "100%",
        height: heightScreen,
      }}
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/tichdiem.jpeg?alt=media&token=96ccb8c0-3600-44b2-b697-8846b35d4894&_gl=1*1y9v3v9*_ga*MjAzODE1ODgwLjE2OTU4OTkyODU.*_ga_CW55HF8NVT*MTY5NjE3ODkzMy4zLjEuMTY5NjE3OTM4MC42MC4wLjA."
    }}/>
  )
}

export default Gift