import React, { SetStateAction, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import InputController from "./InputController";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { UserLoginForm, UserRegisterForm } from "../../types/User.type";
import * as userThunk from "../../thunk/userThunk";
import { userSelector } from "../../redux/selector";

type FormProps = {
  fields: string[];
  type: string;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
};

const Form = ({ fields, type, setLoading }: FormProps) => {
  const dispatch: AppDispatch = useDispatch();

  // Form
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setLoading(true);
    if (type === "register") {
      console.log("register");
      register(data);
    } else {
      console.log("login");
      login(data);
    }
  };
  const loginResponse = useSelector(userSelector).loginResponse;

  useEffect(() => {
    if(!loginResponse) return;
    setValue('phone', '');
    setValue('password', '');
  },[loginResponse])

  const register = (data: UserRegisterForm) => {
    setTimeout(() => {
      dispatch(userThunk.register(data));
    }, 3000);
  };

  const login = (data: UserLoginForm) => {
    setTimeout(() => {
      dispatch(userThunk.login(data));
    }, 3000);
  };

  const title = type === "login" ? "Đăng nhập" : "Đăng kí";

  return (
    <View style={styles.formContain}>
      <View>
        <Text style={type === "login" ? styles.titleLogin : styles.title}>
          {title}
        </Text>
      </View>
      <View style={{ marginTop: 16}}>
        {fields.map((field) => {
          return (
            <InputController
              key={field}
              field={field}
              errors={errors}
              control={control}
              type={type}
            />
          );
        })}
      </View>
      <TouchableOpacity
        activeOpacity={0}
        onPress={handleSubmit(onSubmit)}
        style={type === "login" ? styles.buttonLogin : styles.button}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1F2DEC",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logo: {
    marginBottom: 50,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 40,
  },
  titleLogin: {
    opacity: 0,
  },
  formContain: {
    width: "100%",
    paddingHorizontal: 16,
  },
  button: {
    padding: 13,
    width: "100%",
    backgroundColor: "#66C5FD",
    borderRadius: 500,
    marginBottom: 50,
    // borderWidth: 1,
    // opacity: 0
  },
  buttonLogin: {
    padding: 13,
    width: "100%",
    backgroundColor: "#66C5FD",
    borderRadius: 500,
    marginBottom: 22,
    borderWidth: 1,
    marginTop: -12,
    opacity: 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Form;
