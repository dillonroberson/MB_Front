import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";
import Line from "./Line";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { BillContext } from "../../context/BillContext";
import { convertTimestampTodate } from "../../utils/ConvertTime";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Body = () => {
  const billContext = useContext(BillContext);
  const invoice = billContext ? billContext.invoice : null;
  const senderAcc = invoice ? invoice.senderAcc : null;
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;
  return (
    <View style={styles.bodyContainer}>
      <View
        style={{
          backgroundColor: "white",
          padding: 24,
          borderRadius: 20,
          marginBottom: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
      >
        <Line
          title="Tài khoản nguồn"
          subtitle={senderAcc ? senderAcc.number : ""}
          content={senderAcc ? senderAcc.user?.name.toUpperCase() : ""}
        />
        <Line
          title="Nội dung"
          subtitle={invoice ? invoice.message : ""}
        />
        <Line
          title="Thời gian"
          subtitle={
            invoice ? convertTimestampTodate(invoice.timeStamp).toLocaleDateString('en-GB',{hour12: false}) + ' ' + convertTimestampTodate(invoice.timeStamp).toLocaleTimeString('en-GB',{hour12: false}) : ""
          }
          content=""
        />
        <Line
          title="Hình thức chuyển"
          subtitle="Chuyển nhanh Napas 247"
          content=""
        />
        <Line
          title="Mã giao dịch"
          subtitle={invoice ? invoice.transactionCode : ""}
          content=""
        />
      </View>
      <View
        style={{
          display: "flex",
          gap: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigate("MainScreen")}
          activeOpacity={0.8}
          style={{
            borderWidth: 1,
            borderColor: "#CCD3DD",
            padding: 10,
            borderRadius: 500,
            flex: 1,
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <FontAwesome name="user-circle-o" size={18} color="#1F2DEC" />
          <Text style={{ color: "#1F2DEC", textAlign: "center" }}>
            Lưu người thụ hưởng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            borderWidth: 1,
            borderColor: "#CCD3DD",
            padding: 10,
            borderRadius: 500,
            flex: 1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <MaterialCommunityIcons
            name="script-text-outline"
            size={18}
            color="#1F2DEC"
          />
          <Text style={{ color: "#1F2DEC", textAlign: "center" }}>
            Lưu mẫu giao dịch
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          gap: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => navigate("MainScreen")}
          activeOpacity={0.8}
          style={{
            borderWidth: 1,
            borderColor: "#1F2DEC",
            padding: 12,
            borderRadius: 5,
            flex: 1,
          }}
        >
          <Text style={{ color: "#1F2DEC", textAlign: "center" }}>
            Về Trang chủ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigate("Exchange")}
          style={{
            borderWidth: 1,
            borderColor: "#1F2DEC",
            backgroundColor: "#1F2DEC",
            padding: 12,
            borderRadius: 5,
            flex: 1,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Tạo giao dịch khác
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 15,
    marginBottom: 50,
  },
});

export default Body;
