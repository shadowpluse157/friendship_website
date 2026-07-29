/* =========================================
   Happy Girlfriend Day
   Wuthering Waves Edition
   Part 1
=========================================*/

"use strict";

/* =========================================
   Elements
=========================================*/

const loader = document.getElementById("loader");

const website = document.getElementById("website");

const loaderProgress = document.querySelector(".loader-progress");

const startBtn = document.getElementById("startBtn");

const finishBtn = document.getElementById("finishBtn");

/* =========================================
   Loader
=========================================*/

let progress = 0;

const loading = setInterval(() => {

    progress++;

    loaderProgress.style.width = progress + "%";

    if (progress >= 100) {

        clearInterval(loading);

        loader.style.opacity = "0";

        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.style.display = "none";

        }, 700);

    }

}, 30);

/* =========================================
   Helper
=========================================*/

function smoothScroll(targetId){

    const target = document.querySelector(targetId);

    if(target){

        target.scrollIntoView({

            behavior:"smooth"

        });

    }

}
/* =========================================
   Navigation Links
=========================================*/

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const target = link.getAttribute("href");

        smoothScroll(target);

    });

});

/* =========================================
   Start Button
=========================================*/

if(startBtn){

    startBtn.addEventListener("click", () => {

        smoothScroll("#letter");

    });

}

/* =========================================
   Finish Button
=========================================*/

if(finishBtn){

    finishBtn.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* =========================================
   Keyboard Shortcut
=========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Home"){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

});
/* =========================================
   Scroll Reveal Animation
=========================================*/

const revealElements = document.querySelectorAll(

    ".hero-left, .hero-right, .section-heading, .letter-paper, .promise-card, .ending-container"

);

function revealOnScroll() {

    const triggerPoint = window.innerHeight * 0.85;

    revealElements.forEach((element) => {

        const top = element.getBoundingClientRect().top;

        if (top < triggerPoint) {

            element.style.opacity = "1";

            element.style.transform = "translateY(0)";

        }

    });

}

/* Initial Hidden State */

revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform = "translateY(60px)";

    element.style.transition =

        "opacity 0.9s ease, transform 0.9s ease";

});

/* Run */

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);
/* =========================================
   Mouse Parallax Effect
=========================================*/

const heroCard = document.querySelector(".hero-card");

const circles = document.querySelectorAll(".energy-circle");

document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    if (heroCard) {

        heroCard.style.transform =
            `translate(${x * 0.3}px, ${y * 0.3}px)`;

    }

    circles.forEach((circle, index) => {

        const speed = (index + 1) * 0.15;

        circle.style.transform =
            `translate(${x * speed}px, ${y * speed}px)`;

    });

});

/* =========================================
   Floating Animation
=========================================*/

let floatValue = 0;

function floatingAnimation() {

    floatValue += 0.02;

    if (heroCard) {

        heroCard.style.marginTop =
            `${Math.sin(floatValue) * 8}px`;

    }

    requestAnimationFrame(floatingAnimation);

}

floatingAnimation();
/* =========================================
   Hero Glow Animation
=========================================*/

const heroGlow = document.querySelector(".hero-glow");

let glow = 0;

function animateGlow() {

    glow += 0.03;

    if (heroGlow) {

        const scale = 1 + Math.sin(glow) * 0.08;
        const opacity = 0.15 + Math.abs(Math.sin(glow)) * 0.20;

        heroGlow.style.transform = `scale(${scale})`;
        heroGlow.style.opacity = opacity;

    }

    requestAnimationFrame(animateGlow);

}

animateGlow();

/* =========================================
   Stars Twinkle Randomly
=========================================*/

const stars = document.querySelector(".stars");

setInterval(() => {

    if (stars) {

        const randomOpacity =
            (Math.random() * 0.20 + 0.15).toFixed(2);

        stars.style.opacity = randomOpacity;

    }

}, 1200);

/* =========================================
   Smooth Hero Entrance
=========================================*/

