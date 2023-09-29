import React, { useContext, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { getFonts } from "../../hooks/getFonts";
import { MaterialIcons } from "@expo/vector-icons";
import { formatNumber } from "../../utils/FormatNumber";
import { MainContext } from "../../context/MainContext";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { findByUserId } from "../../thunk/accountThunk";
import { accountSelector, invoiceSelector } from "../../redux/selector";
import invoiceSlice from "../../redux/reducers/invoiceSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

const accInfos = [
  {
    id: 1,
    name: "Điểm thưởng",
  },
  {
    id: 2,
    name: "Thẻ",
  },
  {
    id: 3,
    name: "Tài khoản tiền gửi số",
  },
  {
    id: 4,
    name: "Khoản vay",
  },
];

const Account = () => {
  const navigate =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;
  const dispatch: AppDispatch = useDispatch();
  const mainContext = useContext(MainContext);
  const currentUser = mainContext ? mainContext.currentUser : null;
  const font = getFonts();
  const invoice = useSelector(invoiceSelector).invoice;

  useEffect(() => {
    if (!currentUser) return;
    dispatch(findByUserId(currentUser.id));
  }, [invoice, currentUser]);

  const account = useSelector(accountSelector).account;

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.itemContainer}>
          <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
            <View>
              <Image style={{width: 50, height: 50}} source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/method-buttons%2Fz4705636776962_43b05c274ed4fe01bcdf34671fc9e8a1.jpg?alt=media&token=f9098062-97d5-4c8e-a150-21e31be7343d'
              }}></Image>
            </View>
            <View>
              <Text style={{ fontFamily: font?.bold700, color: 'blue', fontSize: 16 }}>Bee Rich</Text>
              <Text style={{ fontFamily: font?.regular400, fontSize: 13 }}>
                Trợ thủ tài chính cá nhân
              </Text>
            </View>
          </View>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigate('InvoiceScreen')}>
            <View>
              <Text style={{ fontFamily: font?.semiBold600 }}>
                Tài khoản nguồn{" "}
                <Text style={{ color: "blue" }}>
                  {account ? account.number : ""}
                </Text>
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ fontSize: 28, color: "blue", fontWeight: "bold" }}>
                {account ? formatNumber(account.balance) : ""}
              </Text>
              <Text style={{ fontFamily: font?.semiBold600, color: '#878787' }}>VND</Text>
            </View>
          </TouchableOpacity>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </View>

        <View>
          {accInfos.map((item) => {
            return (
              <View key={item.id} style={styles.itemContainer}>
                <View>
                  <Text style={{ fontFamily: font?.semiBold600 }}>
                    {item.name}
                  </Text>
                </View>
                <View>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "",
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
});

export default Account;
