// ==========================================
// LOVE LETTER WEBSITE
// SCRIPT.JS
// PART 1
// ==========================================


// ----------------------------
// Loader
// ----------------------------

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.style.display = "none";

        },1000);

    },2200);

});


// ----------------------------
// Main Elements
// ----------------------------

const container =
document.querySelector(".container");

const envelope =
document.getElementById("envelope");

const openBtn =
document.getElementById("openBtn");

const letterSection =
document.getElementById("letterSection");

const typingText =
document.getElementById("typingText");


// ----------------------------
// Variables
// ----------------------------

let currentIndex = 0;

let typingSpeed = 35;

let isOpened = false;


// ----------------------------
// Letter
// ----------------------------

const letter = `Dear Ali 🤍,

This website is only for you.

Every line...
Every word...
Every little animation...

was made with love.

❤️`;


// ----------------------------
// Open Envelope
// ----------------------------

openBtn.addEventListener("click",openLetter);

envelope.addEventListener("click",openLetter);

function openLetter(){

if(isOpened) return;

isOpened = true;

envelope.classList.add("open");

openBtn.innerHTML="Opening... ❤️";

openBtn.disabled=true;

setTimeout(()=>{

container.style.opacity="0";

container.style.transform="translateY(-60px)";

},1000);

setTimeout(()=>{

container.style.display="none";

letterSection.style.display="block";

letterSection.classList.add("fade-up");

startTyping();

},1800);

}


// ----------------------------
// Typewriter
// ----------------------------

function startTyping(){

typingText.innerHTML="";

currentIndex=0;

type();

}

function type(){

if(currentIndex < letter.length){

typingText.innerHTML +=
letter.charAt(currentIndex);

currentIndex++;

setTimeout(type,typingSpeed);

}

}

