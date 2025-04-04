import { useMemo  } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux';
import { colors } from '../global/color';

const Header = ({route}) => {

  const {height, width} = useWindowDimensions()

  const darkMode = useSelector((state) => state.theme.darkMode);
  // Usamos useMemo para que los estilos se regeneren cuando `darkMode` cambie
  const styles = useMemo(() => StyleSheet.create(dynamicStyles(darkMode)), [darkMode]);

  return (
    <View style={styles.container}>
      <Text style={width > 360 ? styles.text : styles.textSM}>{route.name}</Text>
    </View>
  )
}

export default Header

const dynamicStyles = (darkMode) => ({
  container: {
    backgroundColor: colors[darkMode].FondoPrincipal,
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Josefin",
    fontSize: 16,
    color: colors[darkMode].TextoPrimario,
  },
  textSM: {
    fontFamily: "Josefin",
    fontSize: 16,
    color: colors[darkMode].TextoPrimario,
  },
});
