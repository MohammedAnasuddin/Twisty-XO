import {createContext, useState} from 'react';

export const GameContext  =  createContext({});
import { produce, } from 'immer';
import { useImmer } from 'use-immer';

export function GameProvider ({children}){

    const [gameSetup, setGameSetup] = useImmer({
    mode: null,
    tossWinner: null,
    gameWinner: null,
    players: [
      {
        name: "player1",
        isComputer: null,
        level: null,
        isTossWinner: null,
        symbol: null
      },
      {
        name: "player2",
        isComputer: false,
        level: null,
        isTossWinner: null,
        symbol: null
      }
    ]
});

    function updateGameSetup(keys, value){

     setGameSetup( (draft)=>{
        let current = draft;
        for(let i =0; i<(keys.length-1);i++){
            current = current[keys[i]];
        }
        current[keys[keys.length-1]] = value;
      }

     )
    }

     return(
        <GameContext.Provider value={{gameSetup, updateGameSetup}}>
            {children}
        </GameContext.Provider>
     )
}