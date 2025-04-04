import { Alert, StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import Logo from '../components/Logo';
import { colors } from "../global/color";

import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/authService';
import { setUser } from '../features/user/UserSlice';
import { signupSchema } from '../validations/signupSchema';

const SignUp = ({navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMail, setErrorMail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('')

  const dispatch = useDispatch();

  const [triggerSignUp, result] = useSignUpMutation()

  useEffect(() => {
    if(result.isSuccess) {
      dispatch( setUser({
        email: result.data.email,
        token: result.data.idToken
      })
    )}
  }, [result])



  const onSubmit = () => {
    try {
      setErrorMail('')
      setErrorPassword('')
      setErrorConfirmPassword('')
      signupSchema.validateSync({
        email, password, confirmPassword
      })
      triggerSignUp({email, password, returnSecureToken: true})
    }catch (error) {
      switch(error.path) {
        case 'email':
          setErrorMail(error.message)
          break;
        case 'password':
          setErrorPassword(error.message)
          break;
        case 'confirmPassword':
          setErrorConfirmPassword(error.message)
        break;
      }
    }
  }

  return (
    <View style={styles.main}>
      <Logo width={200} height={200} />
      <View style={styles.container}>
        <Text style={styles.title}>Registrar usuario</Text>
        <InputForm 
            label={"email"} 
            onChange={setEmail} 
            error={errorMail} 
          />
          <InputForm
            label={"password"}
            onChange={setPassword}
            error={errorPassword}
            isSecure={true}
          />
          <InputForm
            label={"confirm password"}
            onChange={setConfirmPassword}
            error={errorConfirmPassword}
            isSecure={true}
          />
        <SubmitButton onPress={onSubmit} title="Registrar" />
        <Text style={styles.sub}>Ya tienes usuario?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.subLink}>Inicial sesion</Text>
          </Pressable>
      </View>
    </View>
  );
}

export default SignUp

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
