import React, { SetStateAction, useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormExchange } from "../../screens/Exchange";
import { formatNumber } from "../../utils/FormatNumber";
import { Account } from "../../types/Account.type";
import { Entypo } from "@expo/vector-icons";
import { Bank } from "../../types/Bank.type";

interface InputControllerProps {
  control: Control<FormExchange> | undefined;
  errors: FieldErrors<FormExchange>;
  title: string;
  content?: string;
  fieldName:
    | "senderId"
    | "bankId"
    | "receiverNumber"
    | "amount"
    | "message"
    | "receiverName";
  balance?: number;
  setAmountState?: React.Dispatch<SetStateAction<string>>;
  resetState?: boolean;
  account?: Account | null;
  inputAccount?: string;
  setInputAccount?: React.Dispatch<SetStateAction<string>>;
  bankSelected?: Bank | null;
}

const InputController = ({
  control,
  title,
  content,
  fieldName,
  errors,
  balance,
  setAmountState,
  resetState,
  bankSelected,
}: InputControllerProps) => {
  const font = getFonts();

  const handleErrors = () => {
    switch (fieldName) {
      case "bankId":
        return errors.bankId;
      case "receiverNumber":
        return errors.receiverNumber;
      case "receiverName":
        return errors.receiverName;
      case "amount":
        return errors.amount;
      default:
        break;
    }
  };

  const handleErrorMessage = () => {
    switch (fieldName) {
      case "bankId":
        return "Vui lòng chọn ngân hàng!";
      case "receiverNumber":
        return "Vui lòng điền số tài khoản!";
      case "receiverName":
        return "Vui lòng điền tên tài khoản!";
      case "amount":
        return "Vui lòng điền số tiền!";
      default:
        break;
    }
  };

  const [amount, setAmount] = useState("");

  const formatInput = (value: string) => {
    if (value.trim() === "") return undefined;
    if (fieldName === "amount") {
      let number: number = Number(value.trim().replaceAll(".", ""));
      return formatNumber(number);
    }
    if (fieldName === "bankId") {
      if (!bankSelected) return undefined;
      return bankSelected.name + " " + "(" + bankSelected.code + ")";
    }
  };

  useEffect(() => {
    if (!setAmountState) return;
    setAmountState(amount);
  }, [amount]);

  useEffect(() => {
    if (!resetState) return;
    setAmount("");
  }, [resetState]);

  const isBank = title === "Ngân hàng" ? true : false;
  const isNumber = title === "Số tài khoản" ? true : false;

  return (
    <View>
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#f7f7f7",
          borderRadius: 10,
          borderWidth: 1,
          padding: 10,
          borderColor:
            fieldName === "message"
              ? "black"
              : handleErrors()
              ? "red"
              : "black",
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontFamily: font?.regular400,
                position: "absolute",
                top: -20,
                left: -10,
                backgroundColor: "#f7f7f7",
                paddingHorizontal: 5,
                color: handleErrors() ? "red" : "#000",
              }}
            >
              {title} <Text style={{ color: "red" }}>*</Text>
            </Text>
            <Controller
              rules={{ required: true }}
              control={control}
              name={fieldName}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  editable={!isBank}
                  style={{
                    fontFamily: font?.medium500,
                    width: "100%",
                    color: "#000",
                  }}
                  placeholder={title}
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    onChange(text.replaceAll(".", ""));
                    if (fieldName === "amount") {
                      setAmount(text.trim().replaceAll(".", ""));
                    }
                  }}
                  value={
                    fieldName === "amount" || fieldName === "bankId"
                      ? formatInput(value)
                      : value
                  }
                  defaultValue={content ? content : ""}
                  keyboardType={
                    title === "Số tài khoản" || title === "Số tiền"
                      ? "number-pad"
                      : "default"
                  }
                />
              )}
            />
            {title === "Số tiền" ? (
              <Text
                style={{
                  fontFamily: font?.medium500,
                  position: "absolute",
                  right: 0,
                  bottom: 2,
                }}
              >
                VND
              </Text>
            ) : (
              <View></View>
            )}
            {isNumber ? (
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Text
                  style={{
                    fontFamily: font?.medium500,
                    color: "blue",
                  }}
                >
                  STK đã lưu
                </Text>
                <Image
                  style={{ width: 20, height: 20, marginTop: -2 }}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/md2-test.appspot.com/o/mb%2Ficon%2Fz4686026100076_ab909733c6b1d7f0b3e079de70a37d41.jpg?alt=media&token=558d955f-5b98-49b6-978c-43da488b49cc",
                  }}
                ></Image>
              </View>
            ) : (
              <View></View>
            )}
            {isBank ? (
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 5,
                }}
              >
                <Entypo name="chevron-down" size={20} color="black" />
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </View>
      </View>
      {handleErrors() && (
        <View>
          <Text
            style={{
              fontFamily: font?.regular400,
              fontSize: 12,
              color: "red",
            }}
          >
            {handleErrorMessage()}
          </Text>
        </View>
      )}
    </View>
  );
};

export default InputController;
