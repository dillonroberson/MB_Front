import React from "react";
import { ScrollView, Dimensions } from "react-native";
import { notifications } from "../../constant/Notifcations";
import NotifyItem from "./NotifyItem";

const screenHeight = Dimensions.get("screen").height;

const Notify = () => {
  return (
    <ScrollView style={{height: screenHeight - 155}}>
      {notifications.map((item) => {
        return (
          <NotifyItem
            key={item.id}
            title={item.title}
            content={item.content}
            time={item.time}
          />
        );
      })}
    </ScrollView>
  );
};

export default Notify;
