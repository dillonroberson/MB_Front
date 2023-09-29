import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, View } from "react-native";
import Header from "../components/Bill/Header";
import Body from "../components/Bill/Body";
import { useSelector } from "react-redux";
import { invoiceSelector } from "../redux/selector";
import { Invoice } from "../types/Invoice.type";
import { BillContext } from "../context/BillContext";

export type BillProps = {
  invoice: Invoice | null;
};

const Bill = () => {
  const invoice = useSelector(invoiceSelector).invoice;

  return (
    <BillContext.Provider value={{ invoice: invoice }}>
      <ScrollView>
        <View>
          <StatusBar style="light" />
          {/* Header */}
          <Header />
          <Body />
        </View>
      </ScrollView>
    </BillContext.Provider>
  );
};

export default Bill;
