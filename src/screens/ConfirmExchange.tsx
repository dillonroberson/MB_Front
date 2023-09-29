import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getFonts } from "../hooks/getFonts";
import { useSelector } from "react-redux";
import { invoiceSelector } from "../redux/selector";
import { Invoice } from "../types/Invoice.type";
import { ConfirmExchangeContext } from "../context/ConfirmExchangeContext";
import Header from "../components/ConfirmExchange/Header";
import Body from "../components/ConfirmExchange/Body";

export type ConfirmExchangeProps = {
  invoice: Invoice | null;
};

const ConfirmExchange = () => {
  const font = getFonts();
  const invoice = useSelector(invoiceSelector).invoice;

  return (
    <ScrollView>
      <ConfirmExchangeContext.Provider value={{ invoice: invoice }}>
        <StatusBar style="light" />
        <View>
          <Header />
          <Body />
        </View>
      </ConfirmExchangeContext.Provider>
    </ScrollView>
  );
};

export default ConfirmExchange;
