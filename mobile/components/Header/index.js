import React from "react";
import { View, Image, Text, Linking, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Image
            source={require('../../assets/banner192_center.png')}
            style={styles.banner}
          />
      </View>
      <Text style={styles.subtitle}>Defina o que está buscando e encontre algo para jogar:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c3f',
    alignItems: 'center',
  },
  header: {
    position: 'sticky',
    height: 195,
    top: 0,
    backgroundColor: 'rgb(28,28,63)',
    width: '100%',
    alignItems: 'center',
  },
  banner: {
    position: 'static',
    height: 192,
    width: screenWidth,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Header;