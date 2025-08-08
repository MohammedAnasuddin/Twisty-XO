import checkWinner from '../src/Logics/checkWinner';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Container from '../src/components/Grid/Container';

// --- checkWinner tests ---
describe('checkWinner', () => {
  it('detects row win', () => {
    expect(checkWinner(['X','X','X',null,null,null,null,null,null])).toBe(true);
  });
  it('detects column win', () => {
    expect(checkWinner(['O',null,null,'O',null,null,'O',null,null])).toBe(true);
  });
  it('detects diagonal win', () => {
    expect(checkWinner(['X',null,null,null,'X',null,null,null,'X'])).toBe(true);
  });
  it('detects anti-diagonal win', () => {
    expect(checkWinner([null,null,'O',null,'O',null,'O',null,null])).toBe(true);
  });
  it('returns false for no win', () => {
    expect(checkWinner(['X','O','X','O','X','O','O','X','O'])).toBe(false);
  });
});

// --- Container integration tests ---
describe('Container', () => {
  it('renders the board', () => {
    render(<Container player="X" changePlayer={() => {}} />);
    expect(screen.getAllByText('').length).toBe(9);
  });

  it('lets X win and shows Game Over', () => {
    const changePlayer = jest.fn();
    render(<Container player="X" changePlayer={changePlayer} />);
    const cells = screen.getAllByText('');
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X wins
    expect(screen.getByText('Game Over')).toBeInTheDocument();
  });

  it('prevents moves after game over', () => {
    const changePlayer = jest.fn();
    render(<Container player="X" changePlayer={changePlayer} />);
    const cells = screen.getAllByText('');
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X wins
    // Try to click again
    fireEvent.click(cells[5]);
    // Should still show Game Over
    expect(screen.getByText('Game Over')).toBeInTheDocument();
  });
});
