import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import { useState, useEffect } from "react";
import { NativeBaseProvider, Box, Button, Radio, Select } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { auth, db } from "../firebase";
import { collection, getDoc } from "firebase/firestore";

const Main = () => {
  const [userdata, setUserData] = useState({});
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("Male");
  const [activity, setActivity] = useState("");
  const [result, setResult] = useState(0);

  const navigation = useNavigation();

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

  const submitHandler = () => {
    if (gender == "Male") {
      setResult(66.5 + 13.75 * weight + 5.003 * height - 6.75 * age);
    } else {
      setResult(66.5 + 13.75 * weight + 5.003 * height - 6.75 * age - 100);
    }

    const user = auth.currentUser;

    if (user) {
      db.ref("users/" + user.uid).update({
        height,
        weight,
        age,
        gender,
        result,
      });
    }
    navigation.navigate("Main");
  };

  return (
    <View className="flex justify-start items-center w-full h-full gap-5 ">
      <View className="flex justify-center items-end w-full p-5">
        <Button
          className="border-emerald-50 "
          onPress={() => {
            auth.signOut();
            navigation.navigate("SignIn");
          }}
          padding="2"
          width="32"
          bgColor="transparent"
          borderColor="whi"
          borderWidth="2"
          borderRadius="5"
        >
          LOG OUT
        </Button>
      </View>
      <View className="flex justify-center items-center w-full ">
        <Text className="text-3xl font-medium text-white">
          Enter your details {userdata.displayName}!
        </Text>
      </View>
      <View className="flex flex-col justify-start items-start gap-8">
        <View>
          <Text className="text-lg font-normal text-[#A5A1C4]">Height</Text>
          <TextInput
            className="text-lg text-white border-b-2 border-[#A5A1C4] pb-1 w-80 h-8"
            placeholderTextColor="#A5A1C4"
            placeholder="                                                               cm"
            onChangeText={(text) => setHeight(text)}
          />
        </View>
        <View>
          <Text className="text-lg font-normal text-[#A5A1C4]">Weight</Text>
          <TextInput
            className="text-lg text-white border-b-2 border-[#A5A1C4] pb-1 w-80 h-8"
            placeholderTextColor="#A5A1C4"
            placeholder="                                                               kg"
            onChangeText={(text) => setWeight(text)}
          />
        </View>
        <View>
          <Text className="text-lg font-normal text-[#A5A1C4]">Age</Text>
          <TextInput
            className="text-lg text-white border-b-2 border-[#A5A1C4] pb-1 w-80 h-8"
            onChangeText={(text) => setAge(text)}
            keyboardType="number-pad"
          />
        </View>
        <View>
          <Text className="text-lg font-normal text-[#A5A1C4] mb-2">
            Gender
          </Text>

          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            // gender={value}
            value={gender}
            onChange={(gender) => {
              setGender(gender);
            }}
          >
            <Radio value="Male" my={1}>
              <Text className="text-lg font-normal text-white mb-2">Male</Text>
            </Radio>
            <Radio value="Female" my={1}>
              <Text className="text-lg font-normal text-white mb-2">
                Female
              </Text>
            </Radio>
          </Radio.Group>
        </View>
        <View>
          <Box maxW="300">
            <Select
              selectedValue={activity}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Activity Type"
              color="white"
              size="20"
              borderRadius="3"
              _selectedItem={{
                bg: "teal.600",
                // endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setActivity(itemValue)}
            >
              <Select.Item label="Maintanace" value="M" />
              <Select.Item label="Lose Weight" value="LW" />
              <Select.Item label="Gain Weight" value="GW" />
            </Select>
          </Box>
        </View>
        <Button onPress={submitHandler}>done</Button>
      </View>
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
        <Main />
      </Box>
    </NativeBaseProvider>
  );
};
