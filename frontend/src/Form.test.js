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
import '@testing-library/jest-dom/extend-expect';
import Form from './components/Form';

describe('Form Component', () => {
  test('renders form with correct elements', () => {
    render(<Form />);
    
    // Verifica se o formulário foi renderizado
    const formElement = screen.getByRole('form', { name: /form1/i });
    expect(formElement).toBeInTheDocument();

    // Verifica se os elementos do formulário estão presentes
    const quantityLabel = screen.getByText(/Quantidade de players/i);
    expect(quantityLabel).toBeInTheDocument();

    const gameTypeLabel = screen.getByText(/Tipo de jogo/i);
    expect(gameTypeLabel).toBeInTheDocument();

    const genreLabel = screen.getByText(/Gênero/i);
    expect(genreLabel).toBeInTheDocument();

    const subgenreLabel = screen.getByText(/Sub-gênero/i);
    expect(subgenreLabel).toBeInTheDocument();

    const platformLabel = screen.getByText(/Plataforma/i);
    expect(platformLabel).toBeInTheDocument();

    const termsCheckbox = screen.getByRole('checkbox', { name: /termos e condições/i });
    expect(termsCheckbox).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    expect(submitButton).toBeInTheDocument();
  });

  test('form submission', () => {
    render(<Form />);
    
    // Simula o preenchimento do formulário
    fireEvent.change(screen.getByLabelText(/Quantidade de players/i), { target: { value: '2player' } });
    fireEvent.change(screen.getByLabelText(/Tipo de jogo/i), { target: { value: 'pvp' } });
    fireEvent.change(screen.getByLabelText(/Gênero/i), { target: { value: 'acao' } });
    fireEvent.change(screen.getByLabelText(/Sub-gênero/i), { target: { value: 'arcade-ritmo' } });
    fireEvent.change(screen.getByLabelText(/Plataforma/i), { target: { value: 'pc' } });
    fireEvent.click(screen.getByRole('checkbox', { name: /termos e condições/i }));
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    // Verifica se o evento de envio foi chamado corretamente
    expect(screen.getByRole('form', { name: /form1/i })).toHaveFormValues({
      nbr_players: '2player',
      tipo: 'pvp',
      genero: 'acao',
      subgenero: 'arcade-ritmo',
      plaftorma: 'pc',
      terms: true,
    });
  });
});
