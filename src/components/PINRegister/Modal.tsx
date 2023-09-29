import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { RootStackParamList } from "../../../App";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { resetResponseRegisterPIN } from "../../redux/reducers/accountSlice";

type ModalCompProps = {
  openModal: boolean
  message: string
}

const ModalComp = ({openModal, message}: ModalCompProps) => {
  const dispatch:AppDispatch = useDispatch()
  const navigate =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;
  return (
    <Modal style={{ padding: 20 }} isVisible={openModal}>
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={{ fontSize: 20, fontWeight: "400", color: "red" }}>
            Thông báo
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={{ fontSize: 16, textAlign: "justify" }}>
            {message}
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              dispatch(resetResponseRegisterPIN())
              navigate('Login')
            }}
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
                Tiếp tục
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
    marginBottom: 10,
  },
});

export default ModalComp;
