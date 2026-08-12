/* =========================================================
   KITTIES LITTLE WORLD
   SCRIPT.JS
   MAIN WEBSITE CONTROLLER
   ========================================================= */

(() => {
    "use strict";

    /* =====================================================
       DOM READY
       ===================================================== */

    document.addEventListener("DOMContentLoaded", () => {

        initMobileNavigation();
        initPageNavigation();
        initButtonProtection();
        initExternalLinks();
        initCurrentPageState();
        initKeyboardNavigation();

    });


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

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

            menuButton.classList.toggle(
                "is-active",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            document.body.classList.toggle(
                "mobile-menu-open",
                isOpen
            );

        });


        /* Close menu after clicking a link */

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

                    menuButton.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                    document.body.classList.remove(
                        "mobile-menu-open"
                    );

                });

            });


        /* Close menu when clicking outside */

        document.addEventListener(
            "click",
            event => {

                const clickedInside =
                    navigation.contains(event.target) ||
                    menuButton.contains(event.target);

                if (
                    !clickedInside &&
                    navigation.classList.contains(
                        "is-open"
                    )
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

                    menuButton.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                    document.body.classList.remove(
                        "mobile-menu-open"
                    );
                }

            }
        );

    }


    /* =====================================================
       PAGE NAVIGATION
       ===================================================== */

    function initPageNavigation() {

        const pageLinks =
            document.querySelectorAll(
                'a[href$=".html"]'
            );

        if (!pageLinks.length) {
            return;
        }


        pageLinks.forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute("href");

                    if (!href) {
                        return;
                    }


                    /*
                     * Ignore:
                     * - external links
                     * - anchors
                     * - already current page
                     */

                    if (
                        href.startsWith("#") ||
                        href.startsWith("http") ||
                        href.startsWith("mailto:")
                    ) {
                        return;
                    }


                    const currentPage =
                        getCurrentPage();

                    const targetPage =
                        href.split("/").pop();


                    if (
                        targetPage === currentPage
                    ) {
                        event.preventDefault();
                        return;
                    }


                    /*
                     * Small premium page transition.
                     * animation.js can also use this class.
                     */

                    event.preventDefault();

                    document.body.classList.add(
                        "page-leaving"
                    );


                    setTimeout(() => {

                        window.location.href =
                            href;

                    }, 280);

                }
            );

        });

    }


    /* =====================================================
       CURRENT PAGE
       ===================================================== */

    function getCurrentPage() {

        const path =
            window.location.pathname;

        const file =
            path.split("/").pop();

        return file || "index.html";

    }


    function initCurrentPageState() {

        const currentPage =
            getCurrentPage();


        document
            .querySelectorAll(
                ".navigation-link"
            )
            .forEach(link => {

                const href =
                    link.getAttribute("href");

                if (!href) {
                    return;
                }

                const target =
                    href.split("/").pop();


                link.classList.toggle(
                    "navigation-link--active",
                    target === currentPage
                );

            });


        document
            .querySelectorAll(
                ".footer-link"
            )
            .forEach(link => {

                const href =
                    link.getAttribute("href");

                if (!href) {
                    return;
                }

                const target =
                    href.split("/").pop();


                link.classList.toggle(
                    "footer-link--active",
                    target === currentPage
                );

            });

    }


    /* =====================================================
       BUTTON PROTECTION
       ===================================================== */

    function initButtonProtection() {

        const buttons =
            document.querySelectorAll(
                ".premium-button"
            );

        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.add(
                        "button-clicked"
                    );


                    setTimeout(() => {

                        button.classList.remove(
                            "button-clicked"
                        );

                    }, 500);

                }
            );

        });

    }


    /* =====================================================
       EXTERNAL LINKS
       ===================================================== */

    function initExternalLinks() {

        document
            .querySelectorAll(
                'a[target="_blank"]'
            )
            .forEach(link => {

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            });

    }


    /* =====================================================
       KEYBOARD NAVIGATION
       ===================================================== */

    function initKeyboardNavigation() {

        document.addEventListener(
            "keydown",
            event => {

                /*
                 * ESC closes mobile navigation.
                 */

                if (event.key === "Escape") {

                    const menu =
                        document.querySelector(
                            ".navigation-links"
                        );

                    const button =
                        document.querySelector(
                            ".mobile-menu-button"
                        );

                    if (
                        menu &&
                        menu.classList.contains(
                            "is-open"
                        )
                    ) {

                        menu.classList.remove(
                            "is-open"
                        );

                        if (button) {

                            button.classList.remove(
                                "is-active"
                            );

                            button.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                            button.setAttribute(
                                "aria-label",
                                "Open navigation menu"
                            );

                        }

                        document.body.classList.remove(
                            "mobile-menu-open"
                        );

                    }

                }

            }
        );

    }


    /* =====================================================
       PAGE LOAD STATE
       ===================================================== */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "page-loaded"
            );

        }
    );


    /* =====================================================
       PUBLIC HELPERS
       ===================================================== */

    window.KittiesWebsite = {

        getCurrentPage,

        navigateTo(page) {

            if (!page) {
                return;
            }

            document.body.classList.add(
                "page-leaving"
            );

            setTimeout(() => {

                window.location.href =
                    page;

            }, 280);

        }

    };

})();
