import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { findInvoiceByAccount } from "../../thunk/invoiceThunk";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { findByUserId } from "../../thunk/accountThunk";
import { accountSelector, invoiceSelector } from "../../redux/selector";
import HistoryItem from "./HistoryItem";
import { Invoice } from "../../types/Invoice.type";
import { convertTimestampTodate, typeDate } from "../../utils/ConvertTime";
import { formatNumber } from "../../utils/FormatNumber";
import Filter from "./Filter";
import { useRoute } from "@react-navigation/native";
import ModalComp from "./Modal";

const History = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useCurrentUser();
  const route = useRoute().name;

  useEffect(() => {
    if (!currentUser) return;
    dispatch(findByUserId(currentUser.id));
  }, [currentUser]);

  const responseInvoice = useSelector(invoiceSelector).invoiceResponse;
  const currentAcc = useSelector(accountSelector).account;

  useEffect(() => {
    if (!currentAcc) return;
    dispatch(findInvoiceByAccount(currentAcc.id));
  }, [currentAcc]);

  useEffect(() => {
    if (!currentAcc) return;
    if(!responseInvoice) return;
    dispatch(findInvoiceByAccount(currentAcc.id));
  },[responseInvoice,currentAcc])

  const invoices = useSelector(invoiceSelector).invoices;

  const invoiceMap = [...invoices].sort((a, b) => b.timeStamp - a.timeStamp);

  const getAccountText = (number: string) => {
    let result = number.slice(0, 2) + "xxx" + number.slice(5);
    return result;
  };

  const getAmountText = (invoice: Invoice) => {
    if (!currentAcc) return;
    if (invoice.senderAcc.id === currentAcc.id)
      return `-${formatNumber(+invoice.amount)}`;
    if (invoice.receiverAcc.id === currentAcc.id)
      return `+${formatNumber(+invoice.amount)}`;
  };

  const getContent = (invoice: Invoice) => {
    if (!currentAcc) return;
    let account = getAccountText(currentAcc.number);
    let transaction = getAmountText(invoice);
    let time = convertTimestampTodate(invoice.timeStamp);

    let remain =
      currentAcc.id === invoice.receiverAcc.id
        ? formatNumber(+invoice.remainReceiveAcc)
        : formatNumber(+invoice.remainSendAcc);
    let message = invoice.message;
    let content = `TK ${account}|GD: ${transaction}VND ${typeDate(
      time
    )}|SD:${remain}VND|ND: ${message}`;
    return content;
  };

  const [toggleModal, setToggleModal] = useState(false);
  const [selectInvoice, setSelectInvoice] = useState<Invoice | null>(null);

  return (
    <View>
      <Filter />
      <ScrollView
        style={{
          height: route === "InvoiceScreen" ? 700 : 650,
          marginBottom: 20,
        }}
      >
        {invoiceMap.map((invoice) => {
          return (
            <HistoryItem
              key={invoice.id}
              title="Thông báo biến động số dư"
              content={getContent(invoice)}
              time={invoice.timeStamp}
              setSelectInvoice={setSelectInvoice}
              invoice={invoice}
            />
          );
        })}
      </ScrollView>
      <ModalComp openModal={toggleModal} setOpenModal={setToggleModal} selectInvoice={selectInvoice}  />
    </View>
  );
};

export default History;
