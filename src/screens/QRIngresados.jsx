import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState, useMemo } from "react";
import { colors } from '../global/color';
import { useSelector } from 'react-redux';

const QRIngresados = ({navigation}) => {

  const [qrIngresador, setQrIngresados] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.value.token);
  
  const obtenerQRIngresados = async (paginaActual) => {
      if (paginaActual > totalPaginas) return;
      setLoading(true);      
      try {
          // Realizamos la solicitud HTTP
          const response = await fetch(`https://vending.smartmarket.com.uy/garrison/api/qrIngresados.php?pagina=${paginaActual}&limite=10`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          });

          const result = await response.json();
          setQrIngresados((prev) => [...new Set([...prev, ...result.qr])]); 
          setTotalPaginas(result.total_paginas);
          setLoading(false);
      } catch (error) {
        Alert.alert('Error', 'Error al obtener lista de ingresados');
      }

      setLoading(false);
  };

  useEffect(() => {
    obtenerQRIngresados(pagina);
  }, [pagina]);


  const cargarMas = () => {
      if (!cargando && pagina < totalPaginas) {
        setPagina(pagina + 1);
      }
  };


  
  const darkMode = useSelector((state) => state.theme.darkMode);
  //Usamos useMemo para que los estilos se regeneren cuando `darkMode` cambie
  const styles = useMemo(() => StyleSheet.create(dynamicStyles(darkMode)), [darkMode]);

  return (
    <View style={styles.QRIngresadosContainer}>
      <FlatList
        data={qrIngresador}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 20, borderBottomWidth: 1, borderColor: "#ccc" }}>
            <Text style={styles.TextQRIngresados}>{item.nombre}</Text>
            <Text style={styles.TextQRIngresados}>Fecha Ingreso: {item.fecha_ingreso}</Text>
          </View>
        )}
        ListFooterComponent={
          <View style={{ padding: 20, alignItems: "center" }}>
            {cargando ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <TouchableOpacity onPress={cargarMas} style={styles.botonCargarMas}>
                <Text style={styles.textoBoton}>Cargar Más</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
</View>
  )
}

export default QRIngresados

const dynamicStyles = (darkMode) => ({
  QRIngresadosContainer: {
    width: '100%',
    backgroundColor: colors[darkMode].FondoPrincipal,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  TextQRIngresados: {
    color: colors[darkMode].TextoPrimario,
    fontSize: 14
  },
  textoBoton: {
    color: colors[darkMode].TextoPrimario,
    fontSize: 16,
  },
})
