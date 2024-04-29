import React, { useState} from "react";
import "./styles.css";
/*import {
    submitjogo
} from "../Submit"; */

const Form = () => {
 /*
    const [nbr_players] = useState ("");
 const [tipo] = useState ("");
 const [genero] = useState ("");
 const [plataforma] = useState ("");


//Felipe 28/04 - Pendente integração com o backend para processar os dados do form em um prompt para o chatgpt
function EnviarConsulta() {
    const jogo = {nbr_players, tipo, genero, plataforma};
    submitjogo(jogo);
    console.log(jogo);
}
*/

    return (
        <div>
            <form name="form1" className="form" data-testid="form">
                <label className="label" data-testid="quantityLabel">Quantidade de players:  </label>
                <select name="nbr_players" data-testid = "select_player">
                    <option value="1player" required> Um jogador </option>
                    <option value="2player" required> Dois jogadores </option>
                    <option value="4player" required> Quatro jogadores </option>
                    <option value="mmo" required> Massivo </option>
                </select>
                <br />
                <br />
                <label className="label" data-testid="gameTypeLabel">Tipo de jogo (se multiplayer):  </label>
                <select name="tipo" data-testid = "tipo_jogo">
                    <option value="">Selecione</option>
                    <option value="coop" required>Cooperativo</option>
                    <option value="pvp" required>Jogador vs. Jogador</option>
                </select>
                <br />
                <br />
                <label className="label" data-testid="genreLabel">Gênero:  </label>
                <select name="genero" data-testid = "genre">
                    <option value="qualquer">Qualquer gênero</option>
                    <option value="acao" required>Ação</option>
                    <option value="aventura" required>Aventura</option>
                    <option value="rpg" required>RPG</option>
                    <option value="simulacao" required>Simulação</option>
                    <option value="estrategia" required>Estratégia</option>
                    <option value="corrida" required>Corrida</option>
                    <option value="esportes" required>Esportes</option>
                </select>
                <br />
                <br />
                <label className="label" data-testid="platformLabel">Plataforma:  </label>
                <select name="plataforma" data-testid = "plataforma">
                    <option value="aleatoria">Aleatória</option>
                    <option value="multiplataforma" required>Multiplataforma</option>
                    <option value="pc" required>PC</option>
                    <option value="playstation4" required>Playstation 4</option>
                    <option value="playstation5" required>Playstation 5</option>
                    <option value="xboxone" required>Xbox One</option>
                    <option value="xboxseries" required>Xbox Series</option>
                    <option value="switch" required>Nintendo Switch</option>
                </select>
                <br />
                <br />
                <input type="checkbox" name="terms" required data-testid="termscheckbox"/> Termos e Condições
                <br />
                <br />
                <button type="submit" data-testid="submitbutton" name="enviar" /*onClick={EnviarConsulta}*/ >Enviar</button>
            </form>
        </div>
    )
}

export default Form;