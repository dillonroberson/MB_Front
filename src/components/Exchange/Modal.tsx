import React, { SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

type ModalCompProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  message: string;
};

const ModalComp = ({ openModal, setOpenModal, message }: ModalCompProps) => {
  return (
    <Modal style={{ padding: 20 }} isVisible={openModal}>
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={{ fontSize: 20, fontWeight: "400", color: "red" }}>
            Thông báo
          </Text>
        </View>
        <View style={styles.body}><Text>{message}</Text></View>
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setOpenModal(false)}
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
                Thử lại
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
