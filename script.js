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
// =============================
// Floating Pixel Hearts
// =============================

const heartsContainer = document.querySelector(".pixel-hearts");

function createHeart(){

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "❤️";

    heart.style.position = "absolute";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.bottom = "-40px";

    heart.style.fontSize = (16 + Math.random() * 20) + "px";

    heart.style.opacity = Math.random();

    heart.style.animation = `heartFloat ${4 + Math.random() * 4}s linear`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    },8000);

}

// Create Hearts Every 500ms

setInterval(createHeart,500);


// =============================
// Prevent Multiple Clicks
// =============================

let opened = false;

openBook.addEventListener("click",()=>{

    if(opened) return;

    opened = true;

});


// =============================
// Heart Animation
// =============================

const style = document.createElement("style");

style.innerHTML = `

@keyframes heartFloat{

0%{

transform:translateY(0) scale(.5);

opacity:0;

}

20%{

opacity:1;

}

100%{

transform:translateY(-120vh) scale(1.5);

opacity:0;

}

}

`;

document.head.appendChild(style);
