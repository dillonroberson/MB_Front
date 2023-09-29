import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import PINRegister from "./src/screens/PINRegister";
import Exchange from "./src/screens/Exchange";
import { getFonts } from "./src/hooks/getFonts";
import ConfirmExchange from "./src/screens/ConfirmExchange";
import Bill from "./src/screens/Bill";
import Method from "./src/screens/Method";
import NewConfirm from "./src/screens/NewConfirm";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, View } from "react-native";
import { tabs } from "./src/constant/BottomTab";
import Notification from "./src/screens/Notification";
import Splash from "./src/screens/Splash";
import InvoiceScreen from "./src/screens/InvoiceScreen";
import DetailBill from "./src/screens/DetailBill";
import { Foundation } from "@expo/vector-icons";
import HomeIcon from "./src/components/App/HomeIcon";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  PINRegister: undefined;
  MainScreen: undefined;
  Main: undefined;
  Exchange: undefined;
  ConfirmExchange: undefined;
  Bill: undefined;
  Method: undefined;
  Splash: undefined;
  //Update
  Notification: undefined;
  NewConfirm: undefined;
  InvoiceScreen: undefined;
  DetailBill: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const font = getFonts();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      {tabs.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={({ route }) => ({
              title: item.title,
              tabBarLabelStyle: { fontFamily: font?.medium500, fontSize: 12 },
              headerShown: false,
              tabBarActiveTintColor: "#1F2DEC",
              tabBarIcon: ({ focused }) => {
                if (route.name === item.name && focused) {
                  return (
                    <View
                      style={{
                        borderTopWidth: 3,
                        width: "100%",
                        height: "100%",
                        borderTopColor: "#1F2DEC",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ width: 30, height: 30 }}
                        source={{ uri: item.icon }}
                      />
                    </View>
                  );
                }
                return (
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 37, height: 30 }}
                      source={{ uri: item.icon }}
                    />
                  </View>
                );
              },
            })}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default function App() {
  const font = getFonts()?.medium500;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false, animation: "default" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, animation: "default" }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false, animation: "default" }}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false, animation: "default" }}
          />
          <Stack.Screen
            name="PINRegister"
            component={PINRegister}
            options={{
              headerShown: true,
              animation: "default",
              title: "Đăng kí Digital OTP",
              headerStyle: {
                backgroundColor: "#1F2DEC",
              },
              headerTintColor: "#FFFFFF",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: font,
              },
            }}
          />
          <Stack.Screen
            name="DetailBill"
            component={DetailBill}
            options={{
              headerShown: true,
              animation: "default",
              title: "Chi tiết",
              headerStyle: {
                backgroundColor: "#1F2DEC",
              },
              headerTintColor: "#FFFFFF",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: font,
              },
            }}
          />
          <Stack.Screen
            name="InvoiceScreen"
            component={InvoiceScreen}
            options={{
              headerShown: true,
              animation: "default",
              title: "Biến động số dư",
              headerStyle: {
                backgroundColor: "#1F2DEC",
              },
              headerTintColor: "#FFFFFF",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: font,
              },
              headerRight: () => <HomeIcon />,
            }}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{
              headerShown: true,
              animation: "default",
              title: "Thông báo",
              headerStyle: {
                backgroundColor: "#1F2DEC",
              },
              headerTintColor: "#FFFFFF",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: font,
              },
              headerRight: () => <HomeIcon />,
            }}
          />
          <Stack.Screen
            name="Exchange"
            component={Exchange}
            options={{
              headerShown: true,
              animation: "default",
              title: "Chuyển tiền",
              headerStyle: {
                backgroundColor: "#1F2DEC",
              },
              headerTintColor: "#FFFFFF",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: font,
              },
              headerRight: () => <HomeIcon />,
            }}
          />
          <Stack.Screen
            name="ConfirmExchange"
            component={ConfirmExchange}
            options={{
              headerShown: true,
              animation: "default",
              title: "Xác nhận thông tin",
              headerStyle: {
                backgroundColor: "#1F2DEC",
              },
              headerTintColor: "#FFFFFF",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: font,
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="NewConfirm"
            component={NewConfirm}
            options={{
              headerShown: true,
              animation: "default",
              title: "Lấy mã OTP",
              headerStyle: {
                backgroundColor: "#1F2DEC",
              },
              headerTintColor: "#FFFFFF",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: font,
              },
            }}
          />
          <Stack.Screen
            name="Method"
            component={Method}
            options={{
              headerShown: true,
              animation: "default",
              title: "Chuyển tiền",
              headerStyle: {
                backgroundColor: "#1F2DEC",
              },
              headerTintColor: "#FFFFFF",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: font,
              },
              headerRight: () => <HomeIcon />,
            }}
          />
          <Stack.Screen
            name="Bill"
            component={Bill}
            options={{ headerShown: false, animation: "default" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
