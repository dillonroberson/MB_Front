import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Line from "./Line";
import { ConfirmExchangeContext } from "../../context/ConfirmExchangeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { readMoney } from "../../utils/ReadMoney";

const Body = () => {
  const billContext = useContext(ConfirmExchangeContext);
  const invoice = billContext ? billContext.invoice : null;
  const senderAcc = invoice ? invoice.senderAcc : null;
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;
  return (
    <View style={styles.bodyContainer}>
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 20,
          marginBottom: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        }}
      >
        <Line title="Phí giao dịch" subtitle="Miễn phí" />
        <Line
          title="Số tiền bằng chữ"
          content={
            invoice
              ? readMoney(invoice.amount.toString())
              : "Năm trăm nghìn đồng"
          }
        />
        <Line
          title="Hình thức chuyển"
          subtitle="Chuyển nhanh Napas 247"
          content=""
        />
        <Line
          title="Nội dung"
          subtitle={invoice ? invoice.message : "ABC"}
          content=""
        />
      </View>
      <TouchableOpacity
        onPress={() => navigate("Bill")}
        style={{
          backgroundColor: "#3222EF",
          padding: 12,
          borderRadius: 3,
        }}
        activeOpacity={0.7}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

export default Body;
