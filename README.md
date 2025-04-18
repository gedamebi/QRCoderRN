# Control de Ingreso App Garrison

GarrisonQR es una aplicación desarrollada en React Native utilizando Expo, su desarrollo fue pensando en controlar los ingresos a eventos que se organizan a travez de un lector de codigo QR.

## Características

- **Lectura de codigos:** Escanea codigos QR a medida que van ingresando personas al evento, dinamisa el color de fondo segun el sector que corresponda
- **Visualizacion de codigos escaneado:** Permite listar codigos que van ingresando mostrando fecha/hora y sector
- **Autenticación:** Login controlado mediante Firebase (correo/contraseña).
- **Integracion con Backend:** La informacion de los QR es cargada desde un backend..


## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/gedamebi/QRCoderRN.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd QRCoderRN
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```
4. Inicia la aplicación:
    ```sh
    npm run start
    ```

## Tecnologias incluidas

<p align="center"> 
    <a href="https://es.react.dev/" target="_blank"> <img src="https://raw.githubusercontent.com/gedamebi/QRCoderRN/refs/heads/main/assets/tecnologias/react-native-logo.png" alt="React" width="90" height="90"/></a>
    <a href="https://es.react.dev/" target="_blank"> <img src="https://raw.githubusercontent.com/gedamebi/QRCoderRN/refs/heads/main/assets/tecnologias/expo.svg" alt="React" width="90" height="90"/></a>
    <a href="https://firebase.google.com/docs" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-original.svg" alt="firbase" width="90" height="90"/></a>
</p>
<br>
<p align="center"> 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="Javascript" width="90" height="90"/></a> 
    <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="90" height="90"/></a>
    <a href="https://www.npmjs.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg" alt="npm" width="90" height="90"/></a>
</p>


## Dependencias

Dependencias incluidas en el proyecto:

- [@expo/metro-runtime](https://www.npmjs.com/package/@expo/metro-runtime)
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/) Iconos en navegaciones
- [@react-navigation/bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator/)  Navegacion Tab Bottom
- [@react-navigation/drawer](https://reactnavigation.org/docs/drawer-based-navigation/)   Navegacion panel lateral
- [@react-navigation/native](https://reactnavigation.org/docs/getting-started)
- [@react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator/)
- [@reduxjs/toolkit](https://redux-toolkit.js.org/)
- [expo](https://expo.dev/)
- [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/) libreria para trabajar con la camara, y usamos sus props barcodeScannerSettings y onBarcodeScanned para obtener los codigos QR 
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) libreria para trabajar con SQLite, la usamos solo para guardar el tema de la aplicacion claro u oscuro
- [expo-status-bar](https://docs.expo.dev/versions/latest/sdk/status-bar/)
- [react](https://es.react.dev/)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [react-native](https://reactnative.dev/)
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [react-native-safe-area-context](https://www.npmjs.com/package/react-native-safe-area-context)
- [react-native-screens](https://docs.swmansion.com/react-native-screens/)
- [react-native-vector-icons](https://oblador.github.io/react-native-vector-icons/)
- [react-native-web](https://necolas.github.io/react-native-web/)
- [react-redux](https://react-redux.js.org/)

## Capturas de Pantalla
<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/gedamebi/QRCoderRN/refs/heads/main/assets/tecnologias/screenshot/01.jpg" width="200"></td>
    <td><img src="https://raw.githubusercontent.com/gedamebi/QRCoderRN/refs/heads/main/assets/tecnologias/screenshot/02.jpg" width="200"></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/gedamebi/QRCoderRN/refs/heads/main/assets/tecnologias/screenshot/03.jpg" width="200"></td>
    <td><img src="https://raw.githubusercontent.com/gedamebi/QRCoderRN/refs/heads/main/assets/tecnologias/screenshot/04.jpg" width="200"></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/gedamebi/QRCoderRN/refs/heads/main/assets/tecnologias/screenshot/05.jpg" width="200"></td>
    <td><img src="https://raw.githubusercontent.com/gedamebi/QRCoderRN/refs/heads/main/assets/tecnologias/screenshot/06.jpg" width="200"></td>
  </tr>
</table>