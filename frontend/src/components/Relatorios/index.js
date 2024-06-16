import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import { consultaRelatorioDiario, consultaRelatorioNome } from "../Submit";

function Relatorios() {
  const [valorDiario, setDiario] = useState([['Dia', 'Quantidade de Consultas']]);
  const [valorNome, setNome] = useState([['Nome', 'Count']]);

  useEffect(() => {
    getDadosDiarios();
    getDadosNome();
  }, []);

  function getDadosDiarios() {
    consultaRelatorioDiario()
      .then((response) => {
        const formattedData = response.data.map(item => [new Date(item.date).toLocaleDateString(), item.count]);
        setDiario([['Dia', 'Quantidade de Consultas'], ...formattedData]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getDadosNome() {
    consultaRelatorioNome()
      .then((response) => {
        const formattedData = response.data.map(item => [item.nome, item.count]);
        setNome([['Nome', 'Vezes sugeridas'], ...formattedData]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const options_diario = {
    title: 'Consumo Diário',
    hAxis: { title: 'Dia', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 0 }
  };

  const options_nome = {
    title: 'Consultas por Nome',
    hAxis: { title: 'Nome', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 0 }
  };

  return (
    <>
      <h3> Relatórios </h3>
      <div className="button-container">
        <button type="button" onClick={() => { getDadosDiarios(); getDadosNome(); }}>
          Atualizar
        </button>
      </div>
      <h4> Relatório de Consumo Diário </h4>
      <Chart
        chartType="AreaChart"
        width="100%"
        height="400px"
        data={valorDiario}
        options={options_diario}
      />
      <h4> Resultados por Nome </h4>
      <Chart
        chartType="BarChart"
        width="100%"
        height="1000px"
        data={valorNome}
        options={options_nome}

      />
    </>
  );
}

export default Relatorios;
