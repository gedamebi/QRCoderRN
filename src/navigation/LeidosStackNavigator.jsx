import React from "react";
import QRIngresados from "../screens/QRIngresados";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const LeidosStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="QRIngresados"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="QRIngresados" component={QRIngresados} />
    </Stack.Navigator>
  );
};

export default LeidosStack;
