import React from 'react'
import { Dimensions, ImageBackground, Text, View } from 'react-native';
const heightScreen = Dimensions.get('window').height;

const Utilities = () => {
  return (
    <ImageBackground 
      resizeMode="stretch"
      style={{
        width: "100%",
        height: heightScreen,
      }}
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/tienich.jpeg?alt=media&token=2bd6aa69-0318-4dca-8378-93482d1ac805&_gl=1*kay1bi*_ga*MjAzODE1ODgwLjE2OTU4OTkyODU.*_ga_CW55HF8NVT*MTY5NjE3ODkzMy4zLjEuMTY5NjE3OTQwNi4zNC4wLjA."
    }}/>
  )
}

export default Utilities