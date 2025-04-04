
import { StyleSheet, View, Image } from 'react-native'

const Logo = ({width, height}) => {

  return (
    <View style={styles.logoContainer}>
        <Image 
            source={require('../../assets/logo.png')}
            style={[styles.logo, { width, height }]} 
        />
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
    logoContainer: {
      alignItems: 'center',
      marginBottom: 50,
    },
    logo: {
      resizeMode: 'contain',
    },
  });
