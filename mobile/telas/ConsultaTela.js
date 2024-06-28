import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert, Dimensions, Image, ScrollView } from "react-native";
import { submitjogo } from "../components/Submit";
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get("window").width;



const ConsultaTela = (props) => {
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
    const [jogo, setJogo] = useState({
        nome: "",
        avaliacao: "",
        genero: "",
        plataforma: "",
        n_jogadores: "",
        descricao: "",
    });
    async function EnviarConsulta() {
        if (validateForm()) {
            const jogo = { n_players, tipo_multiplayer, genero, plataforma };
            //console.log(jogo);
            try {
                const response = await submitjogo(jogo);
                //console.log(response);
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
                setJogo(response.data);
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
            <View style={styles.header}>
                <Image
                    source={require('../assets/banner192_center.png')}
                    style={styles.banner}
                />
            </View>
            <Text style={styles.subtitle}>Defina o que está buscando e encontre algo para jogar:</Text>
            {mensagem ? <Text style={styles.alert}>{mensagem}</Text> : null}
            <Text style={styles.label}>Quantidade de players:</Text>
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

            <Text style={styles.label}>Tipo de jogo (se multiplayer):</Text>
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

            <Text style={styles.label}>Gênero:</Text>
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

            <Text style={styles.label}>Plataforma:</Text>
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
            <Text style={styles.label}>Resposta do Chat GPT:</Text>
            <ScrollView style={styles.respostabox}>
            {jogo.nome ? <Text style={styles.headerresposta}>Jogo Sugerido: </Text> : null}
            {jogo.nome ? <Text style={styles.resposta}>
              O jogo sugerido é {jogo.nome}. {"\n"}
              É um jogo de avaliação {jogo.avaliacao}.{"\n"}
              Seu gênero é de {jogo.genero}.{"\n"}
              É possível jogar na(s) plataforma(s) {jogo.plataforma} com até {jogo.n_jogadores} jogador(es).{"\n"}
              Aqui vai uma breve descrição: {"\n"}
              {jogo.descricao}</Text> : null}
            </ScrollView>
        </View>
    )
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
    label: {
        color: '#ffffff',
    },
    headerresposta: {
        color: '#ffffff',
        fontSize: 16,
    },
    resposta: {
        color: '#ffffff',
        fontSize: 12,
    },
    picker: {
        borderWidth: 5,
        height: 1,
        width: screenWidth - 40,
        color: 'white',
        backgroundColor: 'gray',
        fontSize: 10,
    },
    error: {
        color: 'red',
    },
    alert: {
        color: 'red',
        backgroundColor: 'yellow',
        marginBottom: 10,
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
      }
});


export default ConsultaTela