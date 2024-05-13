/* import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Form from './components/Form';
import { submitjogo } from './components/Submit'; // Importa a função submitjogo

// Mock da função submitjogo
jest.mock('./components/Submit'); 

describe('Form Component', () => {
  test('aparecer todos os elementos', () => {
    const { getByTestId } = render(<Form />);
    expect(getByTestId('quantityLabel')).toBeInTheDocument();
    expect(getByTestId('select_player')).toBeInTheDocument();
    expect(getByTestId('gameTypeLabel')).toBeInTheDocument();
    expect(getByTestId('tipo_jogo')).toBeInTheDocument();
    expect(getByTestId('genreLabel')).toBeInTheDocument();
    expect(getByTestId('genre')).toBeInTheDocument();
    expect(getByTestId('platformLabel')).toBeInTheDocument();
    expect(getByTestId('plataforma')).toBeInTheDocument();
    expect(getByTestId('submitbutton')).toBeInTheDocument();
  });

  test('atualiza estado do input quando alterado', () => {
    const { getByTestId } = render(<Form />);
    const selectPlayer = getByTestId('select_player');
    fireEvent.change(selectPlayer, { target: { value: '1' } });
    expect(selectPlayer.value).toBe('1');
  });

  test('display mensagem de erro quando dar submit com o form vazio', () => {
    const { getByTestId, getByText } = render(<Form />);
    const submitButton = getByTestId('submitbutton');
    fireEvent.click(submitButton);
    expect(getByText('A quantidade de players é obrigatória.')).toBeInTheDocument();
    expect(getByText('O tipo de jogo é obrigatório.')).toBeInTheDocument();
    expect(getByText('O gênero do jogo é obrigatório.')).toBeInTheDocument();
    expect(getByText('A plataforma do jogo é obrigatória.')).toBeInTheDocument();
  });

  test('display mensagem de sucesso após envio do form com sucesso', async () => {
    // Mock da resposta da função submitjogo
    submitjogo.mockResolvedValueOnce({
      data: {
        nome: 'Nome do Jogo',
        avaliacao: '5 estrelas',
        genero: 'Aventura',
        plataforma: 'PC',
        n_jogadores: 1,
        descricao: 'Descrição do jogo.'
      }
    });

    const { getByTestId, getByText } = render(<Form />);
    const selectPlayer = getByTestId('select_player');
    const gameType = getByTestId('tipo_jogo');
    const genre = getByTestId('genre');
    const platform = getByTestId('plataforma');
    const submitButton = getByTestId('submitbutton');

    fireEvent.change(selectPlayer, { target: { value: '1' } });
    fireEvent.change(gameType, { target: { value: '1 jogador' } });
    fireEvent.change(genre, { target: { value: 'aventura' } });
    fireEvent.change(platform, { target: { value: 'pc' } });

    fireEvent.click(submitButton);

    // Aguarda a exibição dos elementos na interface
    await waitFor(() => {
      expect(getByText('O jogo sugerido é Nome do Jogo.')).toBeInTheDocument();
      expect(getByText('É um jogo de avaliação 5 estrelas.')).toBeInTheDocument();
      expect(getByText('Seu gênero é de Aventura.')).toBeInTheDocument();
      expect(getByText('É possível jogar na(s) plataforma(s) PC com até 1 jogador(es).')).toBeInTheDocument();
      expect(getByText('Aqui vai uma breve descrição:')).toBeInTheDocument();
      expect(getByText('Descrição do jogo.')).toBeInTheDocument();
    });
  });

  
});
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Form from './components/Form';

describe('Form Component', () => {
  test('renders form with correct elements', () => {
    render(<Form />);
    
    // Verifica se o formulário foi renderizado
    const formElement = screen.getByTestId('form', { name: /form1/i });
    expect(formElement).toBeInTheDocument();

    // Verifica se os elementos do formulário estão presentes
    const quantityLabel = screen.getByTestId('quantityLabel');
    expect(quantityLabel).toBeInTheDocument();

    const gameTypeLabel = screen.getByTestId('gameTypeLabel');
    expect(gameTypeLabel).toBeInTheDocument();

    const genreLabel = screen.getByTestId('genreLabel');
    expect(genreLabel).toBeInTheDocument();

    const platformLabel = screen.getByTestId('platformLabel');
    expect(platformLabel).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    expect(submitButton).toBeInTheDocument();
  });

  test('form submission', () => {
    render(<Form />);
    
    // Simula o preenchimento do formulário
    fireEvent.change(screen.getByTestId('select_player'), { target: { value: '2' } });
    fireEvent.change(screen.getByTestId('tipo_jogo'), { target: { value: 'pvp' } });
    fireEvent.change(screen.getByTestId('genre'), { target: { value: 'aventura' } });
    fireEvent.change(screen.getByTestId('plataforma'), { target: { value: 'pc' } });
    // Encontre o botão pelo ID
    const botaoSubmit = screen.getByTestId("submitbutton", { name: "enviar" });
    // Simula o click no botao
    fireEvent.click(botaoSubmit);

    // Verifica se o evento de envio foi chamado corretamente
    expect(screen.getByTestId('form', { name: /form1/i })).toHaveFormValues({
      n_players: '2',
      tipo_multiplayer: 'pvp',
      genero: 'aventura',
      plataforma: 'pc',
    });
  });
});
