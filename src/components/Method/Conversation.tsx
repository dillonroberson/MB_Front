import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";
import ConversItem from "./ConversItem";

const conversations = [
  {
    id: 1,
    name: "NGUYEN TRUONG GIANG",
    number: "998625106868",
    bank: "Quân Đội (MB)",
  },
  {
    id: 2,
    name: "PHAN ANH",
    number: "0810101136789",
    bank: "Quân Đội (MB)",
  },
  {
    id: 3,
    name: "NGO THI HOAI THU/0332432516",
    number: "0332432516",
    bank: "Quân Đội (MB)",
  },
  {
    id: 4,
    name: "PHAM QUOC DAT/0000205918445",
    number: "0000205918445",
    bank: "Quân Đội (MB)",
  },
  {
    id: 5,
    name: "Nam aeck",
    number: "9999866869999",
    bank: "Quân Đội (MB)",
  },
];

const Conversation = () => {
  return (
    <View style={{ height: "auto", maxHeight: 470}}>
          <ScrollView style={{ flexGrow: 1}}>
      {conversations.map((item) => {
        return (
          <ConversItem
            key={item.id}
            name={item.name}
            number={item.number}
            bank={item.bank}
          />
        );
      })}
    </ScrollView>
    </View>

  );
};

export default Conversation;
