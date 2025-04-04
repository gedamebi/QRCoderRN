import { useEffect, useMemo  } from 'react';
import { StyleSheet } from 'react-native'
import { NavigationContainer  } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStack from "./AuthStack";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from '../global/color';
import { loadThemeFromDB } from "../features/theme/ThemeSlice";
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from "../features/user/UserSlice";

import Config from "../screens/Config";
import Ayuda from "../screens/Ayuda";

const Drawer = createDrawerNavigator();

const Navigator = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadThemeFromDB());
  }, []);

  const {user} = useSelector(state => state.auth.value)

  const darkMode = useSelector((state) => state.theme.darkMode);
  // Usamos useMemo para que los estilos se regeneren cuando `darkMode` cambie
  const styles = useMemo(() => StyleSheet.create(dynamicStyles(darkMode)), [darkMode]);

  // Función para manejar el logout
  const handleLogout = () => {
    // Despachar la acción para limpiar el estado del usuario
    dispatch(clearUser());
  };

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator 
          initialRouteName="Principal"
          screenOptions={{
            drawerStyle: styles.drawer, // Estilos del drawer
            drawerLabelStyle: styles.drawerLabel, // Estilos del texto de los items
            drawerActiveTintColor: colors[darkMode].TextoSecundario, // Color del texto activo
            drawerActiveBackgroundColor: colors[darkMode].FondoCuaternario, // Color de fondo del item activo
            drawerInactiveTintColor: colors[darkMode].TextoPrimario, // Color del texto inactivo
            headerStyle: styles.header, // Estilos del header
            headerTintColor: colors[darkMode].TextoPrimario, // Color del texto del header
          }}
        >
          <Drawer.Screen 
            name="Principal" 
            options={{
              drawerIcon: ({ color, size }) => <Feather name="camera" size={size} color={color} />,
            }}
          >
            {({ navigation }) => (
              <BottomTabNavigator navigation={navigation} />
            )}
          </Drawer.Screen>

          <Drawer.Screen
            name="Configuracion"
            component={Config}
            options={{
              drawerIcon: ({ color, size }) => (
                <Feather name="settings" size={size} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="Ayuda"
            component={Ayuda}
            options={{
              drawerIcon: ({ color, size }) => (
                <Feather name="help-circle" size={size} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="Cerrar sesion"
            component={Ayuda}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="logout" size={size} color={color} />
              ),
            }}
            listeners={{
              focus: () => {
                handleLogout();
              },
            }}
          />
        </Drawer.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Navigator;

const dynamicStyles = (darkMode) => ({
  drawer: {
    backgroundColor: colors[darkMode].FondoTerciario,
    width: 250,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    backgroundColor: colors[darkMode].FondoSecundario,
  },
});