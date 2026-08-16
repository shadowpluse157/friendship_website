(() => {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {

        /* =====================================================
           LOADING SCREEN
           ===================================================== */

        const loader = document.createElement("div");

        loader.className = "page-loader";

        loader.innerHTML = `
            <div class="loader-content">

                <div class="loader-kitty">
                    🐱
                </div>

                <div class="loader-paw-row">
                    <span>🐾</span>
                    <span>🐾</span>
                    <span>🐾</span>
                </div>

                <div class="loader-title">
                    Kitties Little World
                </div>

                <div class="loader-subtitle">
                    preparing something cute...
                </div>

                <div class="loader-progress">
                    <div class="loader-progress-bar"></div>
                </div>

                <div class="loader-percent">
                    0%
                </div>

            </div>
        `;

        document.body.prepend(loader);


        /* =====================================================
           LOADER STYLE
           ===================================================== */

        const style = document.createElement("style");

        style.textContent = `

            .page-loader {
                position: fixed;
                inset: 0;

                z-index: 999999;

                display: grid;
                place-items: center;

                background:
                    radial-gradient(
                        circle at 20% 20%,
                        rgba(247, 205, 215, .55),
                        transparent 32%
                    ),
                    radial-gradient(
                        circle at 80% 25%,
                        rgba(216, 204, 232, .5),
                        transparent 34%
                    ),
                    linear-gradient(
                        135deg,
                        #fffaf6,
                        #f7efe8,
                        #f3e9e4
                    );

                opacity: 1;
                visibility: visible;

                transition:
                    opacity .8s ease,
                    visibility .8s ease;
            }


            .page-loader.loader-hidden {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
            }


            .loader-content {
                width: min(90%, 430px);

                padding: 45px 30px;

                text-align: center;

                border-radius: 35px;

                background:
                    linear-gradient(
                        145deg,
                        rgba(255,255,255,.82),
                        rgba(255,247,243,.65)
                    );

                border: 1px solid rgba(130,95,95,.1);

                box-shadow:
                    0 30px 80px rgba(77,52,52,.12),
                    inset 0 1px 0 rgba(255,255,255,.95);

                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
            }


            .loader-kitty {
                font-size: 4rem;

                line-height: 1;

                animation:
                    loaderKitty 1.6s
                    ease-in-out
                    infinite;
            }


            @keyframes loaderKitty {

                0%,
                100% {
                    transform:
                        translateY(0)
                        rotate(-3deg);
                }

                50% {
                    transform:
                        translateY(-10px)
                        rotate(3deg);
                }

            }


            .loader-paw-row {
                display: flex;

                justify-content: center;

                gap: 12px;

                margin-top: 18px;

                color: #bd7f91;

                font-size: 1rem;
            }


            .loader-paw-row span {
                display: inline-block;

                opacity: .35;

                animation:
                    pawLoading 1.4s
                    ease-in-out
                    infinite;
            }


            .loader-paw-row span:nth-child(1) {
                animation-delay: 0s;
            }


            .loader-paw-row span:nth-child(2) {
                animation-delay: .18s;
            }


            .loader-paw-row span:nth-child(3) {
                animation-delay: .36s;
            }


            @keyframes pawLoading {

                0%,
                100% {
                    opacity: .3;
                    transform: translateY(0);
                }

                50% {
                    opacity: 1;
                    transform: translateY(-5px);
                }

            }


            .loader-title {
                margin-top: 18px;

                color: #574444;

                font-family:
                    "Playfair Display",
                    serif;

                font-size: 1.45rem;

                font-weight: 700;
            }


            .loader-subtitle {
                margin-top: 6px;

                color: #927b7b;

                font-size: .78rem;

                letter-spacing: .04em;
            }


            .loader-progress {
                position: relative;

                width: 100%;
                height: 7px;

                margin-top: 25px;

                overflow: hidden;

                border-radius: 999px;

                background:
                    rgba(188,137,150,.14);
            }


            .loader-progress-bar {
                width: 0%;
                height: 100%;

                border-radius: inherit;

                background:
                    linear-gradient(
                        90deg,
                        #dca8b5,
                        #b9798c
                    );

                box-shadow:
                    0 3px 12px rgba(185,121,140,.25);

                transition:
                    width .15s ease;
            }


            .loader-percent {
                margin-top: 10px;

                color: #a56d7d;

                font-size: .72rem;

                font-weight: 700;

                letter-spacing: .08em;
            }


            @media (max-width: 480px) {

                .loader-content {
                    width: calc(100% - 30px);

                    padding:
                        38px 22px;

                    border-radius: 28px;
                }


                .loader-kitty {
                    font-size: 3.5rem;
                }


                .loader-title {
                    font-size: 1.2rem;
                }

            }

        `;

        document.head.appendChild(style);


        /* =====================================================
           LOADING PROGRESS
           ===================================================== */

        const progressBar =
            loader.querySelector(".loader-progress-bar");

        const percentText =
            loader.querySelector(".loader-percent");

        let progress = 0;

        const progressInterval = setInterval(() => {

            progress += Math.floor(
                Math.random() * 7
            ) + 2;

            if (progress >= 92) {
                progress = 92;
                clearInterval(progressInterval);
            }

            progressBar.style.width = `${progress}%`;
            percentText.textContent = `${progress}%`;

        }, 100);


        /* =====================================================
           PAGE FULLY LOADED
           ===================================================== */

        const finishLoading = () => {

            clearInterval(progressInterval);

            progress = 100;

            progressBar.style.width = "100%";
            percentText.textContent = "100%";


            setTimeout(() => {

                loader.classList.add("loader-hidden");

                setTimeout(() => {

                    loader.remove();

                }, 900);

            }, 350);

        };


        if (document.readyState === "complete") {

            setTimeout(finishLoading, 500);

        } else {

            window.addEventListener(
                "load",
                finishLoading,
                { once: true }
            );

        }


        /* =====================================================
           FAIL-SAFE
           ===================================================== */

        setTimeout(() => {

            if (
                document.body.contains(loader) &&
                !loader.classList.contains("loader-hidden")
            ) {
                finishLoading();
            }

        }, 8000);

    });

})();
