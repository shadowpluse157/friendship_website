/* =========================================================
   KITTIES LITTLE WORLD
   CURSOR.JS
   Premium Kitty Cursor
   ========================================================= */

"use strict";


/* =========================================================
   CURSOR INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initKittyCursor();

});


/* =========================================================
   MAIN CURSOR
   ========================================================= */

function initKittyCursor() {

    /*
     * Custom cursor is only useful on devices
     * that actually have a fine pointer.
     */

    const finePointer =
        window.matchMedia("(pointer: fine)");

    if (!finePointer.matches) {
        return;
    }


    /* Prevent duplicate cursor */

    if (
        document.querySelector(
            ".kitty-cursor"
        )
    ) {
        return;
    }


    /* Create cursor */

    const cursor =
        document.createElement("div");

    cursor.className =
        "kitty-cursor";

    cursor.setAttribute(
        "aria-hidden",
        "true"
    );


    /* Inner glow */

    const cursorGlow =
        document.createElement("span");

    cursorGlow.className =
        "kitty-cursor-glow";


    /* Kitty face */

    const cursorFace =
        document.createElement("span");

    cursorFace.className =
        "kitty-cursor-face";

    cursorFace.textContent =
        "🐾";


    cursor.appendChild(
        cursorGlow
    );

    cursor.appendChild(
        cursorFace
    );

    document.body.appendChild(
        cursor
    );


    /* =====================================================
       CURSOR POSITION
       ===================================================== */

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

            cursor.classList.add(
                "is-visible"
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       SMOOTH MOVEMENT
       ===================================================== */

    function animateCursor() {

        currentX +=
            (mouseX - currentX) * 0.18;

        currentY +=
            (mouseY - currentY) * 0.18;

        cursor.style.transform =
            `translate3d(
                ${currentX}px,
                ${currentY}px,
                0
            ) translate(-50%, -50%)`;

        requestAnimationFrame(
            animateCursor
        );

    }

    animateCursor();


    /* =====================================================
       CLICK EFFECT
       ===================================================== */

    document.addEventListener(
        "mousedown",
        () => {

            cursor.classList.add(
                "is-clicking"
            );

        }
    );


    document.addEventListener(
        "mouseup",
        () => {

            cursor.classList.remove(
                "is-clicking"
            );

        }
    );


    /* =====================================================
       INTERACTIVE ELEMENTS
       ===================================================== */

    const interactiveSelector =
        [
            "a",
            "button",
            "input",
            "textarea",
            "select",
            ".premium-button",
            ".mobile-menu-button",
            ".intro-feature-card",
            ".journey-card",
            ".home-final-card",
            ".home-navigation-card",
            ".home-next-card"
        ].join(",");


    document.addEventListener(
        "mouseover",
        event => {

            const target =
                event.target.closest(
                    interactiveSelector
                );

            if (!target) {
                return;
            }

            cursor.classList.add(
                "is-hovering"
            );

        }
    );


    document.addEventListener(
        "mouseout",
        event => {

            const target =
                event.target.closest(
                    interactiveSelector
                );

            if (!target) {
                return;
            }

            cursor.classList.remove(
                "is-hovering"
            );

        }
    );


    /* =====================================================
       LEAVE WINDOW
       ===================================================== */

    document.addEventListener(
        "mouseleave",
        () => {

            cursor.classList.remove(
                "is-visible"
            );

        }
    );


    document.addEventListener(
        "mouseenter",
        () => {

            cursor.classList.add(
                "is-visible"
            );

        }
    );


    /* =====================================================
       POINTER CHANGE
       ===================================================== */

    document.documentElement.classList.add(
        "has-kitty-cursor"
    );

}
