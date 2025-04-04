import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LeerQR from "../screens/LeerQR";

const Stack = createNativeStackNavigator();

const LeerQRStackNavigator = () => {
  return (
      <Stack.Navigator 
        initialRouteName="LeerQR" 
        screenOptions={{
          headerShown: false
        }}
        >
        <Stack.Screen component={LeerQR} name="LeerQR" />
      </Stack.Navigator>
  );
};

export default LeerQRStackNavigator;
