// ========================================
// LOADING SCREEN
// ========================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);

    }, 2200);

});


// ========================================
// ELEMENTS
// ========================================

const openBtn = document.getElementById("openBtn");
const envelope = document.getElementById("envelope");

const container = document.querySelector(".container");

const letterSection = document.getElementById("letterSection");


// ========================================
// OPEN ENVELOPE
// ========================================

openBtn.addEventListener("click", () => {

    envelope.classList.add("open");

    openBtn.disabled = true;

    openBtn.innerHTML = "Opening... ❤️";

    setTimeout(() => {

        container.style.transition = ".8s";
        container.style.opacity = "0";
        container.style.transform = "translateY(-80px)";

    }, 900);

    setTimeout(() => {

        container.style.display = "none";

        letterSection.style.display = "block";

        letterSection.style.opacity = "0";

        requestAnimationFrame(() => {

            letterSection.style.transition = ".8s";

            letterSection.style.opacity = "1";

            letterSection.scrollIntoView({
                behavior: "smooth"
            });

            // Start Typewriter
            startTyping();

        });

    }, 1700);

});


// ========================================
// TYPEWRITER DATA
// ========================================

const message = `Dear Ali 🤍,

This is only the beginning...

Every line you read on this website
was written only for you.

(Part 2 will continue from here...)`;

let index = 0;


// ========================================
// TYPEWRITER FUNCTION
// ========================================

function startTyping() {

    const typingText = document.getElementById("typingText");

    typingText.innerHTML = "";

    index = 0;

    type();

}

function type() {

    const typingText = document.getElementById("typingText");

    if (index < message.length) {

        typingText.innerHTML += message.charAt(index);

        index++;

        setTimeout(type, 35);

    }

}


// ========================================
// FLOATING HEARTS ON CLICK
// ========================================

document.addEventListener("click", function(e){

    createHeart(e.clientX, e.clientY);

});

function createHeart(x,y){

    const heart=document.createElement("div");

    heart.innerHTML="❤️";

    heart.style.position="fixed";

    heart.style.left=x+"px";

    heart.style.top=y+"px";

    heart.style.fontSize="22px";

    heart.style.pointerEvents="none";

    heart.style.zIndex="999";

    heart.style.transition="1s";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.style.transform="translateY(-100px) scale(2)";

        heart.style.opacity="0";

    },20);

    setTimeout(()=>{

        heart.remove();

    },1000);

}
// ========================================
// PART 2A
// Premium Cursor + Heart Rain + Music
// ========================================

// Cursor Glow

const cursor = document.createElement("div");

cursor.className = "cursor-glow";

document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

});

// ========================================
// Heart Rain
// ========================================

function createRainHeart(){

    const heart = document.createElement("div");

    heart.innerHTML = Math.random() > 0.5 ? "❤️" : "🤍";

    heart.style.position = "fixed";

    heart.style.left = Math.random()*100 + "vw";

    heart.style.top = "-30px";

    heart.style.fontSize = (18 + Math.random()*18) + "px";

    heart.style.opacity = ".8";

    heart.style.pointerEvents = "none";

    heart.style.zIndex = "5";

    heart.style.transition = "linear";

    document.body.appendChild(heart);

    const duration = 6000 + Math.random()*4000;

    requestAnimationFrame(()=>{

        heart.style.transform =
        `translateY(${window.innerHeight+100}px)
         rotate(${Math.random()*360}deg)`;

        heart.style.transitionDuration =
        duration+"ms";

    });

    setTimeout(()=>{

        heart.remove();

    },duration);

}

setInterval(createRainHeart,700);

// ========================================
// Background Music
// ========================================

const music = new Audio("assets/music.mp3");

music.loop = true;

music.volume = .35;

let musicStarted = false;

function playMusic(){

    if(musicStarted) return;

    music.play().catch(()=>{});

    musicStarted = true;

}

document.addEventListener("click",playMusic);

// ========================================
// Letter Card Animation
// ========================================

const letterCard = document.querySelector(".letter-card");

if(letterCard){

letterCard.style.transform = "translateY(80px)";
letterCard.style.opacity = "0";

}

function showLetterAnimation(){

if(!letterCard) return;

setTimeout(()=>{

letterCard.style.transition=".9s ease";

letterCard.style.transform="translateY(0px)";
letterCard.style.opacity="1";

},300);

}

const oldTyping = startTyping;

startTyping = function(){

showLetterAnimation();

oldTyping();

};

// ========================================
// Random Glow Effect
// ========================================

setInterval(()=>{

document.body.style.backgroundPosition =
`${Math.random()*100}% ${Math.random()*100}%`;

},4000);

// ========================================
// Small Heart Explosion
// ========================================

function heartExplosion(x,y){

for(let i=0;i<12;i++){

const h=document.createElement("div");

h.innerHTML="❤️";

h.style.position="fixed";

h.style.left=x+"px";

h.style.top=y+"px";

h.style.pointerEvents="none";

h.style.zIndex="999";

h.style.fontSize="18px";

document.body.appendChild(h);

const angle=(Math.PI*2/12)*i;

const distance=80+Math.random()*60;

const dx=Math.cos(angle)*distance;

const dy=Math.sin(angle)*distance;

setTimeout(()=>{

h.style.transition=".9s";

h.style.transform=
`translate(${dx}px,${dy}px)
scale(1.8)`;

h.style.opacity="0";

},20);

setTimeout(()=>{

h.remove();

},900);

}

}

envelope.addEventListener("click",(e)=>{

heartExplosion(
e.clientX,
e.clientY
);

});
