export default function changeTurn(current_player, newPlayer){
    if(current_player=="X"){
        newPlayer("O")
    }

     if(current_player=="O"){
        newPlayer("X")
    }
}