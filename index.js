let player = {
    name: "Player",
    chips: 200
}
let dealer = 0
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerEl = document.getElementById("dealer-el")
let holdButton = document.getElementById("hold-button")


playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    let thirdCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    dealer = secondCard + thirdCard
    renderGame()
}

function renderGame() {
    dealerEl.textContent = "Dealer: " + dealer

    cardsEl.textContent = "Your Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " - "
    }
    
    sumEl.textContent = "Your Total: " + sum

    if (sum === 21 &&  dealer === 21 ) {
        message = "push, no one wins :'( "
        isAlive = false

    } else if ( sum < 21 && dealer < 21 )  {
        message = "Press HIT for a New Card or Hold"
        isAlive = true 

    } else if ( dealer > 21 && sum <=21 )  {
        message = "Dealer lost, You have won!"
        isAlive = false

    } else if ( sum > 21 && dealer === 21) {
        message = "Dealer WINS . Play another game?"

    } else if (sum === 21 ) {
        message = "You've got Blackjack! You Have won!"
        hasBlackJack = true


    } else {
        message = "Game over, try again ?"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        // dealer += card
        cards.push(card)
        renderGame()        
    }
}

function hold() {
    if (isAlive === true && hasBlackJack === false) {
        while (dealer < 17) {
            let card = getRandomCard();
            dealer += card;
        }
        renderGame();
    }
}

