import {useState, useEffect} from 'react'
import './App.css'
import SingleCard from './components/SingleCard'


const cardImages = [
  { "src": "/img/aecman.jpg", matched: false },
  { "src": "/img/hotman.jpg", matched: false },
  { "src": "/img/ladyblue.jpg", matched: false },
  { "src": "/img/manblue.jpg", matched: false },
  { "src": "/img/ladywhite.jpg", matched: false },
  { "src": "/img/wow.jpg", matched: false }
]

function App() {

  const [cards,setCards]=useState([])
  const [turns,setTurns]= useState(0)
  const [choiceOne,setChoiceOne]=useState(null)
  const [choiceTwo,setChoiceTwo]=useState(null)
  const [disabled, setDisabled]=useState(false)
  const shuffleCards =() => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random()-0.5)
    .map((card) => ({...card,id:Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    if (choiceOne) {
      if (choiceOne.id !== card.id) {
        setChoiceTwo(card);
      }
    } else {
      setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

     if (choiceOne.src === choiceTwo.src) {
        setCards (prevCards  => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
             } else {
              return card
            }
          })
        })
        resetTurn()
       } else {
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])



  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns =>prevTurns+1)
    setDisabled(false)
  }
 useEffect(() => {
  shuffleCards()
 }, [])

  return (
    <div className="App">
        <h1>Memory Card Game</h1>
        <button onClick={shuffleCards}>New Game</button>
      
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard  
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}/>
        ))}
      </div>
      <p> Turns: {turns}</p>
    </div>
    
  );
}

export default App