import React, { useState } from "react";
import { View, Text, TextInput, Picker, Button, StyleSheet, Alert } from "react-native";
import { submitjogo } from "../Submit";

const Form = () => {
  const [n_players, set_nplayers] = useState("");
  const [tipo_multiplayer, set_tipomultiplayer] = useState("");
  const [genero, set_genero] = useState("");
  const [plataforma, set_plataforma] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [errors, setErrors] = useState({
    n_players: "",
    tipo_multiplayer: "",
    genero: "",
    plataforma: "",
  });

  async function EnviarConsulta() {
    if (validateForm()) {
      const jogo = { n_players, tipo_multiplayer, genero, plataforma };
      console.log(jogo);
      try {
        const response = await submitjogo(jogo);
        console.log(response);
        Alert.alert(
          "Jogo Sugerido",
          `
          O jogo sugerido é ${response.data.nome}.
          É um jogo de avaliação ${response.data.avaliacao}.
          Seu gênero é de ${response.data.genero}.
          É possível jogar na(s) plataforma(s) ${response.data.plataforma} com até ${response.data.n_jogadores} jogador(es).
          Aqui vai uma breve descrição:
          ${response.data.descricao}`
        );
      } catch (error) {
        console.error(error);
        setMensagem("Erro ao consultar, contate o administrador.");
      }
    }
  }

  function validateForm() {
    let valid = true;
    const msgErro = { ...errors };
    if (n_players.trim()) {
      msgErro.n_players = "";
    } else {
      msgErro.n_players = "A quantidade de players é obrigatória.";
      valid = false;
    }
    if (tipo_multiplayer.trim()) {
      msgErro.tipo_multiplayer = "";
    } else {
      msgErro.tipo_multiplayer = "O tipo de jogo é obrigatório.";
      valid = false;
    }
    if (genero.trim()) {
      msgErro.genero = "";
    } else {
      msgErro.genero = "O gênero do jogo é obrigatório.";
      valid = false;
    }
    if (plataforma.trim()) {
      msgErro.plataforma = "";
    } else {
      msgErro.plataforma = "A plataforma do jogo é obrigatória.";
      valid = false;
    }

    setErrors(msgErro);

    return valid;
  }

  return (
    <View style={styles.container}>
      {mensagem ? <Text style={styles.alert}>{mensagem}</Text> : null}
      <Text>Quantidade de players:</Text>
      <Picker
        selectedValue={n_players}
        onValueChange={(itemValue) => set_nplayers(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Um jogador" value="1" />
        <Picker.Item label="Dois jogadores" value="2" />
        <Picker.Item label="Quatro jogadores" value="4" />
      </Picker>
      {errors.n_players ? <Text style={styles.error}>{errors.n_players}</Text> : null}

      <Text>Tipo de jogo (se multiplayer):</Text>
      <Picker
        selectedValue={tipo_multiplayer}
        onValueChange={(itemValue) => set_tipomultiplayer(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Um jogador" value="1 jogador" />
        <Picker.Item label="Cooperativo" value="coop" />
        <Picker.Item label="Jogador vs. Jogador" value="pvp" />
      </Picker>
      {errors.tipo_multiplayer ? <Text style={styles.error}>{errors.tipo_multiplayer}</Text> : null}

      <Text>Gênero:</Text>
      <Picker
        selectedValue={genero}
        onValueChange={(itemValue) => set_genero(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Qualquer gênero" value="qualquer" />
        <Picker.Item label="Ação" value="acao" />
        <Picker.Item label="Aventura" value="aventura" />
        <Picker.Item label="RPG" value="rpg" />
        <Picker.Item label="Simulação" value="simulacao" />
        <Picker.Item label="Estratégia" value="estrategia" />
        <Picker.Item label="Corrida" value="corrida" />
        <Picker.Item label="Esportes" value="esportes" />
        <Picker.Item label="Musical" value="musical" />
        <Picker.Item label="Luta" value="luta" />
        <Picker.Item label="Battle Royale" value="battle-royale" />
      </Picker>
      {errors.genero ? <Text style={styles.error}>{errors.genero}</Text> : null}

      <Text>Plataforma:</Text>
      <Picker
        selectedValue={plataforma}
        onValueChange={(itemValue) => set_plataforma(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Qualquer plataforma" value="qualquer plataforma" />
        <Picker.Item label="PC" value="pc" />
        <Picker.Item label="Playstation 4" value="playstation4" />
        <Picker.Item label="Playstation 5" value="playstation5" />
        <Picker.Item label="Xbox One" value="xboxone" />
        <Picker.Item label="Xbox Series" value="xboxseries" />
        <Picker.Item label="Nintendo Switch" value="switch" />
      </Picker>
      {errors.plataforma ? <Text style={styles.error}>{errors.plataforma}</Text> : null}

      <Button title="Enviar" onPress={EnviarConsulta} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgb(28,28,63)',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  error: {
    color: 'red',
  },
  alert: {
    color: 'red',
    backgroundColor: 'yellow',
    marginBottom: 10,
  },
});

export default Form;
