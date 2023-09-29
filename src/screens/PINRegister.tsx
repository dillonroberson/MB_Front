import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getFonts } from "../hooks/getFonts";
import { FlatGrid } from "react-native-super-grid";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getStorageData } from "../utils/AsynStorage";
import { RegisterPIN } from "../types/User.type";
import Spinner from "react-native-loading-spinner-overlay";
import { registerPIN } from "../thunk/accountThunk";
import { accountSelector } from "../redux/selector";
import ModalComp from "../components/PINRegister/Modal";

const PINRegister = () => {
  const font = getFonts();

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

  const renderItem = ({ index }: { index: number }) => (
    <TextInput
      keyboardType="numeric"
      secureTextEntry={true}
      style={{
        textAlign: "center",
        fontSize: 20,
        borderRadius: 3,
        height: 50,
        backgroundColor: "#f6f6f6",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
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
    />
  );

  const PIN = inputValues.join("");

  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStorageData("register-id").then((data) => {
      if (!data) return;
      setUserId(+data);
    });
  }, []);

  const handleSubmit = () => {
    const registerPINData: RegisterPIN = {
      userId: userId,
      pin: PIN,
    };
    setLoading(true);
    setTimeout(() => {
      dispatch(registerPIN(registerPINData));
    },3000)
  };

  const responseRegisterPIN = useSelector(accountSelector).responseRegisterPIN;
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(!responseRegisterPIN) return;
    setLoading(false);
    setOpenModal(true)
    if(responseRegisterPIN.status === "OK") {
      setMessage("Đăng kí thàng công!");
    } else {
      setMessage("Đăng kí thất bại! Vui lòng liên hệ admin!");
    }
  },[responseRegisterPIN])

  return (
    <View>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: font?.medium500,
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Đặt mã PIN Digital OTP
          </Text>
        </View>
        <View>
          <FlatGrid
            data={[...Array(6)]}
            style={styles.featureContainer}
            itemDimension={50}
            spacing={10}
            scrollEnabled={false}
            renderItem={renderItem}
          />
        </View>
        <View style={{ marginTop: 20, marginBottom: 50 }}>
          <Text style={{ fontFamily: font?.regular400, marginBottom: 10 }}>
            Bạn vui lòng ghi nhớ mã PIN để xác nhận bạn là chủ sở hữu Digital
            OTP mỗi lần giao dịch qua App Ngân hàng MB Bank trên thiết bị này.
          </Text>
          <Text style={{ fontFamily: font?.regular400 }}>
            Mã PIN có độ dài 6 kí tự số
          </Text>
        </View>
        <View>
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
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ModalComp
          openModal={openModal}
          message={message}
        />
        <Spinner
          visible={loading}
          size="large"
          overlayColor="rgba(0, 0, 0, 0.6)"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  featureContainer: {
    margin: "auto",
  },
});

export default PINRegister;
