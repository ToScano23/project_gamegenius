import React from "react";
import "./styles.css";

const Form = () => {
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
                <label className="label" data-testid="subgenreLabel">Sub-gênero:  </label>
                <select name="subgenero" data-testid = "sub_genre">
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
                <label className="label" data-testid="platformLabel">Plataforma:  </label>
                <select name="plaftorma" data-testid = "plataforma">
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
                <button type="submit" data-testid="submitbutton" name="enviar" >Enviar</button>
            </form>
        </div>
    )
}

export default Form;