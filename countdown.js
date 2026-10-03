
/* =========================================================
   ALI BIRTHDAY — COUNTDOWN.JS
   Countdown to October 25, 2026
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";


    /* =====================================================
       SETTINGS
    ===================================================== */

    /*
     * Ali's birthday:
     *
     * October 25, 2026
     *
     * 00:00:00 in Pakistan Standard Time
     *
     * Pakistan = UTC + 5
     */

    const BIRTHDAY_YEAR = 2026;
    const BIRTHDAY_MONTH = 9;   // October = 9 in JavaScript
    const BIRTHDAY_DAY = 25;

    const PAKISTAN_OFFSET = "+05:00";


    /* =====================================================
       FIND ELEMENT
    ===================================================== */

    const find = (...selectors) => {

        for (const selector of selectors) {

            const element =
                document.querySelector(selector);

            if (element) {
                return element;
            }
        }

        return null;
    };


    /* =====================================================
       COUNTDOWN ELEMENTS
    ===================================================== */

    const countdown = find(
        "#countdown",
        ".countdown",
        ".birthday-countdown",
        "[data-countdown]"
    );


    const daysElement = find(
        "#days",
        "#countdownDays",
        ".countdown-days",
        ".days",
        "[data-days]"
    );


    const hoursElement = find(
        "#hours",
        "#countdownHours",
        ".countdown-hours",
        ".hours",
        "[data-hours]"
    );


    const minutesElement = find(
        "#minutes",
        "#countdownMinutes",
        ".countdown-minutes",
        ".minutes",
        "[data-minutes]"
    );


    const secondsElement = find(
        "#seconds",
        "#countdownSeconds",
        ".countdown-seconds",
        ".seconds",
        "[data-seconds]"
    );


    const countdownMessage = find(
        "#countdownMessage",
        ".countdown-message",
        ".countdown-status",
        ".birthday-countdown-message"
    );


    const countdownTitle = find(
        "#countdownTitle",
        ".countdown-title"
    );


    /* =====================================================
       COUNTDOWN BOXES
    ===================================================== */

    const dayBox = find(
        "#daysBox",
        ".countdown-days-box",
        ".days-box",
        "[data-countdown-box='days']"
    );


    const hourBox = find(
        "#hoursBox",
        ".countdown-hours-box",
        ".hours-box",
        "[data-countdown-box='hours']"
    );


    const minuteBox = find(
        "#minutesBox",
        ".countdown-minutes-box",
        ".minutes-box",
        "[data-countdown-box='minutes']"
    );


    const secondBox = find(
        "#secondsBox",
        ".countdown-seconds-box",
        ".seconds-box",
        "[data-countdown-box='seconds]"
    );


    /* =====================================================
       TARGET DATE
    ===================================================== */

    /*
     * Using Pakistan local time.
     */

    const targetDate =
        new Date(
            ${BIRTHDAY_YEAR}-10-25T00:00:00${PAKISTAN_OFFSET}
        );


    /* =====================================================
       FORMAT NUMBER
    ===================================================== */

    function pad(number) {

        return String(number)
            .padStart(2, "0");

    }


    /* =====================================================
       UPDATE NUMBER
    ===================================================== */

    function updateElement(
        element,
        value
    ) {

        if (!element) {
            return;
        }

        element.textContent =
            pad(value);

    }


    /* =====================================================
       UPDATE COUNTDOWN
    ===================================================== */

    function updateCountdown() {

        const now =
            new Date();

        const difference =
            targetDate.getTime() -
            now.getTime();


        /* ================================================
           BIRTHDAY HAS ARRIVED
        ================================================ */

        if (difference <= 0) {

            showBirthdayState();

            return;

        }


        /* ================================================
           CALCULATE TIME
        ================================================ */

        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        const days =
            Math.floor(
                totalSeconds /
                (60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    totalSeconds %
                    (60 * 60 * 24)
                ) /
                (60 * 60)
            );


        const minutes =
            Math.floor(
                (
                    totalSeconds %
                    (60 * 60)
                ) /
                60
            );


        const seconds =
            totalSeconds %
            60;


        /* ================================================
           UPDATE DISPLAY
        ================================================ */

        updateElement(
            daysElement,
            days
        );


        updateElement(
            hoursElement,
            hours
        );


        updateElement(
            minutesElement,
            minutes
        );


        updateElement(
            secondsElement,
            seconds
        );


        /* ================================================
           STATUS
        ================================================ */

        if (countdownMessage) {

            countdownMessage.textContent =
                "Counting down to a very special day. ✦";

        }


        if (countdownTitle) {

            countdownTitle.textContent =
                "THE COUNTDOWN";

        }


        /* ================================================
           ACCESSIBILITY
        ================================================ */

        if (countdown) {

            countdown.setAttribute(
                "aria-label",
                ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds remaining until Ali's birthday
            );

        }

    }


    /* =====================================================
       BIRTHDAY STATE
    ===================================================== */

    function showBirthdayState() {

        updateElement(
            daysElement,
            0
        );


        updateElement(
            hoursElement,
            0
        );


        updateElement(
            minutesElement,
            0
        );


        updateElement(
            secondsElement,
            0
        );


        if (countdownMessage) {

            countdownMessage.textContent =
                "Today is your special day, Ali. Happy 19th Birthday! 🤍✨";

        }


        if (countdownTitle) {

            countdownTitle.textContent =
                "TODAY IS THE DAY";

        }


        if (countdown) {

            countdown.classList.add(
                "birthday-arrived"
            );


            countdown.setAttribute(
                "aria-label",
                "Today is Ali's 19th birthday"
            );

        }


        /*
         * Highlight every countdown box.
         */

        [
            dayBox,
            hourBox,
            minuteBox,
            secondBox
        ].forEach(box => {

            if (box) {

                box.classList.add(
                    "birthday-number-zero"
                );

            }

        });


        /*
         * Add celebration class to body.
         */

        document.body.classList.add(
            "birthday-countdown-complete"
        );

    }


    /* =====================================================
       INITIAL UPDATE
    ===================================================== */

    updateCountdown();


    /* =====================================================
       RUN EVERY SECOND
    ===================================================== */

    const countdownInterval =
        setInterval(
            updateCountdown,
            1000
        );


    /* =====================================================
       CLEANUP
    ===================================================== */

    window.addEventListener(
        "pagehide",
        () => {

            clearInterval(
                countdownInterval
            );

        }
    );


    /* =====================================================
       OPTIONAL COUNTDOWN API
    ===================================================== */

    window.AliBirthdayCountdown = {

        target: targetDate,

        update: updateCountdown,

        getRemaining: () => {

            const difference =
                Math.max(
                    0,
                    targetDate.getTime() -
                    Date.now()
                );


            return {

                totalMilliseconds:
                    difference,

                totalSeconds:
                    Math.floor(
                        difference / 1000
                    )

            };

        }

    };


    /* =====================================================
       DYNAMIC STYLING
    ===================================================== */

    const style =
        document.createElement("style");

    style.textContent = 

        /* ============================================
           COUNTDOWN BASE
        ============================================ */

        .countdown,
        .birthday-countdown {

            transition:
                transform .5s ease,
                opacity .5s ease,
                filter .5s ease;

        }


        /* ============================================
           NUMBER UPDATE
        ============================================ */

        .countdown-days,
        .countdown-hours,
        .countdown-minutes,
        .countdown-seconds,
        .days,
        .hours,
        .minutes,
        .seconds {

            font-variant-numeric:
                tabular-nums;

        }


        /* ============================================
           BIRTHDAY ARRIVED
        ============================================ */

        .birthday-arrived {

            animation:
                countdownBirthdayGlow
                2s
                ease-in-out
                infinite
                alternate;

        }


        @keyframes countdownBirthdayGlow {

            0% {

                transform:
                    translateY(0);

                filter:
                    brightness(1);

            }

            100% {

                transform:
                    translateY(-2px);

                filter:
                    brightness(1.12)
                    drop-shadow(
                        0 0 22px
                        rgba(
                            220,
                            180,
                            255,
                            .25
                        )
                    );

            }

        }


        /* ============================================
           ZERO / BIRTHDAY BOXES
        ============================================ */

        .birthday-number-zero {

            animation:
                countdownNumberGlow
                1.8s
                ease-in-out
                infinite
                alternate;

        }


        @keyframes countdownNumberGlow {

            0% {

                transform:
                    scale(1);

            }

            100% {

                transform:
                    scale(1.03);

            }

        }


        /* ============================================
           COMPLETE PAGE
        ============================================ */

        .birthday-countdown-complete {

            --countdown-celebration:
                1;

        }


        .birthday-countdown-complete
        .countdown {

            box-shadow:
                0 0 35px
                rgba(
                    210,
                    170,
                    255,
                    .12
                );

        }


        /* ============================================
           MOBILE
        ============================================ */

        @media (max-width: 700px) {

            .countdown,
            .birthday-countdown {

                max-width:
                    100%;

            }

        }


        /* ============================================
           REDUCED MOTION
        ============================================ */

        @media (
            prefers-reduced-motion: reduce
        ) {

            .birthday-arrived,
            .birthday-number-zero {

                animation:
                    none !important;

            }

        }

    ;

    document.head.appendChild(style);


    /* =====================================================
       DEBUG
    ===================================================== */

    window.countdownDebug = () => {

        const remaining =
            window.AliBirthdayCountdown
                .getRemaining();

        console.table({

            target:
                targetDate.toString(),

            days:
                daysElement?.textContent,

            hours:
                hoursElement?.textContent,

            minutes:
                minutesElement?.textContent,

            seconds:
                secondsElement?.textContent,

            remainingSeconds:
                remaining.totalSeconds

        });

    };


    /* =====================================================
       READY
    ===================================================== */

    document.body.classList.add(
        "countdown-js-ready"
    );

});
