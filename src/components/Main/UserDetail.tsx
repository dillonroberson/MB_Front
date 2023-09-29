import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MainContext } from "../../context/MainContext";
import Modal from "react-native-modal";
import { getFonts } from "../../hooks/getFonts";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

const features = [
  {
    id: 1,
    name: "Quản lý thiết bị",
    icon: require("../../../assets/icon-user_detail/icon-1.jpg"),
  },
  {
    id: 2,
    name: "Thay đổi mật khẩu",
    icon: require("../../../assets/icon-user_detail/icon-2.jpg"),
  },
  {
    id: 3,
    name: "Thông tin email",
    icon: require("../../../assets/icon-user_detail/icon-3.jpg"),
  },
  {
    id: 4,
    name: "Gói hỗ trợ",
    icon: require("../../../assets/icon-user_detail/icon-4.jpg"),
  },
  {
    id: 5,
    name: "Phiên bản chợ 6.2.6",
    icon: require("../../../assets/icon-user_detail/icon-5.jpg"),
  },
  {
    id: 6,
    name: "Phiên bản app",
    icon: require("../../../assets/icon-user_detail/icon-5.jpg"),
  },
];

const UserDetail = () => {
  const font = getFonts();
  const mainContext = useContext(MainContext);
  if (!mainContext) return;
  const toggleUserDetail = mainContext.toggleUserDetail;
  const setToggleUserDetail = mainContext.setToggleUserDetail;
  const currentUser = mainContext.currentUser;
  const accounts = currentUser ? currentUser.accounts : [];
  const account = accounts ? accounts[0] : null;
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;
  return (
    <Modal
      style={{
        position: "absolute",
        left: -20,
        right: -20,
        bottom: -20,
        height: "70%",
      }}
      isVisible={toggleUserDetail}
      onBackdropPress={() => setToggleUserDetail(false)}
    >
      <View style={styles.container}>
        <View style={styles.head}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: "white",
              textAlign: "center",
              fontFamily: font?.medium500,
            }}
          >
            Cài đặt tài khoản
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setToggleUserDetail(false)}
            style={{
              position: "absolute",
              right: 15,
              top: "60%",
            }}
          >
            <AntDesign name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              padding: 20,
            }}
          >
            <View>
              <Image
                style={{ width: 40, height: 40 }}
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/kisspng-computer-icons-user-profile-user-account-clip-art-5b07b23ad4dd52.9335900715272310348719.jpg?alt=media&token=ad06c5ed-60fd-46c2-a829-4a3c77b46258",
                }}
              ></Image>
            </View>
            <View>
              <Text style={{ fontFamily: font?.semiBold600, fontSize: 16 }}>
                {currentUser?.name}
              </Text>
              <Text style={{ fontFamily: font?.regular400 }}>
                Tên đăng nhập: {account?.number}
              </Text>
            </View>
          </View>
          <View>
            {features.map((feature) => {
              return (
                <View
                  key={feature.id}
                  style={{
                    padding: 10,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#D2D2D2",
                    gap: 10,
                  }}
                >
                  <Image
                    style={{ width: 35, height: 35 }}
                    source={feature.icon}
                  ></Image>
                  <Text style={{ fontFamily: font?.semiBold600 }}>
                    {feature.name}
                  </Text>
                  {feature.id === 5 ? (
                    <></>
                  ) : feature.id === 6 ? (
                    <Text
                      style={{
                        position: "absolute",
                        right: 10,
                        fontFamily: font?.semiBold600,
                        color: "#1D1ED3",
                        textDecorationLine: "underline",
                      }}
                    >
                      Kiểm tra phiên bản
                    </Text>
                  ) : (
                    <View style={{ position: "absolute", right: 10 }}>
                      <MaterialIcons
                        name="keyboard-arrow-right"
                        size={24}
                        color="black"
                      />
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.removeItem("current-user");
              AsyncStorage.removeItem("token");
              navigate("Login");
            }}
            activeOpacity={0.9}
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: "#1D1ED3",
              borderRadius: 3,
            }}
          >
            <Text
              style={{
                fontFamily: font?.semiBold600,
                fontSize: 16,
                textAlign: "center",
                color: "#fff",
              }}
            >
              Đăng xuất
            </Text>
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
    height: "100%",
  },
  head: {
    backgroundColor: "#1F2DEC",
    padding: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  footer: {
    padding: 15,
  },
  button: {
    backgroundColor: "#3222EF",
    padding: 10,
    borderRadius: 3,
    marginBottom: 10,
  },
});

export default UserDetail;
