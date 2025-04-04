import { useEffect } from 'react';
import {useFonts} from 'expo-font'
import Navigator from './src/navigation/Navigator';
import { Provider } from 'react-redux';
import store from './src/store'
import { sqliteDB } from "./src/persistence";

export default function App() {

   // inicializar base de session
   const { initSQLiteDB } = sqliteDB();
   
   useEffect(() => {
    initSQLiteDB();
   }, []);


  const [fontsLoaded, fontError] = useFonts({
    Josefin: require("./assets/fonts/JosefinSans-Regular.ttf"),
  })

  if(!fontsLoaded || fontError) {
    return null;
  }

  if(fontsLoaded && !fontError) {
    return (
      <Provider store={store}>  
        <Navigator />
      </Provider>
    );
  }
}