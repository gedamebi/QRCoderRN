import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { colors } from '../global/color';
import { useSelector } from 'react-redux';
import Logo from '../components/Logo';
import { FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';

const Ayuda = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const styles = useMemo(() => StyleSheet.create(dynamicStyles(darkMode)), [darkMode]);

  return (
    <View style={styles.HelpContainer}>
      <View style={styles.Content}>
        <Logo width={100} height={100} />
        <Text style={styles.TextTitle}>Control de Ingreso</Text>
        <Text style={styles.TextSubTitle}>1. Pantalla Principal</Text>
        <Text style={styles.TextSubTitle2}>
          En esta pantalla podras acceder a las siguientes opciones:
        </Text>
        <Text style={styles.TextHelp}>
          <FontAwesome5
            name="camera"
            size={15}
            color={darkMode === 0 ? 'black' : 'white'}
          />{' '}
          Leer QR: Esta opcion te permite escanear un QR para ingresar a un evento.
        </Text>
        <Text style={styles.TextHelp}>
          <AntDesign
            name="qrcode"
            size={15}
            color={darkMode === 0 ? 'black' : 'white'}
          />{' '}
          Codigos ingresados: Esta opcion podras ver los QR escaneados en el evento.
        </Text>
        <Text style={styles.TextHelp}>
          <MaterialIcons
            name="event-available"
            size={15}
            color={darkMode === 0 ? 'black' : 'white'}
          />{' '}
          Eventos activos: Esta opcion podras ver informacion sobre eventos activos.
        </Text>
        <Text style={styles.TextSubTitle}>2. Configuracion</Text>
        <Text style={styles.TextSubTitle2}>
          En esta pantalla podras setear modo oscuro o modo claro de la App
        </Text>
        <Text style={styles.TextSubTitle}>3. Ayuda</Text>
        <Text style={styles.TextSubTitle2}>Pantalla de ayuda sobre la App</Text>
      </View>

      <View style={styles.Footer}>
        <AntDesign name="copyright" size={15} color={darkMode === 0 ? 'black' : 'white'} />
        <Text style={styles.TextDerechos}>
          {' '}
          2025 - Todos los derechos reservados - German Medina
        </Text>
      </View>
    </View>
  );
};

export default Ayuda;

const dynamicStyles = (darkMode) => ({
  HelpContainer: {
    flex: 1,
    backgroundColor: colors[darkMode].FondoPrincipal,
    padding: 10,
  },
  Content: {
    flexGrow: 1,
  },
  TextTitle: {
    color: colors[darkMode].TextoPrimario,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TextSubTitle: {
    color: colors[darkMode].TextoPrimario,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  TextSubTitle2: {
    color: colors[darkMode].TextoPrimario,
    fontSize: 12,
    paddingLeft: 10,
    marginBottom: 10,
  },
  TextHelp: {
    color: colors[darkMode].TextoPrimario,
    fontSize: 12,
    paddingLeft: 10,
    marginBottom: 5,
  },
  Footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  TextDerechos: {
    color: colors[darkMode].TextoPrimario,
    fontSize: 12,
  },
});
