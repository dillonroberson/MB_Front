import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import Nav from "./Nav";
import { getFonts } from "../../hooks/getFonts";
import { User } from "../../types/User.type";

type HeaderProps = {
  currentUser: User | null;
};

const widthScreen = Dimensions.get("screen").width;

const Header = ({ currentUser }: HeaderProps) => {
  const font = getFonts()?.medium500;
  return (
    <View style={{ height: 350, width: widthScreen }}>
      <ImageBackground
        style={{ position: "absolute", height: 350, width: widthScreen + 5, left: -5}}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/z4697031769992_3d7aa9130ef642ea6ad0e82615ab893d.jpeg?alt=media&token=aa856ca4-0ec9-4a24-91ba-01c14a836860",
        }}
      ></ImageBackground>
      <View style={styles.container}>
        {/* Nav */}
        <Nav />
        {/* Body */}
        <View>
          {/* <View>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                textAlign: "center",
                fontFamily: font,
              }}
            >
              Xin chào,
            </Text>
          </View> */}
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: "#DDE2F5",
                textAlign: "center",
                fontFamily: font,
                position: "absolute",
                top: 85,
              }}
            >
              {currentUser ? currentUser.name : "Nhaan"}
            </Text>
          </View>
          {/* <View>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                textAlign: "center",
                fontFamily: font,
              }}
            >
              Tài khoản của tôi
            </Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingTop: 50,
    paddingBottom: 30,
  },
});

export default Header;
