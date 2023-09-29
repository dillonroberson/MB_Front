import React, { useEffect, useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { getFonts } from "../../hooks/getFonts";
import { Entypo } from "@expo/vector-icons";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { FormExchange } from "../../screens/Exchange";


interface SelectControllerProps {
  data: any[];
  title: string;
  content: string;
  field: "senderId" | "bankId" | "receiverNumber" | "amount" | "message";
  control: Control<FormExchange> | undefined;
  errors: FieldErrors<FormExchange>;
  resetState?: boolean;
}

const SelectController = ({
  data,
  title,
  content,
  field,
  control,
  resetState,
}: SelectControllerProps) => {
  const font = getFonts();

  const renderRowChild = (item: any) => {
    return (
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View>
          <Text style={{ fontFamily: font?.regular400 }}>{title}</Text>
          <Text style={{ fontFamily: font?.medium500 }}>{content}</Text>
        </View>
      </View>
    );
  };

  const renderButtonChild = (selectedItem: any) => {
    return (
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View>
            <Image
              style={{ width: 50, height: 50, objectFit: "contain" }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/bank-icon%2FLogo_MB_new.png?alt=media&token=c920e3f1-9cd3-4ee0-8f1b-b9b14c183247",
              }}
            ></Image>
          </View>
          <View>
            <Text style={{ fontFamily: font?.regular400}}>
              {title}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 5
              }}
            >
              <Text style={{ fontFamily: font?.medium500, fontSize: 20 }}>
                {content}
              </Text>
              <Text
                style={{
                  fontFamily: font?.medium500,
                  fontSize: 16,
                  color: "#B1B1B1",
                  marginBottom: 2
                }}
              >
                VND
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Entypo name="chevron-down" size={24} color="black" />
        </View>
      </View>
    );
  };

  const dropdownRef = useRef<SelectDropdown>(null);

  useEffect(() => {
    if (!resetState) return;
    dropdownRef?.current?.reset();
  }, [resetState]);

  return (
    <View>
      <Controller
        rules={{ required: true }}
        control={control}
        name={field}
        defaultValue={field === "senderId" ? "1" : ""}
        render={({ field: { onChange, onBlur, value } }) => (
          <SelectDropdown
            onBlur={onBlur}
            data={data}
            rowStyle={{
              height: 60,
            }}
            ref={dropdownRef}
            dropdownStyle={{
              position: "absolute",
              top: 0,
              flex: 1,
            }}
            dropdownOverlayColor="none"
            renderCustomizedButtonChild={(selectedItem) =>
              renderButtonChild(selectedItem)
            }
            renderCustomizedRowChild={(item) => renderRowChild(item)}
            buttonStyle={styles.button}
            onSelect={(selectedItem, index) => {
              onChange(selectedItem.id);
              value = selectedItem.id.toString();
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item.name;
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 75,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

export default SelectController;
