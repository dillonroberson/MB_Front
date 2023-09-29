import React, { useContext } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { MainContext } from "../../context/MainContext";

const Nav = () => {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;

    const mainContext = useContext(MainContext);
    if(!mainContext) return;

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => mainContext.setToggleUserDetail(true)}>
        <AntDesign name="user" size={24} color={"#DDE2F5"} />
      </TouchableOpacity>
      <View>
        {/* <Image
          style={{ height: 40, width: 100 }}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/md2-test.appspot.com/o/mb%2FLogo_white.png?alt=media&token=ea8104f5-96db-4707-b817-2c0089909613",
          }}
        ></Image> */}
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('Notification')}>
        <Ionicons name="notifications-outline" size={24} color="#DDE2F5" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 30,
  },
});

export default Nav;
