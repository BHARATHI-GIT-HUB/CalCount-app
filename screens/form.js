import React from "react";
import { useState } from "react";
import styles from "./style";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";

export default function Form({ navigation }) {
  const [pressedType, setPressedType] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setgender] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeigth] = useState(0);
  const [activity, setActivity] = useState(0);
  const [result, setResult] = useState(0);

  const cal = (weight, height, age) => {
    setResult(66.5 + 13.75 * weight + 5.003 * height - 6.75 * age);
    console.log("clicked");
  };
  return (
    <KeyboardAvoidingView
      style={styles.containerView}
      behavior="padding"
      className="bg-[#514885] flex-1 justify-center items-center pt-32"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text
              style={{ fontFamily: "LeckerliOne", fontSize: 60 }}
              className="text-[#F2F2FF]"
            >
              CalCount
            </Text>
            <TextInput
              placeholder="Name"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              placeholder="Height"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={(text) => setHeight(text)}
            />
            <TextInput
              placeholder="Weight"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={(text) => setWeigth(text)}
            />
            <TextInput
              placeholder="Age"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={(text) => setAge(text)}
            />
            <TextInput
              placeholder="Gender"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={(text) => setgender(text)}
            />
            <TextInput
              placeholder="Activity"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={(text) => setActivity(text)}
            />
            <TouchableOpacity
              onPress={() => {
                console.log();
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Modals", {
                    result: result,
                    name,
                  });
                  cal(weight, height, age);
                }}
              >
                <Text className="text-[#F2F2FF] text-xl text-center mt-14">
                  Modal{" "}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
