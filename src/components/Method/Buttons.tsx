import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import MethodItem from './MethodItem'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

const Buttons = () => {
  const navigate =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>().navigate;
  return (
    <View
    style={{
      padding: 20,
    }}
  >
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        gap: 20,
      }}
    >
      <MethodItem content="Quét QR" imageUrl="https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/method-buttons%2Fz4686026095337_ec16711c3e5a8a9a032c9de123a03f8f%20(1).jpg?alt=media&token=b77fd0b8-2605-481f-b62d-f6861c9adf43" />
      <MethodItem
        content="Giao dịch tách lệnh"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/method-buttons%2Fz4686026095337_ec16711c3e5a8a9a032c9de123a03f8f%20(2).jpg?alt=media&token=93bdc85a-2063-4e85-95ac-71281b1f754e"
      />
    </View>
    <TouchableOpacity
      onPress={() => navigate("Exchange")}
      activeOpacity={0.6}
    >
      <MethodItem
        content="Người thụ hưởng mới"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/method-buttons%2Fz4686026095337_ec16711c3e5a8a9a032c9de123a03f8f.jpg?alt=media&token=5612be5c-35e0-4144-8bb2-0bb0b83a9e9a"
      />
    </TouchableOpacity>
  </View>
  )
}

export default Buttons