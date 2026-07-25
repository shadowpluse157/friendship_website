// ======================================
// Minecraft Love Website
// Made with ❤️ by Faizan
// ======================================


// =============================
// Select Elements
// =============================

const openBook =
document.getElementById("openBook");

const bookPage =
document.getElementById("bookPage");

const typingText =
document.getElementById("typingText");

const music =
document.getElementById("bgMusic");


// =============================
// Love Letter
// (Placeholder)
// =============================

const letter = `

Dear Ali 🤍

This is just a placeholder.

Our real Minecraft Love Letter
will be added later...

❤️

`;
// =============================
// Open Minecraft Love Book
// =============================

openBook.addEventListener("click", () => {

    // Open Book

    bookPage.style.display = "flex";

    // Play Music (if available)

    if(music){

        music.play().catch(() => {});

    }

    // Start Typewriter

    startTyping();

});
// =============================
// Typewriter Effect
// =============================

let currentIndex = 0;

function startTyping(){

    typingText.innerHTML = "";

    currentIndex = 0;

    typeWriter();

}

function typeWriter(){

    if(currentIndex < letter.length){

        typingText.innerHTML += letter.charAt(currentIndex);

        currentIndex++;

        setTimeout(typeWriter, 35);

    }

}

