// ======================================
// Minecraft Love Website ❤️
// Made by Faizan
// ======================================


// =============================
// Select Elements
// =============================

const house = document.getElementById("house");

const door = document.getElementById("door");

const bookPage = document.getElementById("bookPage");

const closeBook = document.getElementById("closeBook");

const typingText = document.getElementById("typingText");

const music = document.getElementById("bgMusic");


// =============================
// Website State
// =============================

let enteredHouse = false;

let currentIndex = 0;


// =============================
// Love Letter
// (Temporary)
// =============================

const letter = `

Dear Ali 🤍

This is only a temporary letter.

Soon...

A beautiful Minecraft love letter
with more than 100 lines
will appear here.

❤️

`;
// =============================
// House Click Event
// =============================

house.addEventListener("click", () => {

    // Prevent multiple clicks

    if (enteredHouse) return;

    enteredHouse = true;

    // Open Door

    door.classList.add("open");

    // Play music

    if (music) {

        music.play().catch(() => {});

    }

    // Wait for door animation

    setTimeout(() => {

        // Show Love Book

        bookPage.style.display = "flex";

        // Start typing

        startTyping();

    }, 1000);

});


// =============================
// Close Book
// =============================

closeBook.addEventListener("click", () => {

    bookPage.style.display = "none";

    door.classList.remove("open");

    enteredHouse = false;

});
// =============================
// Typewriter Effect
// =============================

function startTyping() {

    // Reset text

    typingText.innerHTML = "";

    currentIndex = 0;

    typeWriter();

}

function typeWriter() {

    if (currentIndex < letter.length) {

        typingText.innerHTML += letter.charAt(currentIndex);

        currentIndex++;

        setTimeout(typeWriter, 35);

    }

}
// =============================
// Floating Hearts
// =============================

const heartsContainer = document.querySelector(".pixel-hearts");

function createHeart() {

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.className = "heart";

    heart.style.position = "absolute";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.bottom = "-30px";

    heart.style.fontSize = (18 + Math.random() * 16) + "px";

    heart.style.animation = "heartFloat 6s linear forwards";

    heartsContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 6000);

}

// Create a new heart every second

setInterval(createHeart, 1000);


// =============================
// Stop Music When Book Closes
// =============================

closeBook.addEventListener("click", () => {

    if (music) {

        music.pause();

        music.currentTime = 0;

    }

});


// =============================
// Console Message
// =============================

console.log("❤️ Minecraft Love Website Loaded Successfully!");
