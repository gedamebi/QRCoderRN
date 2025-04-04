import { StyleSheet, View } from 'react-native'
import React, { useMemo } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { colors } from '../global/color';
import { useSelector } from 'react-redux';
import LeerQRStackNavigator from './LeerQRStackNavigator'
import LeidosStackNavigator from './LeidosStackNavigator'
import EventosStackNavigator from './EventosStackNavigator';

const Tab = createBottomTabNavigator();
import Header from '../components/Header'

const BottomTabNavigator = () => {

  const darkMode = useSelector((state) => state.theme.darkMode);
  // Usamos useMemo para que los estilos se regeneren cuando `darkMode` cambie
  const styles = useMemo(() => StyleSheet.create(dynamicStyles(darkMode)), [darkMode]);

  const iconColor = useMemo(() => ({
    active: darkMode ? "white" : "black",
    inactive: darkMode ? "black" : "gray"
  }), [darkMode]);


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => {
          return <Header route={route} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="Escanear codigo QR"
        component={LeerQRStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="camera"
                  size={30}
                  color={focused ? iconColor.active : iconColor.inactive}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Personas ingresadas"
        component={LeidosStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <AntDesign
                  name="qrcode"
                  size={30}
                  color={focused ? iconColor.active : iconColor.inactive}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Eventos Activos"
        component={EventosStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <MaterialIcons
                  name="event-available"
                  size={30}
                  color={focused ? iconColor.active : iconColor.inactive}
                />
              </View>
            );
          },
        }}
      />

    </Tab.Navigator>
  );
}

export default BottomTabNavigator

const dynamicStyles = (darkMode) => ({
  tabBar: {
    backgroundColor: colors[darkMode].FondoSecundario,
    shadowColor: "black",
    elevation: 4,
    height: 60,
    paddingTop: 10,
  },
});
