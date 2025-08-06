const Cell = (props)=>{
    const {symbol, insertSymbol, index } = props
    const handleFill = ()=>{
        symbol == null ? insertSymbol(index)
        : 
        alert("Already filled Try other cell")
    
    }


    
    return (
       
            <p onClick={handleFill} className="flex items-center justify-center font-bold text-8xl ">
                {symbol !=null ? symbol: ""}
            </p>
            
        
    )
}
export default Cell