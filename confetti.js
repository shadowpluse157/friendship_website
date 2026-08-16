(() => {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {

        /* =====================================================
           CONFETTI SYSTEM
           KITTIES LITTLE WORLD
           ===================================================== */

        let confettiContainer = null;
        let confettiRunning = false;


        /* =====================================================
           CREATE CONTAINER
           ===================================================== */

        function createConfettiContainer() {

            if (confettiContainer) {
                return confettiContainer;
            }

            confettiContainer = document.createElement("div");

            confettiContainer.className =
                "kitty-confetti-container";

            confettiContainer.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.appendChild(
                confettiContainer
            );

            addConfettiStyles();

            return confettiContainer;
        }


        /* =====================================================
           CONFETTI CSS
           ===================================================== */

        function addConfettiStyles() {

            if (
                document.getElementById(
                    "kitty-confetti-styles"
                )
            ) {
                return;
            }

            const style =
                document.createElement("style");

            style.id =
                "kitty-confetti-styles";

            style.textContent = `

                .kitty-confetti-container {
                    position: fixed;
                    inset: 0;

                    z-index: 99990;

                    overflow: hidden;

                    pointer-events: none;
                }


                .kitty-confetti {
                    position: absolute;

                    top: -30px;
                    left: 0;

                    width: 10px;
                    height: 10px;

                    pointer-events: none;

                    will-change:
                        transform,
                        opacity;

                    animation:
                        kittyConfettiFall
                        var(--fall-duration)
                        linear
                        forwards;
                }


                .kitty-confetti--heart {
                    width: auto;
                    height: auto;

                    background: transparent !important;

                    font-size:
                        var(--confetti-size);

                    line-height: 1;

                    animation:
                        kittyHeartFall
                        var(--fall-duration)
                        ease-in
                        forwards;
                }


                .kitty-confetti--paw {
                    width: auto;
                    height: auto;

                    background: transparent !important;

                    font-size:
                        var(--confetti-size);

                    line-height: 1;

                    animation:
                        kittyPawFall
                        var(--fall-duration)
                        ease-in
                        forwards;
                }


                @keyframes kittyConfettiFall {

                    0% {
                        opacity: 0;

                        transform:
                            translate3d(
                                0,
                                -20px,
                                0
                            )
                            rotate(0deg)
                            scale(.8);
                    }

                    10% {
                        opacity: 1;
                    }

                    50% {
                        transform:
                            translate3d(
                                var(--drift),
                                50vh,
                                0
                            )
                            rotate(
                                var(--rotation)
                            )
                            scale(1);
                    }

                    100% {
                        opacity: 0;

                        transform:
                            translate3d(
                                calc(
                                    var(--drift) * -1
                                ),
                                110vh,
                                0
                            )
                            rotate(
                                calc(
                                    var(--rotation) * -1
                                )
                            )
                            scale(.7);
                    }

                }


                @keyframes kittyHeartFall {

                    0% {
                        opacity: 0;

                        transform:
                            translate3d(
                                0,
                                -20px,
                                0
                            )
                            rotate(-10deg)
                            scale(.6);
                    }

                    12% {
                        opacity: 1;
                    }

                    50% {
                        transform:
                            translate3d(
                                var(--drift),
                                50vh,
                                0
                            )
                            rotate(12deg)
                            scale(1);
                    }

                    100% {
                        opacity: 0;

                        transform:
                            translate3d(
                                calc(
                                    var(--drift) * -1
                                ),
                                110vh,
                                0
                            )
                            rotate(-15deg)
                            scale(.75);
                    }

                }


                @keyframes kittyPawFall {

                    0% {
                        opacity: 0;

                        transform:
                            translate3d(
                                0,
                                -20px,
                                0
                            )
                            rotate(0deg)
                            scale(.7);
                    }

                    15% {
                        opacity: 1;
                    }

                    50% {
                        transform:
                            translate3d(
                                var(--drift),
                                50vh,
                                0
                            )
                            rotate(-15deg)
                            scale(1);
                    }

                    100% {
                        opacity: 0;

                        transform:
                            translate3d(
                                calc(
                                    var(--drift) * -1
                                ),
                                110vh,
                                0
                            )
                            rotate(20deg)
                            scale(.65);
                    }

                }


                @media (prefers-reduced-motion: reduce) {

                    .kitty-confetti {
                        animation-duration:
                            .01ms !important;
                    }

                }

            `;

            document.head.appendChild(style);
        }


        /* =====================================================
           CREATE SINGLE CONFETTI
           ===================================================== */

        function createPiece(
            x,
            type = "normal"
        ) {

            const container =
                createConfettiContainer();

            const piece =
                document.createElement("span");

            piece.className =
                "kitty-confetti";


            const colors = [
                "#e9b8c4",
                "#d8cce8",
                "#cbdde7",
                "#f3c9b9",
                "#d9a6b2",
                "#c88a9b"
            ];


            const color =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            const duration =
                2.5 +
                Math.random() * 2.2;


            const drift =
                (Math.random() * 260) - 130;


            const rotation =
                Math.floor(
                    Math.random() * 720
                ) + 180;


            const size =
                6 +
                Math.random() * 8;


            piece.style.left =
                `${x}%`;

            piece.style.setProperty(
                "--fall-duration",
                `${duration}s`
            );

            piece.style.setProperty(
                "--drift",
                `${drift}px`
            );

            piece.style.setProperty(
                "--rotation",
                `${rotation}deg`
            );

            piece.style.setProperty(
                "--confetti-size",
                `${size}px`
            );


            if (type === "heart") {

                piece.classList.add(
                    "kitty-confetti--heart"
                );

                piece.textContent = "♥";

                piece.style.color =
                    color;

            } else if (type === "paw") {

                piece.classList.add(
                    "kitty-confetti--paw"
                );

                piece.textContent = "🐾";

                piece.style.fontSize =
                    `${size + 4}px`;

            } else {

                piece.style.background =
                    color;

                piece.style.borderRadius =
                    Math.random() > .5
                        ? "50%"
                        : "3px";

                piece.style.transform =
                    `rotate(
                        ${Math.random() * 180}deg
                    )`;
            }


            container.appendChild(piece);


            setTimeout(() => {

                piece.remove();

            }, (duration + .5) * 1000);
        }


        /* =====================================================
           BIG BURST
           ===================================================== */

        function launchConfetti(
            amount = 100
        ) {

            if (confettiRunning) {
                return;
            }

            confettiRunning = true;

            createConfettiContainer();


            const safeAmount =
                Math.min(
                    Math.max(amount, 20),
                    180
                );


            for (
                let i = 0;
                i < safeAmount;
                i++
            ) {

                setTimeout(() => {

                    const random =
                        Math.random();

                    let type =
                        "normal";

                    if (random < .18) {
                        type = "heart";
                    } else if (random < .30) {
                        type = "paw";
                    }

                    createPiece(
                        Math.random() * 100,
                        type
                    );

                }, i * 15);
            }


            setTimeout(() => {

                confettiRunning = false;

            }, 2500);
        }


        /* =====================================================
           SMALL BURST
           ===================================================== */

        function smallConfettiBurst() {

            createConfettiContainer();

            for (
                let i = 0;
                i < 30;
                i++
            ) {

                setTimeout(() => {

                    const random =
                        Math.random();

                    createPiece(
                        35 +
                        Math.random() * 30,
                        random < .3
                            ? "heart"
                            : "normal"
                    );

                }, i * 18);
            }
        }


        /* =====================================================
           EXPOSE FUNCTIONS
           ===================================================== */

        window.kittyConfetti =
            launchConfetti;

        window.smallKittyConfetti =
            smallConfettiBurst;


        /* =====================================================
           GIFT BOX CLICK
           ===================================================== */

        const giftBox =
            document.querySelector(
                ".gift-box"
            );


        if (giftBox) {

            giftBox.addEventListener(
                "click",
                () => {

                    launchConfetti(120);

                },
                { passive: true }
            );

        }


        /* =====================================================
           COMMON BUTTON TRIGGERS
           ===================================================== */

        const confettiButtons =
            document.querySelectorAll(
                `
                [data-confetti],
                .confetti-button,
                .surprise-button
                `
            );


        confettiButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        smallConfettiBurst();

                    }
                );

            }
        );


        /* =====================================================
           OPTIONAL DATA ATTRIBUTE
           ===================================================== */

        document
            .querySelectorAll(
                "[data-confetti-burst]"
            )
            .forEach((element) => {

                element.addEventListener(
                    "click",
                    () => {

                        const amount =
                            parseInt(
                                element
                                    .dataset
                                    .confettiBurst,
                                10
                            ) || 100;

                        launchConfetti(
                            amount
                        );

                    }
                );

            });


        /* =====================================================
           CLEANUP
           ===================================================== */

        window.addEventListener(
            "beforeunload",
            () => {

                if (
                    confettiContainer
                ) {

                    confettiContainer.remove();

                    confettiContainer =
                        null;
                }

            }
        );

    });

})();
