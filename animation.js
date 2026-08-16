/* =========================================================
   KITTIES LITTLE WORLD
   ANIMATION.JS
   Premium scroll + entrance animations
   ========================================================= */

(() => {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        initScrollReveal();
        initFloatingElements();
        initCardHover();
        initHeroAnimation();
        initCounterAnimation();
    });


    /* =====================================================
       HELPERS
       ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    function initScrollReveal() {

        const elements = $$(
            `
            .memory-timeline-card,
            .memory-note,
            .never-forget-card,
            .memory-counter-card,
            .final-memory-card,
            .memories-ending-card,
            .memories-next-card,
            .surprise-paper-preview,
            .surprise-wish-card,
            .promise-card,
            .surprise-final-message,
            .gift-message
            `
        );

        if (!elements.length) return;


        elements.forEach((element, index) => {

            element.classList.add("animation-reveal");

            if (!reduceMotion) {
                element.style.setProperty(
                    "--animation-delay",
                    `${Math.min(index * 70, 420)}ms`
                );
            }

        });


        if (
            reduceMotion ||
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(element => {
                element.classList.add(
                    "animation-visible"
                );
            });

            return;
        }


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "animation-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        elements.forEach(element => {
            observer.observe(element);
        });

    }


    /* =====================================================
       FLOATING ELEMENTS
       ===================================================== */

    function initFloatingElements() {

        if (reduceMotion) return;


        const floatingElements = $$(
            `
            .floating-paw,
            .memories-next-decoration,
            .never-forget-decoration,
            .surprise-final-decoration
            `
        );


        floatingElements.forEach(
            (element, index) => {

                element.classList.add(
                    "animation-floating"
                );


                element.style.setProperty(
                    "--float-delay",
                    `${index * -1.2}s`
                );

            }
        );

    }


    /* =====================================================
       CARD HOVER
       ===================================================== */

    function initCardHover() {

        if (
            reduceMotion ||
            window.matchMedia(
                "(hover: none)"
            ).matches
        ) {
            return;
        }


        const cards = $$(
            `
            .memory-timeline-card,
            .memory-note,
            .memory-counter-card,
            .surprise-wish-card,
            .promise-card
            `
        );


        cards.forEach(card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    card.classList.add(
                        "animation-hover"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.classList.remove(
                        "animation-hover"
                    );

                }
            );

        });

    }


    /* =====================================================
       HERO ANIMATION
       ===================================================== */

    function initHeroAnimation() {

        const heroElements = $$(
            `
            .page-hero > *,
            .memories-hero > *,
            .about-hero > *,
            .letter-hero > *,
            .surprise-hero-content > *
            `
        );


        if (!heroElements.length) return;


        heroElements.forEach(
            (element, index) => {

                element.classList.add(
                    "hero-animation-item"
                );


                if (!reduceMotion) {

                    element.style.setProperty(
                        "--hero-delay",
                        `${index * 120}ms`
                    );

                }

            }
        );


        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                heroElements.forEach(
                    element => {

                        element.classList.add(
                            "hero-animation-visible"
                        );

                    }
                );

            });

        });

    }


    /* =====================================================
       COUNTER ANIMATION
       ===================================================== */

    function initCounterAnimation() {

        const counters =
            $$(".memory-counter-card strong");


        if (!counters.length) return;


        if (reduceMotion) return;


        counters.forEach(counter => {

            const original =
                counter.textContent.trim();


            const numberMatch =
                original.match(
                    /\d+(?:\.\d+)?/
                );


            if (!numberMatch) return;


            const target =
                Number(numberMatch[0]);


            if (!Number.isFinite(target)) {
                return;
            }


            const suffix =
                original.replace(
                    numberMatch[0],
                    ""
                );


            counter.dataset.counterTarget =
                target;


            counter.dataset.counterSuffix =
                suffix;


            counter.textContent =
                "0" + suffix;

        });


        if (
            !("IntersectionObserver" in window)
        ) {

            counters.forEach(counter => {

                const target =
                    Number(
                        counter.dataset.counterTarget
                    );


                if (Number.isFinite(target)) {

                    counter.textContent =
                        target +
                        (
                            counter.dataset.counterSuffix ||
                            ""
                        );

                }

            });

            return;
        }


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        animateCounter(
                            entry.target
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {
            observer.observe(counter);
        });

    }


    /* =====================================================
       COUNTER ENGINE
       ===================================================== */

    function animateCounter(element) {

        const target =
            Number(
                element.dataset.counterTarget
            );


        if (!Number.isFinite(target)) {
            return;
        }


        const suffix =
            element.dataset.counterSuffix ||
            "";


        const duration = 1200;

        const startTime =
            performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.round(
                    target * eased
                );


            element.textContent =
                value + suffix;


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            }

        }


        requestAnimationFrame(
            update
        );

    }


    /* =====================================================
       PAGE VISIBILITY
       ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (reduceMotion) return;


            if (
                document.visibilityState ===
                "hidden"
            ) {

                document.body.classList.add(
                    "page-hidden"
                );

            } else {

                document.body.classList.remove(
                    "page-hidden"
                );

            }

        }
    );


})();
