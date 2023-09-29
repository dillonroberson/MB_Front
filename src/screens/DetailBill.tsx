import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getFonts } from "../hooks/getFonts";
import { useDispatch, useSelector } from "react-redux";
import { accountSelector, invoiceSelector } from "../redux/selector";
import { Invoice } from "../types/Invoice.type";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { AppDispatch } from "../redux/store";
import { findByUserId } from "../thunk/accountThunk";
import { findInvoiceByAccount } from "../thunk/invoiceThunk";
import { formatNumber } from "../utils/FormatNumber";
import { convertTimestampTodate, typeDate } from "../utils/ConvertTime";
import ModalComp from "../components/Notification/Modal";
import Bee from "../components/DetailBee/Bee";

const DetailBill = () => {
  const font = getFonts();
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useCurrentUser();
  const invoice = useSelector(invoiceSelector).selectedInvoice;

  useEffect(() => {
    if (!currentUser) return;
    dispatch(findByUserId(currentUser.id));
  }, [currentUser]);

  const currentAcc = useSelector(accountSelector).account;

  useEffect(() => {
    if (!currentAcc) return;
    dispatch(findInvoiceByAccount(currentAcc.id));
  }, [currentAcc]);

  if (!invoice) return;

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

  const [openModal, setOpenModal] = useState(false);
  const [toggleBee, setToggleBee] = useState(true);

  return (
    <View style={{height: '100%'}}>
      <TouchableOpacity
        onLongPress={() => setOpenModal(true)}
        activeOpacity={0.9}
        style={{
          paddingTop: 12,
          paddingBottom: 8,
          paddingHorizontal: 12,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: 260 }}>
          <View>
            <Text style={{ fontFamily: font?.semiBold600 }}>
              Thông báo biến động số dư
            </Text>
          </View>
          <View>
            <Text style={{ fontFamily: font?.regular400, fontSize: 13 }}>
              {getContent(invoice)}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              textAlign: "right",
              color: "#828282",
              fontFamily: font?.regular400,
              fontSize: 13,
            }}
          >
            {convertTimestampTodate(invoice.timeStamp).toLocaleDateString(
              "en-GB",
              {
                hour12: false,
              }
            )}
          </Text>
          <Text
            style={{
              textAlign: "right",
              color: "#828282",
              fontFamily: font?.regular400,
              fontSize: 13,
            }}
          >
            {convertTimestampTodate(invoice.timeStamp).toLocaleTimeString(
              "en-GB",
              {
                hour12: false,
              }
            )}
          </Text>
        </View>
      </TouchableOpacity>
      <ModalComp
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectInvoice={invoice}
      />
      {toggleBee && <Bee setToggleBee={setToggleBee} />}
    </View>
  );
};

export default DetailBill;
