import React from 'react'
import { Dimensions, ImageBackground, Text, View } from 'react-native';
const heightScreen = Dimensions.get('window').height;

const MBPlus = () => {
  return (
    <ImageBackground 
      resizeMode="stretch"
      style={{
        width: "100%",
        height: heightScreen,
      }}
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/uudai.jpeg?alt=media&token=5b0dd43c-4af5-44a9-bd36-e9b822170341&_gl=1*18b83jr*_ga*MjAzODE1ODgwLjE2OTU4OTkyODU.*_ga_CW55HF8NVT*MTY5NjE3ODkzMy4zLjEuMTY5NjE3OTQwMC40MC4wLjA."
    }}/>
  )
}

export default MBPlus