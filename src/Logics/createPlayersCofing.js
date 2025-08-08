function createPlayersConfig(mode, level){
    const playersConfig  = [
    {
        name: "player1",
        isComputer: null,
        level:null,
        isTossWinner : null,
        symbol:null
    },
    {
        name: "player2",
        isComputer: false,
        level:null,
        isTossWinner :null,
        symbol:null
    }]
    
    if(mode == 'vsComputer'){
        playersConfig[0].isComputer = true
        playersConfig[0].level = level

       
    }
    else{
        playersConfig[0].isComputer = false
    }

    
    return playersConfig;

}

export default createPlayersConfig;