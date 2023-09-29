import React, { SetStateAction, useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import Header from "../components/Main/Header";
import { StatusBar } from "expo-status-bar";
import Body from "../components/Main/Body";
import { User } from "../types/User.type";
import { MainContext } from "../context/MainContext";
import { useCurrentUser } from "../hooks/useCurrentUser";
import UserDetail from "../components/Main/UserDetail";
import Bee from "../components/Main/Bee";

export type MainProps = {
  currentUser: User | null;
  toggleUserDetail: boolean;
  setToggleUserDetail: React.Dispatch<SetStateAction<boolean>>;
};

const Main = () => {
  const currentUser = useCurrentUser();
  const [toggleUserDetail, setToggleUserDetail] = useState(false);
  const [toggleBee, setToggleBee] = useState(true);
  return (
    <View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <MainContext.Provider
            value={{
              currentUser: currentUser,
              toggleUserDetail: toggleUserDetail,
              setToggleUserDetail: setToggleUserDetail,
            }}
          >
            <View style={{ backgroundColor: "#F7F7F7" }}>
              <StatusBar style="light" />
              <Header currentUser={currentUser} />
              <Body />
              <UserDetail />
            </View>
          </MainContext.Provider>
        </SafeAreaView>
      </ScrollView>
      {toggleBee && <Bee setToggleBee={setToggleBee} />}
    </View>
  );
};

export default Main;
