import React, { SetStateAction, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { FlatGrid } from "react-native-super-grid";
import { ConfirmResponse } from "../../types/Confirm.type";
import { Transaction } from "../../types/Account.type";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { doTransaction } from "../../thunk/invoiceThunk";
import { invoiceSelector } from "../../redux/selector";
import {
  resetTransactionResponse,
  storeInvoice,
} from "../../redux/reducers/invoiceSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type ModalCompProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  confirm: ConfirmResponse | null;
};

const ModalComp = ({ openModal, setOpenModal, confirm }: ModalCompProps) => {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;
  const dispatch: AppDispatch = useDispatch();
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

  const PIN = inputValues.join("");

  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleSubmit = () => {
    if (!confirm) return;
    setLoadingBtn(true);
    const transaction: Transaction = {
      pin: PIN,
      receiverAccId: confirm.receiverAcc.id,
      senderAccId: confirm.senderAcc.id,
      amount: confirm.amount.toString(),
      message: confirm.message,
    };
    setTimeout(() => {
      dispatch(doTransaction(transaction));
    }, 3000);
  };

  const transactionResponse = useSelector(invoiceSelector).transactionResponse;
  const [showError, setShowError] = useState(false);

  // useEffect(() => {
  //   if (!transactionResponse) return;
  //   setLoadingBtn(false);
  //   if (transactionResponse.status === "OK") {
  //     // transac thành công -> navigate to result screen
  //     dispatch(storeInvoice(transactionResponse.data));
  //     setOpenModal(false)
  //     navigate("Bill");
  //     console.log("thành công");
  //   } else {
  //     // transac xịt
  //     console.log("xit");

  //     setShowError(true);
  //   }
  //   setTimeout(() => {
  //     dispatch(resetTransactionResponse());
  //   }, 1000);
  // }, [transactionResponse]);

  useEffect(() => {
    if (!loadingBtn) return;
    setShowError(false);
  }, [loadingBtn]);

  const renderItem = ({ index }: { index: number }) => (
    <TextInput
      secureTextEntry={true}
      keyboardType="numeric"
      style={{
        textAlign: "center",
        fontSize: 20,
        borderRadius: 3,
        height: 45,
        backgroundColor: "#f6f6f6",
      }}
      maxLength={1}
      ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
      onChangeText={(text) => {
        handleTextChange(text, index);
      }}
      onSubmitEditing={() => {
        focusNextInput(index);
      }}
    />
  );

  return (
    <Modal isVisible={openModal}>
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={{ fontSize: 20, fontWeight: "400" }}>Nhập mã PIN</Text>
        </View>
        <View style={styles.body}>
          <FlatGrid
            data={[...Array(6)]}
            style={styles.featureContainer}
            itemDimension={40}
            spacing={10}
            scrollEnabled={false}
            renderItem={renderItem}
          />
        </View>
        {showError && (
          <View>
            <Text style={{ fontSize: 14, color: "red", textAlign: "center" }}>
              Sai mã PIN. Vui lòng thử lại!
            </Text>
          </View>
        )}
        <View style={styles.footer}>
          {loadingBtn ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSubmit}
              style={styles.button}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    letterSpacing: 1,
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Xác nhận
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ paddingHorizontal: 15, marginBottom: 30 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setOpenModal(false)}
            style={{ padding: 10 }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  letterSpacing: 1,
                  textAlign: "center",
                  color: "red",
                }}
              >
                Trở lại
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  head: {
    padding: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  body: {
    padding: 15,
  },
  footer: {
    padding: 15,
  },
  button: {
    backgroundColor: "#3222EF",
    padding: 10,
    borderRadius: 3,
  },
  featureContainer: {
    margin: "auto",
  },
});

export default ModalComp;
