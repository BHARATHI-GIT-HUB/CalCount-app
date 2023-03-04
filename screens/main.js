import { StyleSheet, Text, View } from "react-native";
import { Avatar, HStack, NativeBaseProvider, Box } from "native-base";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebase";

const Main = () => {
  const [userdata, setUserData] = useState({});

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      db.ref("users/" + user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserData(userData);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <SafeAreaView>
      <View className="flex justify-start items-start gap-10">
        <View className="p-6">
          <HStack
            justifyContent="start"
            space={2}
            className=" flex justify-start items-start gap-3"
          >
            <Avatar
              bg="green.500"
              width="20"
              height="20"
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            >
              AJ
            </Avatar>
            <View className="flex flex-col justify-start items-start gap-1">
              <Text className="text-2xl font-normal text-[#514885]">
                Welcom to Calcount
              </Text>
              <Text className="text-xl font-normal">
                {" "}
                @{userdata.displayName}
              </Text>
            </View>
          </HStack>
        </View>
        <View className="w-96 h-64 rounded-lg bg-[#9796FF] opacity-[.5px] self-center flex justify-start items-start p-3 gap-4 ">
          <View>
            <Text className="text-xl font-semibold text-black">
              Your Daily calorie Intake
            </Text>
          </View>
          <View className="flex justify-start items-end gap-4 ">
            <Text className="text-[18px] font-bold text-[#160b55]">
              Your Maintanice :{userdata.result}
            </Text>
            <Text className="text-[18px] font-bold text-[#160b55]">
              Your Surplus : {userdata.result + 200}
            </Text>
            <Text className=" text-[18px] font-bold text-[#160b55]">
              Your Defecet : {userdata.result - 200}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
      <Box minH="100%" bg="white">
        <Main />
      </Box>
    </NativeBaseProvider>
  );
};
