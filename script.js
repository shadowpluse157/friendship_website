/* =====================================
   BEYOND LABELS
   SCRIPT.JS - PART 1
===================================== */

// Enter Button

const startBtn = document.getElementById("startBtn");

if(startBtn){

    startBtn.addEventListener("click",()=>{

        document.querySelector(".story").scrollIntoView({

            behavior:"smooth"

        });

    });

}

// Floating Hearts

const hearts = document.getElementById("hearts");

function createHeart(){

    if(!hearts) return;

    const heart = document.createElement("div");

    heart.innerHTML = "❤";

    heart.style.position = "absolute";

    heart.style.left = Math.random()*100 + "%";

    heart.style.top = "100%";

    heart.style.fontSize = (15 + Math.random()*20) + "px";

    heart.style.opacity = Math.random();

    heart.style.color = "#ff5d93";

    heart.style.pointerEvents = "none";

    heart.style.transition = "transform 6s linear, opacity 6s linear";

    hearts.appendChild(heart);

    setTimeout(()=>{

        heart.style.transform = "translateY(-110vh)";

        heart.style.opacity = "0";

    },100);

    setTimeout(()=>{

        heart.remove();

    },6000);

}

setInterval(createHeart,500);
/* =====================================
   SCRIPT.JS - PART 2
===================================== */

/* ===== OUR SONG ===== */

const musicBtn = document.getElementById("musicBtn");

// Apni MP3 file ka naam "song.mp3" rakhna
const song = new Audio("song.mp3");

let isPlaying = false;

musicBtn.addEventListener("click", () => {

    if (!isPlaying) {

        song.play();

        musicBtn.innerHTML = "⏸ Pause Our Song";

        isPlaying = true;

    } else {

        song.pause();

        musicBtn.innerHTML = "▶ Play Our Song";

        isPlaying = false;

    }

});

song.addEventListener("ended", () => {

    musicBtn.innerHTML = "▶ Play Our Song";

    isPlaying = false;

});


/* ===== SCROLL ANIMATION ===== */

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

});

sections.forEach((section) => {

    section.style.opacity = "0";

    section.style.transform = "translateY(40px)";

    section.style.transition = "all 0.8s ease";

    observer.observe(section);

});
/* =====================================
   SCRIPT.JS - PART 3
===================================== */

/* Random Background Glow */

const background = document.getElementById("background");

setInterval(() => {

    const colors = [

        "#14142b",

        "#231b4d",

        "#311f63",

        "#4a267d"

    ];

    const random = colors[Math.floor(Math.random() * colors.length)];

    background.style.background =
        `linear-gradient(135deg,#090914,${random},#231b4d,#3a2370)`;

},5000);


/* Button Hover Effect */

const buttons = document.querySelectorAll("button");

buttons.forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="scale(1.08)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="scale(1)";

    });

});


/* Welcome Message */

window.addEventListener("load",()=>{

    console.log("Beyond Labels 🤍 Loaded Successfully");

});


/* Smooth Scroll for all Links */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior:"smooth"

        });

    });

});
