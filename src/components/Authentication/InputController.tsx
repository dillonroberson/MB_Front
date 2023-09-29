import React from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { Text, TextInput, StyleSheet, View } from "react-native";
import { REGEX_EMAIL, REGEX_PASSWORD, REGEX_PHONE } from "../../constant/Regex";

type InputControllerProps = {
  control: Control<FieldValues> | undefined;
  errors: FieldErrors<FieldValues>;
  field: string;
  type: string;
};

const InputController = ({
  control,
  errors,
  field,
  type,
}: InputControllerProps) => {
  const returnRulePattern = () => {
    switch (field) {
      case "email":
        return REGEX_EMAIL;
      case "phone":
        return REGEX_PHONE;
      case "password":
        return REGEX_PASSWORD;
      default:
        return /^.+$/;
    }
  };

  const handleErrors = () => {
    switch (field) {
      case "name":
        return errors.name;
      case "email":
        return errors.email;
      case "phone":
        return errors.phone;
      case "password":
        return errors.password;
      default:
        break;
    }
  };

  const handleMessage = (): string | undefined => {
    switch (field) {
      case "name":
        return "tên";
      case "email":
        return "email";
      case "phone":
        return "điện thoại";
      case "password":
        return "mật khẩu";
    }
  };

  const handleMessageLogin = () => {
    switch (field) {
      case "phone":
        return "Tên đăng nhập";
      case "password":
        return "Mật khẩu";
    }
  }

  const handleErrorMessage = () => {
    if (field === "password") {
      return "Password không đúng định dạng! Yêu cầu: Trên 6 kí tự, có ít nhất 1 kí tự viết hoa và 1 kí tự đặc biệt";
    }
    return `${upperCaseFirstLetter(handleMessage())} không đúng định dạng!`;
  };

  const upperCaseFirstLetter = (string: string | undefined) => {
    if (!string) return;
    return string[0].toUpperCase() + string.slice(1);
  };
  return (
    <View style={styles.contain}>
      <Controller
        control={control}
        rules={{
          required: `Vui lòng nhập ${handleMessage()}`,
          pattern: {
            value: returnRulePattern(),
            message: handleErrorMessage(),
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={
              handleErrors() ? styles.inputErrors : styles.input
            }
            placeholder={
              type !== "login" ? upperCaseFirstLetter(handleMessage()) : handleMessageLogin()
            }
            placeholderTextColor={handleErrors() ? "red" : "white"}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={field === "password" ? true : false}
            keyboardType={field === "phone" ? "numeric" : "default"}
          />
        )}
        name={field}
      />
      {type !== "login" && handleErrors()?.message && (
        <Text style={{ color: "red", marginTop: 8 }}>
          {handleErrors()?.message?.toString()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    width: "100%",
    marginBottom: 65,
  },
  input: {
    color: "white",
    width: "100%",
    textAlign: "left",
    fontSize: 18,
    borderColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
  },
  inputLogin: {
    color: "white",
    width: "100%",
    textAlign: "left",
    fontSize: 18,
    borderColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
  },
  inputErrors: {
    color: "white",
    width: "100%",
    textAlign: "left",
    fontSize: 18,
    borderColor: "red",
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default InputController;
