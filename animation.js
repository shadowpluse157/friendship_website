/* =========================================================
   KITTIES LITTLE WORLD
   ANIMATION.JS
   PREMIUM 3D / SCROLL / PAGE MOTION SYSTEM
   ========================================================= */

(() => {
    "use strict";

    /* =====================================================
       HELPERS
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =====================================================
       PAGE ENTER
       ===================================================== */

    function initPageEnter() {

        if (prefersReducedMotion) {
            return;
        }

        requestAnimationFrame(() => {

            document.body.classList.add(
                "animation-ready"
            );

        });

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    function initScrollReveal() {

        const revealElements =
            document.querySelectorAll(
                `
                .reveal,
                .intro-feature-card,
                .journey-card,
                .distance-message-card,
                .home-final-card,
                .home-navigation-card,
                .home-next-card,
                .memory-card,
                .letter-card,
                .about-card
                `
            );


        if (!revealElements.length) {
            return;
        }


        /*
         * Reduced-motion users get
         * everything immediately.
         */

        if (prefersReducedMotion) {

            revealElements.forEach(
                element => {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );

            return;

        }


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold:
                        0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal"
                );

                observer.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       3D CARD TILT
       ===================================================== */

    function init3DCardTilt() {

        if (prefersReducedMotion) {
            return;
        }


        /*
         * Disable tilt on touch devices.
         */

        const touchDevice =
            window.matchMedia(
                "(hover: none), (pointer: coarse)"
            ).matches;


        if (touchDevice) {
            return;
        }


        const cards =
            document.querySelectorAll(
                `
                .home-hero-card,
                .intro-feature-card,
                .journey-card,
                .distance-message-card,
                .home-final-card,
                .home-navigation-card,
                .home-next-card,
                .letter-card,
                .about-card,
                .memory-card
                `
            );


        cards.forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        (
                            (x - centerX) /
                            centerX
                        ) * 4;


                    const rotateX =
                        -(
                            (y - centerY) /
                            centerY
                        ) * 4;


                    card.style.transform =
                        `
                        perspective(1100px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-6px)
                        scale(1.008)
                        `;

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       BUTTON MAGNETIC EFFECT
       ===================================================== */

    function initButtonMotion() {

        if (prefersReducedMotion) {
            return;
        }


        const touchDevice =
            window.matchMedia(
                "(hover: none), (pointer: coarse)"
            ).matches;


        if (touchDevice) {
            return;
        }


        const buttons =
            document.querySelectorAll(
                ".premium-button"
            );


        buttons.forEach(button => {

            button.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `
                        translate(
                            ${x * 0.08}px,
                            ${y * 0.08}px
                        )
                        translateY(-3px)
                        scale(1.01)
                        `;

                }
            );


            button.addEventListener(
                "pointerleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       PAGE EXIT
       ===================================================== */

    function initPageExit() {

        const links =
            document.querySelectorAll(
                'a[href$=".html"]'
            );


        links.forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (!href) {
                        return;
                    }


                    if (
                        href.startsWith("#") ||
                        href.startsWith("http")
                    ) {
                        return;
                    }


                    /*
                     * script.js also handles
                     * navigation. This class simply
                     * lets animation.css animate it.
                     */

                    document.body.classList.add(
                        "page-leaving"
                    );

                }
            );

        });

    }


    /* =====================================================
       KITTY HOVER
       ===================================================== */

    function initKittyHover() {

        const kittyElements =
            document.querySelectorAll(
                `
                .home-hero-card-kitty,
                .hero-card-kitty,
                .journey-card-icon,
                .intro-feature-icon,
                .home-final-kitty,
                .home-navigation-kitty,
                .home-next-kitty,
                .distance-message-kitty
                `
            );


        kittyElements.forEach(
            kitty => {

                kitty.addEventListener(
                    "mouseenter",
                    () => {

                        kitty.classList.add(
                            "kitty-excited"
                        );

                    }
                );


                kitty.addEventListener(
                    "mouseleave",
                    () => {

                        kitty.classList.remove(
                            "kitty-excited"
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       GIFT OPEN SUPPORT
       ===================================================== */

    function initGiftAnimation() {

        const gifts =
            document.querySelectorAll(
                `
                [data-gift],
                .gift-box,
                .gift-button,
                .surprise-gift
                `
            );


        gifts.forEach(gift => {

            gift.addEventListener(
                "click",
                () => {

                    gift.classList.add(
                        "gift-opening"
                    );


                    document.body.classList.add(
                        "surprise-opening"
                    );


                    setTimeout(() => {

                        gift.classList.add(
                            "gift-opened"
                        );

                    }, 350);

                }
            );

        });

    }


    /* =====================================================
       FLOATING BACKGROUND PARALLAX
       ===================================================== */

    function initBackgroundParallax() {

        if (prefersReducedMotion) {
            return;
        }


        const background =
            document.querySelector(
                ".page-background"
            );


        if (!background) {
            return;
        }


        const touchDevice =
            window.matchMedia(
                "(hover: none), (pointer: coarse)"
            ).matches;


        if (touchDevice) {
            return;
        }


        let ticking = false;


        window.addEventListener(
            "mousemove",
            event => {

                if (ticking) {
                    return;
                }


                ticking = true;


                requestAnimationFrame(
                    () => {

                        const x =
                            (
                                event.clientX /
                                window.innerWidth
                            ) - 0.5;


                        const y =
                            (
                                event.clientY /
                                window.innerHeight
                            ) - 0.5;


                        background.style.transform =
                            `
                            translate(
                                ${x * 8}px,
                                ${y * 8}px
                            )
                            scale(1.03)
                            `;


                        ticking = false;

                    }
                );

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       IMAGE LAZY REVEAL
       ===================================================== */

    function initImages() {

        const images =
            document.querySelectorAll(
                "img"
            );


        images.forEach(image => {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "image-loaded"
                    );

                },
                {
                    once: true
                }
            );

        });

    }


    /* =====================================================
       INITIALISE EVERYTHING
       ===================================================== */

    function init() {

        initPageEnter();
        initScrollReveal();
        init3DCardTilt();
        initButtonMotion();
        initPageExit();
        initKittyHover();
        initGiftAnimation();
        initBackgroundParallax();
        initImages();

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

    window.KittiesAnimations = {

        refresh() {

            initScrollReveal();

        }

    };

})();
