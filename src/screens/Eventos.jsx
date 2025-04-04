import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useMemo } from "react";
import { colors } from '../global/color';
import { useSelector } from 'react-redux';
import { useGetEventosQuery } from '../services/eventosService';

const Eventos = ({navigation}) => {

  const {data: eventos, isLoading, error} = useGetEventosQuery();
  
  const darkMode = useSelector((state) => state.theme.darkMode);
  //Usamos useMemo para que los estilos se regeneren cuando `darkMode` cambie
  const styles = useMemo(() => StyleSheet.create(dynamicStyles(darkMode)), [darkMode]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors[darkMode].TextoPrimario} />
        <Text style={styles.loadingText}>Cargando eventos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>Ocurrió un error al cargar los eventos</Text>
      </View>
    );
  }

  return (
    <View style={styles.EventosContainer}>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.TextEventos}>{item.nombre}</Text>
            <Text style={styles.TextEventos}>Fecha de evento: {item.fecha}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default Eventos

const dynamicStyles = (darkMode) => ({
  EventosContainer: {
    width: '100%',
    backgroundColor: colors[darkMode].FondoPrincipal,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  loaderContainer: {
    backgroundColor: colors[darkMode].FondoPrincipal,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: colors[darkMode].TextoPrimario,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  eventItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  TextEventos: {
    color: colors[darkMode].TextoPrimario,
    fontSize: 14
  },
})
