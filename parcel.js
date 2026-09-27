
/* =========================================================
   ALI BIRTHDAY — PARCEL.JS
   Virtual Parcel Unboxing
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ---------------------------------------------------------
       ELEMENT HELPERS
    --------------------------------------------------------- */

    const find = (...selectors) => {
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element;
        }
        return null;
    };

    const findAll = (...selectors) => {
        const elements = [];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                if (!elements.includes(element)) {
                    elements.push(element);
                }
            });
        });

        return elements;
    };


    /* ---------------------------------------------------------
       PARCEL ELEMENTS
    --------------------------------------------------------- */

    const parcel = find(
        "#parcel",
        ".parcel",
        ".parcel-box",
        ".gift-parcel",
        ".gift-box",
        ".package"
    );

    const parcelBox = find(
        "#parcelBox",
        ".parcel-box",
        ".parcel",
        ".gift-box",
        ".package"
    );

    const openButton = find(
        "#openParcel",
        "#open-parcel",
        ".open-parcel",
        ".parcel-open",
        "[data-open-parcel]"
    );

    const tape = find(
        "#parcelTape",
        ".parcel-tape",
        ".tape",
        "[data-parcel-tape]"
    );

    const ribbon = find(
        "#parcelRibbon",
        ".parcel-ribbon",
        ".ribbon",
        "[data-parcel-ribbon]"
    );

    const lid = find(
        "#parcelLid",
        ".parcel-lid",
        ".box-lid",
        ".gift-lid"
    );

    const inside = find(
        "#parcelInside",
        ".parcel-inside",
        ".inside-parcel",
        ".gift-inside"
    );

    const reveal = find(
        "#parcelReveal",
        ".parcel-reveal",
        ".gift-reveal",
        ".birthday-reveal"
    );

    const continueButton = find(
        "#continueButton",
        "#continueBtn",
        ".parcel-continue",
        "[data-parcel-continue]"
    );


    /* ---------------------------------------------------------
       AUDIO
       ---------------------------------------------------------

       Optional IDs supported:

       #parcelOpenSound
       #parcelSound
       #openSound

       #birthdayMusic
       #backgroundMusic
       #music

       Put your audio files in the project folder if needed.

       Example:

       <audio id="parcelOpenSound" src="sounds/open.mp3"></audio>
       <audio id="birthdayMusic" src="music/indian-love-story-piano.mp3"></audio>
    --------------------------------------------------------- */

    const openSound = find(
        "#parcelOpenSound",
        "#parcelSound",
        "#openSound"
    );

    const music = find(
        "#birthdayMusic",
        "#backgroundMusic",
        "#music"
    );


    /* ---------------------------------------------------------
       STATE
    --------------------------------------------------------- */

    let parcelOpened = false;
    let opening = false;

    const OPENING_TIME = 1700;


    /* ---------------------------------------------------------
       INITIAL STATE
    --------------------------------------------------------- */

    document.body.classList.add("parcel-page");

    if (reveal) {
        reveal.classList.remove("show");
        reveal.setAttribute("aria-hidden", "true");
    }

    if (continueButton) {
        continueButton.style.opacity = "0";
        continueButton.style.pointerEvents = "none";
        continueButton.setAttribute("aria-hidden", "true");
    }


    /* ---------------------------------------------------------
       OPTIONAL STATUS TEXT
    --------------------------------------------------------- */

    const status = find(
        "#parcelStatus",
        ".parcel-status",
        ".opening-status"
    );

    const setStatus = message => {
        if (!status) return;

        status.textContent = message;
    };


    /* ---------------------------------------------------------
       PLAY SOUND
    --------------------------------------------------------- */

    function playSound(audio) {
        if (!audio) return;

        try {
            audio.currentTime = 0;

            const promise = audio.play();

            if (promise && typeof promise.catch === "function") {
                promise.catch(() => {
                    // Browser may block audio until interaction.
                });
            }
        } catch (error) {
            // Audio is optional.
        }
    }


    /* ---------------------------------------------------------
       START MUSIC
       --------------------------------------------------------- */

    function startMusic() {
        if (!music) return;

        try {
            music.volume = 0;

            const promise = music.play();

            if (promise && typeof promise.catch === "function") {
                promise.catch(() => {
                    return;
                });
            }

            let volume = 0;

            const fade = setInterval(() => {
                volume += 0.025;

                if (volume >= 0.55) {
                    volume = 0.55;
                    clearInterval(fade);
                }

                music.volume = volume;
            }, 100);

        } catch (error) {
            // Music is optional.
        }
    }


    /* ---------------------------------------------------------
       CREATE EFFECT CONTAINER
    --------------------------------------------------------- */

    function getEffectsContainer() {
        let container = document.querySelector(".parcel-effects");

        if (!container) {
            container = document.createElement("div");
            container.className = "parcel-effects";

            Object.assign(container.style, {
                position: "fixed",
                inset: "0",
                pointerEvents: "none",
                overflow: "hidden",
                zIndex: "9999"
            });

            document.body.appendChild(container);
        }

        return container;
    }


    /* ---------------------------------------------------------
       CREATE PARTICLE
    --------------------------------------------------------- */

    function createParticle(type = "heart") {
        const container = getEffectsContainer();
        const particle = document.createElement("span");

        const symbols = {
            heart: ["♥", "♡", "🤍", "💗"],
            star: ["✦", "✧", "★", "⋆"],
            sparkle: ["✧", "✦", "⋆", "✨"],
            balloon: ["🎈"],
            confetti: ["▪", "•", "✦", "◆"]
        };

        const collection = symbols[type] || symbols.sparkle;

        particle.textContent =
            collection[Math.floor(Math.random() * collection.length)];

        particle.className = `parcel-particle parcel-${type}`;

        const startX = Math.random() * 100;
        const startY = 55 + Math.random() * 20;

        const drift = -80 + Math.random() * 160;
        const duration = 2.5 + Math.random() * 2.5;
        const delay = Math.random() * 0.35;
        const size = 12 + Math.random() * 18;

        Object.assign(particle.style, {
            position: "absolute",
            left: `${startX}%`,
            top: `${startY}%`,
            fontSize: `${size}px`,
            opacity: "0",
            transform: "translate3d(0, 0, 0) scale(.4)",
            animation: `parcelParticleFloat ${duration}s ease-out ${delay}s forwards`,
            "--parcel-drift": `${drift}px`
        });

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, (duration + delay + 0.5) * 1000);
    }


    /* ---------------------------------------------------------
       HEART BURST
    --------------------------------------------------------- */

    function createHeartBurst(amount = 22) {
        for (let i = 0; i < amount; i++) {
            setTimeout(() => {
                createParticle("heart");
            }, i * 35);
        }
    }


    /* ---------------------------------------------------------
       STAR BURST
    --------------------------------------------------------- */

    function createStarBurst(amount = 28) {
        for (let i = 0; i < amount; i++) {
            setTimeout(() => {
                createParticle("star");
            }, i * 25);
        }
    }


    /* ---------------------------------------------------------
       SPARKLE BURST
    --------------------------------------------------------- */

    function createSparkleBurst(amount = 35) {
        for (let i = 0; i < amount; i++) {
            setTimeout(() => {
                createParticle("sparkle");
            }, i * 20);
        }
    }


    /* ---------------------------------------------------------
       BALLOON BURST
    --------------------------------------------------------- */

    function createBalloonBurst(amount = 8) {
        for (let i = 0; i < amount; i++) {
            setTimeout(() => {
                createParticle("balloon");
            }, i * 100);
        }
    }


    /* ---------------------------------------------------------
       CONFETTI BURST
    --------------------------------------------------------- */

    function createConfettiBurst(amount = 45) {
        const container = getEffectsContainer();

        const shapes = ["■", "▪", "◆", "●", "✦"];

        for (let i = 0; i < amount; i++) {
            const piece = document.createElement("span");

            piece.className = "parcel-confetti";

            piece.textContent =
                shapes[Math.floor(Math.random() * shapes.length)];

            const x = 50 + (Math.random() * 36 - 18);
            const y = 48 + (Math.random() * 15 - 7);

            const drift = -180 + Math.random() * 360;
            const fall = 260 + Math.random() * 380;
            const rotate = 180 + Math.random() * 720;
            const duration = 1.8 + Math.random() * 1.5;
            const size = 5 + Math.random() * 9;

            Object.assign(piece.style, {
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                fontSize: `${size}px`,
                opacity: "0",
                transform: "translate3d(0, 0, 0) rotate(0deg)",
                "--confetti-x": `${drift}px`,
                "--confetti-y": `${fall}px`,
                "--confetti-rotate": `${rotate}deg`,
                animation: `parcelConfettiFall ${duration}s cubic-bezier(.2,.7,.2,1) forwards`
            });

            container.appendChild(piece);

            setTimeout(() => {
                piece.remove();
            }, (duration + 0.5) * 1000);
        }
    }


    /* ---------------------------------------------------------
       COMPLETE REVEAL EFFECT
    --------------------------------------------------------- */

    function createRevealEffects() {
        createConfettiBurst(55);
        createHeartBurst(30);
        createStarBurst(35);
        createSparkleBurst(40);
        createBalloonBurst(10);

        document.body.classList.add("parcel-celebration");

        setTimeout(() => {
            document.body.classList.remove("parcel-celebration");
        }, 2500);
    }


    /* ---------------------------------------------------------
       REVEAL CONTENT
    --------------------------------------------------------- */

    function showReveal() {
        if (reveal) {
            reveal.classList.add("show");
            reveal.setAttribute("aria-hidden", "false");
        }

        if (continueButton) {
            continueButton.style.opacity = "1";
            continueButton.style.pointerEvents = "auto";
            continueButton.setAttribute("aria-hidden", "false");
        }

        document.body.classList.add("parcel-opened");

        setStatus("A little birthday surprise was waiting inside. 🤍");
    }


    /* ---------------------------------------------------------
       OPEN PARCEL
    --------------------------------------------------------- */

    function openParcel() {
        if (parcelOpened || opening) return;

        opening = true;

        setStatus("Opening your little parcel...");

        /* Add opening classes */

        if (parcelBox) {
            parcelBox.classList.add("parcel-opening");
        }

        if (parcel) {
            parcel.classList.add("parcel-opening");
        }

        if (tape) {
            tape.classList.add("tape-peel");
        }

        if (ribbon) {
            ribbon.classList.add("ribbon-release");
        }

        if (lid) {
            lid.classList.add("lid-opening");
        }

        /* Play opening sound */

        playSound(openSound);

        /* Little initial sparkle */

        createSparkleBurst(12);

        setTimeout(() => {

            /* Mark as opened */

            parcelOpened = true;
            opening = false;

            if (parcelBox) {
                parcelBox.classList.add("parcel-opened");
                parcelBox.classList.remove("parcel-opening");
            }

            if (parcel) {
                parcel.classList.add("parcel-opened");
                parcel.classList.remove("parcel-opening");
            }

            /* Inside content */

            if (inside) {
                inside.classList.add("inside-visible");
            }

            /* Celebration */

            createRevealEffects();

            /* Start music after real user interaction */

            startMusic();

            /* Reveal birthday content */

            setTimeout(() => {
                showReveal();
            }, 450);

        }, OPENING_TIME);
    }


    /* ---------------------------------------------------------
       OPEN BUTTON
    --------------------------------------------------------- */

    if (openButton) {
        openButton.addEventListener("click", event => {
            event.preventDefault();
            openParcel();
        });

        openButton.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openParcel();
            }
        });
    }


    /* ---------------------------------------------------------
       CLICKING THE PARCEL
    --------------------------------------------------------- */

    if (parcelBox) {
        parcelBox.addEventListener("click", event => {

            if (parcelOpened || opening) return;

            /*
             * If an explicit open button exists,
             * let that button handle the opening.
             */

            if (openButton && event.target.closest(
                "#openParcel, #open-parcel, .open-parcel, .parcel-open, [data-open-parcel]"
            )) {
                return;
            }

            openParcel();
        });
    }


    /* ---------------------------------------------------------
       KEYBOARD ACCESSIBILITY
    --------------------------------------------------------- */

    if (parcelBox) {
        parcelBox.setAttribute("tabindex", "0");
        parcelBox.setAttribute("role", "button");
        parcelBox.setAttribute(
            "aria-label",
            "Open the birthday parcel"
        );

        parcelBox.addEventListener("keydown", event => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                openParcel();
            }
        });
    }


    /* ---------------------------------------------------------
       CONTINUE BUTTON
    --------------------------------------------------------- */

    if (continueButton) {
        continueButton.addEventListener("click", event => {

            if (!parcelOpened) {
                event.preventDefault();

                setStatus(
                    "Open the parcel first. There is something waiting inside. ✦"
                );

                if (parcelBox) {
                    parcelBox.classList.add("parcel-attention");

                    setTimeout(() => {
                        parcelBox.classList.remove("parcel-attention");
                    }, 700);
                }

                return;
            }

            /*
             * If it is an <a>, normal navigation will happen.
             * script.js will also handle the page transition.
             */
        });
    }


    /* ---------------------------------------------------------
       DOUBLE CLICK PROTECTION
    --------------------------------------------------------- */

    document.addEventListener("dblclick", event => {

        if (!parcelBox) return;

        if (
            event.target.closest(".parcel-box") ||
            event.target.closest(".parcel") ||
            event.target.closest(".gift-box")
        ) {
            event.preventDefault();
        }
    });


    /* ---------------------------------------------------------
       DYNAMIC PARCEL ANIMATIONS
    --------------------------------------------------------- */

    const parcelStyles = document.createElement("style");

    parcelStyles.textContent = `
        /* ================================================
           PARCEL EFFECTS
        ================================================ */

        .parcel-effects {
            isolation: isolate;
        }

        .parcel-particle {
            will-change: transform, opacity;
            user-select: none;
        }

        @keyframes parcelParticleFloat {
            0% {
                opacity: 0;
                transform:
                    translate3d(0, 30px, 0)
                    scale(.35)
                    rotate(0deg);
            }

            12% {
                opacity: 1;
            }

            65% {
                opacity: .9;
            }

            100% {
                opacity: 0;
                transform:
                    translate3d(var(--parcel-drift), -300px, 0)
                    scale(1.15)
                    rotate(180deg);
            }
        }


        @keyframes parcelConfettiFall {
            0% {
                opacity: 0;
                transform:
                    translate3d(0, -30px, 0)
                    rotate(0deg)
                    scale(.5);
            }

            10% {
                opacity: 1;
            }

            100% {
                opacity: 0;
                transform:
                    translate3d(
                        var(--confetti-x),
                        var(--confetti-y),
                        0
                    )
                    rotate(var(--confetti-rotate))
                    scale(1);
            }
        }


        /* ================================================
           OPENING STATES
        ================================================ */

        .parcel-opening {
            pointer-events: none;
        }

        .tape-peel {
            animation:
                parcelTapePeel .7s ease forwards;
            transform-origin: center;
        }

        @keyframes parcelTapePeel {
            0% {
                opacity: 1;
                transform:
                    translateY(0)
                    rotate(0deg);
            }

            45% {
                opacity: 1;
                transform:
                    translateY(-8px)
                    rotate(-4deg);
            }

            100% {
                opacity: 0;
                transform:
                    translateY(-28px)
                    rotate(8deg)
                    scale(.85);
            }
        }


        .ribbon-release {
            animation:
                parcelRibbonRelease .9s ease forwards;
        }

        @keyframes parcelRibbonRelease {
            0% {
                opacity: 1;
                transform: scale(1);
            }

            35% {
                transform: scale(1.04);
            }

            100% {
                opacity: 0;
                transform:
                    scale(1.15)
                    translateY(-10px);
            }
        }


        .lid-opening {
            animation:
                parcelLidOpening 1.25s
                cubic-bezier(.16,.8,.25,1)
                forwards;
            transform-origin: center bottom;
        }

        @keyframes parcelLidOpening {
            0% {
                transform:
                    translate3d(0,0,0)
                    rotateX(0deg);
            }

            45% {
                transform:
                    translate3d(0,-8px,0)
                    rotateX(-28deg);
            }

            100% {
                transform:
                    translate3d(0,-80px,0)
                    rotateX(-72deg)
                    rotateZ(-2deg);
                opacity: .18;
            }
        }


        /* ================================================
           INSIDE REVEAL
        ================================================ */

        .inside-visible {
            animation:
                parcelInsideReveal 1.1s
                cubic-bezier(.2,.8,.2,1)
                forwards;
        }

        @keyframes parcelInsideReveal {
            0% {
                opacity: 0;
                transform:
                    translateY(30px)
                    scale(.9);
            }

            55% {
                opacity: 1;
            }

            100% {
                opacity: 1;
                transform:
                    translateY(0)
                    scale(1);
            }
        }


        /* ================================================
           REVEAL CONTENT
        ================================================ */

        .parcel-reveal {
            opacity: 0;
            visibility: hidden;
            transform:
                translateY(24px)
                scale(.96);
            transition:
                opacity .9s ease,
                transform .9s cubic-bezier(.2,.8,.2,1),
                visibility .9s ease;
        }

        .parcel-reveal.show {
            opacity: 1;
            visibility: visible;
            transform:
                translateY(0)
                scale(1);
        }


        /* ================================================
           CELEBRATION
        ================================================ */

        .parcel-celebration {
            animation: parcelCelebrationPulse 1.2s ease;
        }

        @keyframes parcelCelebrationPulse {
            0% {
                filter: brightness(1);
            }

            35% {
                filter: brightness(1.12);
            }

            100% {
                filter: brightness(1);
            }
        }


        /* ================================================
           ATTENTION
        ================================================ */

        .parcel-attention {
            animation:
                parcelAttention .7s
                cubic-bezier(.36,.07,.19,.97);
        }

        @keyframes parcelAttention {
            0%,
            100% {
                transform: translateX(0);
            }

            20% {
                transform: translateX(-7px);
            }

            40% {
                transform: translateX(7px);
            }

            60% {
                transform: translateX(-5px);
            }

            80% {
                transform: translateX(5px);
            }
        }


        /* ================================================
           REDUCED MOTION
        ================================================ */

        @media (prefers-reduced-motion: reduce) {

            .parcel-particle,
            .parcel-confetti,
            .tape-peel,
            .ribbon-release,
            .lid-opening,
            .inside-visible,
            .parcel-celebration,
            .parcel-attention {
                animation: none !important;
            }

            .parcel-reveal {
                transition: none !important;
            }
        }


        /* ================================================
           MOBILE PERFORMANCE
        ================================================ */

        @media (max-width: 700px) {

            .parcel-particle {
                animation-duration: 2s;
            }

            .parcel-confetti {
                animation-duration: 1.6s;
            }
        }
    `;

    document.head.appendChild(parcelStyles);


    /* ---------------------------------------------------------
       PAGE EXIT CLEANUP
    --------------------------------------------------------- */

    window.addEventListener("pageshow", () => {
        document.body.classList.remove("page-leaving");
    });


    /* ---------------------------------------------------------
       DEBUG HELPER
    ---------------------------------------------------------

       Open browser console and type:

       parcelDebug()

       This tells you which optional elements were found.
    --------------------------------------------------------- */

    window.parcelDebug = () => {

        console.table({
            parcel: !!parcel,
            parcelBox: !!parcelBox,
            openButton: !!openButton,
            tape: !!tape,
            ribbon: !!ribbon,
            lid: !!lid,
            inside: !!inside,
            reveal: !!reveal,
            continueButton: !!continueButton,
            openSound: !!openSound,
            music: !!music,
            opened: parcelOpened
        });

    };

});
