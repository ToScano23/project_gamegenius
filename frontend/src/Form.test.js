import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './components/Form';
 
describe('Form Component', () => {
  test('renders form with correct elements', () => {
    render(<Form />);
   
    // Verifica se o formulário foi renderizado
    const formElement = screen.getByTestId("form");
    expect(formElement).toBeInTheDocument();
 
    // Verifica se os elementos do formulário estão presentes
    const quantityLabel = screen.getByTestId("quantityLabel");
    expect(quantityLabel).toBeInTheDocument();
 
    const gameTypeLabel = screen.getByTestId("gameTypeLabel");
    expect(gameTypeLabel).toBeInTheDocument();
 
    const genreLabel = screen.getByTestId("genreLabel");
    expect(genreLabel).toBeInTheDocument();
 
    const subgenreLabel = screen.getByTestId("subgenreLabel");
    expect(subgenreLabel).toBeInTheDocument();
 
    const platformLabel = screen.getByTestId("platformLabel");
    expect(platformLabel).toBeInTheDocument();
 
    const termsCheckbox = screen.getByTestId("termscheckbox");
    expect(termsCheckbox).toBeInTheDocument();
 
    const submitButton = screen.getByTestId("submitbutton");
    expect(submitButton).toBeInTheDocument();
  });
 
  test('form submission', () => {
    render(<Form />);
   
    // Simula o preenchimento do formulário
    fireEvent.change(screen.getByTestId("select_player"), { target: { value: '2player' } });
    fireEvent.change(screen.getByTestId("tipo_jogo"), { target: { value: 'pvp' } });
    fireEvent.change(screen.getByTestId("genre"), { target: { value: 'acao' } });
    fireEvent.change(screen.getByTestId("sub_genre"), { target: { value: 'arcade-ritmo' } });
    fireEvent.change(screen.getByTestId("plataforma"), { target: { value: 'pc' } });
    fireEvent.click(screen.getByTestId("termscheckbox", { name: /termos e condições/i }));
    // fireEvent.click(screen.getByTestId("submitbutton", { name: "enviar" }));
    // Encontre o botão pelo ID
    const botaoSubmit = screen.getByTestId("submitbutton", { name: "enviar" });
    // Simula o click no botao
    fireEvent.click(botaoSubmit);
 
    // Verifica se o evento de envio foi chamado
    expect(screen.getByTestId('form', { name: /form1/i })).toHaveFormValues({
      nbr_players: '2player',
      tipo: 'pvp',
      genero: 'acao',
      subgenero: 'arcade-ritmo',
      plaftorma: 'pc',
      terms: true,
    });
  });
});