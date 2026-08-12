/* =========================================================
   KITTIES LITTLE WORLD
   CONFETTI.JS
   PREMIUM GIFT / SURPRISE CONFETTI SYSTEM
   ========================================================= */

(() => {
    "use strict";


    /* =====================================================
       SETTINGS
       ===================================================== */

    const DEFAULT_COUNT = 90;

    const COLORS = [
        "#f3a6bb",
        "#f7c7d5",
        "#e9a7bd",
        "#fff1f5",
        "#d88aa7",
        "#f5d6df"
    ];


    /* =====================================================
       CREATE CONFETTI CONTAINER
       ===================================================== */

    function getContainer() {

        let container =
            document.querySelector(
                ".kitty-confetti-container"
            );


        if (!container) {

            container =
                document.createElement(
                    "div"
                );

            container.className =
                "kitty-confetti-container";

            container.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.appendChild(
                container
            );

        }


        return container;

    }


    /* =====================================================
       RANDOM HELPERS
       ===================================================== */

    function random(min, max) {

        return Math.random() *
            (max - min) +
            min;

    }


    function randomItem(array) {

        return array[
            Math.floor(
                Math.random() *
                array.length
            )
        ];

    }


    /* =====================================================
       CREATE ONE PIECE
       ===================================================== */

    function createPiece(
        container,
        originX,
        originY
    ) {

        const piece =
            document.createElement(
                "span"
            );


        piece.className =
            "kitty-confetti";


        const size =
            random(5, 10);


        const rotation =
            random(
                0,
                360
            );


        const drift =
            random(
                -180,
                180
            );


        const fall =
            random(
                280,
                600
            );


        const duration =
            random(
                900,
                1800
            );


        const delay =
            random(
                0,
                180
            );


        piece.style.width =
            `${size}px`;

        piece.style.height =
            `${size * random(
                0.55,
                1.2
            )}px`;


        piece.style.left =
            `${originX}px`;

        piece.style.top =
            `${originY}px`;


        piece.style.background =
            randomItem(
                COLORS
            );


        piece.style.setProperty(
            "--confetti-x",
            `${drift}px`
        );


        piece.style.setProperty(
            "--confetti-y",
            `${fall}px`
        );


        piece.style.setProperty(
            "--confetti-rotate",
            `${rotation}deg`
        );


        piece.style.animationDuration =
            `${duration}ms`;


        piece.style.animationDelay =
            `${delay}ms`;


        container.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, duration + delay + 200);

    }


    /* =====================================================
       BURST
       ===================================================== */

    function burst(options = {}) {

        const container =
            getContainer();


        const count =
            options.count ??
            DEFAULT_COUNT;


        const originX =
            options.x ??
            window.innerWidth / 2;


        const originY =
            options.y ??
            window.innerHeight * 0.38;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            createPiece(
                container,
                originX,
                originY
            );

        }

    }


    /* =====================================================
       KITTY PAW BURST
       ===================================================== */

    function pawBurst(options = {}) {

        const count =
            options.count ?? 20;


        const originX =
            options.x ??
            window.innerWidth / 2;


        const originY =
            options.y ??
            window.innerHeight * 0.4;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const paw =
                document.createElement(
                    "span"
                );


            paw.className =
                "kitty-confetti-paw";


            paw.textContent =
                "🐾";


            paw.style.left =
                `${originX}px`;

            paw.style.top =
                `${originY}px`;


            paw.style.setProperty(
                "--confetti-x",
                `${random(
                    -150,
                    150
                )}px`
            );


            paw.style.setProperty(
                "--confetti-y",
                `${random(
                    180,
                    420
                )}px`
            );


            paw.style.setProperty(
                "--confetti-rotate",
                `${random(
                    -50,
                    50
                )}deg`
            );


            paw.style.animationDuration =
                `${random(
                    900,
                    1500
                )}ms`;


            getContainer().appendChild(
                paw
            );


            setTimeout(() => {

                paw.remove();

            }, 1800);

        }

    }


    /* =====================================================
       PREMIUM SURPRISE BURST
       ===================================================== */

    function surpriseBurst(options = {}) {

        const x =
            options.x ??
            window.innerWidth / 2;


        const y =
            options.y ??
            window.innerHeight * 0.42;


        burst({
            x,
            y,
            count:
                options.count ??
                110
        });


        setTimeout(() => {

            pawBurst({
                x,
                y,
                count: 18
            });

        }, 120);

    }


    /* =====================================================
       AUTO GIFT BUTTON SUPPORT
       ===================================================== */

    function initGiftConfetti() {

        const giftButtons =
            document.querySelectorAll(
                `
                .gift-box,
                .gift-button,
                .surprise-gift,
                [data-gift],
                [data-surprise]
                `
            );


        if (!giftButtons.length) {
            return;
        }


        giftButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        /*
                         * Prevent duplicate
                         * triggering.
                         */

                        if (
                            button.dataset
                                .confettiTriggered ===
                            "true"
                        ) {
                            return;
                        }


                        button.dataset
                            .confettiTriggered =
                            "true";


                        surpriseBurst({
                            x:
                                event.clientX,

                            y:
                                event.clientY
                        });


                        /*
                         * Allow another click
                         * after the animation.
                         */

                        setTimeout(() => {

                            delete button
                                .dataset
                                .confettiTriggered;

                        }, 2200);

                    }
                );

            }
        );

    }


    /* =====================================================
       INITIALISE
       ===================================================== */

    function init() {

        /*
         * Don't initialise automatically
         * on every page if there is no
         * gift/surprise element.
         */

        initGiftConfetti();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init,
            {
                once: true
            }
        );

    } else {

        init();

    }


    /* =====================================================
       PUBLIC API
       ===================================================== */

    window.KittiesConfetti = {

        burst,

        pawBurst,

        surpriseBurst

    };

})();
