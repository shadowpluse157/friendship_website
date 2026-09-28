
/* =========================================================
   ALI BIRTHDAY — MUSIC.JS
   Cinematic Birthday Soundtrack Controller
   =========================================================

   Recommended audio file:

   music/
   └── indian-love-story-piano.mp3

   IMPORTANT:
   Use an audio file you have permission to use.

   The script supports:
   - Main piano soundtrack
   - Play / pause
   - Volume control
   - Progress bar
   - Time display
   - Smooth fade in/out
   - Chapter-based mood
   - Keyboard controls
   - Visual waveform animation
   - Mobile-friendly controls
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";


    /* =====================================================
       HELPERS
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


    const findAll = (...selectors) => {

        const elements = [];

        selectors.forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    if (!elements.includes(element)) {
                        elements.push(element);
                    }

                });

        });

        return elements;
    };


    /* =====================================================
       AUDIO ELEMENT
    ===================================================== */

    let audio = find(
        "#birthdayMusic",
        "#backgroundMusic",
        "#music",
        "#mainMusic",
        ".birthday-audio"
    );


    /*
     * If no audio element exists in HTML,
     * create one automatically.
     */

    if (!audio) {

        audio = document.createElement("audio");

        audio.id = "birthdayMusic";

        audio.preload = "metadata";

        audio.loop = true;

        audio.setAttribute(
            "aria-label",
            "Birthday soundtrack"
        );

        document.body.appendChild(audio);
    }


    /*
     * Default source.
     *
     * Change this path only if your file
     * has a different location/name.
     */

    const DEFAULT_SOURCE =
        "music/indian-love-story-piano.mp3";


    /*
     * Only assign source if the HTML doesn't
     * already contain one.
     */

    if (!audio.getAttribute("src")) {
        audio.src = DEFAULT_SOURCE;
    }


    audio.loop = true;

    audio.preload = "metadata";


    /* =====================================================
       CONTROLS
    ===================================================== */

    const playButton = find(
        "#musicPlay",
        "#playMusic",
        ".music-play",
        ".play-music",
        "[data-music-play]"
    );


    const pauseButton = find(
        "#musicPause",
        "#pauseMusic",
        ".music-pause",
        ".pause-music",
        "[data-music-pause]"
    );


    const toggleButton = find(
        "#musicToggle",
        "#musicToggleButton",
        ".music-toggle",
        ".song-toggle",
        "[data-music-toggle]"
    );


    const volumeSlider = find(
        "#musicVolume",
        "#volumeControl",
        ".music-volume",
        "[data-music-volume]"
    );


    const progressSlider = find(
        "#musicProgress",
        "#progressBar",
        ".music-progress",
        "[data-music-progress]"
    );


    const progressFill = find(
        "#musicProgressFill",
        ".music-progress-fill",
        ".progress-fill"
    );


    const currentTimeDisplay = find(
        "#musicCurrentTime",
        ".music-current-time",
        ".current-time"
    );


    const durationDisplay = find(
        "#musicDuration",
        ".music-duration",
        ".duration"
    );


    const songTitle = find(
        "#songTitle",
        ".song-title"
    );


    const songVersion = find(
        "#songVersion",
        ".song-version"
    );


    const waveform = find(
        ".song-wave",
        ".music-wave",
        ".waveform"
    );


    const waveformBars = findAll(
        ".song-wave span",
        ".music-wave span",
        ".waveform span",
        ".wave-bar"
    );


    const musicStatus = find(
        "#musicStatus",
        ".music-status",
        ".song-status"
    );


    /* =====================================================
       SETTINGS
    ===================================================== */

    let currentVolume = 0.45;

    let isFading = false;

    let fadeTimer = null;


    /*
     * Start quietly.
     */

    audio.volume = currentVolume;


    /* =====================================================
       SONG INFORMATION
    ===================================================== */

    if (songTitle) {
        songTitle.textContent =
            "Indian Love Story";
    }


    if (songVersion) {
        songVersion.textContent =
            "Piano Version";
    }


    /* =====================================================
       FORMAT TIME
    ===================================================== */

    function formatTime(seconds) {

        if (!Number.isFinite(seconds)) {
            return "0:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            Math.floor(seconds % 60);

        return (
            minutes +
            ":" +
            String(remainingSeconds).padStart(
                2,
                "0"
            )
        );
    }


    /* =====================================================
       STATUS
    ===================================================== */

    function setStatus(message) {

        if (!musicStatus) {
            return;
        }

        musicStatus.textContent = message;
    }


    /* =====================================================
       VISUAL PLAY STATE
    ===================================================== */

    function setPlayingVisuals(isPlaying) {

        document.body.classList.toggle(
            "music-is-playing",
            isPlaying
        );


        if (waveform) {

            waveform.classList.toggle(
                "wave-playing",
                isPlaying
            );
        }


        waveformBars.forEach((bar, index) => {

            bar.style.setProperty(
                "--wave-delay",
                `${index * 0.06}s`
            );

        });


        if (toggleButton) {

            toggleButton.setAttribute(
                "aria-pressed",
                String(isPlaying)
            );


            toggleButton.setAttribute(
                "aria-label",
                isPlaying
                    ? "Pause soundtrack"
                    : "Play soundtrack"
            );

        }


        if (playButton) {
            playButton.classList.toggle(
                "active",
                isPlaying
            );
        }


        if (pauseButton) {
            pauseButton.classList.toggle(
                "active",
                !isPlaying
            );
        }

    }


    /* =====================================================
       UPDATE PLAY BUTTON
    ===================================================== */

    function updatePlayButton() {

        const playing =
            !audio.paused &&
            !audio.ended;

        setPlayingVisuals(playing);
    }


    /* =====================================================
       FADE IN
    ===================================================== */

    function fadeIn(targetVolume = currentVolume) {

        if (isFading) {
            clearInterval(fadeTimer);
        }

        isFading = true;

        audio.volume = 0;

        let volume = 0;

        fadeTimer = setInterval(() => {

            volume += 0.025;

            if (volume >= targetVolume) {

                volume = targetVolume;

                clearInterval(fadeTimer);

                isFading = false;
            }

            audio.volume = volume;

        }, 80);
    }


    /* =====================================================
       FADE OUT
    ===================================================== */

    function fadeOut(callback) {

        if (isFading) {
            clearInterval(fadeTimer);
        }

        isFading = true;

        const startingVolume =
            audio.volume;

        let volume =
            startingVolume;

        fadeTimer = setInterval(() => {

            volume -= 0.03;

            if (volume <= 0) {

                volume = 0;

                clearInterval(fadeTimer);

                isFading = false;

                if (typeof callback === "function") {
                    callback();
                }
            }

            audio.volume = volume;

        }, 70);
    }


    /* =====================================================
       PLAY MUSIC
    ===================================================== */

    async function playMusic() {

        try {

            /*
             * Browser requires user interaction
             * before audio can normally begin.
             */

            const promise =
                audio.play();

            if (promise) {
                await promise;
            }

            fadeIn(currentVolume);

            setPlayingVisuals(true);

            setStatus(
                "Playing your little soundtrack ♪"
            );

        } catch (error) {

            setStatus(
                "Tap play to start the soundtrack ♪"
            );

        }
    }


    /* =====================================================
       PAUSE MUSIC
    ===================================================== */

    function pauseMusic() {

        fadeOut(() => {

            audio.pause();

            audio.volume =
                currentVolume;

            setPlayingVisuals(false);

        });

        setStatus(
            "Soundtrack paused."
        );
    }


    /* =====================================================
       TOGGLE MUSIC
    ===================================================== */

    function toggleMusic() {

        if (audio.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    }


    /* =====================================================
       PLAY BUTTON
    ===================================================== */

    if (playButton) {

        playButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                playMusic();

            }
        );
    }


    /* =====================================================
       PAUSE BUTTON
    ===================================================== */

    if (pauseButton) {

        pauseButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                pauseMusic();

            }
        );
    }


    /* =====================================================
       TOGGLE BUTTON
    ===================================================== */

    if (toggleButton) {

        toggleButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                toggleMusic();

            }
        );
    }


    /* =====================================================
       VOLUME CONTROL
    ===================================================== */

    if (volumeSlider) {

        /*
         * Make sure slider has a sensible range.
         */

        if (!volumeSlider.min) {
            volumeSlider.min = "0";
        }

        if (!volumeSlider.max) {
            volumeSlider.max = "1";
        }

        if (!volumeSlider.step) {
            volumeSlider.step = "0.01";
        }

        if (!volumeSlider.value) {
            volumeSlider.value =
                String(currentVolume);
        }


        currentVolume =
            parseFloat(
                volumeSlider.value
            ) || currentVolume;


        audio.volume =
            currentVolume;


        volumeSlider.addEventListener(
            "input",
            () => {

                const value =
                    parseFloat(
                        volumeSlider.value
                    );

                if (!Number.isNaN(value)) {

                    currentVolume =
                        Math.max(
                            0,
                            Math.min(
                                1,
                                value
                            )
                        );

                    audio.volume =
                        currentVolume;
                }

            }
        );

    }


    /* =====================================================
       PROGRESS CONTROL
    ===================================================== */

    function updateProgress() {

        if (!Number.isFinite(audio.duration)) {
            return;
        }


        const percentage =
            (
                audio.currentTime /
                audio.duration
            ) * 100;


        if (progressSlider) {

            progressSlider.value =
                String(percentage);

        }


        if (progressFill) {

            progressFill.style.width =
                ${percentage}%`;

        }


        if (currentTimeDisplay) {

            currentTimeDisplay.textContent =
                formatTime(
                    audio.currentTime
                );

        }

    }


    if (progressSlider) {

        progressSlider.min = "0";

        progressSlider.max = "100";

        progressSlider.step = "0.1";

        progressSlider.value = "0";


        progressSlider.addEventListener(
            "input",
            () => {

                if (
                    !Number.isFinite(
                        audio.duration
                    )
                ) {
                    return;
                }


                const percentage =
                    parseFloat(
                        progressSlider.value
                    );


                audio.currentTime =
                    (
                        percentage / 100
                    ) *
                    audio.duration;

            }
        );

    }


    /* =====================================================
       AUDIO EVENTS
    ===================================================== */

    audio.addEventListener(
        "timeupdate",
        updateProgress
    );


    audio.addEventListener(
        "loadedmetadata",
        () => {

            if (durationDisplay) {

                durationDisplay.textContent =
                    formatTime(
                        audio.duration
                    );

            }

            updateProgress();
        }
    );


    audio.addEventListener(
        "play",
        () => {

            setPlayingVisuals(true);

        }
    );


    audio.addEventListener(
        "pause",
        () => {

            setPlayingVisuals(false);

        }
    );


    audio.addEventListener(
        "ended",
        () => {

            setPlayingVisuals(false);

            /*
             * Audio is looped, but this keeps
             * the UI safe if loop is disabled.
             */

            if (!audio.loop) {

                setStatus(
                    "The little soundtrack has ended. ♪"
                );
            }

        }
    );


    audio.addEventListener(
        "error",
        () => {

            setPlayingVisuals(false);

            setStatus(
                "Add the piano audio file to the music folder to enable the soundtrack."
            );

            document.body.classList.add(
                "music-file-missing"
            );

        }
    );


    /* =====================================================
       KEYBOARD SHORTCUTS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /*
             * Don't hijack typing inside inputs.
             */

            const tag =
                event.target.tagName;

            if (
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT"
            ) {
                return;
            }


            /*
             * Space = Play / Pause
             */

            if (event.code === "Space") {

                event.preventDefault();

                toggleMusic();
            }


            /*
             * M = Mute / Unmute
             */

            if (
                event.key.toLowerCase() === "m"
            ) {

                audio.muted =
                    !audio.muted;

                setStatus(
                    audio.muted
                        ? "Soundtrack muted."
                        : "Soundtrack unmuted. ♪"
                );

            }


            /*
             * Arrow Up = Volume +
             */

            if (
                event.key === "ArrowUp"
            ) {

                event.preventDefault();

                currentVolume =
                    Math.min(
                        1,
                        currentVolume + 0.05
                    );

                audio.volume =
                    currentVolume;

                if (volumeSlider) {
                    volumeSlider.value =
                        currentVolume;
                }

            }


            /*
             * Arrow Down = Volume -
             */

            if (
                event.key === "ArrowDown"
            ) {

                event.preventDefault();

                currentVolume =
                    Math.max(
                        0,
                        currentVolume - 0.05
                    );

                audio.volume =
                    currentVolume;

                if (volumeSlider) {
                    volumeSlider.value =
                        currentVolume;
                }

            }

        }
    );


    /* =====================================================
       VISUAL WAVEFORM
    ===================================================== */

    function animateWaveform() {

        if (!waveform) {
            return;
        }


        if (
            audio.paused ||
            audio.ended
        ) {

            waveformBars.forEach(
                bar => {

                    bar.style.animationPlayState =
                        "paused";

                }
            );

            return;
        }


        waveformBars.forEach(
            bar => {

                bar.style.animationPlayState =
                    "running";

            }
        );

    }


    setInterval(
        animateWaveform,
        250
    );


    /* =====================================================
       CHAPTER MOOD
    ===================================================== */

    /*
     * The website is designed like a journey.
     *
     * The soundtrack stays gentle rather than
     * suddenly becoming loud.
     */

    function applyChapterMood() {

        const body =
            document.body;

        if (
            body.classList.contains(
                "final-page"
            )
        ) {

            currentVolume = 0.5;

        } else if (
            body.classList.contains(
                "music-page"
            )
        ) {

            currentVolume = 0.45;

        } else if (
            body.classList.contains(
                "moon-page"
            )
        ) {

            currentVolume = 0.32;

        } else if (
            body.classList.contains(
                "universe-page"
            )
        ) {

            currentVolume = 0.38;

        } else {

            currentVolume = 0.42;

        }


        /*
         * Don't suddenly change volume if
         * the music is already playing.
         */

        if (!audio.paused) {

            audio.volume =
                currentVolume;
        }


        if (volumeSlider) {

            volumeSlider.value =
                currentVolume;
        }

    }


    applyChapterMood();


    /* =====================================================
       MUSIC PAGE SPECIAL INTRO
    ===================================================== */

    if (
        document.body.classList.contains(
            "music-page"
        )
    ) {

        setStatus(
            "A little soundtrack for this chapter. ♪"
        );

    }


    /* =====================================================
       FIRST USER INTERACTION
    ===================================================== */

    /*
     * This allows the soundtrack to start naturally
     * after the user has interacted with the website.
     *
     * We DO NOT force autoplay.
     */

    let firstInteractionHandled =
        false;


    function handleFirstInteraction() {

        if (firstInteractionHandled) {
            return;
        }

        firstInteractionHandled = true;

        /*
         * Do not automatically play on every page.
         *
         * The music page has an explicit Play button.
         *
         * On other pages, parcel.js / birthday.js
         * can call playMusic through the public API.
         */

    }


    document.addEventListener(
        "pointerdown",
        handleFirstInteraction,
        {
            passive: true
        }
    );


    /* =====================================================
       PUBLIC MUSIC API
    ===================================================== */

    /*
     * Other files can use:
     *
     * window.AliBirthdayMusic.play()
     * window.AliBirthdayMusic.pause()
     * window.AliBirthdayMusic.toggle()
     * window.AliBirthdayMusic.fadeIn()
     * window.AliBirthdayMusic.fadeOut()
     */

    window.AliBirthdayMusic = {

        play: playMusic,

        pause: pauseMusic,

        toggle: toggleMusic,

        fadeIn: () => {
            fadeIn(currentVolume);
        },

        fadeOut: () => {
            fadeOut(() => {
                audio.pause();
            });
        },

        setVolume: value => {

            const volume =
                Math.max(
                    0,
                    Math.min(
                        1,
                        Number(value)
                    )
                );

            currentVolume =
                volume;

            audio.volume =
                volume;

            if (volumeSlider) {
                volumeSlider.value =
                    volume;
            }

        },

        getAudio: () => audio,

        isPlaying: () =>
            !audio.paused &&
            !audio.ended

    };


    /* =====================================================
       PAGE VISIBILITY
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            /*
             * Don't stop the music permanently when
             * switching tabs, but gently reduce it.
             */

            if (
                document.hidden &&
                !audio.paused
            ) {

                audio.volume =
                    Math.min(
                        currentVolume,
                        0.2
                    );

            } else if (
                !document.hidden &&
                !audio.paused
            ) {

                audio.volume =
                    currentVolume;

            }

        }
    );


    /* =====================================================
       DYNAMIC CSS
    ===================================================== */

    const musicStyle =
        document.createElement("style");

    musicStyle.textContent = 

        /* ============================================
           MUSIC WAVE
        ============================================ */

        .song-wave span,
        .music-wave span,
        .waveform span,
        .wave-bar {

            transform-origin:
                center bottom;

        }


        .music-is-playing
        .song-wave span,
        .music-is-playing
        .music-wave span,
        .music-is-playing
        .waveform span,
        .music-is-playing
        .wave-bar {

            animation:
                musicWavePulse
                .9s
                ease-in-out
                var(--wave-delay, 0s)
                infinite
                alternate;

        }


        @keyframes musicWavePulse {

            0% {

                transform:
                    scaleY(.45);

            }

            100% {

                transform:
                    scaleY(
                        .75
                    );

            }

        }


        /* ============================================
           PLAYING GLOW
        ============================================ */

        .music-is-playing
        .song-card {

            box-shadow:
                0 0 35px
                rgba(
                    190,
                    150,
                    255,
                    .12
                );

        }


        .music-is-playing
        .song-card::after {

            opacity: 1;

        }


        /* ============================================
           MUSIC BUTTON
        ============================================ */

        .music-toggle,
        .music-play,
        .music-pause {

            transition:
                transform .25s ease,
                box-shadow .25s ease,
                opacity .25s ease;

        }


        .music-toggle:hover,
        .music-play:hover,
        .music-pause:hover {

            transform:
                translateY(-2px);

        }


        /* ============================================
           MISSING AUDIO
        ============================================ */

        .music-file-missing
        .song-wave {

            opacity: .45;

        }


        /* ============================================
           REDUCED MOTION
        ============================================ */

        @media (
            prefers-reduced-motion: reduce
        ) {

            .music-is-playing
            .song-wave span,
            .music-is-playing
            .music-wave span,
            .music-is-playing
            .waveform span,
            .music-is-playing
            .wave-bar {

                animation: none !important;

            }

        }

    ;

    document.head.appendChild(musicStyle);


    /* =====================================================
       DEBUG
    ===================================================== */

    window.musicDebug = () => {

        console.table({

            audio:
                !!audio,

            source:
                audio.src,

            playing:
                !audio.paused,

            duration:
                formatTime(
                    audio.duration
                ),

            currentTime:
                formatTime(
                    audio.currentTime
                ),

            volume:
                audio.volume,

            playButton:
                !!playButton,

            toggleButton:
                !!toggleButton,

            progressSlider:
                !!progressSlider,

            waveformBars:
                waveformBars.length

        });

    };


    /* =====================================================
       READY
    ===================================================== */

    document.body.classList.add(
        "music-js-ready"
    );

});
