import React, { Dispatch, SetStateAction } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type BeeProps = {
  setToggleBee: Dispatch<SetStateAction<boolean>>;
};

const Bee = ({ setToggleBee }: BeeProps) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ position: "absolute", bottom: 200, right: 10, zIndex: 100 }}
      >
        <TouchableOpacity
          onPress={() => setToggleBee(false)}
          activeOpacity={1}
          style={{ marginBottom: -4 }}
        >
          <Ionicons style={{textAlign: "right"}} name="close" size={24} color="black" />
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Image
            style={{ width: 120, height: 120 }}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/z4711220685104_2decc7b075e9d7dc827fa09a23d2a834.png?alt=media&token=206054ab-704e-46b0-acfe-0083d988aded",
            }}
          ></Image>
        </View>
      </View>
    </View>
  );
};

export default Bee;
