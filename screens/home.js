import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { useCallback, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  NativeBaseProvider,
  Box,
  Center,
  Heading,
  VStack,
  FormControl,
  Button,
  Input,
  Link,
  HStack,
} from "native-base";
import { Modal } from "native-base";
import { auth } from "../firebase";

import Arrow from "../assets/icons/arrow.svg";

const App = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    LeckerliOne: require("../assets/fonts/LeckerliOne-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View className="flex-1 justify-around items-center ">
      <View className="flex flex-col justify-center items-center gap-1">
        <Text
          style={{ fontFamily: "LeckerliOne", fontSize: 60 }}
          className="text-[#F2F2FF]"
        >
          CalCount
        </Text>
        <Text className="text-[#F2F2FF] text-lg px-20 text-center font-normal">
          This app will help you to Find Your Daily Kcal Intake
        </Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text className="text-[#F2F2FF] text-lg">Get Started </Text>
      </TouchableOpacity>
    </View>
  );
};

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

export default () => {
  return (
    <NativeBaseProvider config={config}>
      <Box
        minH="100%"
        bg={{
          linearGradient: {
            colors: ["#7B6EB2", "#7869AC", "#594E8D", "#29275D"],
            start: [0.52, 0],
            end: [0, 0.41],
          },
        }}
      >
        <App />
      </Box>
    </NativeBaseProvider>
  );
};
