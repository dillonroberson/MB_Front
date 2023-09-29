import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";
import { ConfirmExchangeContext } from "../../context/ConfirmExchangeContext";
import { formatNumber } from "../../utils/FormatNumber";
import Item from "./Item";

const Header = () => {
  const font = getFonts();
  const billContext = useContext(ConfirmExchangeContext);
  const invoice = billContext ? billContext.invoice : null;
  const receiverAcc = invoice ? invoice.receiverAcc : null;
  const senderAcc = invoice ? invoice.senderAcc : null;

  const sender = senderAcc ? senderAcc.user : null;
  const receiver = receiverAcc ? receiverAcc.user : null;

  const receiverBank = receiverAcc ? receiverAcc.bank : null;

  return (
    <View style={styles.headerContainer}>
      <View style={{ marginBottom: 10 }}>
        {/* <MaterialCommunityIcons
          name="check-circle-outline"
          style={{ backgroundColor: "#fff", borderRadius: 500 }}
          size={50}
          color={"green"}
        /> */}
      </View>
      <View style={{}}>
        <Text
          style={{ fontFamily: font?.medium500, fontSize: 16, color: "#fff" }}
        >
          Số tiền chuyển
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 35, fontWeight: "bold", color: "white" }}>
          {invoice ? formatNumber(+invoice.amount) : "500.000"} VND
        </Text>
      </View>

      <View style={styles.receiverContainer}>
        {/* Sender */}
        <Item
          title="Từ tài khoản"
          bankLogo="https://firebasestorage.googleapis.com/v0/b/md2-test.appspot.com/o/mb%2FLogo_MB_new.png?alt=media&token=44320c96-b304-4770-937f-5fc62cc32809"
          name={sender ? sender.name : "NGUYEN TRONG NHAN"}
          accNumber={senderAcc ? senderAcc.number : "123456789"}
        />
        {/* Receiver */}
        <Item
          title="Đến tài khoản"
          bankLogo={receiverBank ? receiverBank.logo : ""}
          name={receiver ? receiver.name : "NGUYEN TRONG NHAN"}
          accNumber={receiverAcc ? receiverAcc.number : "123456789"}
          bankName={
            receiverAcc ? receiverAcc.bank?.name : "Ngân hàng không biết"
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 250,
    backgroundColor: "#1F2DEC",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 10,
    // display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 90,
  },
  receiverContainer: {
    width: "95%",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: "-40%",
    zIndex: 100,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    display: "flex",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default Header;
