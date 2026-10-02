/* =========================================================
   ALI BIRTHDAY — PARCEL.JS
   Virtual Parcel Unboxing
   FINAL CLEAN VERSION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ---------------------------------------------------------
       ELEMENT HELPER
    --------------------------------------------------------- */

    const find = (...selectors) => {
        for (const selector of selectors) {
            const element = document.querySelector(selector);

            if (element) {
                return element;
            }
        }

        return null;
    };


    /* ---------------------------------------------------------
       PARCEL ELEMENTS
    --------------------------------------------------------- */

    const parcel = find(
        "#parcel",
        ".parcel-3d",
        ".parcel",
        ".gift-parcel",
        ".gift-box"
    );

    const parcelWrapper = find(
        "#parcelWrapper",
        ".parcel-wrapper",
        ".parcel-box"
    );

    const openButton = find(
        "#openParcelButton",
        ".open-button",
        "#openParcel",
        "#open-parcel",
        ".open-parcel",
        ".parcel-open",
        "[data-open-parcel]"
    );

    const tape = find(
        "#tapeHandle",
        ".peel-tape",
        "#parcelTape",
        ".parcel-tape",
        ".tape",
        "[data-parcel-tape]"
    );

    const inside = find(
        "#boxInterior",
        "#parcelInside",
        ".box-interior",
        ".parcel-inside",
        ".inside-parcel",
        ".gift-inside",
        ".parcel-interior"
    );

    const celebration = find(
        "#celebration",
        ".celebration",
        "#parcelReveal",
        ".parcel-reveal",
        ".gift-reveal",
        ".birthday-reveal"
    );

    const continueButton = find(
        "#continueButton",
        ".continue-button",
        "#continueBtn",
        ".continue-btn",
        ".parcel-continue",
        "[data-parcel-continue]"
    );

    const interactionPanel = find(
        "#interactionPanel",
        ".interaction-panel"
    );

    const parcelShadow = find(
        "#parcelShadow",
        ".parcel-shadow"
    );


    /* ---------------------------------------------------------
       AUDIO
    --------------------------------------------------------- */

    const music = find(
        "#birthdayMusic",
        "#backgroundMusic",
        "#music"
    );

    const tapeSound = find(
        "#tapeSound"
    );

    const openSound = find(
        "#boxOpenSound",
        "#parcelOpenSound",
        "#parcelSound",
        "#openSound"
    );

    const celebrationSound = find(
        "#celebrationSound"
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

    if (celebration) {
        celebration.classList.remove("show");
        celebration.setAttribute("aria-hidden", "true");
    }

    if (continueButton) {
        continueButton.style.opacity = "0";
        continueButton.style.visibility = "hidden";
        continueButton.style.pointerEvents = "none";
        continueButton.setAttribute("aria-hidden", "true");
    }

    if (inside) {
        inside.classList.remove("inside-visible");
    }


    /* ---------------------------------------------------------
       STATUS
    --------------------------------------------------------- */

    const status = find(
        "#parcelStatus",
        ".parcel-status",
        ".opening-status"
    );

    function setStatus(message) {
        if (status) {
            status.textContent = message;
        }
    }


    /* ---------------------------------------------------------
       AUDIO HELPER
    --------------------------------------------------------- */

    function playSound(audio) {
        if (!audio) return;

        try {
            audio.currentTime = 0;

            const promise = audio.play();

            if (promise && typeof promise.catch === "function") {
                promise.catch(() => {});
            }
        } catch (error) {
            // Audio is optional.
        }
    }


    /* ---------------------------------------------------------
       MUSIC
    --------------------------------------------------------- */

    function startMusic() {
        if (!music) return;

        try {
            music.volume = 0;

            const promise = music.play();

            if (promise && typeof promise.catch === "function") {
                promise.catch(() => {});
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
       EFFECT CONTAINER
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
                zIndex: "99999"
            });

            document.body.appendChild(container);
        }

        return container;
    }


    /* ---------------------------------------------------------
       PARTICLES
    --------------------------------------------------------- */

    function createParticle(type = "sparkle") {
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
            transform: "translate3d(0,0,0) scale(.4)",
            animation: `parcelParticleFloat ${duration}s ease-out ${delay}s forwards`,
            "--parcel-drift": `${drift}px`
        });

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, (duration + delay + 0.5) * 1000);
    }


    /* ---------------------------------------------------------
       PARTICLE BURSTS
    --------------------------------------------------------- */

    function createHeartBurst(amount = 22) {
        for (let i = 0; i < amount; i++) {
            setTimeout(() => {
                createParticle("heart");
            }, i * 35);
        }
    }


    function createStarBurst(amount = 28) {
        for (let i = 0; i < amount; i++) {
            setTimeout(() => {
                createParticle("star");
            }, i * 25);
        }
    }


    function createSparkleBurst(amount = 35) {
        for (let i = 0; i < amount; i++) {
            setTimeout(() => {
                createParticle("sparkle");
            }, i * 20);
        }
    }


    function createBalloonBurst(amount = 8) {
        for (let i = 0; i < amount; i++) {
            setTimeout(() => {
                createParticle("balloon");
            }, i * 100);
        }
    }


    /* ---------------------------------------------------------
       CONFETTI
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
                transform: "translate3d(0,0,0) rotate(0deg)",
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
       CELEBRATION EFFECTS
    --------------------------------------------------------- */

    function createRevealEffects() {
        createConfettiBurst(45);
        createHeartBurst(25);
        createStarBurst(30);
        createSparkleBurst(35);
        createBalloonBurst(8);

        document.body.classList.add("parcel-celebration");

        setTimeout(() => {
            document.body.classList.remove("parcel-celebration");
        }, 2500);
    }


    /* ---------------------------------------------------------
       SHOW CELEBRATION
    --------------------------------------------------------- */

    function showReveal() {
        if (celebration) {
            celebration.classList.add("show");
            celebration.setAttribute("aria-hidden", "false");
        }

        if (continueButton) {
            continueButton.style.opacity = "1";
            continueButton.style.visibility = "visible";
            continueButton.style.pointerEvents = "auto";

            continueButton.setAttribute(
                "aria-hidden",
                "false"
            );

            continueButton.classList.add("continue-visible");
        }

        document.body.classList.add("parcel-opened");

        if (interactionPanel) {
            interactionPanel.classList.add("interaction-hidden");
        }

        setStatus(
            "A little birthday surprise was waiting inside. 🤍"
        );
    }


    /* ---------------------------------------------------------
       OPEN PARCEL
    --------------------------------------------------------- */

    function openParcel() {
        if (parcelOpened || opening) {
            return;
        }

        opening = true;

        setStatus("Opening your little parcel...");

        /* -----------------------------------------------
           OPENING CLASSES
        ------------------------------------------------ */

        if (parcelWrapper) {
            parcelWrapper.classList.add("parcel-opening");
        }

        if (parcel) {
            parcel.classList.add("parcel-opening");
        }

        if (tape) {
            tape.classList.add("tape-peel");
        }

        /* -----------------------------------------------
           OPEN ALL LIDS
        ------------------------------------------------ */

        const lids = document.querySelectorAll(".box-lid");

        lids.forEach((lidElement) => {
            lidElement.classList.add("lid-opening");
        });

        /* -----------------------------------------------
           SOUNDS
        ------------------------------------------------ */

        playSound(tapeSound);

        setTimeout(() => {
            playSound(openSound);
        }, 450);

        /* -----------------------------------------------
           INITIAL SPARKLES
        ------------------------------------------------ */

        createSparkleBurst(15);

        /* -----------------------------------------------
           FINISH OPENING
        ------------------------------------------------ */

        setTimeout(() => {
            parcelOpened = true;
            opening = false;

            if (parcelWrapper) {
                parcelWrapper.classList.add("parcel-opened");
                parcelWrapper.classList.remove("parcel-opening");
            }

            if (parcel) {
                parcel.classList.add("parcel-opened");
                parcel.classList.remove("parcel-opening");
            }

            /* -------------------------------------------
               INSIDE
            -------------------------------------------- */

            if (inside) {
                inside.classList.add("inside-visible");
            }

            /* -------------------------------------------
               SHADOW
            -------------------------------------------- */

            if (parcelShadow) {
                parcelShadow.classList.add("shadow-opened");
            }

            /* -------------------------------------------
               CELEBRATION
            -------------------------------------------- */

            createRevealEffects();

            playSound(celebrationSound);

            startMusic();

            /* -------------------------------------------
               SHOW MESSAGE
            -------------------------------------------- */

            setTimeout(() => {
                showReveal();
            }, 450);

        }, OPENING_TIME);
    }


    /* ---------------------------------------------------------
       OPEN BUTTON
    --------------------------------------------------------- */

    if (openButton) {
        openButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            openParcel();
        });
    }


    /* ---------------------------------------------------------
       PEEL TAPE BUTTON
       Both buttons can open the parcel.
    --------------------------------------------------------- */

    if (tape) {
        tape.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            openParcel();
        });
    }


    /* ---------------------------------------------------------
       KEYBOARD ACCESSIBILITY
    --------------------------------------------------------- */

    [openButton, tape].forEach((button) => {
        if (!button) return;

        button.addEventListener("keydown", (event) => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                openParcel();
            }
        });
    });


    /* ---------------------------------------------------------
       CLICK PARCEL
    --------------------------------------------------------- */

    if (parcelWrapper) {
        parcelWrapper.addEventListener("click", (event) => {
            if (parcelOpened || opening) {
                return;
            }

            if (
                event.target.closest(
                    "#openParcelButton, .open-button, #tapeHandle, .peel-tape"
                )
            ) {
                return;
            }

            openParcel();
        });
    }


    /* ---------------------------------------------------------
       CONTINUE BUTTON
    --------------------------------------------------------- */

    if (continueButton) {
        continueButton.addEventListener("click", (event) => {
            if (!parcelOpened) {
                event.preventDefault();

                setStatus(
                    "Open the parcel first. There is something waiting inside. ✦"
                );

                if (parcelWrapper) {
                    parcelWrapper.classList.add("parcel-attention");

                    setTimeout(() => {
                        parcelWrapper.classList.remove(
                            "parcel-attention"
                        );
                    }, 700);
                }
            }
        });
    }


    /* ---------------------------------------------------------
       DYNAMIC CSS
    --------------------------------------------------------- */

    const parcelStyles = document.createElement("style");

    parcelStyles.textContent = 
        .parcel-effects {
            isolation: isolate;
        }

        .parcel-particle {
            will-change: transform, opacity;
            user-select: none;
            pointer-events: none;
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
                    translate3d(
                        var(--parcel-drift),
                        -300px,
                        0
                    )
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

        .lid-opening {
            animation:
                parcelLidOpening
                1.25s
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

        .inside-visible {
            animation:
                parcelInsideReveal
                1.1s
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

        .celebration {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transform:
                translateY(24px)
                scale(.96);
            transition:
                opacity .9s ease,
                transform .9s cubic-bezier(.2,.8,.2,1),
                visibility .9s ease;
        }

        .celebration.show {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            transform:
                translateY(0)
                scale(1);
        }

        .continue-button.continue-visible {
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
        }

        .interaction-hidden {
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
        }

        .shadow-opened {
            opacity: .45 !important;
            transform: scale(.85) !important;
        }

        .parcel-celebration {
            animation:
                parcelCelebrationPulse
                1.2s ease;
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

        .parcel-attention {
            animation:
                parcelAttention
                .7s
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

        @media (prefers-reduced-motion: reduce) {
            .parcel-particle,
            .parcel-confetti,
            .tape-peel,
            .lid-opening,
            .inside-visible,
            .parcel-celebration,
            .parcel-attention {
                animation: none !important;
            }

            .celebration {
                transition: none !important;
            }
        }
    ;

    document.head.appendChild(parcelStyles);


    /* ---------------------------------------------------------
       PAGE SHOW CLEANUP
    --------------------------------------------------------- */

    window.addEventListener("pageshow", () => {
        document.body.classList.remove("page-leaving");
    });


    /* ---------------------------------------------------------
       DEBUG HELPER
    --------------------------------------------------------- */

    window.parcelDebug = () => {
        console.table({
            parcel: !!parcel,
            parcelWrapper: !!parcelWrapper,
            openButton: !!openButton,
            tape: !!tape,
            inside: !!inside,
            celebration: !!celebration,
            continueButton: !!continueButton,
            openSound: !!openSound,
            tapeSound: !!tapeSound,
            celebrationSound: !!celebrationSound,
            music: !!music,
            opened: parcelOpened
        });
    };


    /* ---------------------------------------------------------
       CONSOLE CONFIRMATION
    --------------------------------------------------------- */

    console.log(
        "ALI BIRTHDAY — Parcel system loaded successfully."
    );

    console.log(
        "Open button found:",
        !!openButton
    );

    console.log(
        "Tape button found:",
        !!tape
    );

    console.log(
        "Celebration found:",
        !!celebration
    );
});
