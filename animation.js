/* =========================================================
   KITTIES LITTLE WORLD
   ANIMATION.JS
   SURPRISE PAGE EXPERIENCE
   ========================================================= */

(() => {
    "use strict";


    /* =====================================================
       DOM READY
       ===================================================== */

    document.addEventListener("DOMContentLoaded", () => {

        initGiftExperience();
        initScrollReveal();

    });


    /* =====================================================
       GIFT EXPERIENCE
       ===================================================== */

    function initGiftExperience() {

        const giftBox =
            document.getElementById("giftBox");

        const giftStage =
            document.getElementById("giftStage");

        const giftMessage =
            document.getElementById("giftMessage");

        const giftClickHint =
            document.getElementById("giftClickHint");

        const surpriseKitty =
            document.getElementById("surpriseKitty");

        const kittyPaper =
            document.getElementById("kittyPaper");

        const surpriseContent =
            document.getElementById("surpriseContent");


        /*
         * If this isn't the surprise page,
         * safely stop here.
         */

        if (!giftBox || !giftStage) {
            return;
        }


        /*
         * Prevent the animation from
         * being triggered more than once.
         */

        let opened = false;


        giftBox.addEventListener(
            "click",
            () => {

                if (opened) {
                    return;
                }

                opened = true;


                /* -----------------------------------------
                   ACCESSIBILITY
                   ----------------------------------------- */

                giftBox.setAttribute(
                    "aria-expanded",
                    "true"
                );


                if (surpriseKitty) {

                    surpriseKitty.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                }


                /* -----------------------------------------
                   STEP 1
                   OPEN GIFT
                   ----------------------------------------- */

                giftStage.classList.add(
                    "gift-opening"
                );


                giftBox.classList.add(
                    "gift-opening"
                );


                if (giftMessage) {

                    giftMessage.classList.add(
                        "gift-message-hidden"
                    );

                }


                if (giftClickHint) {

                    giftClickHint.classList.add(
                        "gift-hint-hidden"
                    );

                }


                /*
                 * Give the gift opening animation
                 * enough time to finish.
                 */

                setTimeout(() => {

                    giftStage.classList.remove(
                        "gift-opening"
                    );


                    giftBox.classList.remove(
                        "gift-opening"
                    );


                    giftBox.classList.add(
                        "gift-opened"
                    );


                    /* -------------------------------------
                       STEP 2
                       SHOW KITTY
                       ------------------------------------- */

                    setTimeout(() => {

                        if (!surpriseKitty) {
                            return;
                        }


                        surpriseKitty.classList.add(
                            "kitty-revealed"
                        );


                        /*
                         * Tell CSS that the kitty
                         * has appeared.
                         */

                        giftStage.classList.add(
                            "kitty-visible"
                        );


                    }, 250);


                }, 700);


                /* -----------------------------------------
                   STEP 3
                   REVEAL PAPER
                   ----------------------------------------- */

                setTimeout(() => {

                    if (!kittyPaper) {
                        return;
                    }


                    kittyPaper.classList.add(
                        "paper-revealed"
                    );


                }, 1550);


                /* -----------------------------------------
                   STEP 4
                   SHOW CONTENT
                   ----------------------------------------- */

                setTimeout(() => {

                    if (!surpriseContent) {
                        return;
                    }


                    surpriseContent.classList.add(
                        "surprise-content-visible"
                    );


                }, 2100);


                /* -----------------------------------------
                   STEP 5
                   SCROLL TO CONTENT
                   ----------------------------------------- */

                setTimeout(() => {

                    if (!surpriseContent) {
                        return;
                    }


                    surpriseContent.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                }, 2350);


                /* -----------------------------------------
                   OPTIONAL CONFETTI
                   ----------------------------------------- */

                setTimeout(() => {

                    triggerSurpriseConfetti();

                }, 900);

            }
        );

    }


    /* =====================================================
       CONFETTI HELPER
       ===================================================== */

    function triggerSurpriseConfetti() {

        /*
         * confetti.js may expose a global
         * confetti function.
         *
         * If it isn't available, simply
         * do nothing.
         */

        if (
            typeof window.confetti !==
            "function"
        ) {
            return;
        }


        try {

            window.confetti({
                particleCount: 45,
                spread: 65,
                origin: {
                    x: 0.5,
                    y: 0.55
                }
            });

        } catch (error) {

            /*
             * Never allow confetti errors
             * to break the surprise animation.
             */

            console.warn(
                "Confetti could not start.",
                error
            );

        }

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    function initScrollReveal() {

        const revealElements =
            document.querySelectorAll(
                ".surprise-wish-card, " +
                ".promise-card, " +
                ".surprise-paper-preview, " +
                ".surprise-final-message"
            );


        if (!revealElements.length) {
            return;
        }


        /*
         * Older browsers / fallback.
         */

        if (
            !("IntersectionObserver" in window)
        ) {

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
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       PUBLIC API
       ===================================================== */

    window.KittiesAnimation = {

        openGift() {

            const giftBox =
                document.getElementById(
                    "giftBox"
                );

            if (giftBox) {
                giftBox.click();
            }

        }

    };


})();
