/* =========================================================
   KITTIES LITTLE WORLD
   PREMIUM WEBSITE — MAIN SCRIPT
   ========================================================= */

(() => {
    "use strict";


    /* =====================================================
       DOM READY
       ===================================================== */

    document.addEventListener("DOMContentLoaded", () => {

        initPage();

    });


    /* =====================================================
       MAIN INITIALIZER
       ===================================================== */

    function initPage() {

        initActiveNavigation();
        initHeaderScroll();
        initSmoothAnchors();
        initExternalLinks();
        initGiftInteraction();
        initKittyHover();
        initButtonEffects();
        initPageExit();
        initBackgroundParallax();
        initBackToTop();
        initLazyImages();
        initAccessibility();
        initYear();

    }


    /* =====================================================
       HELPERS
       ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);


    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];


    const prefersReducedMotion = () =>
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const isTouchDevice = () =>
        window.matchMedia(
            "(hover: none), (pointer: coarse)"
        ).matches;


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    function initActiveNavigation() {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase() || "index.html";


        const links = $$(
            ".navigation-link, .footer-link"
        );


        links.forEach(link => {

            const href =
                link.getAttribute("href");


            if (!href) return;


            if (
                href.startsWith("#") ||
                href.startsWith("http") ||
                href.startsWith("mailto:")
            ) {
                return;
            }


            const cleanHref =
                href
                    .split("#")[0]
                    .split("?")[0]
                    .split("/")
                    .pop()
                    .toLowerCase();


            const isHome =
                currentPage === "" &&
                cleanHref === "index.html";


            if (
                cleanHref === currentPage ||
                isHome
            ) {

                link.classList.add(
                    "navigation-link--active",
                    "footer-link--active"
                );


                link.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        });

    }


    /* =====================================================
       HEADER SCROLL
       ===================================================== */

    function initHeaderScroll() {

        const header =
            $(".site-header");


        if (!header) return;


        let ticking = false;


        const updateHeader = () => {

            header.classList.toggle(
                "site-header--scrolled",
                window.scrollY > 20
            );


            ticking = false;

        };


        window.addEventListener(
            "scroll",
            () => {

                if (ticking) return;


                ticking = true;


                requestAnimationFrame(
                    updateHeader
                );

            },
            {
                passive: true
            }
        );


        updateHeader();

    }


    /* =====================================================
       SMOOTH ANCHOR LINKS
       ===================================================== */

    function initSmoothAnchors() {

        const anchors =
            $$('a[href^="#"]');


        anchors.forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const href =
                        anchor.getAttribute("href");


                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(href);


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:
                            prefersReducedMotion()
                                ? "auto"
                                : "smooth",
                        block: "start"
                    });


                }
            );

        });

    }


    /* =====================================================
       EXTERNAL LINKS
       ===================================================== */

    function initExternalLinks() {

        const links =
            $$('a[href^="http"]');


        links.forEach(link => {

            link.setAttribute(
                "target",
                "_blank"
            );


            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        });

    }


    /* =====================================================
       GIFT INTERACTION
       ===================================================== */

    function initGiftInteraction() {

        const giftBox =
            $("#giftBox");


        if (!giftBox) return;


        const giftMessage =
            $("#giftMessage");


        const giftClickHint =
            $("#giftClickHint");


        const surpriseKitty =
            $("#surpriseKitty");


        const kittyPaper =
            $("#kittyPaper");


        const surpriseContent =
            $("#surpriseContent");


        let opened = false;


        giftBox.setAttribute(
            "aria-expanded",
            "false"
        );


        giftBox.addEventListener(
            "click",
            () => {

                if (opened) return;


                opened = true;


                /* -----------------------------------------
                   START OPENING
                   ----------------------------------------- */

                document.body.classList.add(
                    "gift-opening"
                );


                giftBox.classList.add(
                    "gift-opening"
                );


                giftBox.setAttribute(
                    "aria-expanded",
                    "true"
                );


                if (giftMessage) {

                    giftMessage.classList.add(
                        "is-hidden"
                    );

                }


                if (giftClickHint) {

                    giftClickHint.classList.add(
                        "is-hidden"
                    );

                }


                /* -----------------------------------------
                   GIFT OPENED
                   ----------------------------------------- */

                setTimeout(() => {

                    document.body.classList.remove(
                        "gift-opening"
                    );


                    document.body.classList.add(
                        "gift-opened"
                    );


                    giftBox.classList.add(
                        "is-open"
                    );


                    if (surpriseKitty) {

                        surpriseKitty.classList.add(
                            "is-visible"
                        );


                        surpriseKitty.setAttribute(
                            "aria-hidden",
                            "false"
                        );

                    }

                }, 850);


                /* -----------------------------------------
                   PAPER REVEAL
                   ----------------------------------------- */

                setTimeout(() => {

                    document.body.classList.add(
                        "paper-revealed"
                    );


                    if (kittyPaper) {

                        kittyPaper.classList.add(
                            "is-visible"
                        );

                    }

                }, 1500);


                /* -----------------------------------------
                   CONTENT REVEAL
                   ----------------------------------------- */

                setTimeout(() => {

                    document.body.classList.add(
                        "surprise-revealed"
                    );


                    if (surpriseContent) {

                        surpriseContent.classList.add(
                            "is-visible"
                        );

                    }

                }, 1900);


            }
        );


        /* Keyboard accessibility */

        giftBox.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();


                    giftBox.click();

                }

            }
        );

    }


    /* =====================================================
       KITTY HOVER
       ===================================================== */

    function initKittyHover() {

        if (isTouchDevice()) return;


        const kittyElements =
            $$(
                `
                .home-hero-card-kitty,
                .hero-card-kitty,
                .journey-card-icon,
                .intro-feature-icon,
                .home-final-kitty,
                .home-navigation-kitty,
                .home-next-kitty,
                .distance-message-kitty,
                .footer-kitty,
                .gift-message-kitty,
                .surprise-final-kitty
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
       BUTTON EFFECTS
       ===================================================== */

    function initButtonEffects() {

        if (
            prefersReducedMotion() ||
            isTouchDevice()
        ) {
            return;
        }


        const buttons =
            $$(".premium-button");


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
                            ${x * 0.06}px,
                            ${y * 0.06}px
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
            $$('a[href$=".html"]');


        links.forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (!href) return;


                    if (
                        href.startsWith("#") ||
                        href.startsWith("http") ||
                        href.startsWith("mailto:")
                    ) {
                        return;
                    }


                    /*
                     * Don't interfere with
                     * Ctrl / Cmd click,
                     * middle click or new tabs.
                     */

                    if (
                        event.ctrlKey ||
                        event.metaKey ||
                        event.shiftKey ||
                        event.button !== 0
                    ) {
                        return;
                    }


                    document.body.classList.add(
                        "page-leaving"
                    );

                }
            );

        });

    }


    /* =====================================================
       BACKGROUND PARALLAX
       ===================================================== */

    function initBackgroundParallax() {

        if (
            prefersReducedMotion() ||
            isTouchDevice()
        ) {
            return;
        }


        const background =
            $(".page-background");


        if (!background) return;


        let ticking = false;


        window.addEventListener(
            "mousemove",
            event => {

                if (ticking) return;


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
                                ${x * 6}px,
                                ${y * 6}px
                            )
                            scale(1.02)
                            `;


                        ticking = false;

                    }
                );

            },
            {
                passive: true
            }
        );


        window.addEventListener(
            "mouseleave",
            () => {

                background.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    function initBackToTop() {

        const button =
            $(".back-to-top");


        if (!button) return;


        const update =
            () => {

                button.classList.toggle(
                    "is-visible",
                    window.scrollY > 500
                );

            };


        window.addEventListener(
            "scroll",
            update,
            {
                passive: true
            }
        );


        button.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior:
                        prefersReducedMotion()
                            ? "auto"
                            : "smooth"
                });

            }
        );


        update();

    }


    /* =====================================================
       LAZY IMAGES
       ===================================================== */

    function initLazyImages() {

        const images =
            $$("img[data-src]");


        if (!images.length) return;


        if (
            !("IntersectionObserver" in window)
        ) {

            images.forEach(
                image => {

                    const src =
                        image.dataset.src;


                    if (src) {

                        image.src = src;

                    }

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


                            const image =
                                entry.target;


                            const src =
                                image.dataset.src;


                            if (src) {

                                image.src = src;

                            }


                            image.removeAttribute(
                                "data-src"
                            );


                            observer.unobserve(
                                image
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "150px 0px"
                }
            );


        images.forEach(
            image => {

                observer.observe(image);

            }
        );

    }


    /* =====================================================
       ACCESSIBILITY
       ===================================================== */

    function initAccessibility() {

        const buttons =
            $$("button");


        buttons.forEach(button => {

            if (
                !button.hasAttribute(
                    "type"
                )
            ) {

                button.setAttribute(
                    "type",
                    "button"
                );

            }

        });


        const giftBox =
            $("#giftBox");


        if (giftBox) {

            if (
                !giftBox.hasAttribute(
                    "aria-label"
                )
            ) {

                giftBox.setAttribute(
                    "aria-label",
                    "Open the surprise gift"
                );

            }

        }

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    function initYear() {

        const yearElements =
            $$("[data-current-year]");


        yearElements.forEach(
            element => {

                element.textContent =
                    new Date().getFullYear();

            }
        );

    }


})();
