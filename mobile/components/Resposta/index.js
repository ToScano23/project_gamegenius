import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Resposta = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Resposta do Chat GPT:</Text>
      <Text style={styles.resposta}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    margin: 0,
    backgroundColor: 'rgb(28,28,63)',
    color: '#ffffff',
    textAlign: 'center',
    padding: 10,
  },
  resposta: {
    backgroundColor: 'rgb(28,28,63)',
    color: '#ffffff',
    textAlign: 'left',
    display: 'inline-block',
    maxWidth: 360,
    position: 'static',
    fontSize: 16,
    padding: 10,
  },
});

export default Resposta;