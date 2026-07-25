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
// Minecraft Love Letter
// =============================

const letter = `

Dear Ali 🤍,

Welcome to our little Minecraft world.

This isn't just a house.

It's a place I imagined for us.

A place where we'd build together...
mine together...
fight mobs together...
and watch every sunset together.

Every block here was placed
while thinking about you.

Every heart floating in the sky...
every diamond...
every little detail...

has a reason.

If I ever found a diamond,
I'd share it with you.

If I ever built a castle,
I'd want you living in it.

Because...
Minecraft is fun.

But it's even better
when you're playing with someone
who makes you smile.

Thank you
for every conversation,
every laugh,
and every memory.

No matter how many blocks apart we are,

you'll always have a place
in this little world.

❤️

— Faizan

`;
// =============================
// House Click Event
// =============================

house.addEventListener("click", () => {

    if (enteredHouse) return;

    enteredHouse = true;

    // Open the door

    door.classList.add("open");

    // Play background music

    if (music) {

        music.play().catch(() => {});

    }

    // Wait for the door animation

    setTimeout(() => {

        // Show the book

        bookPage.style.display = "flex";

        // Start typing the letter

        startTyping();

    }, 1000);

});


// =============================
// Close Book Event
// =============================

closeBook.addEventListener("click", () => {

    bookPage.style.display = "none";

    door.classList.remove("open");

    enteredHouse = false;

    if (music) {

        music.pause();
        music.currentTime = 0;

    }

});
// =============================
// Typewriter Effect
// =============================

function startTyping() {

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

    if (!heartsContainer) return;

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

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

// Create hearts every second

setInterval(createHeart, 1000);


// =============================
// Console
// =============================

console.log("❤️ Minecraft Love Website Loaded Successfully!");
