/* =========================================================
   KITTIES LITTLE WORLD
   SCRIPT.JS
   Main Website Controller
   ========================================================= */

"use strict";


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileNavigation();
    initNextPageButtons();
    initPageLinks();
    initExternalLinks();
    initCardTilt();
    initSmoothInteractions();

});


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function initMobileNavigation() {

    const menuButton =
        document.querySelector(".mobile-menu-button");

    const navigation =
        document.querySelector(".navigation-links");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("is-open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.classList.toggle(
            "is-active",
            isOpen
        );

    });


    /* Close menu after selecting a link */

    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove(
                    "is-open"
                );

                menuButton.classList.remove(
                    "is-active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


    /* Close when clicking outside */

    document.addEventListener("click", event => {

        if (
            !navigation.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            navigation.classList.remove(
                "is-open"
            );

            menuButton.classList.remove(
                "is-active"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

}


/* =========================================================
   NEXT PAGE BUTTONS
   ========================================================= */

function initNextPageButtons() {

    const nextButtons =
        document.querySelectorAll(
            "[data-next-page], .next-page-button"
        );

    nextButtons.forEach(button => {

        button.addEventListener("click", event => {

            const target =
                button.dataset.nextPage;

            if (!target) {
                return;
            }

            event.preventDefault();

            navigateToPage(target);

        });

    });

}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function navigateToPage(url) {

    if (!url) {
        return;
    }

    document.body.classList.add(
        "is-leaving"
    );

    window.setTimeout(() => {

        window.location.href = url;

    }, 280);

}


/* =========================================================
   NORMAL PAGE LINKS
   ========================================================= */

function initPageLinks() {

    const links =
        document.querySelectorAll(
            'a[href]:not([target="_blank"])'
        );

    links.forEach(link => {

        const href =
            link.getAttribute("href");

        if (
            !href ||
            href === "#" ||
            href.startsWith("javascript:")
        ) {
            return;
        }

        link.addEventListener("click", event => {

            if (
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            if (
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("#")
            ) {
                return;
            }

            event.preventDefault();

            navigateToPage(href);

        });

    });

}


/* =========================================================
   EXTERNAL LINKS
   ========================================================= */

function initExternalLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="http://"], a[href^="https://"]'
        );

    links.forEach(link => {

        link.addEventListener("click", event => {

            event.stopPropagation();

        });

    });

}


/* =========================================================
   PREMIUM 3D CARD TILT
   ========================================================= */

function initCardTilt() {

    const cards =
        document.querySelectorAll(
            ".intro-feature-card, " +
            ".journey-card, " +
            ".home-final-card, " +
            ".home-navigation-card, " +
            ".home-next-card"
        );

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth <= 850) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            const rotateX =
                ((centerY - y) / centerY) * 3;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}


/* =========================================================
   SMOOTH INTERACTIONS
   ========================================================= */

function initSmoothInteractions() {

    const buttons =
        document.querySelectorAll(
            ".premium-button"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "mousedown",
            () => {
                button.classList.add(
                    "is-pressed"
                );
            }
        );

        button.addEventListener(
            "mouseup",
            () => {
                button.classList.remove(
                    "is-pressed"
                );
            }
        );

        button.addEventListener(
            "mouseleave",
            () => {
                button.classList.remove(
                    "is-pressed"
                );
            }
        );

    });

}


/* =========================================================
   PAGE EXIT
   ========================================================= */

window.addEventListener("beforeunload", () => {

    document.body.classList.add(
        "is-leaving"
    );

});
