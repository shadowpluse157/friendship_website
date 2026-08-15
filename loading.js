/* =========================================================
   KITTIES LITTLE WORLD
   LOADING.JS
   Premium Kitty Page Loader
   ========================================================= */

(function () {
    "use strict";


    /* =====================================================
       CONFIG
       ===================================================== */

    const MINIMUM_LOADING_TIME = 650;
    const MAXIMUM_LOADING_TIME = 2200;


    /* =====================================================
       LOADER SELECTORS
       ===================================================== */

    const SELECTORS = {
        loader: [
            "#page-loader",
            ".page-loader",
            ".loading-screen",
            ".site-loader"
        ],

        loadingContent: [
            ".loading-content"
        ],

        loadingKitty: [
            ".loading-kitty"
        ]
    };


    /* =====================================================
       FIND FIRST MATCH
       ===================================================== */

    function findElement(selectors) {

        for (
            let i = 0;
            i < selectors.length;
            i++
        ) {

            const element =
                document.querySelector(
                    selectors[i]
                );

            if (element) {
                return element;
            }
        }

        return null;
    }


    /* =====================================================
       GET LOADER
       ===================================================== */

    function getLoader() {

        return findElement(
            SELECTORS.loader
        );
    }


    /* =====================================================
       HIDE LOADER
       ===================================================== */

    function hideLoader() {

        const loader =
            getLoader();

        if (!loader) {
            return;
        }


        /* Prevent duplicate execution */

        if (
            loader.dataset.loadingHidden ===
            "true"
        ) {
            return;
        }


        loader.dataset.loadingHidden =
            "true";


        loader.classList.add(
            "is-loaded"
        );


        loader.classList.add(
            "fade-out"
        );


        /* Remove after transition */

        window.setTimeout(
            function () {

                if (
                    loader &&
                    loader.parentNode
                ) {

                    loader.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                    loader.style.pointerEvents =
                        "none";

                    loader.style.visibility =
                        "hidden";

                }

            },
            700
        );
    }


    /* =====================================================
       SHOW LOADER
       ===================================================== */

    function showLoader() {

        const loader =
            getLoader();

        if (!loader) {
            return;
        }


        loader.classList.remove(
            "is-loaded"
        );

        loader.classList.remove(
            "fade-out"
        );


        loader.removeAttribute(
            "aria-hidden"
        );


        loader.style.visibility =
            "visible";

        loader.style.pointerEvents =
            "auto";

    }


    /* =====================================================
       PREPARE LOADER
       ===================================================== */

    function prepareLoader() {

        const loader =
            getLoader();

        if (!loader) {
            return;
        }


        loader.setAttribute(
            "aria-live",
            "polite"
        );


        loader.setAttribute(
            "role",
            "status"
        );


        const content =
            findElement(
                SELECTORS.loadingContent
            );


        if (content) {

            content.classList.add(
                "loading-content"
            );

        }


        const kitty =
            findElement(
                SELECTORS.loadingKitty
            );


        if (kitty) {

            kitty.classList.add(
                "loading-kitty"
            );

        }

    }


    /* =====================================================
       PAGE READY
       ===================================================== */

    function pageReady() {

        const startTime =
            window.KittiesLoadingStart ||
            performance.now();


        const elapsed =
            performance.now() -
            startTime;


        const remaining =
            Math.max(
                0,
                MINIMUM_LOADING_TIME -
                elapsed
            );


        window.setTimeout(
            function () {

                hideLoader();

                document.documentElement
                    .classList.add(
                        "page-ready"
                    );

                document.body
                    .classList.add(
                        "page-ready"
                    );

            },
            remaining
        );

    }


    /* =====================================================
       MAXIMUM SAFETY TIMEOUT
       Prevents loader from getting stuck
       ===================================================== */

    function safetyTimeout() {

        window.setTimeout(
            function () {

                hideLoader();

            },
            MAXIMUM_LOADING_TIME
        );

    }


    /* =====================================================
       PAGE LOAD START
       ===================================================== */

    window.KittiesLoadingStart =
        performance.now();


    /* =====================================================
       DOM READY
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                prepareLoader();
                showLoader();
                safetyTimeout();

            },
            {
                once: true
            }
        );

    } else {

        prepareLoader();
        showLoader();
        safetyTimeout();

    }


    /* =====================================================
       WINDOW LOAD
       Wait for images / fonts / page assets
       ===================================================== */

    if (
        document.readyState ===
        "complete"
    ) {

        pageReady();

    } else {

        window.addEventListener(
            "load",
            pageReady,
            {
                once: true
            }
        );

    }


    /* =====================================================
       PAGE VISIBILITY SUPPORT
       ===================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.visibilityState ===
                "visible"
            ) {

                const loader =
                    getLoader();

                if (
                    loader &&
                    loader.dataset.loadingHidden !==
                    "true"
                ) {

                    pageReady();

                }

            }

        }
    );


    /* =====================================================
       GLOBAL LOADING API
       Other JS files can use this
       ===================================================== */

    window.KittiesLoading = {

        show:
            showLoader,

        hide:
            hideLoader,

        ready:
            pageReady

    };


})();
