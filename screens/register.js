import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { NativeBaseProvider, Box, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../firebase";
import firestore from "firebase/compat/firestore";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");

  const handleRegister = () => {
    console.log(password);
    if (password == cPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCrentials) => {
          const user = userCrentials.user;

          db.ref("users/" + user.uid).set({
            displayName: name,
            email: user.email,
            password: password,
          });
        })
        .catch((error) => {
          alert(error);
        });
      navigation.navigate("SignIn");
    } else {
      alert("password is not Matching");
    }
  };

  const navigation = useNavigation();

  return (
    <View className="flex justify-start items-center w-full h-full gap-6">
      <View className="flex justify-center items-end w-full p-5">
        <Button
          // color="white"
          className="border-emerald-50 "
          onPress={() => {
            navigation.navigate("SignIn");
          }}
          padding="2"
          width="20"
          bgColor="transparent"
          borderWidth="2"
          borderRadius="5"
        >
          LOG IN
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
      <View className="flex flex-col justify-start items-start gap-5">
        <View>
          <Text className="text-lg font-normal text-[#A5A1C4]">Name</Text>
          <TextInput
            className="text-lg text-white border-b-2 border-[#A5A1C4] pb-1 w-80 h-8"
            placeholder="Name"
            onChangeText={(text) => setName(text)}
          />
        </View>
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

        <View>
          <Text className="text-lg font-normal text-[#A5A1C4]">
            Confrim Password
          </Text>
          <TextInput
            className="text-lg text-white border-b-2 border-[#A5A1C4] pb-1 w-80 mb-5 h-8"
            onChangeText={(text) => setCpassword(text)}
          />
        </View>
      </View>
      <Button
        onPress={handleRegister}
        className="border-emerald-50 "
        padding="2"
        width="32"
        bgColor="transparent"
        borderColor="whi"
        borderWidth="2"
        borderRadius="9"
      >
        Register
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
        <Register />
      </Box>
    </NativeBaseProvider>
  );
};
