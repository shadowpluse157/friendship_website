/* =========================================================
   KITTIES LITTLE WORLD
   CURSOR.JS
   PREMIUM KITTY / PAW CURSOR
   ========================================================= */

(() => {
    "use strict";

    /* =====================================================
       TOUCH DEVICE CHECK
       ===================================================== */

    const isTouchDevice =
        window.matchMedia(
            "(hover: none), (pointer: coarse)"
        ).matches;

    if (isTouchDevice) {
        return;
    }


    /* =====================================================
       CREATE CUSTOM CURSOR
       ===================================================== */

    const cursor =
        document.createElement("div");

    cursor.className =
        "kitty-cursor";

    cursor.setAttribute(
        "aria-hidden",
        "true"
    );


    cursor.innerHTML = `
        <span class="kitty-cursor-main">
            🐾
        </span>

        <span class="kitty-cursor-ring"></span>
    `;


    document.body.appendChild(cursor);


    /* =====================================================
       CURSOR POSITION
       ===================================================== */

    let mouseX = -100;
    let mouseY = -100;

    let currentX = mouseX;
    let currentY = mouseY;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        },
        {
            passive: true
        }
    );


    /* =====================================================
       SMOOTH CURSOR MOTION
       ===================================================== */

    function animateCursor() {

        currentX +=
            (mouseX - currentX) * 0.18;

        currentY +=
            (mouseY - currentY) * 0.18;


        cursor.style.transform =
            `
            translate3d(
                ${currentX}px,
                ${currentY}px,
                0
            )
            translate(-50%, -50%)
            `;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    /* =====================================================
       INTERACTIVE ELEMENTS
       ===================================================== */

    const interactiveSelector = `
        a,
        button,
        input,
        textarea,
        select,
        [role="button"],
        .premium-button,
        .journey-card,
        .intro-feature-card
    `;


    function activateCursor() {

        cursor.classList.add(
            "is-hovering"
        );

    }


    function deactivateCursor() {

        cursor.classList.remove(
            "is-hovering"
        );

    }


    document.addEventListener(
        "mouseover",
        event => {

            const target =
                event.target.closest(
                    interactiveSelector
                );


            if (target) {
                activateCursor();
            }

        }
    );


    document.addEventListener(
        "mouseout",
        event => {

            const target =
                event.target.closest(
                    interactiveSelector
                );


            if (target) {
                deactivateCursor();
            }

        }
    );


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
       PAW TRAIL
       ===================================================== */

    let lastTrailTime = 0;

    const TRAIL_DELAY = 90;


    document.addEventListener(
        "mousemove",
        event => {

            const now =
                performance.now();


            if (
                now - lastTrailTime <
                TRAIL_DELAY
            ) {
                return;
            }


            lastTrailTime = now;


            createPawTrail(
                event.clientX,
                event.clientY
            );

        },
        {
            passive: true
        }
    );


    function createPawTrail(
        x,
        y
    ) {

        const paw =
            document.createElement(
                "span"
            );


        paw.className =
            "kitty-paw-trail";


        paw.textContent =
            "🐾";


        paw.style.left =
            `${x}px`;

        paw.style.top =
            `${y}px`;


        document.body.appendChild(
            paw
        );


        setTimeout(() => {

            paw.remove();

        }, 650);

    }


    /* =====================================================
       HIDE CUSTOM CURSOR WHEN LEAVING WINDOW
       ===================================================== */

    document.addEventListener(
        "mouseleave",
        () => {

            cursor.classList.add(
                "is-hidden"
            );

        }
    );


    document.addEventListener(
        "mouseenter",
        () => {

            cursor.classList.remove(
                "is-hidden"
            );

        }
    );


    /* =====================================================
       PUBLIC API
       ===================================================== */

    window.KittiesCursor = {

        enable() {
            cursor.classList.remove(
                "is-hidden"
            );
        },

        disable() {
            cursor.classList.add(
                "is-hidden"
            );
        }

    };

})();
