/* =========================================================
   KITTIES LITTLE WORLD
   ANIMATION.JS
   Premium Page Animations
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE ENTER
       ===================================================== */

    document.body.classList.add("page-enter");


    /* =====================================================
       REVEAL OBSERVER
       Automatically reveals elements when they enter view
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .intro-feature-card, .journey-card, " +
        ".distance-message-card, .home-final-card, " +
        ".home-navigation-card, .home-next-card"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {

            if (!element.classList.contains("reveal")) {
                element.classList.add("reveal");
            }

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }


    /* =====================================================
       STAGGER CARD ANIMATIONS
       ===================================================== */

    const cardGroups = [
        ".intro-feature-card",
        ".journey-card"
    ];

    cardGroups.forEach((selector) => {

        const cards = document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.setProperty(
                "--animation-delay",
                `${index * 0.08}s`
            );

            card.classList.add("stagger-card");

        });

    });


    /* =====================================================
       SECTION HEADING OBSERVER
       ===================================================== */

    const headings = document.querySelectorAll(
        ".section-heading"
    );

    if ("IntersectionObserver" in window) {

        const headingObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "heading-visible"
                    );

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.2
            }
        );

        headings.forEach((heading) => {
            headingObserver.observe(heading);
        });

    } else {

        headings.forEach((heading) => {
            heading.classList.add("heading-visible");
        });

    }


    /* =====================================================
       PREMIUM 3D CARD TILT
       Desktop only
       ===================================================== */

    const tiltCards = document.querySelectorAll(
        ".intro-feature-card, " +
        ".journey-card, " +
        ".home-hero-card, " +
        ".home-final-card, " +
        ".home-navigation-card, " +
        ".home-next-card"
    );

    const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (canHover) {

        tiltCards.forEach((card) => {

            card.addEventListener("mousemove", (event) => {

                const rect = card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -2.5;

                const rotateY =
                    ((x - centerX) / centerX) * 2.5;

                card.style.setProperty(
                    "--tilt-x",
                    `${rotateX}deg`
                );

                card.style.setProperty(
                    "--tilt-y",
                    `${rotateY}deg`
                );

                card.classList.add("is-tilting");

            });


            card.addEventListener("mouseleave", () => {

                card.style.setProperty(
                    "--tilt-x",
                    "0deg"
                );

                card.style.setProperty(
                    "--tilt-y",
                    "0deg"
                );

                card.classList.remove("is-tilting");

            });

        });

    }


    /* =====================================================
       BUTTON PRESS EFFECT
       ===================================================== */

    const buttons = document.querySelectorAll(
        ".premium-button"
    );

    buttons.forEach((button) => {

        button.addEventListener("pointerdown", () => {
            button.classList.add("button-pressed");
        });

        button.addEventListener("pointerup", () => {
            button.classList.remove("button-pressed");
        });

        button.addEventListener("pointercancel", () => {
            button.classList.remove("button-pressed");
        });

        button.addEventListener("pointerleave", () => {
            button.classList.remove("button-pressed");
        });

    });


    /* =====================================================
       NEXT PAGE BUTTON
       Smooth transition before navigation
       ===================================================== */

    const nextButtons = document.querySelectorAll(
        "[data-next-page], .next-page-button"
    );

    nextButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            const destination =
                button.getAttribute("href") ||
                button.dataset.nextPage;

            if (!destination) {
                return;
            }

            event.preventDefault();

            document.body.classList.add(
                "page-leaving"
            );

            setTimeout(() => {

                window.location.href =
                    destination;

            }, 450);

        });

    });


    /* =====================================================
       KITTY HOVER / TOUCH FEEDBACK
       ===================================================== */

    const kitties = document.querySelectorAll(
        ".kitty-float, " +
        ".kitty-bob, " +
        ".distance-message-kitty, " +
        ".home-hero-card-kitty"
    );

    kitties.forEach((kitty) => {

        kitty.addEventListener("mouseenter", () => {
            kitty.classList.add("kitty-active");
        });

        kitty.addEventListener("mouseleave", () => {
            kitty.classList.remove("kitty-active");
        });

    });


    /* =====================================================
       HEART FLOAT RANDOM DELAY
       ===================================================== */

    const floatingHearts = document.querySelectorAll(
        ".heart-float"
    );

    floatingHearts.forEach((heart, index) => {

        const delay =
            (index * 0.35) % 2.5;

        heart.style.animationDelay =
            `${delay}s`;

    });


    /* =====================================================
       PARALLAX EFFECT
       Very subtle premium movement
       ===================================================== */

    const parallaxElements = document.querySelectorAll(
        "[data-parallax]"
    );

    if (
        parallaxElements.length &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        let ticking = false;

        const updateParallax = () => {

            const scrollY =
                window.scrollY;

            parallaxElements.forEach((element) => {

                const speed =
                    parseFloat(
                        element.dataset.parallax
                    ) || 0.08;

                const movement =
                    scrollY * speed;

                element.style.transform =
                    `translate3d(0, ${movement}px, 0)`;

            });

            ticking = false;
        };


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateParallax
                    );

                    ticking = true;
                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       SCROLL TOP ON PAGE LOAD
       ===================================================== */

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);


    /* =====================================================
       PAGE READY
       ===================================================== */

    requestAnimationFrame(() => {

        document.body.classList.add(
            "animations-ready"
        );

    });

});
