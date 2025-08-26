import React from "react"
import Confetti from "react-confetti"
import Die from "./components/Die"

export default function App(){

    const [dice, setDice] = React.useState(() => generateAllNewDice())
    const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)
    const newGameButton = React.useRef(null)

    const diceElements = dice.map(die => <Die 
        key={die.id} 
        id={die.id}
        value={die.value} 
        isHeld={die.isHeld} 
        hold={hold}/>
    )

    function generateAllNewDice(){
        const newDice = []
        for(let i=0; i < 10; i++){
            const num = Math.ceil(Math.random() * 6)
            const die = {
                id: i,
                value: num,
                isHeld: false
            }
            newDice.push(die)
        }
        return newDice
    }

    function rollDice(){
        if(gameWon){
            setDice(generateAllNewDice())
        }
        else{
            setDice(prevDice => prevDice.map(die =>
                die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
            ))
        }
    }

    function hold(id){
        setDice(prevDice => prevDice.map(die => 
            die.id === id ? {...die, isHeld: !die.isHeld} : die
        ))
    }

    React.useEffect(() => {
        newGameButton.current.focus()
    }, [gameWon])

    return (
        <main>
            {gameWon && <Confetti/>}
             <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze
            it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-button" ref={newGameButton} onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
}