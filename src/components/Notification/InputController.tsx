import React from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { getFonts } from "../../hooks/getFonts";
import { InvoiceForm } from "./Form";

export interface InputControllerProps {
  control: Control<InvoiceForm> | undefined;
  errors: FieldErrors<InvoiceForm>;
  fieldName: "amount" | "time" | "message" | "day";
}

const InputController = ({
  control,
  errors,
  fieldName,
}: InputControllerProps) => {
  const font = getFonts();
  const getTitle = () => {
    switch (fieldName) {
      case "amount":
        return "Số tiền chuyển";
      case "day":
        return "Ngày";
      case "time":
        return "Giờ";
      case "message":
        return "Lời nhắn";
      default:
        break;
    }
  };

  return (
    <View style={{ marginBottom: 8 }}>
      <View>
        <Text style={{ fontFamily: font?.regular400 }}>{getTitle()}</Text>
      </View>
      <Controller
        control={control}
        // rules={
        //   {
        //     required: `Vui lòng nhập ${handleMessage()}`,
        //   }
        // }
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            editable={
              true
            }
            selectTextOnFocus={true}
            style={styles.input}
            placeholderTextColor={"white"}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={fieldName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    width: "100%",
    marginBottom: 65,
  },
  input: {
    color: "red",
    width: "100%",
    textAlign: "left",
    fontSize: 16,
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
  },
  disableInput: {
    color: "red",
    width: "100%",
    textAlign: "left",
    backgroundColor: "#ccc",
    fontSize: 16,
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
  },
  // inputErrors: {
  //   color: "white",
  //   width: "100%",
  //   textAlign: "left",
  //   fontSize: 18,
  //   borderColor: "red",
  //   borderBottomWidth: 1,
  //   padding: 10,
  // },
});

export default InputController;
