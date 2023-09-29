import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import Form from "../components/Authentication/Form";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../redux/selector";
import { setStoreData } from "../utils/AsynStorage";
import { AppDispatch } from "../redux/store";
import { resetRegister } from "../redux/reducers/userSlice";
import ModalComp from "../components/Authentication/Modal";

const fields = ["name", "email", "phone", "password"];

const Register = () => {
  const dispatch: AppDispatch = useDispatch();

  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;

  const [loading, setLoading] = useState(false);
  const registerResponse = useSelector(userSelector).registerResponse;

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!registerResponse) return;
    setLoading(false);
    if (registerResponse.status === "OK") {
      setStoreData(registerResponse.user.id.toString(), "register-id");
      navigate("PINRegister");
    } else {
      console.log("lỗi");
      // setTypeModal('register')
      setOpenModal(true);
    }
    setTimeout(() => {
      dispatch(resetRegister());
    }, 1000);
  }, [registerResponse]);

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar style="light" />
          {/* Logo */}
          <View style={styles.logo}>
            <Image
              style={{ height: 40, width: 100 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/md2-test.appspot.com/o/mb%2FLogo_white.png?alt=media&token=ea8104f5-96db-4707-b817-2c0089909613",
              }}
            ></Image>
          </View>
          {/* Form */}
          <Form setLoading={setLoading} fields={fields} type="register" />
          <View style={{ paddingHorizontal: 20, width: "auto" }}>
            <TouchableOpacity
              onPress={() => navigate("Login")}
              activeOpacity={0.7}
            >
              <Text style={styles.link}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
          </View>
          <ModalComp
            openModal={openModal}
            setOpenModal={setOpenModal}
            type="login"
          />
          <Spinner
            visible={loading}
            size="large"
            overlayColor="rgba(0, 0, 0, 0.6)"
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1F2DEC",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 50,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 70,
  },
  formContain: {
    width: "100%",
    padding: 20,
  },
  button: {
    padding: 16,
    width: "100%",
    backgroundColor: "#66C5FD",
    borderRadius: 500,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  link: {
    color: "#fff",
    textDecorationLine: "underline",
    textAlign: "right",
    marginBottom: 50,
    paddingBottom: 65
  },
});

export default Register;
