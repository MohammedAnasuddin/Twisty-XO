

function usePlayer (playerObject) {
    const {moves , symbol} = playerObject;
   
    let havePlacedAll = false
    let oldestMove = null

    if(moves.length >= 3){
        havePlacedAll = true
        // The oldest of the 3 pieces on the board is at index 'length - 3'
        // in the full move history. Also fixing a syntax error with the extra ']'.
        oldestMove  = moves[moves.length - 3];
    } 
        
   


    return {symbol , moves, havePlacedAll, oldestMove}
}

export default  usePlayer