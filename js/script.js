const typingText = document.querySelector(".typing-text p");
inpField = document.querySelector(".wrapper .input-field")
timeTag = document.querySelector(".time span b")
mistakeTag = document.querySelector(".mistake span")
cpmTag = document.querySelector(".cpm span")
wpmTag = document.querySelector(".wpm span")
tryAgainbtn = document.querySelector("button")

let timer,
maxTime = 60,
timeLeft = maxTime,

charIndex = mistake = isTyping = 0

function randomParagraph(){
    let randomIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = ""
    paragraphs[randomIndex].split("").forEach(span =>{
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML += spanTag
    })
    typingText.querySelectorAll("span")[0].classList.add("active")
    document.addEventListener("keydown", () => inpField.focus())
    typingText.addEventListener("click", () => inpField.focus())
}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex]
    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer, 1000)
            isTyping = true
        }
    
        if(typedChar == null){
            charIndex--
            if(characters[charIndex].classList.contains("incorrect")){
                mistake--
            }
            characters[charIndex].classList.remove("corect", "incorrect")
        }else{
        if(characters[charIndex].innerText=== typedChar){
            characters[charIndex].classList.add("correct")
        }else{
            mistake++
            characters[charIndex].classList.add("incorrect")
        }
        charIndex++
        }
        characters.forEach(span => span.classList.remove("active"))
        characters[charIndex].classList.add("active")
    
        let wpm = Math.round((((charIndex - mistake) / 5) / (maxTime - timeLeft)) * 60)
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm // Se o valor de WPM for 0, vazio ou infinito, ele vai deixar o valor em 0
        mistakeTag.innerText = mistake
        wpmTag.innerText = wpm
        cpmTag.innerText = charIndex - mistake
    }else{
        inpField.value = ""
        clearInterval(timer)
    }
}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--
        timeTag.innerText = timeLeft
    }else{
        clearInterval(timer)
    }
}
function resetGame(){
    randomParagraph()
    inpField.value = ""
    clearInterval(timer)
    timeLeft = maxTime,
    charIndex = mistake = isTyping = 0
    timeTag.innerText = timeLeft
    mistakeTag.innerText = mistake
    wpmTag.innerText = 0
    cpmTag.innerText = 0 
}

randomParagraph()
inpField.addEventListener("input", initTyping)
tryAgainbtn.addEventListener("click", resetGame)