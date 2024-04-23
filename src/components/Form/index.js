import React from "react";
import "./styles.css";

const Form = () => {
    return (
        <div>
            <form name="form1" className="form">
                <label className="label">Quantidade de players:  </label>
                <select name="nbr_players">
                    <option value="1player" required> Um jogador </option>
                    <option value="2player" required> Dois jogadores </option>
                    <option value="4player" required> Quatro jogadores </option>
                    <option value="mmo" required> Massivo </option>
                </select>
                <br />
                <br />
                <label className="label">Tipo de jogo (se multiplayer):  </label>
                <select name="tipo">
                    <option value="">Selecione</option>
                    <option value="coop" required>Cooperativo</option>
                    <option value="pvp" required>Jogador vs. Jogador</option>
                </select>
                <br />
                <br />
                <label className="label">Gênero:  </label>
                <select name="genero">
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
                <label className="label">Sub-gênero:  </label>
                <select name="subgenero">
                    <option value="qualquer">Qualquer subgênero</option>
                    <option value="arcade-ritmo" required>Arcade e Ritmo</option>
                    <option value="hackslash" required>Hack and Slash</option>
                    <option value="luta" required>Luta</option>
                    <option value="shootemup" required>Shoot 'em Up</option>
                    <option value="firstpersonshooter" required>Tiro em Primeira Pessoa (FPS)</option>
                    <option value="thirdpersonshooter" required>Tiro em Terceira Pessoa</option>
                </select>
                <br />
                <br />
                <label className="label">Plataforma:  </label>
                <select name="plaftorma">
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
                <input type="checkbox" name="terms" required /> Termos e Condições
                <br />
                <br />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Form;