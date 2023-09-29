import React, { SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";
import { convertTimestampTodate } from "../../utils/ConvertTime";
import { Invoice } from "../../types/Invoice.type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { storeSelectedInvoice } from "../../redux/reducers/invoiceSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type HistoryItemProps = {
  title: string;
  content?: string;
  time: number;
  setSelectInvoice?: React.Dispatch<SetStateAction<Invoice | null>>;
  invoice: Invoice;
};

const HistoryItem = ({
  title,
  content,
  time,
  setSelectInvoice,
  invoice,
}: HistoryItemProps) => {
  if (!setSelectInvoice) return;
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;
  const dispatch: AppDispatch = useDispatch();
  const font = getFonts();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(storeSelectedInvoice(invoice));
        setSelectInvoice(invoice);
        navigate('DetailBill');
      }}
      activeOpacity={0.8}
      style={{
        paddingTop: 12,
        paddingBottom: 8,
        paddingHorizontal: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#CFCFCF",
      }}
    >
      <View style={{ width: 260 }}>
        <View>
          <Text style={{ fontFamily: font?.semiBold600 }}>{title}</Text>
        </View>
        <View>
          <Text style={{ fontFamily: font?.regular400, fontSize: 13 }}>
            {content}
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            textAlign: "right",
            color: "#828282",
            fontFamily: font?.regular400,
            fontSize: 13,
          }}
        >
          {convertTimestampTodate(time).toLocaleDateString("en-GB", {
            hour12: false,
          })}
        </Text>
        <Text
          style={{
            textAlign: "right",
            color: "#828282",
            fontFamily: font?.regular400,
            fontSize: 13,
          }}
        >
          {convertTimestampTodate(time).toLocaleTimeString("en-GB", {
            hour12: false,
          })}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#1F2DEC",
          width: 8,
          height: 8,
          bottom: 15,
          right: 15,
          borderRadius: 500,
        }}
      ></View>
    </TouchableOpacity>
  );
};

export default HistoryItem;
