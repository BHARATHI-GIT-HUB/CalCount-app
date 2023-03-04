import { useState } from "react";
import { Button, FormControl } from "react-native";
import { Modal } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import Form from "./screens/form";
import Main from "./screens/main";
import Details from "./screens/details";
import Register from "./screens/register";
import SingnIn from "./screens/signIn";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="SignIn" component={SingnIn} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
