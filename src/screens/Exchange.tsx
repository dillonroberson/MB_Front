import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getFonts } from "../hooks/getFonts";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import SelectController from "../components/Exchange/SelectController";
import InputController from "../components/Exchange/InputController";
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { findAll } from "../thunk/bankThunk";
import { accountSelector } from "../redux/selector";
import { formatNumber } from "../utils/FormatNumber";
import { useCurrentUser } from "../hooks/useCurrentUser";
import ModalComp from "../components/Exchange/Modal";
import { findReceiver } from "../thunk/accountThunk";
import { resetResponseFindReceiver } from "../redux/reducers/accountSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { storeConfirm } from "../redux/reducers/confirmSlice";
import FilterItem from "../components/Exchange/FilterItem";
import { exchangeFilterItem } from "../constant/FilterItem";
import BankSelect from "../components/Exchange/BankSelect";
import { Bank } from "../types/Bank.type";
import { Entypo } from "@expo/vector-icons";

export type FormExchange = {
  senderId: string;
  bankId: string;
  receiverName: string;
  receiverNumber: string;
  amount: string;
  message: string;
};

const Exchange = () => {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;
  const dispatch: AppDispatch = useDispatch();
  const font = getFonts();
  const currentUser = useCurrentUser();
  const accounts = currentUser?.accounts;

  const initialState: FormExchange = {
    senderId: currentUser ? currentUser.id.toString() : "",
    bankId: "",
    receiverName: "",
    receiverNumber: "",
    amount: "",
    message: `${currentUser?.name} chuyen tien`,
  };

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormExchange>({ defaultValues: initialState });

  useEffect(() => {
    dispatch(findAll());
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [amountState, setAmountState] = useState("");

  const onSubmit = (data: FormExchange) => {
    if (!accounts) return;
    if (+amountState > accounts[0].balance || +amountState < 50000) return;
    dispatch(findReceiver(data));
  };
  const responseFindReceiver =
    useSelector(accountSelector).responseFindReceiver;

  const [messageNotFound, setMessageNotFound] = useState("");

  const reset = () => {
    setValue("amount", "");
    setValue("bankId", "");
    setValue("receiverNumber", "");
  };

  const [resetState, setResetState] = useState(false);

  useEffect(() => {
    if (!responseFindReceiver) return;
    if (responseFindReceiver.status === "OK") {
      // NAVIGATE sang screen xác nhận
      navigate("NewConfirm");
      dispatch(storeConfirm(responseFindReceiver.data));
      reset();
      setBankSelected(null)
      setResetState(true);
      setTimeout(() => {
        setResetState(false);
      }, 2000);
    } else {
      setOpenModal(true);
      if (responseFindReceiver.message === "Receiver Not Found") {
        setMessageNotFound(
          "Không tìm thấy tài khoản người nhận! Vui lòng thử lại"
        );
      }
      if (responseFindReceiver.message === "Duplicated Account") {
        setMessageNotFound(
          "Bạn không thể chuyển tiền cho chính bạn! Vui lòng thử lại"
        );
      }
    }
    setTimeout(() => {
      dispatch(resetResponseFindReceiver());
    }, 1000);
  }, [responseFindReceiver]);

  const [openBankSelect, setOpenBankSelect] = useState(false);
  const [bankSelected, setBankSelected] = useState<Bank | null>(null);

  useEffect(() => {
    if (!bankSelected) return;
    setValue("bankId", bankSelected.id.toString());
  }, [bankSelected]);

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar style="light" />
          <View style={{ marginBottom: 30, position: "relative" }}>
            <Text
              style={{
                fontFamily: font?.medium500,
                marginBottom: 10,
                fontSize: 16,
              }}
            >
              Từ tài khoản nguồn
            </Text>
            <SelectController
              control={control}
              errors={errors}
              field="senderId"
              data={accounts ? accounts : []}
              title={`${accounts ? accounts[0]?.number : "18005465218"} - ${
                currentUser ? currentUser.name : ""
              }`}
              content={`${accounts ? formatNumber(accounts[0]?.balance) : "1"}`}
            />
          </View>
          <View
            style={{
              marginBottom: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: font?.medium500,
                fontSize: 16,
              }}
            >
              Đến
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: font?.medium500,
                  fontSize: 16,
                  color: "blue",
                }}
              >
                Quét QR
              </Text>
              <Text style={{ marginBottom: 2 }}>
                <Entypo name="chevron-small-right" size={24} color="blue" />
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: 'center',
              gap: 15,
              marginBottom: 20,
            }}
          >
            {exchangeFilterItem.map((item, index) => (
              <FilterItem key={index} content={item} />
            ))}
          </View>
          <TouchableOpacity
            onPress={() => setOpenBankSelect(true)}
            activeOpacity={0.8}
            style={{ marginBottom: 20 }}
          >
            <InputController
              fieldName="bankId"
              errors={errors}
              control={control}
              title="Ngân hàng"
              account={accounts ? accounts[0] : null}
              bankSelected={bankSelected}
            />
          </TouchableOpacity>
          <BankSelect
            openBankSelect={openBankSelect}
            setOpenBankSelect={setOpenBankSelect}
            setBankSelected={setBankSelected}
          />
          <View style={{ marginBottom: 20 }}>
            <InputController
              fieldName="receiverNumber"
              errors={errors}
              control={control}
              title="Số tài khoản"
              account={accounts ? accounts[0] : null}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <InputController
              fieldName="receiverName"
              errors={errors}
              control={control}
              title="Tên tài khoản"
              account={accounts ? accounts[0] : null}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <InputController
              fieldName="amount"
              errors={errors}
              control={control}
              title="Số tiền"
              balance={accounts ? accounts[0].balance : undefined}
              setAmountState={setAmountState}
              resetState={resetState}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <InputController
              fieldName="message"
              errors={errors}
              control={control}
              title="Nội dung chuyển tiền"
              content={`${currentUser?.name} chuyen khoan`}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: "#3222EF",
                padding: 12,
                borderRadius: 3,
              }}
              activeOpacity={0.7}
            >
              <Text style={{ textAlign: "center", color: "#fff", fontFamily: font?.medium500 }}>
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </View>
          <ModalComp
            message={messageNotFound}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#f7f7f7",
  },
});

export default Exchange;
