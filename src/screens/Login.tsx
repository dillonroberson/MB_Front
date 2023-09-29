import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Form from "../components/Authentication/Form";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../redux/selector";
import { setStoreData } from "../utils/AsynStorage";
import { AppDispatch } from "../redux/store";
import { resetLogin } from "../redux/reducers/userSlice";
import ModalComp from "../components/Authentication/Modal";

const fields = ["phone", "password"];
const heightScreen = Dimensions.get('window').height;

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;

  const loginResponse = useSelector(userSelector).loginResponse;
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!loginResponse) return;
    setLoading(false);
    if (loginResponse.status === "OK") {
      setStoreData(JSON.stringify(loginResponse.user.id), "current-user");
      setStoreData(JSON.stringify(loginResponse.token), "token");
      navigate("MainScreen");
    } else {
      console.log("lỗi");
      setOpenModal(true);
    }
    setTimeout(() => {
      dispatch(resetLogin());
    }, 1000);
  }, [loginResponse]);

  const [loading, setLoading] = useState(false);
  return (
    <ImageBackground
      resizeMode="stretch"
      style={{
        width: "100%",
        height: heightScreen,
      }}
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/z4702496233420_bfe62232ebe20b6dad716b646dcc7f7b.jpeg?alt=media&token=66bef426-13cb-4a9d-b34a-d5261fdc4362",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar style="light" />
          {/* Logo */}
          {/* <View style={styles.logo}>
            <Image
              style={{ height: 40, width: 100 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/md2-test.appspot.com/o/mb%2FLogo_white.png?alt=media&token=ea8104f5-96db-4707-b817-2c0089909613",
              }}
            ></Image>
          </View> */}
          {/* Form */}
          <Form setLoading={setLoading} fields={fields} type="login" />
          <View>
            <TouchableOpacity
              onPress={() => navigate("Register")}
              activeOpacity={0.7}
              style={{marginLeft: 270}}
            >
              <Text style={styles.link}>TẠO TÀI KHOẢN</Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 193
  },
  logo: {
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
    padding: 10,
    opacity: 0
  },
});

export default Login;
