import clsx from "clsx"

const Cell = (props)=>{
    const {symbol, insertSymbol, index, isOldest, } = props
    const handleFill = ()=>{
        symbol == null ? insertSymbol(index)
        : 
        alert("Already filled Try other cell")
    
    }
    const isFilled = symbol !=null;
    return (

        // if (i == oldestMove && moves.length >= 3) {
        //   return (
        //     <div key={i} className="animate-pulse">
        //       <Cell symbol={symbol} index={i} insertSymbol={addSymbol} />
        //     </div>
        //   );
        // }

            <div onClick={handleFill}  className={clsx("m-4 bg-base-300 flex items-center justify-center font-bold text-6xl",  isFilled && "hover:shake-horizontal", { "hover:bg-base-200": !isFilled}    )}>

            <p  className={clsx({"animate-pulse" : isOldest},"font-ox")}>
                {symbol !=null ? symbol: ""}
                
            </p>
            </div>
            
        
    )
}
export default Cell