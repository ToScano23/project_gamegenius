import React, { useState } from "react";
import "./styles.css";
import {
  submitjogo
} from "../Submit";

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

//enviar consulta para o backend e aguardar resposta
  // async function EnviarConsulta(e) {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     const jogo = { n_players, tipo_multiplayer, genero, plataforma };
  //     console.log(jogo);
  //     submitjogo(jogo)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setMensagem("Erro ao consultar, contate o administrador.");
  //     });
  //   }
  // }

  async function EnviarConsulta(e) {
    e.preventDefault();
    if (validateForm()) {
      const jogo = { n_players, tipo_multiplayer, genero, plataforma };
      console.log(jogo);
      try {
        const response = await submitjogo(jogo);
        console.log(response);
        document.getElementById('resposta').innerText = `
        O jogo sugerido é ${response.data.nome}.
        É um jogo de avaliação ${response.data.avaliacao}.
        Seu gênero é de ${response.data.genero}.
        É possível jogar na(s) plataforma(s) ${response.data.plataforma} com até ${response.data.n_jogadores} jogador(es).
        Aqui vai uma breve descrição:
        ${response.data.descricao}`;
      } catch (error) {
        console.error(error);
        setMensagem("Erro ao consultar, contate o administrador.");
      }
    }
  }

  function manipula_nplayers(e) {
    set_nplayers(e.target.value);
    console.log("mudei os players:", e.target.value)
  }
  function manipula_tipomultiplayer(e) {
    set_tipomultiplayer(e.target.value);
    console.log("mudei o tipo:", e.target.value)
  }
  function manipula_genero(e) {
    set_genero(e.target.value);
    console.log("mudei o genero:", e.target.value)
  }
  function manipula_plataforma(e) {
    set_plataforma(e.target.value);
    console.log("mudei a plataforma:", e.target.value)
  }

  function validateForm() {
    let valid = true;
    const msgErro = { ...errors };
    if (n_players.trim()) {
      msgErro.n_players = "";
    } else {
      msgErro.n_players = "A quantidade de players é obrigatoria. ";
      valid = false;
    }
    if (tipo_multiplayer.trim()) {
      msgErro.tipo_multiplayer = "";
    } else {
      msgErro.tipo_multiplayer = "O tipo de jogo é obrigatório. ";
      valid = false;
    }
    if (genero.trim()) {
      msgErro.genero = "";
    } else {
      msgErro.genero = "O gênero do jogo é obrigatório. ";
      valid = false;
    }
    if (plataforma.trim()) {
      msgErro.plataforma = "";
    } else {
      msgErro.plataforma = "A plataforma do jogo é obrigatória. ";
      valid = false;
    }

    setErrors(msgErro);

    return valid;
  }


  return (
    <div>
      <div className="card-body">
      {mensagem && <div className="alert alert-danger">{mensagem}</div>}{""}
        <form name="form1" className="form" data-testid="form">
          <label className="label" data-testid="quantityLabel">Quantidade de players:  </label>
          <select
            name="n_players"
            data-testid="select_player"
            id="n_players"
            className={`form-control ${errors.n_players ? `is-invalid` : ``}`}
            onChange={manipula_nplayers}>
            <option value="" disabled selected>Selecione </option>
            <option value="1" required> Um jogador </option>
            <option value="2" required> Dois jogadores </option>
            <option value="4" required> Quatro jogadores </option>
          </select>
          {errors.n_players && (<div className="invalid-feedback"> {errors.n_players}</div>)}
          <br />
          <br />
          <label className="errorlabel" data-testid="gameTypeLabel">Tipo de jogo (se multiplayer):  </label>
          <select 
          name="tipo_multiplayer" 
          data-testid="tipo_jogo" 
          id="tipo_multiplayer"
          className={`form-control ${errors.tipo_multiplayer ? `is-invalid` : ``}`}
          onChange={manipula_tipomultiplayer}>
            <option value="" disabled selected>Selecione</option>
            <option value="1 jogador" required>Um jogador</option>
            <option value="coop" required>Cooperativo</option>
            <option value="pvp" required>Jogador vs. Jogador</option>
          </select>
          {errors.tipo_multiplayer && (<div className="invalid-feedback"> {errors.tipo_multiplayer}</div>)}
          <br />
          <br />
          <label className="label" data-testid="genreLabel">Gênero:  </label>
          <select 
          name="genero" 
          data-testid="genre" 
          id="genero"
          className={`form-control ${errors.genero ? `is-invalid` : ``}`}
          onChange={manipula_genero}>
            <option value="" disabled selected>Selecione </option>
            <option value="qualquer" required>Qualquer gênero</option>
            <option value="acao" required>Ação</option>
            <option value="aventura" required>Aventura</option>
            <option value="rpg" required>RPG</option>
            <option value="simulacao" required>Simulação</option>
            <option value="estrategia" required>Estratégia</option>
            <option value="corrida" required>Corrida</option>
            <option value="esportes" required>Esportes</option>
            <option value="musical" required>Musical</option>
            <option value="luta" required>Luta</option>
            <option value="battle-royale" required>Battle Royale</option>
          </select>
          {errors.genero && (<div className="invalid-feedback"> {errors.genero}</div>)}
          <br />
          <br />
          <label className="label" data-testid="platformLabel">Plataforma:  </label>
          <select 
          name="plataforma" 
          data-testid="plataforma" 
          id="plataforma"
          className={`form-control ${errors.plataforma ? `is-invalid` : ``}`}
          onChange={manipula_plataforma}>
            <option value="" disabled selected>Selecione </option>
            <option value="qualquer plataforma" required>Qualquer</option>
            <option value="pc" required>PC</option>
            <option value="playstation4" required>Playstation 4</option>
            <option value="playstation5" required>Playstation 5</option>
            <option value="xboxone" required>Xbox One</option>
            <option value="xboxseries" required>Xbox Series</option>
            <option value="switch" required>Nintendo Switch</option>
          </select>
          {errors.plataforma && (<div className="invalid-feedback"> {errors.plataforma}</div>)}
          <br />
          <button type="submit" data-testid="submitbutton" name="enviar" onClick={EnviarConsulta}>Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default Form;