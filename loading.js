/* =========================================================
   KITTIES LITTLE WORLD
   LOADING.JS
   PREMIUM KITTY PAGE LOADER
   ========================================================= */

(() => {
    "use strict";

    const MINIMUM_LOADING_TIME = 850;
    const startTime = performance.now();

    let loader = null;


    /* =====================================================
       CREATE LOADER
       ===================================================== */

    function createLoader() {

        if (document.querySelector(".kitty-loader")) {
            return document.querySelector(".kitty-loader");
        }

        loader = document.createElement("div");

        loader.className = "kitty-loader";

        loader.setAttribute(
            "aria-label",
            "Loading Kitties Little World"
        );

        loader.setAttribute(
            "role",
            "status"
        );


        loader.innerHTML = `
            <div class="kitty-loader-inner">

                <div class="kitty-loader-orbit">

                    <span class="kitty-loader-paw paw-one">
                        🐾
                    </span>

                    <span class="kitty-loader-paw paw-two">
                        🐾
                    </span>

                    <span class="kitty-loader-paw paw-three">
                        🐾
                    </span>

                </div>


                <div class="kitty-loader-cat">
                    🐱
                </div>


                <div class="kitty-loader-text">

                    <span class="kitty-loader-title">
                        Kitties Little World
                    </span>

                    <span class="kitty-loader-subtitle">
                        preparing something cute...
                    </span>

                </div>


                <div
                    class="kitty-loader-progress"
                    aria-hidden="true"
                >
                    <span></span>
                </div>

            </div>
        `;


        /*
         * Put loader at the beginning of body
         * so it covers everything while loading.
         */

        if (document.body) {

            document.body.prepend(loader);

        } else {

            document.addEventListener(
                "DOMContentLoaded",
                () => {
                    document.body.prepend(loader);
                },
                {
                    once: true
                }
            );

        }


        return loader;
    }


    /* =====================================================
       INITIALISE
       ===================================================== */

    function init() {

        const loadingScreen =
            createLoader();

        if (!loadingScreen) {
            return;
        }


        document.documentElement.classList.add(
            "is-loading"
        );

        document.body.classList.add(
            "is-loading"
        );


        /*
         * Add CSS helper classes.
         * animation.css can animate these.
         */

        requestAnimationFrame(() => {

            loadingScreen.classList.add(
                "is-visible"
            );

        });

    }


    /* =====================================================
       HIDE LOADER
       ===================================================== */

    function hideLoader() {

        if (!loader) {
            return;
        }


        const elapsed =
            performance.now() - startTime;

        const remaining =
            Math.max(
                0,
                MINIMUM_LOADING_TIME - elapsed
            );


        setTimeout(() => {

            loader.classList.add(
                "is-leaving"
            );


            document.documentElement.classList.remove(
                "is-loading"
            );

            document.body.classList.remove(
                "is-loading"
            );

            document.body.classList.add(
                "content-ready"
            );


            /*
             * Remove loader after fade animation.
             */

            setTimeout(() => {

                if (loader) {

                    loader.remove();

                    loader = null;

                }

            }, 650);

        }, remaining);

    }


    /* =====================================================
       PAGE READY
       ===================================================== */

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


    window.addEventListener(
        "load",
        hideLoader,
        {
            once: true
        }
    );


    /* =====================================================
       SAFETY FALLBACK
       ===================================================== */

    setTimeout(() => {

        if (loader) {
            hideLoader();
        }

    }, 5000);


    /* =====================================================
       PUBLIC API
       ===================================================== */

    window.KittiesLoader = {

        hide: hideLoader,

        show() {

            if (!loader) {
                init();
            }

        }

    };

})();
