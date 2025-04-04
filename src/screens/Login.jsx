import { Alert, StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { colors } from "../global/color";

import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import Logo from '../components/Logo';

import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../services/authService';
import { setUser } from '../features/user/UserSlice';

const Login = ({navigation}) => {

    const dispatch = useDispatch();
    const [triggerSignIn, result] = useSignInMutation()

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    useEffect(()=> {
        if(result.isSuccess){
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId
            })
          )
        } else if (result.isError) {
          Alert.alert('Error', 'Error al iniciar sesión');
        }
    }, [result])


    const onSubmit = () => {
      triggerSignIn({ email, password });
    };

    return (
      <View style={styles.main}>
        <Logo width={200} height={200} />
        <View style={styles.container}>
          <Text style={styles.title}>Inicio de sesión</Text>
          <InputForm label={"usuario"} onChange={setEmail} error={""} />
          <InputForm
            label={"contraseña"}
            onChange={setPassword}
            error={""}
            isSecure={true}
          />
          <SubmitButton onPress={onSubmit} title="Login" />
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.subLink}>Registrar usuario</Text>
          </Pressable>
        </View>
      </View>
    );
}

export default Login

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3f424a",
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "Josefin",
    color: "white"
  },
  sub: {
    fontSize: 14,
    color: "white",
  },
  subLink: {
    fontSize: 14,
    color: "white",
  },
});
