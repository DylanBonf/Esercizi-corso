import { PAROLE } from "./parole.js";

const numero_di_tentativi = 6;
let tentativiRimanenti = numero_di_tentativi;
let tentativiCorrenti = [];
let prossimaLettera = 0;
let rightGuessString = PAROLE[Math.floor(Math.random() * PAROLE.length)]
console.log(rightGuessString)

function gameBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < numero_di_tentativi; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

gameBoard()


document.addEventListener("keyup", (e) => {

    if (tentativiRimanenti === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && prossimaLettera !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

function insertLetter (pressedKey) {
    if (prossimaLettera === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - tentativiRimanenti]
    let box = row.children[prossimaLettera]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    tentativiCorrenti.push(pressedKey)
    prossimaLettera += 1
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - tentativiRimanenti]
    let box = row.children[prossimaLettera - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    tentativiCorrenti.pop()
    prossimaLettera -= 1
}
function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            } 

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - tentativiRimanenti]
    let guessString = ''
    let tentativoCorretto = Array.from(rightGuessString)

    for (const val of tentativiCorrenti) {
        guessString += val
    }

    if (guessString.length != 5) {
        alert("Mancano delle lettere!")
        return
    }

    if (!PAROLE.includes(guessString)) {
        alert("Parola non in lista")
        return
    }

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

for (let i = 0; i < 5; i++) {
    let letterColor = ''
    let box = row.children[i]
    let letter = tentativiCorrenti[i]
    
    let letterPosition = tentativoCorretto.indexOf(tentativiCorrenti[i])
    // is letter in the correct guess
    if (letterPosition === -1) {
        letterColor = 'grey'
    } else {
        
        if (tentativiCorrenti[i] === tentativoCorretto[i]) {
            
            letterColor = 'green'
        } else {
            
            letterColor = 'yellow'
        }

        tentativoCorretto[letterPosition] = "#"
    }

    let delay = 250 * i
    setTimeout(()=> {
        //shade box
        box.style.backgroundColor = letterColor
        shadeKeyBoard(letter, letterColor)
    }, delay)
}

if (guessString === rightGuessString) {
    toastr.success("Risposta Esatta!")
    tentativiRimanenti = 0
    return
} else {
    tentativiRimanenti -= 1;
    tentativiCorrenti = [];
    prossimaLettera = 0;

    if (tentativiRimanenti === 0) {
        toastr.error("Tentativi terminati!")
        toastr.info(`la parola esatta era : "${rightGuessString}"`)
    }
}
}

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})


