import React, { SetStateAction } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Form from "./Form";
import { Invoice } from "../../types/Invoice.type";

type ModalCompProps = {
  openModal: boolean
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  selectInvoice: Invoice | null
}

const ModalComp = ({openModal, setOpenModal, selectInvoice}:ModalCompProps) => {
  return (
    <Modal style={{ padding: 20 }} isVisible={openModal}>
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={{ fontSize: 20, fontWeight: "400", color: "red" }}>
            Sửa
          </Text>
        </View>
        <View style={styles.body}>
          <Form selectInvoice={selectInvoice} setToggleModal={setOpenModal} />
        </View>
        {/* <View style={styles.footer}>
          
        </View> */}
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
