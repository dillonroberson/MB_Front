import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getStorageData } from "../utils/AsynStorage";
import { findById } from "../thunk/userThunk";
import { useEffect } from "react";
import { userSelector } from "../redux/selector";

export const useCurrentUser = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    getStorageData("current-user")
      .then((res) => {
        if (!res) return;
        dispatch(findById(+res));
      })
      .catch((err) => console.log(err));
  }, []);

  const currentUser = useSelector(userSelector).user;
  return currentUser;
};
