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

Dear Ali, 🤍

I don't really know how to put everything in my heart into words, but today I wanted to try.

From the day you became part of my life, something quietly changed inside me. You became someone I genuinely looked forward to talking to. Even the smallest message from you could make an ordinary day feel special.

I know life isn't always easy. We both get busy, we both have responsibilities, and sometimes we misunderstand each other. There were moments when I felt hurt, and I'm sure there were moments when I unintentionally hurt you too. But every disagreement reminded me of one thing...

I'd rather understand you than lose you.

Thank you for every conversation we've shared.

Thank you for every laugh.

Thank you for every late-night chat.

Thank you for every memory we've created together.

Thank you for believing in me whenever I showed you something I made. Seeing you smile after looking at the website I created made all my hard work worth it.

Sometimes I wonder if you truly realize how much your presence means to me.

You have a beautiful heart.

Your kindness...

Your honesty...

Your little jokes...

Even the way you care about the people around you...

They're all reasons why you're so special to me.

I know you're working hard for your future.

I know university keeps you busy.

I know life isn't always simple.

But I genuinely hope every dream you're chasing comes true.

I don't want to become someone successful only for myself.

I want to become someone who deserves the people I care about.

Someone who keeps improving every single day.

Someone you can always be proud of.

Distance may separate us...

Time may make us busy...

Life may become complicated...

But some people leave footprints on our hearts that never disappear.

You're one of those people.

I don't expect perfection.

Nobody is perfect.

But I promise that I'll always choose honesty over lies...

Respect over pride...

Kindness over anger...

And understanding over unnecessary arguments.

I hope whenever you read this letter, you remember one thing...

You're appreciated.

You're valued.

You're important.

And you'll always have a very special place in my heart.

May Allah always protect you.

May He fill your life with happiness.

May He make your heart peaceful.

May He bless you with success in everything you do.

And may He always keep your beautiful smile on your face.

Thank you...

For being yourself.

For being part of my story.

For giving me memories I'll always cherish.

No matter how many kilometres separate us...

You'll always have a home inside my heart.

With all my heart,

Faizan 🤍

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

        setTimeout(typeWriter, 22);

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
