import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { getFonts } from "../hooks/getFonts";
import { FlatGrid } from "react-native-super-grid";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import confirmSlice from "../redux/reducers/confirmSlice";
import { confirmSelector, invoiceSelector } from "../redux/selector";
import { Transaction } from "../types/Account.type";
import { AppDispatch } from "../redux/store";
import { doTransaction } from "../thunk/invoiceThunk";
import {
  resetTransactionResponse,
  storeInvoice,
} from "../redux/reducers/invoiceSlice";

const NewConfirm = () => {
  const dispatch: AppDispatch = useDispatch();
  const font = getFonts();
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;

  const inputRefs = useRef<TextInput[]>([]);

  const focusNextInput = (index: number) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(""));

  const handleTextChange = (text: string, index: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
    if (text.length > 0) {
      focusNextInput(index);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      inputRefs.current[0].focus();
    }, 100);
  }, []);

  const handleKeyPress = (event: any, index: number) => {
    const { nativeEvent } = event;
    if (nativeEvent.key === 'Backspace' && inputValues[index].length === 0) {
      const newInputValues = [...inputValues];
      newInputValues[index - 1] = '';
      setInputValues(newInputValues);
  
      if (inputRefs.current[index - 1]) {
        (inputRefs.current[index - 1] as TextInput).focus();
      }
    }
  };

  const renderItem = ({ index }: { index: number }) => (
    <TextInput
      keyboardType="numeric"
      secureTextEntry={true}
      style={{
        textAlign: "center",
        fontSize: 20,
        borderRadius: 3,
        height: 30,
        backgroundColor: "#f6f6f6",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        opacity: 0,
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
      maxLength={1}
      ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
      onChangeText={(text) => {
        handleTextChange(text, index);
      }}
      onSubmitEditing={() => {
        focusNextInput(index);
      }}
      onKeyPress={(event) => {
        handleKeyPress(event, index);
      }}
      value={inputValues[index]}
    />
  );

  const confirm = useSelector(confirmSelector).confirm;
  const PIN = inputValues.join("");

  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!confirm) return;
    setShowError(false);
    const transaction: Transaction = {
      pin: PIN,
      receiverAccId: confirm.receiverAcc.id,
      senderAccId: confirm.senderAcc.id,
      amount: confirm.amount.toString(),
      message: confirm.message,
    };
    dispatch(doTransaction(transaction));
  };

  const transactionResponse = useSelector(invoiceSelector).transactionResponse;

  useEffect(() => {
    if (!transactionResponse) return;
    if (transactionResponse.status === "OK") {
      // transac thành công -> navigate to result screen
      dispatch(storeInvoice(transactionResponse.data));
      navigate("ConfirmExchange");
      console.log("thành công");
    } else {
      // transac xịt
      console.log("xit");
      setShowError(true);
    }
    setTimeout(() => {
      dispatch(resetTransactionResponse());
    }, 1000);
  }, [transactionResponse]);

  return (
    <View>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: font?.regular400,
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Vui lòng nhập{" "}
            <Text
              style={{
                fontFamily: font?.semiBold600,
                fontSize: 16,
                textAlign: "center",
              }}
            >
              PIN Digital OTP
            </Text>{" "}
            của bạn để tạo mã xác thực cho giao dịch này
          </Text>
        </View>
        {/* Dot */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {inputValues.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 500,
                  backgroundColor: item !== "" ? "blue" : "white",
                  borderWidth: 1,
                  borderColor: "blue",
                }}
              ></View>
            );
          })}
        </View>
        {/* Dot */}
        {showError && (
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                color: "red",
                fontFamily: font?.regular400,
                textAlign: "center",
              }}
            >
              Sai mã PIN
            </Text>
          </View>
        )}

        <View style={{ marginBottom: 70 }}>
          <FlatGrid
            data={[...Array(6)]}
            style={styles.featureContainer}
            itemDimension={50}
            spacing={10}
            scrollEnabled={false}
            renderItem={renderItem}
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: "#3222EF",
              padding: 12,
              borderRadius: 3,
            }}
            activeOpacity={0.7}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  featureContainer: {
    margin: "auto",
  },
});

export default NewConfirm;
