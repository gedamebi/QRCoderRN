import React from "react";
import Eventos from "../screens/Eventos";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const EventosStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Eventos"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Eventos" component={Eventos} />
    </Stack.Navigator>
  );
};

export default EventosStack;
