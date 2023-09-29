import AsyncStorage from "@react-native-async-storage/async-storage";

export const setStoreData = async (value: string, name: string) => {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const getStorageData = async (name: string) => {
  try {
    let res = await AsyncStorage.getItem(name)
    return res;
  } catch (e) {
    // saving error
    console.log(e);
  }
}


