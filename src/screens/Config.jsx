import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/ThemeSlice";

const Config = () => {

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text style={{ color: darkMode ? "#fff" : "#000" }}>
        Modo {darkMode ? "Oscuro" : "Claro"}
      </Text>
      <Button title="Cambiar Tema" onPress={() => dispatch(toggleTheme())} />
    </View>
  )
}

export default Config

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  light: { 
    backgroundColor: "#fff" 
  },
  dark: { 
    backgroundColor: "#3f424a" 
  },
});
