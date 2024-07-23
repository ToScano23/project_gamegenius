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
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1c1c3f',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
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