import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";
import { BillContext } from "../../context/BillContext";
import { formatNumber } from "../../utils/FormatNumber";
import { EvilIcons } from "@expo/vector-icons";

const Header = () => {
  const billContext = useContext(BillContext);
  const invoice = billContext ? billContext.invoice : null;
  const receiverAcc = invoice ? invoice.receiverAcc : null;

  const bank = receiverAcc?.bank?.logo;

  const font = getFonts();
  return (
    <ImageBackground
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/z4700716763478_8c85fbb1fc1d76d131d495a05698e53c.jpeg?alt=media&token=96146703-5167-46a2-b4fc-7f9e9e3955bd",
      }}
      style={styles.headerContainer}
    >
      {/* <View style={{ marginBottom: 10 }}>
        <Image
          style={{ width: 40, height: 40 }}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/md2-test.appspot.com/o/mb%2Fcheck.png?alt=media&token=4f4a2558-76fc-4bbe-9fd6-bec427aef128",
          }}
        ></Image>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{ fontFamily: font?.medium500, fontSize: 14, color: "#fff" }}
        >
          Bạn đã chuyển tiền thành công
        </Text>
      </View> */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 35, fontWeight: "bold", color: "white" }}>
          {invoice ? formatNumber(+invoice.amount) : ""} VND
        </Text>
      </View>

      {/* <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EvilIcons
          style={{ marginBottom: 8 }}
          name="share-google"
          size={24}
          color="white"
        />
        <Text style={{ color: "white", fontFamily: font?.semiBold600 }}>
          Chia sẻ
        </Text>
      </View> */}

      {/* Receiver */}
      <View style={styles.receiverContainer}>
        <View>
          <Text
            style={{
              fontFamily: font?.regular400,
              fontSize: 14,
              color: "#9B9B9B",
            }}
          >
            Đến tài khoản
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "contain",
                }}
                source={{
                  uri: bank,
                }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {receiverAcc ? receiverAcc.user?.name.toUpperCase() : ""}
              </Text>
              <Text
                style={{
                  fontFamily: font?.regular400,
                  fontSize: 14,
                }}
              >
                {receiverAcc ? receiverAcc.number : ""}
              </Text>
              <Text
                style={{
                  fontFamily: font?.regular400,
                  fontSize: 14,
                }}
              >
                {receiverAcc ? receiverAcc.bank?.name : ""}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 315,
    backgroundColor: "#3222EF",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  receiverContainer: {
    width: "100%",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: "-20%",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    // borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default Header;
