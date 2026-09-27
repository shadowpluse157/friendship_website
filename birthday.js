
/* =========================================================
   ALI BIRTHDAY — BIRTHDAY.JS
   Birthday Chapter / Cake / Wish Interaction
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ---------------------------------------------------------
       HELPER FUNCTIONS
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
       PAGE ELEMENTS
    --------------------------------------------------------- */

    const birthdayPage = document.querySelector(
        ".birthday-page"
    );

    const cake = find(
        "#birthdayCake",
        "#cake",
        ".birthday-cake",
        ".cake",
        ".cake-container"
    );

    const candles = findAll(
        "#birthdayCake .candle",
        "#cake .candle",
        ".birthday-cake .candle",
        ".cake .candle",
        ".candle"
    );

    const flames = findAll(
        ".candle-flame",
        ".flame",
        ".flame-inner"
    );

    const wishButton = find(
        "#makeWish",
        "#wishButton",
        "#makeWishButton",
        ".make-wish",
        ".wish-button",
        "[data-wish]"
    );

    const wishText = find(
        "#wishText",
        ".wish-text",
        ".birthday-wish",
        ".wish-message"
    );

    const birthdayMessage = find(
        "#birthdayMessage",
        ".birthday-message",
        ".birthday-reveal",
        ".birthday-content"
    );

    const continueButton = find(
        "#continueButton",
        "#continueBtn",
        ".continue-btn",
        ".birthday-continue",
        "[data-continue]"
    );


    /* ---------------------------------------------------------
       AUDIO
    --------------------------------------------------------- */

    const candleSound = find(
        "#candleSound",
        "#blowSound",
        "#wishSound",
        "#birthdaySound"
    );

    const music = find(
        "#birthdayMusic",
        "#backgroundMusic",
        "#music"
    );


    /* ---------------------------------------------------------
       STATE
    --------------------------------------------------------- */

    let wishMade = false;
    let celebrationRunning = false;


    /* ---------------------------------------------------------
       INITIAL PAGE STATE
    --------------------------------------------------------- */

    document.body.classList.add("birthday-page-active");

    if (wishText) {
        wishText.style.opacity = "0";
        wishText.style.transform = "translateY(12px)";
    }

    if (continueButton) {
        continueButton.style.opacity = "0";
        continueButton.style.pointerEvents = "none";
    }


    /* ---------------------------------------------------------
       STATUS
    --------------------------------------------------------- */

    const status = find(
        "#birthdayStatus",
        ".birthday-status",
        ".wish-status"
    );

    function setStatus(message) {
        if (!status) return;

        status.textContent = message;
    }


    /* ---------------------------------------------------------
       AUDIO
    --------------------------------------------------------- */

    function playSound(audio) {

        if (!audio) {
            return;
        }

        try {

            audio.currentTime = 0;

            const promise = audio.play();

            if (
                promise &&
                typeof promise.catch === "function"
            ) {
                promise.catch(() => {});
            }

        } catch (error) {
            // Optional audio.
        }
    }


    /* ---------------------------------------------------------
       MUSIC FADE
    --------------------------------------------------------- */

    function fadeMusicIn() {

        if (!music) {
            return;
        }

        try {

            music.volume = 0;

            const promise = music.play();

            if (
                promise &&
                typeof promise.catch === "function"
            ) {
                promise.catch(() => {});
            }

            let volume = 0;

            const interval = setInterval(() => {

                volume += 0.025;

                if (volume >= 0.5) {
                    volume = 0.5;
                    clearInterval(interval);
                }

                music.volume = volume;

            }, 100);

        } catch (error) {
            // Browser may block autoplay.
        }
    }


    /* ---------------------------------------------------------
       CREATE EFFECT CONTAINER
    --------------------------------------------------------- */

    function getEffectContainer() {

        let container =
            document.querySelector(".birthday-effects");

        if (!container) {

            container = document.createElement("div");

            container.className =
                "birthday-effects";

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
       PARTICLE
    --------------------------------------------------------- */

    function createParticle(type = "star") {

        const container =
            getEffectContainer();

        const particle =
            document.createElement("span");

        const symbols = {

            star: [
                "✦",
                "✧",
                "★",
                "⋆"
            ],

            heart: [
                "♥",
                "♡",
                "🤍",
                "💗"
            ],

            sparkle: [
                "✧",
                "✦",
                "✨",
                "⋆"
            ],

            balloon: [
                "🎈"
            ]
        };

        const list =
            symbols[type] || symbols.star;

        particle.textContent =
            list[
                Math.floor(
                    Math.random() * list.length
                )
            ];

        particle.className =
            `birthday-particle birthday-${type}`;

        const x =
            50 +
            (Math.random() * 36 - 18);

        const y =
            48 +
            (Math.random() * 12 - 6);

        const drift =
            -180 +
            Math.random() * 360;

        const duration =
            2 +
            Math.random() * 2;

        const size =
            12 +
            Math.random() * 18;

        Object.assign(particle.style, {

            position: "absolute",

            left: `${x}%`,

            top: `${y}%`,

            fontSize: `${size}px`,

            opacity: "0",

            "--birthday-drift":
                `${drift}px`,

            animation:
                `birthdayParticleFloat ${duration}s ease-out forwards`
        });

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, (duration + 0.5) * 1000);
    }


    /* ---------------------------------------------------------
       CONFETTI
    --------------------------------------------------------- */

    function createConfetti(amount = 55) {

        const container =
            getEffectContainer();

        const shapes = [
            "■",
            "▪",
            "◆",
            "●",
            "✦"
        ];

        for (let i = 0; i < amount; i++) {

            setTimeout(() => {

                const piece =
                    document.createElement("span");

                piece.className =
                    "birthday-confetti";

                piece.textContent =
                    shapes[
                        Math.floor(
                            Math.random() *
                            shapes.length
                        )
                    ];

                const x =
                    50 +
                    (Math.random() * 40 - 20);

                const y =
                    42 +
                    (Math.random() * 12 - 6);

                const fall =
                    280 +
                    Math.random() * 380;

                const drift =
                    -220 +
                    Math.random() * 440;

                const rotate =
                    180 +
                    Math.random() * 720;

                const duration =
                    1.7 +
                    Math.random() * 1.5;

                const size =
                    5 +
                    Math.random() * 8;

                Object.assign(piece.style, {

                    position: "absolute",

                    left: `${x}%`,

                    top: `${y}%`,

                    fontSize: `${size}px`,

                    opacity: "0",

                    "--confetti-x":
                        `${drift}px`,

                    "--confetti-y":
                        `${fall}px`,

                    "--confetti-rotate":
                        `${rotate}deg`,

                    animation:
                        `birthdayConfettiFall ${duration}s cubic-bezier(.2,.7,.2,1) forwards`
                });

                container.appendChild(piece);

                setTimeout(() => {
                    piece.remove();
                }, (duration + 0.5) * 1000);

            }, i * 20);
        }
    }


    /* ---------------------------------------------------------
       HEART BURST
    --------------------------------------------------------- */

    function createHeartBurst(amount = 25) {

        for (let i = 0; i < amount; i++) {

            setTimeout(() => {
                createParticle("heart");
            }, i * 35);
        }
    }


    /* ---------------------------------------------------------
       STAR BURST
    --------------------------------------------------------- */

    function createStarBurst(amount = 35) {

        for (let i = 0; i < amount; i++) {

            setTimeout(() => {
                createParticle("star");
            }, i * 25);
        }
    }


    /* ---------------------------------------------------------
       SPARKLE BURST
    --------------------------------------------------------- */

    function createSparkleBurst(amount = 30) {

        for (let i = 0; i < amount; i++) {

            setTimeout(() => {
                createParticle("sparkle");
            }, i * 25);
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
       LIGHT CANDLES
    --------------------------------------------------------- */

    function lightCandles() {

        candles.forEach((candle, index) => {

            setTimeout(() => {

                candle.classList.add(
                    "candle-lit"
                );

            }, index * 120);
        });

        flames.forEach((flame, index) => {

            setTimeout(() => {

                flame.classList.add(
                    "flame-lit"
                );

            }, index * 120);
        });
    }


    /* ---------------------------------------------------------
       EXTINGUISH CANDLES
    --------------------------------------------------------- */

    function extinguishCandles() {

        candles.forEach((candle, index) => {

            setTimeout(() => {

                candle.classList.remove(
                    "candle-lit"
                );

                candle.classList.add(
                    "candle-extinguished"
                );

            }, index * 70);
        });

        flames.forEach((flame, index) => {

            setTimeout(() => {

                flame.classList.remove(
                    "flame-lit"
                );

                flame.classList.add(
                    "flame-extinguished"
                );

            }, index * 70);
        });
    }


    /* ---------------------------------------------------------
       CAKE GLOW
    --------------------------------------------------------- */

    function cakeGlow() {

        if (!cake) {
            return;
        }

        cake.classList.add(
            "cake-celebration"
        );

        setTimeout(() => {

            cake.classList.remove(
                "cake-celebration"
            );

        }, 1800);
    }


    /* ---------------------------------------------------------
       REVEAL BIRTHDAY MESSAGE
    --------------------------------------------------------- */

    function revealBirthdayMessage() {

        if (birthdayMessage) {

            birthdayMessage.classList.add(
                "birthday-message-visible"
            );
        }

        if (wishText) {

            wishText.style.opacity = "1";

            wishText.style.transform =
                "translateY(0)";

            wishText.style.transition =
                "opacity .8s ease, transform .8s ease";
        }

        if (continueButton) {

            setTimeout(() => {

                continueButton.style.opacity =
                    "1";

                continueButton.style.pointerEvents =
                    "auto";

            }, 700);
        }
    }


    /* ---------------------------------------------------------
       MAIN CELEBRATION
    --------------------------------------------------------- */

    function celebrateBirthday() {

        if (celebrationRunning) {
            return;
        }

        celebrationRunning = true;

        /* Stop repeat */

        if (wishButton) {

            wishButton.disabled = true;

            wishButton.classList.add(
                "wish-complete"
            );
        }

        /* Status */

        setStatus(
            "Wish made. ✨ Happy 19th Birthday, Ali! 🤍"
        );

        /* Candle animation */

        extinguishCandles();

        /* Sound */

        playSound(candleSound);

        /* Cake */

        cakeGlow();

        /* Main celebration */

        setTimeout(() => {

            createConfetti(65);

            createHeartBurst(30);

            createStarBurst(40);

            createSparkleBurst(45);

            createBalloonBurst(10);

            document.body.classList.add(
                "birthday-celebration"
            );

        }, 250);

        /* Reveal */

        setTimeout(() => {

            revealBirthdayMessage();

        }, 800);

        /* Remove celebration state */

        setTimeout(() => {

            document.body.classList.remove(
                "birthday-celebration"
            );

            celebrationRunning = false;

        }, 3000);
    }


    /* ---------------------------------------------------------
       WISH BUTTON
    --------------------------------------------------------- */

    if (wishButton) {

        wishButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                if (wishMade) {
                    return;
                }

                wishMade = true;

                celebrateBirthday();
            }
        );

        wishButton.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    if (!wishMade) {

                        wishMade = true;

                        celebrateBirthday();
                    }
                }
            }
        );
    }


    /* ---------------------------------------------------------
       CLICK CAKE TO MAKE WISH
    --------------------------------------------------------- */

    if (cake) {

        cake.addEventListener(
            "click",
            () => {

                if (wishMade) {
                    return;
                }

                if (wishButton) {

                    wishButton.classList.add(
                        "wish-attention"
                    );

                    setTimeout(() => {

                        wishButton.classList.remove(
                            "wish-attention"
                        );

                    }, 700);

                } else {

                    wishMade = true;

                    celebrateBirthday();
                }
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

                if (!wishMade) {

                    event.preventDefault();

                    setStatus(
                        "Make a wish first. ✨"
                    );

                    if (wishButton) {

                        wishButton.classList.add(
                            "wish-attention"
                        );

                        setTimeout(() => {

                            wishButton.classList.remove(
                                "wish-attention"
                            );

                        }, 700);
                    }

                    return;
                }

                /*
                 * If this is an <a>, script.js
                 * will handle the page transition.
                 */
            }
        );
    }


    /* ---------------------------------------------------------
       START MUSIC AFTER USER INTERACTION
    --------------------------------------------------------- */

    function startBirthdayMusic() {

        if (!music) {
            return;
        }

        /*
         * If music is already playing from
         * parcel.js, don't restart it.
         */

        if (!music.paused) {
            return;
        }

        fadeMusicIn();
    }


    document.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    "#makeWish, #wishButton, #makeWishButton, .make-wish, .wish-button, [data-wish]"
                )
            ) {
                startBirthdayMusic();
            }
        },
        {
            once: true
        }
    );


    /* ---------------------------------------------------------
       DYNAMIC CSS
    --------------------------------------------------------- */

    const style =
        document.createElement("style");

    style.textContent = `

        /* ============================================
           BIRTHDAY PARTICLES
        ============================================ */

        .birthday-effects {
            isolation: isolate;
        }

        .birthday-particle,
        .birthday-confetti {
            will-change:
                transform,
                opacity;

            user-select: none;
        }


        @keyframes birthdayParticleFloat {

            0% {
                opacity: 0;

                transform:
                    translate3d(
                        0,
                        25px,
                        0
                    )
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
                        var(--birthday-drift),
                        -320px,
                        0
                    )
                    scale(1.15)
                    rotate(180deg);
            }
        }


        @keyframes birthdayConfettiFall {

            0% {
                opacity: 0;

                transform:
                    translate3d(
                        0,
                        -30px,
                        0
                    )
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
                    rotate(
                        var(--confetti-rotate)
                    )
                    scale(1);
            }
        }


        /* ============================================
           CANDLE STATES
        ============================================ */

        .candle-lit {
            filter:
                drop-shadow(
                    0 0 12px
                    rgba(255, 205, 130, .7)
                );
        }

        .flame-lit {
            opacity: 1 !important;

            animation:
                birthdayFlame 1.1s
                ease-in-out
                infinite alternate;
        }

        @keyframes birthdayFlame {

            0% {
                transform:
                    translateX(-1px)
                    scale(.92);
            }

            100% {
                transform:
                    translateX(1px)
                    scale(1.08);
            }
        }


        .flame-extinguished {
            animation:
                birthdayFlameOut .45s
                ease forwards !important;
        }

        @keyframes birthdayFlameOut {

            0% {
                opacity: 1;
                transform: scale(1);
            }

            100% {
                opacity: 0;
                transform:
                    scale(.25)
                    translateY(-8px);
            }
        }


        .candle-extinguished {
            transition:
                filter .5s ease;
        }


        /* ============================================
           CAKE CELEBRATION
        ============================================ */

        .cake-celebration {

            animation:
                birthdayCakeGlow 1.8s
                ease-in-out;
        }

        @keyframes birthdayCakeGlow {

            0% {
                filter:
                    brightness(1);
            }

            35% {
                filter:
                    brightness(1.18)
                    drop-shadow(
                        0 0 28px
                        rgba(255, 190, 220, .45)
                    );
            }

            100% {
                filter:
                    brightness(1);
            }
        }


        /* ============================================
           MESSAGE REVEAL
        ============================================ */

        .birthday-message-visible {

            animation:
                birthdayMessageReveal
                .9s
                cubic-bezier(.2,.8,.2,1)
                both;
        }

        @keyframes birthdayMessageReveal {

            0% {
                opacity: 0;
                transform:
                    translateY(20px)
                    scale(.97);
            }

            100% {
                opacity: 1;
                transform:
                    translateY(0)
                    scale(1);
            }
        }


        /* ============================================
           WISH BUTTON
        ============================================ */

        .wish-complete {
            cursor: default;
        }

        .wish-attention {

            animation:
                birthdayWishAttention
                .7s
                cubic-bezier(.36,.07,.19,.97);
        }

        @keyframes birthdayWishAttention {

            0%,
            100% {
                transform:
                    translateX(0);
            }

            20% {
                transform:
                    translateX(-6px);
            }

            40% {
                transform:
                    translateX(6px);
            }

            60% {
                transform:
                    translateX(-4px);
            }

            80% {
                transform:
                    translateX(4px);
            }
        }


        /* ============================================
           PAGE CELEBRATION
        ============================================ */

        .birthday-celebration {

            animation:
                birthdayPagePulse
                1.2s
                ease;
        }

        @keyframes birthdayPagePulse {

            0% {
                filter:
                    brightness(1);
            }

            35% {
                filter:
                    brightness(1.12);
            }

            100% {
                filter:
                    brightness(1);
            }
        }


        /* ============================================
           REDUCED MOTION
        ============================================ */

        @media (prefers-reduced-motion: reduce) {

            .birthday-particle,
            .birthday-confetti,
            .flame-lit,
            .flame-extinguished,
            .cake-celebration,
            .birthday-message-visible,
            .birthday-celebration,
            .wish-attention {
                animation: none !important;
            }

        }


        /* ============================================
           MOBILE PERFORMANCE
        ============================================ */

        @media (max-width: 700px) {

            .birthday-particle {
                animation-duration: 1.8s;
            }

            .birthday-confetti {
                animation-duration: 1.5s;
            }

        }

    `;

    document.head.appendChild(style);


    /* ---------------------------------------------------------
       DEBUG
    --------------------------------------------------------- */

    window.birthdayDebug = () => {

        console.table({

            birthdayPage:
                !!birthdayPage,

            cake:
                !!cake,

            candles:
                candles.length,

            flames:
                flames.length,

            wishButton:
                !!wishButton,

            wishText:
                !!wishText,

            birthdayMessage:
                !!birthdayMessage,

            continueButton:
                !!continueButton,

            candleSound:
                !!candleSound,

            music:
                !!music,

            wishMade:
                wishMade
        });

    };


    /* ---------------------------------------------------------
       INITIAL CANDLE SETUP
    --------------------------------------------------------- */

    if (candles.length > 0) {
        lightCandles();
    }


    /* ---------------------------------------------------------
       PAGE READY
    --------------------------------------------------------- */

    document.body.classList.add(
        "birthday-js-ready"
    );

});
