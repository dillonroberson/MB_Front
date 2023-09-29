import { Ionicons } from "@expo/vector-icons";
import React, { SetStateAction } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { bankSelector } from "../../redux/selector";
import { Bank } from "../../types/Bank.type";

type BankSelectProps = {
  openBankSelect: boolean;
  setOpenBankSelect: React.Dispatch<SetStateAction<boolean>>;
  setBankSelected: React.Dispatch<SetStateAction<Bank | null>>;
};

const BankSelect = ({
  openBankSelect,
  setOpenBankSelect,
  setBankSelected,
}: BankSelectProps) => {
  const banks = useSelector(bankSelector).banks;
  
  const handleSelect = (bankSelect: Bank) => {
    setBankSelected(bankSelect);
    setOpenBankSelect(false);
  };

  return (
    <Modal
      style={{
        position: "absolute",
        left: -20,
        right: -20,
        bottom: -20,
        height: "65%",
      }}
      isVisible={openBankSelect}
      onBackdropPress={() => setOpenBankSelect(false)}
    >
      <View style={styles.container}>
        <View style={styles.head}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: "white",
              textAlign: "center",
            }}
          >
            Chọn Ngân hàng
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setOpenBankSelect(false)}
            style={{
              position: "absolute",
              right: 15,
              top: "60%",
            }}
          >
            <AntDesign name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.searchInputWrap}>
            <Ionicons name="search" size={24} color="#BFC0C4" />
            <TextInput
              placeholder="Tìm kiếm"
              placeholderTextColor="#BFC0C4"
              style={{
                width: "100%",
                fontWeight: "900",
                fontSize: 16,
                color: "#BFC0C4",
              }}
            />
          </View>
          <ScrollView style={{marginBottom: 60}}>
            {banks.map((bank) => {
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(bank)}
                  activeOpacity={0.8}
                  key={bank.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 10,
                    gap: 10,
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                  }}
                >
                  <Image
                    style={{ width: 50, height: 50, objectFit: "contain" }}
                    source={{ uri: bank.logo }}
                  ></Image>
                  <Text style={{ fontWeight: "700", fontSize: 16, width: 350 }}>
                    {bank.name} ({bank.code})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
  body: {},
  footer: {
    padding: 15,
  },
  button: {
    backgroundColor: "#3222EF",
    padding: 10,
    borderRadius: 3,
    marginBottom: 10,
  },
  searchInputWrap: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 3,
    backgroundColor: "#F5F7FA",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

export default BankSelect;
