import React, { SetStateAction } from "react";
import { Image, TouchableOpacity, View } from "react-native";

type BeeProps = {
  setToggleBee: React.Dispatch<SetStateAction<boolean>>
}

const Bee = ({setToggleBee}: BeeProps) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ position: "absolute", bottom: 25, right: 20, zIndex: 0 }}
      >
        <TouchableOpacity onPress={() => setToggleBee(false)} activeOpacity={1} style={{marginBottom: -4}}>
          <View
            style={{
              width: 190,
              height: 20,
              backgroundColor: "#fff",
              position: "absolute",
              top: 20,
              left: 2,
            }}
          ></View>
          <Image
            style={{ width: 200, height: 60, objectFit: "contain" }}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/z4710788249883_261ba09057fbde30d3a4fe0993f8891f.png?alt=media&token=f2b56558-f64d-47a6-84b9-562b3c524eaa",
            }}
          ></Image>
        </TouchableOpacity>

        <View
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Image
            style={{ width: 70, height: 80 }}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/z4711219694415_ea7e2798a4f3ed13c82771e738cc6f51.png?alt=media&token=f46be242-a5a5-47e2-93d0-502c63e9f09c",
            }}
          ></Image>
        </View>
      </View>
    </View>
  );
};

export default Bee;