window.addEventListener("load", () => {

    const heroLeft = document.querySelector(".hero-left");
    const heroRight = document.querySelector(".hero-right");

    if (heroLeft) {

        heroLeft.style.opacity = "1";
        heroLeft.style.transform = "translateX(0)";

    }

    if (heroRight) {

        heroRight.style.opacity = "1";
        heroRight.style.transform = "translateX(0)";

    }

});
/* =========================================
   Scroll Progress Bar
=========================================*/

const progressBar = document.createElement("div");

progressBar.id = "scrollProgress";

document.body.appendChild(progressBar);

progressBar.style.cssText = `
position:fixed;
top:0;
left:0;
height:4px;
width:0%;
background:#67d9ff;
z-index:999999;
box-shadow:0 0 15px rgba(103,217,255,.7);
transition:width .15s linear;
`;

/* =========================================
   Back To Top Button
=========================================*/

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.style.cssText = `
position:fixed;
right:25px;
bottom:25px;
width:55px;
height:55px;
border:none;
border-radius:50%;
background:#67d9ff;
color:#07131f;
font-size:24px;
font-weight:bold;
cursor:pointer;
display:none;
z-index:99999;
transition:.35s ease;
box-shadow:0 0 20px rgba(103,217,255,.35);
`;

topBtn.addEventListener("mouseenter",()=>{

    topBtn.style.transform="translateY(-5px) scale(1.08)";

});

topBtn.addEventListener("mouseleave",()=>{

    topBtn.style.transform="translateY(0) scale(1)";

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/* =========================================
   Window Scroll
=========================================*/

window.addEventListener("scroll",()=>{

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const percent =
        (scrollTop / scrollHeight) * 100;

    progressBar.style.width = percent + "%";

    if(scrollTop > 350){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

    }

});
/* =========================================
   Dynamic Background Movement
=========================================*/

const background = document.querySelector(".background");

window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    if (background) {

        background.style.transform =
            `translateY(${scrollY * 0.15}px)`;

    }

});

/* =========================================
   Hero Text Glow Animation
=========================================*/

const heroTitle = document.querySelector(".hero-left h1");

let glowValue = 0;

function animateTitleGlow() {

    glowValue += 0.025;

    if (heroTitle) {

        const blur = 10 + Math.sin(glowValue) * 8;

        heroTitle.style.textShadow = `
            0 0 ${blur}px rgba(103,217,255,.35),
            0 0 ${blur * 2}px rgba(103,217,255,.18)
        `;

    }

    requestAnimationFrame(animateTitleGlow);

}

animateTitleGlow();

/* =========================================
   Smooth Section Hover Scale
=========================================*/

const cards = document.querySelectorAll(
    ".hero-card, .letter-paper, .promise-card"
);

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition = ".45s ease";
        card.style.transform += " scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = card.style.transform.replace(
            " scale(1.02)",
            ""
        );

    });

});

/* =========================================
   Finish Button Glow Pulse
=========================================*/

if (finishBtn) {

    setInterval(() => {

        finishBtn.style.boxShadow =
            "0 0 35px rgba(103,217,255,.55)";

        setTimeout(() => {

            finishBtn.style.boxShadow =
                "0 0 15px rgba(103,217,255,.25)";

        }, 500);

    }, 2500);

}
/* =========================================
   Dynamic Floating Particles
=========================================*/

const particleContainer = document.querySelector(".particles");

function createParticle() {

    if (!particleContainer) return;

    const particle = document.createElement("span");

    const size = Math.random() * 6 + 2;

    particle.style.position = "absolute";
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = "50%";
    particle.style.background = "rgba(103,217,255,0.8)";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = "-20px";
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    particle.style.pointerEvents = "none";
    particle.style.boxShadow = "0 0 10px rgba(103,217,255,.6)";

    particleContainer.appendChild(particle);

    const duration = Math.random() * 4000 + 5000;
    const drift = (Math.random() - 0.5) * 120;

    particle.animate(
        [
            {
                transform: "translate(0,0) scale(1)",
                opacity: particle.style.opacity
            },
            {
                transform: `translate(${drift}px,-100vh) scale(0.2)`,
                opacity: 0
            }
        ],
        {
            duration: duration,
            easing: "linear"
        }
    );

    setTimeout(() => {

        particle.remove();

    }, duration);

}

/* Create particles continuously */

setInterval(createParticle, 250);
