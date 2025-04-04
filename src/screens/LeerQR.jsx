import React, { useState, useEffect, useMemo } from "react";
import { Text, View, StyleSheet, Button, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { useSelector } from 'react-redux';

const LeerQR = () => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState("");
  const [facing, setFacing] = useState('back');

  const [loading, setLoading] = useState(false); // Estado para manejar la carga de la API
  const [apiResponse, setApiResponse] = useState(null); // Estado para almacenar la respuesta de la API
  const [error, setError] = useState(null); // Estado para almacenar los errores

  const darkMode = useSelector((state) => state.theme.darkMode);
  // Usamos useMemo para que los estilos se regeneren cuando `darkMode` cambie
  const styles = useMemo(() => StyleSheet.create(dynamicStyles(darkMode)), [darkMode]);

  const token = useSelector((state) => state.auth.value.token);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = async ({ type, data }) => {
    setScanned(true);
    setQrData(data); // Guardamos el contenido del QR escaneado
    await callApiWithQrData(data); // Llamamos a la API con el contenido del QR
  };

  const handleButtonPress = () => {
    setScanned(false);
    setApiResponse(null);
    setError(null);
  };

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // Función para hacer la llamada a la API
  const callApiWithQrData = async (data) => {
    setLoading(true); // Activamos el estado de carga

    try {
      // Realizamos la solicitud HTTP, puedes modificar la URL según tu API
      const response = await fetch('https://vending.smartmarket.com.uy/garrison/api/qrIngreso.php', {
        method: 'POST', // Puedes usar GET o POST según tu API
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ qrContent: data }), // Usamos los datos del QR como parte del cuerpo
      });

      const result = await response.json();
      setApiResponse(result); // Guardamos la respuesta de la API
      setLoading(false); // Desactivamos el estado de carga
    } catch (error) { // Imprimimos el error en la consola
      setError(error.message); // Guardamos el mensaje de error si ocurre un problema
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permisos de camara</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se puede acceder a la camara</Text>;
  }

  // Lógica para cambiar el estilo según la respuesta de la API
  const containerStyle = apiResponse?.status === 'success' ? styles.successContainer : styles.errorContainer;
  const textStyle = apiResponse?.status === 'success' ? styles.successText : styles.errorText;
  // Usamos el color que viene de la API, y si no existe, usamos un color predeterminado
  const backgroundColor = apiResponse?.color || 'red'; 

  return (
    <View style={[styles.container, { backgroundColor: apiResponse?.color || '#3f424a' }]}>
      <View style={styles.logoContainer}>
                <Image 
                  source={require('../../assets/logo.png')} // Ruta de tu logo en el proyecto local
                  style={styles.logo} 
                />
              </View>
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          facing={facing} // Controlamos la cámara frontal o trasera
          style={styles.camera}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text2}></Text>
            </TouchableOpacity>
          </View>  
        </CameraView>
      </View>
      
      {scanned && (
        <Button title={"Volve a escanear"} onPress={() => handleButtonPress()} />
      )}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      {apiResponse && (
        <View style={styles.apiResponseContainer}>
          {/* Condicionalmente mostrar texto basado en el status */}
          {apiResponse.status === 'success' ? (
            <>
              <Text style={[styles.text, textStyle]}>Estado: {apiResponse.msj}</Text>
              <Text style={[styles.text, textStyle]}>Nombre: {apiResponse.nombre}</Text>
              <Text style={[styles.text, textStyle]}>Correo: {apiResponse.correo}</Text>
              <Text style={[styles.text, textStyle]}>Sector: {apiResponse.sector}</Text>
            </>
          ) : apiResponse.status === 'error' ? (
            <>
              <Text style={[styles.text, textStyle]}>Error Message: {apiResponse.message}</Text>
            </>
          ) : apiResponse.status === 'successNo' ? (
            <>
              <Text style={[styles.text, textStyle]}>Error Message: Codigo no encontrado</Text>
            </>
          ) : (
            <Text style={[styles.text, textStyle]}>Esperando respuesta...</Text>
          )}
        </View>
      )}

      <View style={styles.resultContainer}>
        <Text style={styles.qrText}>
          {scanned ? null : "Escaneando QR ..."}
        </Text>
      </View>
    </View>
  )
}

export default LeerQR

const dynamicStyles = (darkMode) => ({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#3f424a",
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  cameraContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#000",
    marginBottom: 5,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
  },
  resultContainer: {
    padding: 20,
    alignItems: "center",
  },
  qrText: {
    fontSize: 18,
    textAlign: "center",
  },
  apiResponseContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "red"
  },
  text : {
    color: "white",
  },
  text2:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    height: '100%',
    width: '100%',
  },
  errorText: {
    color: "red",
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
})
