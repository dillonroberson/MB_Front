import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export const getFonts = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return {
    medium500: "Poppins_500Medium",
    regular400: "Poppins_400Regular",
    semiBold600: "Poppins_600SemiBold",
    bold700: "Poppins_700Bold",
  };
};
