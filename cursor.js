(() => {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {

        /* =====================================================
           CUSTOM CURSOR
           ===================================================== */

        const isTouchDevice =
            window.matchMedia("(hover: none), (pointer: coarse)").matches;

        if (isTouchDevice) {
            return;
        }

        const cursor = document.createElement("div");
        const cursorDot = document.createElement("div");

        cursor.className = "custom-cursor";
        cursorDot.className = "custom-cursor-dot";

        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);


        /* =====================================================
           CURSOR POSITION
           ===================================================== */

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let cursorX = mouseX;
        let cursorY = mouseY;


        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

        });


        /* =====================================================
           SMOOTH CURSOR
           ===================================================== */

        function animateCursor() {

            cursorX += (mouseX - cursorX) * 0.18;
            cursorY += (mouseY - cursorY) * 0.18;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();


        /* =====================================================
           CLICK EFFECT
           ===================================================== */

        document.addEventListener("click", (event) => {

            createClickEffect(
                event.clientX,
                event.clientY
            );

        });


        function createClickEffect(x, y) {

            const effect = document.createElement("span");

            effect.className = "cursor-click-effect";

            effect.textContent = "♡";

            effect.style.left = `${x}px`;
            effect.style.top = `${y}px`;

            document.body.appendChild(effect);

            setTimeout(() => {
                effect.remove();
            }, 700);

        }


        /* =====================================================
           INTERACTIVE ELEMENTS
           ===================================================== */

        const interactiveElements = document.querySelectorAll(
            `
            a,
            button,
            input,
            textarea,
            select,
            .gift-box,
            .premium-button,
            .navigation-link,
            .mobile-menu-button
            `
        );


        interactiveElements.forEach((element) => {

            element.addEventListener("mouseenter", () => {

                cursor.classList.add("cursor-hover");
                cursorDot.classList.add("cursor-dot-hover");

            });


            element.addEventListener("mouseleave", () => {

                cursor.classList.remove("cursor-hover");
                cursorDot.classList.remove("cursor-dot-hover");

            });

        });


        /* =====================================================
           MOUSE DOWN
           ===================================================== */

        document.addEventListener("mousedown", () => {

            cursor.classList.add("cursor-clicking");

        });


        document.addEventListener("mouseup", () => {

            cursor.classList.remove("cursor-clicking");

        });


        /* =====================================================
           WINDOW LEAVE
           ===================================================== */

        document.addEventListener("mouseleave", () => {

            cursor.classList.add("cursor-hidden");
            cursorDot.classList.add("cursor-hidden");

        });


        document.addEventListener("mouseenter", () => {

            cursor.classList.remove("cursor-hidden");
            cursorDot.classList.remove("cursor-hidden");

        });


        /* =====================================================
           CURSOR CSS
           ===================================================== */

        const cursorStyle = document.createElement("style");

        cursorStyle.textContent = `

            .custom-cursor {
                position: fixed;
                z-index: 99999;

                width: 34px;
                height: 34px;

                pointer-events: none;

                border: 1.5px solid rgba(173, 111, 130, .65);

                border-radius: 50%;

                transform:
                    translate(-50%, -50%)
                    scale(1);

                transition:
                    width .25s ease,
                    height .25s ease,
                    border-color .25s ease,
                    background .25s ease,
                    opacity .25s ease;

                box-shadow:
                    0 5px 20px rgba(110, 70, 80, .12);

                backdrop-filter: blur(2px);
            }


            .custom-cursor-dot {
                position: fixed;
                z-index: 100000;

                width: 6px;
                height: 6px;

                pointer-events: none;

                border-radius: 50%;

                background: #ad7182;

                transform:
                    translate(-50%, -50%);

                transition:
                    width .2s ease,
                    height .2s ease,
                    opacity .2s ease;

                box-shadow:
                    0 2px 8px rgba(100, 60, 70, .2);
            }


            .custom-cursor.cursor-hover {
                width: 48px;
                height: 48px;

                background: rgba(247, 223, 228, .25);

                border-color: rgba(169, 105, 123, .8);
            }


            .custom-cursor-dot.cursor-dot-hover {
                width: 8px;
                height: 8px;
            }


            .custom-cursor.cursor-clicking {
                width: 25px;
                height: 25px;

                background: rgba(231, 174, 190, .22);
            }


            .custom-cursor.cursor-hidden,
            .custom-cursor-dot.cursor-hidden {
                opacity: 0;
            }


            .cursor-click-effect {
                position: fixed;
                z-index: 99998;

                pointer-events: none;

                color: #bd7f91;

                font-size: 20px;
                line-height: 1;

                transform:
                    translate(-50%, -50%)
                    scale(.5);

                animation:
                    cursorHeartPop .7s
                    cubic-bezier(.2,.8,.2,1)
                    forwards;
            }


            @keyframes cursorHeartPop {

                0% {
                    opacity: 0;
                    transform:
                        translate(-50%, -50%)
                        scale(.3)
                        rotate(-10deg);
                }

                20% {
                    opacity: 1;
                }

                100% {
                    opacity: 0;

                    transform:
                        translate(
                            -50%,
                            calc(-50% - 35px)
                        )
                        scale(1.25)
                        rotate(8deg);
                }

            }


            @media (hover: none), (pointer: coarse) {

                .custom-cursor,
                .custom-cursor-dot,
                .cursor-click-effect {
                    display: none !important;
                }

            }

        `;

        document.head.appendChild(cursorStyle);

    });

})();
