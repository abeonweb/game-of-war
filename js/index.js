import {cardValue} from "./utils.js"

const computer = document.querySelector(".computerScore")
const player = document.querySelector(".playerScore")
const drawBtn = document.querySelector(".draw-btn")
const cards = document.getElementsByClassName("card")          
const gameInfo = document.querySelector(".game-info")
const newDeckBtn = document.querySelector(".new-deck") 
const remainingCards = document.querySelector(".remaining-cards")
let deckId
let remaining
let totalComputer = 0
let totalPlayer = 0

async function newDeck(){
    if(!deckId){  
        const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
        const data = await response.json()
        remaining = data.remaining
        deckId = data.deck_id
        drawBtn.disabled = false
        remainingCards.textContent = `Total cards: ${remaining}`
        totalComputer = 0
        totalPlayer = 0
        computer.innerHTML="Computer: 0"
        player.innerHTML="Me: 0"
        gameInfo.textContent="Game of War"
        for(let index = 0; index < cards.length; index++){
            cards[index].innerHTML = ""
        }
    }

}

async function handleDrawClick(){ 
    if(deckId){
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        const data = await response.json()
        remaining= data.remaining
        remainingCards.textContent = `Remaining cards: ${remaining}`
        
        for(let index = 0; index < cards.length; index++){
            cards[index].innerHTML = `<img src=${data.cards[index].image} alt="">`
        }
            
        roundWinner(data.cards[0].value,data.cards[1].value)
        computer.textContent = `Computer: ${totalComputer}`
        player.textContent = `Me: ${totalPlayer}`
        
        if(remaining === 0){
            drawBtn.disabled = true
            if(totalComputer>totalPlayer)
            gameInfo.textContent = `Computer wins the War`
            else if(totalComputer<totalPlayer)
            gameInfo.textContent = `You won the War`
            else
            gameInfo.textContent = `No winner in this War`
            
            deckId=""
        }
    }      
    
}

function roundWinner(card1, card2){
    const computerCard = cardValue(card1)
    const playerCard = cardValue(card2)
    if(computerCard > playerCard){
        gameInfo.textContent = "Computer wins!"
        totalComputer++
        
    }
    else if(computerCard < playerCard){
        gameInfo.textContent = "You win!"
        totalPlayer++
    }else{
        gameInfo.textContent = "Round is a tie"
    }
}

newDeckBtn.addEventListener("click", newDeck)

drawBtn.addEventListener("click", handleDrawClick)