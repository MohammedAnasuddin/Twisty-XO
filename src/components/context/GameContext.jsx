import {createContext, useState} from 'react';

export const GameContext  =  createContext({});
import { useImmer } from 'use-immer';
import checkWinner from '../../Logics/checkWinner';

export function GameProvider ({children}){

    const [gameSetup, setGameSetup] = useImmer({
    board: Array(9).fill(null),
    gameWinner: null,
    mode: null,
    players: [
      {
        index: 0,
        name: "",
        isComputer: null,
        level: null,
        isTossWinner: null,
        symbol: null,
        moves: [],
        oldestMove: null,
      },
      {
        index: 1,
        name: "",
        isComputer: false,
        level: null,
        isTossWinner: null,
        symbol: null,
        moves: [],
        oldestMove: null,
      }
    ],
    tossWinner: null,
    turn: null,
});

    function updateGameSetup(keys, value){
     

     setGameSetup( (draft)=>{
       if(keys === 'MAKE_MOVE'){
        // const { position } = value;
        // const currentPlayerIndex = draft.turn;
        // const currentPlayer = draft.players[currentPlayerIndex];
        // const moves = currentPlayer.moves;

        // // Guard: If cell is filled or game is over, do nothing.
        // if(draft.board[position] !== null || draft.gameWinner !== null){
        //   return alert(`${currentPlayer.name} has won the Game`);
        // }


        // // --- "Twisty" Logic Implementation ---

        // // 1. Clear any "oldest move" flags from the previous turn.
       

 
        // if (currentPlayer.moves.length >= 3) {
        //   draft.board[currentPlayer.oldestMove] = null;
        // }
        
        // if(currentPlayer.moves.length <= 3){
        //   currentPlayer.oldestMove = moves[0];
        // }
        

        // // 3. Add the new move to the player's history and the board.
        // currentPlayer.moves.push(position);
        // draft.board[position] = currentPlayer.symbol;

        

        // // Check for a winner after the move
        // if (checkWinner(draft.board)) {
        //     draft.gameWinner = currentPlayerIndex;
        //     // On win, clear any pending animation
        //     draft.players[currentPlayerIndex].oldestMove = null;
        //     return; // Game over, no need to change turn
        // }

        // // If no winner, switch to the other player
        // draft.turn = currentPlayerIndex === 0 ? 1 : 0;


       
    const { position } = value;
    const currentPlayerIndex = draft.turn;
    const currentPlayer = draft.players[currentPlayerIndex];
    const opponentIndex = currentPlayerIndex === 0 ? 1 : 0;
    const opponent = draft.players[opponentIndex];

    // Prevent move if cell is filled or game is over
    if (draft.board[position] !== null || draft.gameWinner !== null) {
        return;
    }

    // Remove oldest move from board if player already has 3 moves
    if (currentPlayer.moves.length >= 3) {
        draft.board[currentPlayer.oldestMove] = null;
    }

    // Add the move
    currentPlayer.moves.push(position);
    draft.board[position] = currentPlayer.symbol;

    // Update oldestMove for BOTH players
    if (currentPlayer.moves.length >= 3) {
        currentPlayer.oldestMove = currentPlayer.moves[currentPlayer.moves.length - 3];
    } else {
        currentPlayer.oldestMove = currentPlayer.moves[0] ?? null;
    }

    if (opponent.moves.length >= 3) {
        opponent.oldestMove = opponent.moves[opponent.moves.length - 3];
    } else {
        opponent.oldestMove = opponent.moves[0] ?? null;
    }

    // Check winner
    if (checkWinner(draft.board)) {
        draft.gameWinner = currentPlayerIndex;
        draft.players[currentPlayerIndex].oldestMove = null;
        return;
    }

    // Switch turn
    draft.turn = opponentIndex;


      } 



      else if(keys==="VS_COMPUTER"){
        // Consistently use an object payload
        const { symbol } = value;
        draft.players[1].symbol = symbol;
        draft.players[0].symbol = symbol === "X" ? "O": "X";
        draft.turn = 1;
        draft.tossWinner =  1;
      }
      else if (keys === "CHOOSE_SYMBOL_VS_FRIEND") {
        const { symbol } = value;
        const tossWinnerIndex = draft.tossWinner;
        const otherPlayerIndex = 1 - tossWinnerIndex;
        const otherSymbol = symbol === 'X' ? 'O' : 'X';

        // Set symbols for both players
        draft.players[tossWinnerIndex].symbol = symbol;
        draft.players[otherPlayerIndex].symbol = otherSymbol;
        // Now, set the turn to start the game
        draft.turn = tossWinnerIndex;
      }
      else { // This is the generic setup logic from before
          if(keys.length ==1){
            draft[keys[0]] = value;
        } else {
          for(let i =0; i<(keys.length-1);i++){
            draft= draft[keys[i]];
          }
          draft[keys[keys.length-1]] = value;
        }
      }
        
      }

     )
    }

     return(
        <GameContext.Provider value={{gameSetup, updateGameSetup}}>
            {children}
        </GameContext.Provider>
     )
}