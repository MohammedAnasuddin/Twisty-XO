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
        name: "",
        isComputer: null,
        level: null,
        isTossWinner: null,
        symbol: null
      },
      {
        name: "",
        isComputer: false,
        level: null,
        isTossWinner: null,
        symbol: null
      }
    ]
});

    function updateGameSetup(keys, value){

     setGameSetup( (draft)=>{
        // let current = draft;
        if(keys.length ==1){
          draft[keys[0]] = value;
        }
        else{
          for(let i =0; i<(keys.length-1);i++){
            draft= draft[keys[i]];
        }
        draft[keys[keys.length-1]] = value;
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