/* =========================================================
   ALI BIRTHDAY — PARCEL.JS
   Virtual Parcel Unboxing
   FINAL CLEAN VERSION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ---------------------------------------------------------
       HELPERS
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


    const findAll = (...selectors) => {
        for (const selector of selectors) {
            const elements = document.querySelectorAll(selector);

            if (elements.length) {
                return elements;
            }
        }

        return [];
    };


    /* ---------------------------------------------------------
       ELEMENTS
    --------------------------------------------------------- */

    const parcel = find(
        "#parcel",
        ".parcel-3d"
    );

    const parcelWrapper = find(
        "#parcelWrapper",
        ".parcel-wrapper"
    );

    const openButton = find(
        "#openParcelButton",
        ".open-button"
    );

    const tape = find(
        "#tapeHandle",
        ".peel-tape"
    );

    const inside = find(
        "#boxInterior",
        ".box-interior"
    );

    const celebration = find(
        "#celebration",
        ".celebration"
    );

    const continueButton = find(
        "#continueButton",
        ".continue-button"
    );

    const interactionPanel = find(
        "#interactionPanel",
        ".interaction-panel"
    );

    const music = find(
        "#birthdayMusic"
    );

    const tapeSound = find(
        "#tapeSound"
    );

    const boxOpenSound = find(
        "#boxOpenSound"
    );

    const celebrationSound = find(
        "#celebrationSound"
    );

    const lidElements = findAll(
        ".box-lid"
    );


    /* ---------------------------------------------------------
       STATE
    --------------------------------------------------------- */

    let parcelOpened = false;
    let opening = false;

    const OPENING_TIME = 1500;


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
    }


    /* ---------------------------------------------------------
       AUDIO
    --------------------------------------------------------- */

    function playSound(audio) {
        if (!audio) return;

        try {
            audio.currentTime = 0;

            const promise = audio.play();

            if (promise) {
                promise.catch(() => {});
            }
        } catch (error) {
            console.log("Audio unavailable.");
        }
    }


    function startMusic() {
        if (!music) return;

        try {
            music.volume = 0.35;

            const promise = music.play();

            if (promise) {
                promise.catch(() => {});
            }
        } catch (error) {
            console.log("Music unavailable.");
        }
    }


    /* ---------------------------------------------------------
       EFFECT CONTAINER
    --------------------------------------------------------- */

    function getEffectsContainer() {

        let container =
            document.querySelector(".parcel-effects");

        if (!container) {

            container =
                document.createElement("div");

            container.className =
                "parcel-effects";

            Object.assign(
                container.style,
                {
                    position: "fixed",
                    inset: "0",
                    pointerEvents: "none",
                    overflow: "hidden",
                    zIndex: "99999"
                }
            );

            document.body.appendChild(
                container
            );
        }

        return container;
    }


    /* ---------------------------------------------------------
       PARTICLE
    --------------------------------------------------------- */

    function createParticle(type = "sparkle") {

        const container =
            getEffectsContainer();

        const particle =
            document.createElement("span");

        const symbols = {

            heart: [
                "♥",
                "♡",
                "🤍",
                "💗"
            ],

            star: [
                "✦",
                "✧",
                "★",
                "⋆"
            ],

            sparkle: [
                "✧",
                "✦",
                "⋆",
                "✨"
            ],

            balloon: [
                "🎈"
            ]
        };


        const collection =
            symbols[type] || symbols.sparkle;


        particle.textContent =
            collection[
                Math.floor(
                    Math.random() *
                    collection.length
                )
            ];


        particle.className =
            parcel-particle parcel-${type};


        const startX =
            Math.random() * 100;


        const startY =
            48 +
            Math.random() * 20;


        const drift =
            -100 +
            Math.random() * 200;


        const duration =
            2.5 +
            Math.random() * 2;


        const delay =
            Math.random() * 0.3;


        const size =
            12 +
            Math.random() * 16;


        Object.assign(
            particle.style,
            {
                position: "absolute",
                left: ${startX}%,
                top: ${startY}%,
                fontSize: ${size}px,
                opacity: "0",
                "--parcel-drift": ${drift}px,
                animation:
                    parcelParticleFloat ${duration}s ease-out ${delay}s forwards
            }
        );


        container.appendChild(
            particle
        );


        setTimeout(() => {
            particle.remove();
        }, (duration + delay + 0.6) * 1000);
    }


    /* ---------------------------------------------------------
       PARTICLE BURSTS
    --------------------------------------------------------- */

    function createHeartBurst(amount = 20) {

        for (let i = 0; i < amount; i++) {

            setTimeout(() => {
                createParticle("heart");
            }, i * 35);
        }
    }


    function createStarBurst(amount = 25) {

        for (let i = 0; i < amount; i++) {

            setTimeout(() => {
                createParticle("star");
            }, i * 30);
        }
    }


    function createSparkleBurst(amount = 30) {

        for (let i = 0; i < amount; i++) {

            setTimeout(() => {
                createParticle("sparkle");
            }, i * 25);
        }
    }


    function createBalloonBurst(amount = 6) {

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

        const container =
            getEffectsContainer();


        const shapes = [
            "■",
            "▪",
            "◆",
            "●",
            "✦"
        ];


        for (let i = 0; i < amount; i++) {

            const piece =
                document.createElement("span");


            piece.className =
                "parcel-confetti";


            piece.textContent =
                shapes[
                    Math.floor(
                        Math.random() *
                        shapes.length
                    )
                ];


            const x =
                50 +
                (Math.random() * 36 - 18);


            const y =
                45 +
                (Math.random() * 12 - 6);


            const drift =
                -180 +
                Math.random() * 360;


            const fall =
                260 +
                Math.random() * 380;


            const rotate =
                180 +
                Math.random() * 720;


            const duration =
                1.8 +
                Math.random() * 1.5;


            const size =
                5 +
                Math.random() * 9;


            Object.assign(
                piece.style,
                {
                    position: "absolute",
                    left: ${x}%,
                    top: ${y}%,
                    fontSize: ${size}px,
                    opacity: "0",
                    "--confetti-x": ${drift}px,
                    "--confetti-y": ${fall}px,
                    "--confetti-rotate": ${rotate}deg,
                    animation:
                        parcelConfettiFall ${duration}s cubic-bezier(.2,.7,.2,1) forwards
                }
            );


            container.appendChild(
                piece
            );


            setTimeout(() => {
                piece.remove();
            }, (duration + 0.6) * 1000);
        }
    }


    /* ---------------------------------------------------------
       CELEBRATION EFFECTS
    --------------------------------------------------------- */

    function createRevealEffects() {

        createConfettiBurst(45);
        createHeartBurst(22);
        createStarBurst(25);
        createSparkleBurst(30);
        createBalloonBurst(7);


        document.body.classList.add(
            "parcel-celebration"
        );


        setTimeout(() => {

            document.body.classList.remove(
                "parcel-celebration"
            );

        }, 2500);
    }


    /* ---------------------------------------------------------
       SHOW CELEBRATION
    --------------------------------------------------------- */

    function showCelebration() {

        if (celebration) {

            celebration.classList.add(
                "show"
            );

            celebration.setAttribute(
                "aria-hidden",
                "false"
            );
        }


        if (interactionPanel) {

            interactionPanel.style.opacity =
                "0";

            interactionPanel.style.pointerEvents =
                "none";
        }


        if (openButton) {

            openButton.style.opacity =
                "0";

            openButton.style.pointerEvents =
                "none";

            openButton.style.visibility =
                "hidden";
        }


        if (continueButton) {

            continueButton.style.opacity =
                "1";

            continueButton.style.visibility =
                "visible";

            continueButton.style.pointerEvents =
                "auto";

            continueButton.classList.add(
                "continue-visible"
            );
        }


        document.body.classList.add(
            "parcel-opened"
        );
    }


    /* ---------------------------------------------------------
       OPEN PARCEL
    --------------------------------------------------------- */

    function openParcel() {

        if (
            parcelOpened ||
            opening
        ) {
            return;
        }


        opening = true;


        /* OPENING CLASS */

        if (parcelWrapper) {

            parcelWrapper.classList.add(
                "parcel-opening"
            );
        }


        if (parcel) {

            parcel.classList.add(
                "parcel-opening"
            );
        }


        /* TAPE */

        if (tape) {

            tape.classList.add(
                "tape-peel"
            );
        }


        /* LIDS */

        lidElements.forEach(
            lid => {

                lid.classList.add(
                    "lid-opening"
                );

            }
        );


        /* SOUNDS */

        playSound(
            tapeSound
        );


        setTimeout(() => {

            playSound(
                boxOpenSound
            );

        }, 500);


        /* INITIAL EFFECT */

        createSparkleBurst(
            15
        );


        /* FINISH */

        setTimeout(() => {

            parcelOpened = true;
            opening = false;


            if (parcelWrapper) {

                parcelWrapper.classList.remove(
                    "parcel-opening"
                );

                parcelWrapper.classList.add(
                    "parcel-opened"
                );
            }


            if (parcel) {

                parcel.classList.remove(
                    "parcel-opening"
                );

                parcel.classList.add(
                    "parcel-opened"
                );
            }


            if (inside) {

                inside.classList.add(
                    "inside-visible"
                );
            }


            createRevealEffects();


            playSound(
                celebrationSound
            );


            startMusic();


            setTimeout(() => {

                showCelebration();

            }, 500);


        }, OPENING_TIME);
    }


    /* ---------------------------------------------------------
       OPEN BUTTON
    --------------------------------------------------------- */

    if (openButton) {

        openButton.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                openParcel();
            }
        );
    }


    /* ---------------------------------------------------------
       TAPE BUTTON
    --------------------------------------------------------- */

    if (tape) {

        tape.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                openParcel();
            }
        );
    }


    /* ---------------------------------------------------------
       PARCEL CLICK
    --------------------------------------------------------- */

    if (parcelWrapper) {

        parcelWrapper.addEventListener(
            "click",
            event => {

                if (
                    parcelOpened ||
                    opening
                ) {
                    return;
                }


                if (
                    event.target.closest(
                        "#openParcelButton, #tapeHandle, .open-button, .peel-tape"
                    )
                ) {
                    return;
                }


                openParcel();
            }
        );
    }


    /* ---------------------------------------------------------
       CONTINUE BUTTON
    --------------------------------------------------------- */

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            event => {

                if (!parcelOpened) {

                    event.preventDefault();

                    if (interactionPanel) {

                        interactionPanel.classList.add(
                            "parcel-attention"
                        );


                        setTimeout(() => {

                            interactionPanel.classList.remove(
                                "parcel-attention"
                            );

                        }, 700);
                    }

                    return;
                }

                /*
                 * Parcel is open.
                 * Normal href navigation continues.
                 */

            }
        );
    }


    /* ---------------------------------------------------------
       DYNAMIC CSS
    --------------------------------------------------------- */

    const parcelStyles =
        document.createElement("style");


    parcelStyles.textContent = 

        .parcel-effects {
            isolation: isolate;
        }

        .parcel-particle {
            will-change: transform, opacity;
            user-select: none;
            pointer-events: none;
        }

        .parcel-confetti {
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

            transform-origin:
                center;
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

            transform-origin:
                center bottom;
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


        .continue-button.continue-visible {

            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
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
                filter: brightness(1.15);
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
                transform:
                    translateX(0);
            }

            20% {
                transform:
                    translateX(-7px);
            }

            40% {
                transform:
                    translateX(7px);
            }

            60% {
                transform:
                    translateX(-5px);
            }

            80% {
                transform:
                    translateX(5px);
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

                animation:
                    none !important;
            }
        }

    ;


    document.head.appendChild(
        parcelStyles
    );


    /* ---------------------------------------------------------
       PAGE SHOW
    --------------------------------------------------------- */

    window.addEventListener(
        "pageshow",
        () => {

            document.body.classList.remove(
                "page-leaving"
            );

        }
    );


    /* ---------------------------------------------------------
       DEBUG
    --------------------------------------------------------- */

    window.parcelDebug = () => {

        console.table({

            parcel:
                !!parcel,

            parcelWrapper:
                !!parcelWrapper,

            openButton:
                !!openButton,

            tape:
                !!tape,

            inside:
                !!inside,

            celebration:
                !!celebration,

            continueButton:
                !!continueButton,

            music:
                !!music,

            tapeSound:
                !!tapeSound,

            boxOpenSound:
                !!boxOpenSound,

            celebrationSound:
                !!celebrationSound,

            opened:
                parcelOpened

        });
    };


    console.log(
        "ALI BIRTHDAY — Parcel system loaded."
    );

    console.log(
        "Open button found:",
        !!openButton
    );

});
