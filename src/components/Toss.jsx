const Toss = ()=>{
    const tossFlip = ()=>{
        const result = Math.random(0,2);
        return result;

    }
    return(
        <div>
            <button onClick={tossFlip()}>Toss</button>
        </div>
    )
}

export default Toss;