import { Text, View, TextInput } from "react-native";
import React, { Component, useState, useEffect } from "react";
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

import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../firebase";

const SingnIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.navigate("Home");
  //     }
  //   });
  // }, []);

  const hangleSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCrentials) => {
        const user = userCrentials.user;
        navigation.navigate("Details");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const navigation = useNavigation();
  return (
    <View className="flex justify-start items-center w-full h-full gap-6">
      <View className="flex justify-center items-end w-full p-5">
        <Button
          // color="white"
          className="border-emerald-50 "
          onPress={() => {
            navigation.navigate("Register");
          }}
          padding="2"
          width="20"
          bgColor="transparent"
          borderColor="whi"
          borderWidth="2"
          borderRadius="9"
        >
          Register
        </Button>
      </View>

      <View className="flex justify-center items-center w-full gap-4">
        <Text className="text-3xl font-medium text-white">
          Create Your Account!
        </Text>
        <Text className="text-lg font-medium text-white">
          Enter your details to register
        </Text>
      </View>
      <View className="flex flex-col justify-start items-start gap-8">
        <View>
          <Text className="text-lg font-normal text-[#A5A1C4]">Email</Text>
          <TextInput
            className="text-lg text-white border-b-2 border-[#A5A1C4] pb-1 w-80 h-8"
            placeholderTextColor="#A5A1C4"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View>
          <Text className="text-lg font-normal text-[#A5A1C4]">Password</Text>
          <TextInput
            className="text-lg text-white border-b-2 border-[#A5A1C4] pb-1 w-80 h-8"
            type="password"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>
      <Button
        className="w-[30%]"
        onPress={hangleSignIn}
        bgColor="transparent"
        borderWidth="2"
        border="5"
        borderColor="white"
        borderRadius="9"
      >
        Log In
      </Button>
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
        <SingnIn />
      </Box>
    </NativeBaseProvider>
  );
};
