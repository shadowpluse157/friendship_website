/* =========================================================
   KITTIES LITTLE WORLD
   CONFETTI.JS
   Premium Kitty Celebration Confetti
   ========================================================= */

(function () {
    "use strict";


    /* =====================================================
       CONFIG
       ===================================================== */

    const CONFETTI_COUNT = 70;
    const CONFETTI_DURATION_MIN = 2.2;
    const CONFETTI_DURATION_MAX = 3.8;


    /* =====================================================
       HELPERS
       ===================================================== */

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function randomInt(min, max) {
        return Math.floor(random(min, max + 1));
    }


    /* =====================================================
       CONFETTI COLORS
       ===================================================== */

    const colors = [
        "#ffb6c8",
        "#ffd6df",
        "#f7a8bd",
        "#fff0f4",
        "#e8b4c8",
        "#d9a7bd",
        "#ffffff"
    ];


    /* =====================================================
       CREATE CONFETTI PIECE
       ===================================================== */

    function createConfettiPiece() {

        const piece = document.createElement("span");

        piece.className =
            "confetti-piece";


        /* ---------- SIZE ---------- */

        const width =
            random(5, 9);

        const height =
            random(7, 14);


        /* ---------- START POSITION ---------- */

        const startX =
            random(5, 95);


        /* ---------- FALL DISTANCE ---------- */

        const fallY =
            random(75, 115);


        /* ---------- HORIZONTAL MOVEMENT ---------- */

        const moveX =
            random(-180, 180);


        /* ---------- ROTATION ---------- */

        const rotation =
            randomInt(360, 1080);


        /* ---------- DURATION ---------- */

        const duration =
            random(
                CONFETTI_DURATION_MIN,
                CONFETTI_DURATION_MAX
            );


        /* ---------- SHAPE ---------- */

        const shape =
            randomInt(0, 2);


        piece.style.position =
            "fixed";

        piece.style.left =
            `${startX}vw`;

        piece.style.top =
            `${random(-5, 8)}vh`;

        piece.style.width =
            `${width}px`;

        piece.style.height =
            `${height}px`;

        piece.style.background =
            colors[
                randomInt(
                    0,
                    colors.length - 1
                )
            ];

        piece.style.borderRadius =
            shape === 0
                ? "2px"
                : "50%";

        piece.style.zIndex =
            "9999";

        piece.style.pointerEvents =
            "none";

        piece.style.setProperty(
            "--confetti-x",
            `${moveX}px`
        );

        piece.style.setProperty(
            "--confetti-y",
            `${fallY}vh`
        );

        piece.style.setProperty(
            "--confetti-rotate",
            `${rotation}deg`
        );

        piece.style.setProperty(
            "--confetti-duration",
            `${duration}s`
        );


        /* ---------- RANDOM DELAY ---------- */

        piece.style.animationDelay =
            `${random(0, 0.45)}s`;


        return piece;
    }


    /* =====================================================
       BURST
       ===================================================== */

    function launchConfetti(
        count = CONFETTI_COUNT
    ) {

        const fragment =
            document.createDocumentFragment();

        const pieces = [];


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const piece =
                createConfettiPiece();

            fragment.appendChild(
                piece
            );

            pieces.push(
                piece
            );
        }


        document.body.appendChild(
            fragment
        );


        /* ---------- CLEANUP ---------- */

        const cleanupTime =
            (CONFETTI_DURATION_MAX + 1) *
            1000;


        window.setTimeout(
            function () {

                pieces.forEach(
                    function (piece) {

                        if (
                            piece &&
                            piece.parentNode
                        ) {
                            piece.parentNode.removeChild(
                                piece
                            );
                        }

                    }
                );

            },
            cleanupTime
        );
    }


    /* =====================================================
       DOUBLE BURST
       ===================================================== */

    function celebrate() {

        launchConfetti(
            CONFETTI_COUNT
        );

        window.setTimeout(
            function () {

                launchConfetti(
                    Math.floor(
                        CONFETTI_COUNT * 0.45
                    )
                );

            },
            280
        );
    }


    /* =====================================================
       GLOBAL API
       Allows animation.js / script.js to trigger it
       ===================================================== */

    window.KittiesConfetti = {
        launch:
            launchConfetti,

        celebrate:
            celebrate
    };


    /* =====================================================
       SURPRISE / GIFT SUPPORT
       No duplicate click handler
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const target =
                event.target.closest(
                    "[data-confetti]"
                );


            if (!target) {
                return;
            }


            /* Prevent accidental double firing */

            if (
                target.dataset.confettiFired ===
                "true"
            ) {
                return;
            }


            target.dataset.confettiFired =
                "true";


            celebrate();


            /* Allow another celebration later */

            window.setTimeout(
                function () {

                    delete target.dataset.confettiFired;

                },
                1500
            );

        }
    );


    /* =====================================================
       SURPRISE GIFT SUPPORT
       If gift has data-gift-confetti,
       celebration happens when opened.
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const gift =
                event.target.closest(
                    "[data-gift-confetti]"
                );


            if (!gift) {
                return;
            }


            /* Only celebrate once per opening */

            if (
                gift.classList.contains(
                    "is-open"
                )
            ) {
                return;
            }


            window.setTimeout(
                function () {

                    celebrate();

                },
                450
            );

        }
    );


    /* =====================================================
       OPTIONAL MANUAL TRIGGER
       ===================================================== */

    window.addEventListener(
        "kitties:celebrate",
        function () {

            celebrate();

        }
    );


})();
