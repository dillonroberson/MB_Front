import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";
import InputController from "./InputController";
import { Invoice, InvoiceRequestUpdate } from "../../types/Invoice.type";
import { convertTimestampTodate } from "../../utils/ConvertTime";
import { formatNumber } from "../../utils/FormatNumber";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateInvoice } from "../../thunk/invoiceThunk";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { findByUserId } from "../../thunk/accountThunk";
import { accountSelector } from "../../redux/selector";
import React from "react";

interface FormProps {
  selectInvoice: Invoice | null;
  setToggleModal?: React.Dispatch<SetStateAction<boolean>>;
}

export type InvoiceForm = {
  id: string;
  message: string;
  day: string;
  time: string;
  amount: string;
  remain: string;
  balance: string;
  number: string;
};


const Form = ({ selectInvoice, setToggleModal }: FormProps) => {
  if(!setToggleModal) return;
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useCurrentUser();
  const initialState: InvoiceForm = {
    id: "",
    day: "",
    time: "",
    message: "",
    amount: "",
    remain: "",
    balance: "",
    number: ""
  };
  const font = getFonts();
  const {
    setValue,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InvoiceForm>({ defaultValues: initialState });

  useEffect(() => {
    if (!currentUser) return;
    dispatch(findByUserId(currentUser.id));
  }, [currentUser]);

  const currentAcc = useSelector(accountSelector).account;


  useEffect(() => {
    if (!selectInvoice) return;
    setValue("id", selectInvoice.id.toString());
    setValue("amount", formatNumber(+selectInvoice.amount));
    setValue("balance", String(currentAcc?.balance));
    setValue("number", currentAcc?.number ?? '');
    setValue(
      "time",
      convertTimestampTodate(selectInvoice.timeStamp).toLocaleTimeString(
        "en-GB",
        {
          hour12: false,
        }
      )
    );
    setValue(
      "day",
      convertTimestampTodate(selectInvoice.timeStamp).toLocaleDateString(
        "en-GB",
        {
          hour12: false,
        }
      )
    );
    setValue("message", selectInvoice.message);
    setValue("remain", formatNumber(+selectInvoice.remainSendAcc));
  }, [selectInvoice]);

  const [date, setDate] = useState(
    selectInvoice ? new Date(selectInvoice.timeStamp) : new Date()
  );

  const [dateStamp, setDateStamp] = useState<number>(selectInvoice?.timeStamp ?? 0);
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setValue(
      "day",
      currentDate.toLocaleDateString("en-GB", {
        hour12: false,
      })
    );
    setValue(
      "time",
      currentDate.toLocaleTimeString("en-GB", {
        hour12: false,
      })
    );
    setDateStamp(currentDate.getTime());
  };

  const onSubmit = (data: InvoiceForm) => {
    data.amount = data.amount.split(".").join("");
    data.remain = data.remain.split(".").join("");
    window.console.log(data.amount);
    const request: InvoiceRequestUpdate = {
      id: +data.id,
      message: data.message,
      time: dateStamp,
      amount: data.amount,
      remain: data.remain,
      balance: data.balance,
      number: data.number
    };
    dispatch(updateInvoice(request));
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      {/* Head */}
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontFamily: font?.regular400 }}>Tài khoản đến</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            style={{ height: 40, width: 40, objectFit: "contain" }}
            source={{
              uri: selectInvoice?.receiverAcc.bank?.logo,
            }}
          ></Image>
          <View>
            <Text style={{ fontFamily: font?.semiBold600 }}>
              {selectInvoice?.receiverAcc.user?.name}
            </Text>
            <Text style={{ fontFamily: font?.regular400 }}>
              {selectInvoice?.receiverAcc.number}
            </Text>
            <Text style={{ fontFamily: font?.regular400 }}>
              {selectInvoice?.receiverAcc.bank?.name}
            </Text>
          </View>
        </View>
      </View>
      {/* Head */}
      {/* Amount */}
      <InputController control={control} errors={errors} fieldName="amount" />
      {/* Time */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <TouchableOpacity activeOpacity={0.9} onPress={() => showDatepicker()}>
          <InputController control={control} errors={errors} fieldName="day" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} onPress={() => showTimepicker()}>
          <InputController control={control} errors={errors} fieldName="time" />
        </TouchableOpacity>
      </View>

      {/* Message */}
      <InputController control={control} errors={errors} fieldName="message" />
      <InputController control={control} errors={errors} fieldName="remain" />
      <InputController control={control} errors={errors} fieldName="balance" />
      <InputController control={control} errors={errors} fieldName="number" />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 1,
              textAlign: "center",
              color: "#fff",
            }}
          >
            Lưu lại
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setToggleModal(false)}
        style={styles.buttonNonBack}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 1,
              textAlign: "center",
              color: "#3222EF",
            }}
          >
            Quay lại
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3222EF",
    padding: 10,
    borderRadius: 3,
    marginBottom: 10,
    marginTop: 20,
  },
  buttonNonBack: {
    padding: 10,
    borderRadius: 3,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#3222EF",
  },
});

export default Form;
