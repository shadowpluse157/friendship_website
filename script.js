// ==========================
// Select Elements
// ==========================

const envelope = document.querySelector(".envelope");

const openButton = document.getElementById("openLetter");

const letterPage = document.querySelector(".letter-page");

const typingText = document.getElementById("typingText");

const music = document.getElementById("bgMusic");

// ==========================
// Love Letter
// ==========================

const letter = `Coming Soon... ❤️

This is where our beautiful love letter will appear.

Every word will be typed one by one...

Just for Ali. 🤍`;
  // ==========================
// Open Letter
// ==========================

openButton.addEventListener("click", () => {

    // Open Envelope Animation

    envelope.style.transform = "translateY(-20px) scale(1.08)";

    envelope.style.transition = "0.6s";

    // Play Music (Optional)

    if (music) {

        music.play().catch(() => {});

    }

    // Show Letter Page

    setTimeout(() => {

        letterPage.style.display = "flex";

        startTyping();

    }, 800);

});
// ==========================
// Typewriter Effect
// ==========================

let index = 0;

function startTyping() {

    typingText.innerHTML = "";

    index = 0;

    typeLetter();

}

function typeLetter() {

    if (index < letter.length) {

        typingText.innerHTML += letter.charAt(index);

        index++;

        setTimeout(typeLetter, 35);

    }

}
// ==========================
// Floating Hearts Animation
// ==========================

const heartsContainer = document.querySelector(".hearts");

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize = (15 + Math.random() * 30) + "px";

    heart.style.animationDuration = (4 + Math.random() * 5) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 9000);

}

// Create Heart Every 350ms

setInterval(createHeart, 350);

// ==========================
// Prevent Multiple Clicks
// ==========================

let opened = false;

openButton.addEventListener("click", () => {

    if (opened) return;

    opened = true;

});
