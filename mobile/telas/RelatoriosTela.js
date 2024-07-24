import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { consultaRelatorioDiario, consultaRelatorioNome } from "../components/Submit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

function Relatorios() {
  const [valorDiario, setDiario] = useState({ labels: [], datasets: [{ data: [] }] });
  const [valorNome, setNome] = useState({ labels: [], datasets: [{ data: [] }] });

  useEffect(() => {
    getDadosDiarios();
    getDadosNome();
  }, []);

  function getDadosDiarios() {
    consultaRelatorioDiario()
      .then((response) => {
        const labels = response.data.map(item => new Date(item.date).toLocaleDateString());
        const data = response.data.map(item => item.count);
        setDiario({
          labels,
          datasets: [
            {
              data,
            }
          ]
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getDadosNome() {
    consultaRelatorioNome()
      .then((response) => {
        const labels = response.data.map(item => item.nome);
        const data = response.data.map(item => item.count);
        setNome({
          labels,
          datasets: [
            {
              data,
            }
          ]
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const chartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientTo: "#080024",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <View style={styles.container}>
    <View>
      <Text style={styles.title}>Relatórios</Text>
      <View style={styles.buttonContainer}>
        <Button title="Atualizar" onPress={() => { getDadosDiarios(); getDadosNome(); }} />
      </View>
      <Text style={styles.subtitle}>Relatório de Consumo Diário</Text>
      <LineChart
        data={valorDiario}
        width={screenWidth - 40}
        height={400}
        chartConfig={chartConfig}
        style={styles.chart}
      />
      <Text style={styles.subtitle}>Resultados por Nome</Text>
      <BarChart
        data={valorNome}
        width={screenWidth - 40}
        height={500}
        chartConfig={chartConfig}
        style={styles.chart}
        horizontal
        showValuesOnTopOfBars
        verticalLabelRotation={30}
      />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    width: screenWidth,
    backgroundColor: 'rgb(28,28,63)',
    justifyContent: 'center',
    alignItems: 'center',
},
  title: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 0,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
});

export default Relatorios;