/* =========================================================
ALI BIRTHDAY — MASTER SCRIPT
Common interactions for all 11 chapters
Compatible with current HTML classes
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


/* =====================================================
   01. PAGE READY
   ===================================================== */

document.body.classList.add("page-ready");


/* =====================================================
   02. SMOOTH PAGE TRANSITIONS
   ===================================================== */

const pageLinks = document.querySelectorAll(
    a[href$=".html"], .continue-btn, .continue-button
);

pageLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const href = link.getAttribute("href");

        if (!href || href.startsWith("#")) {
            return;
        }

        if (
            href.includes("javascript:") ||
            link.target === "_blank"
        ) {
            return;
        }

        event.preventDefault();

        document.body.classList.add("page-leaving");

        setTimeout(() => {
            window.location.href = href;
        }, 300);

    });

});


/* =====================================================
   03. PAPER CARD REVEAL
   ===================================================== */

const paperCard = document.querySelector(".paper-card");

if (paperCard) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }

            });

        },
        {
            threshold: 0.08
        }
    );

    observer.observe(paperCard);
}


/* =====================================================
   04. PAPER SECTION REVEAL
   ===================================================== */

const sections =
    document.querySelectorAll(".paper-section");

if (sections.length) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "section-visible"
                    );

                    sectionObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


/* =====================================================
   05. DESKTOP PAPER TILT
   ===================================================== */

const enableTilt =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

if (enableTilt && paperCard) {

    let ticking = false;

    paperCard.addEventListener(
        "mousemove",
        (event) => {

            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {

                const rect =
                    paperCard.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - 0.5) * 2.5;

                const rotateX =
                    ((y / rect.height) - 0.5) * -2.5;

                paperCard.style.transform =
                    
                    perspective(1400px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(0)
                    ;

                ticking = false;

            });

        }
    );

    paperCard.addEventListener(
        "mouseleave",
        () => {

            paperCard.style.transform =
                
                perspective(1400px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0)
                ;

        }
    );

}


/* =====================================================
   06. SCROLL PROGRESS
   ===================================================== */

const progress =
    document.querySelector(".chapter-progress");

if (progress) {

    const originalText =
        progress.textContent.trim();

    const updateProgress = () => {

        const scrollable =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (scrollable <= 0) return;

        const percentage =
            Math.min(
                100,
                Math.max(
                    0,
                    (window.scrollY / scrollable) * 100
                )
            );

        progress.style.setProperty(
            "--scroll-progress",
            ${percentage}%
        );

    };

    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );

    updateProgress();

    progress.setAttribute(
        "aria-label",
        `${originalText} chapter progress`
    );
}


/* =====================================================
   07. FLOATING PARTICLES
   ===================================================== */

createAmbientParticles();


/* =====================================================
   08. INTERACTIVE BUTTONS
   ===================================================== */

const interactiveButtons =
    document.querySelectorAll(
        "button, .continue-btn, .continue-button"
    );

interactiveButtons.forEach((button) => {

    button.addEventListener(
        "pointerdown",
        () => {

            button.classList.add(
                "button-pressed"
            );

        }
    );

    button.addEventListener(
        "pointerup",
        () => {

            setTimeout(() => {

                button.classList.remove(
                    "button-pressed"
                );

            }, 120);

        }
    );

    button.addEventListener(
        "pointercancel",
        () => {

            button.classList.remove(
                "button-pressed"
            );

        }
    );

});


/* =====================================================
   09. SECRET REVEAL SUPPORT
   ===================================================== */

const revealButtons =
    document.querySelectorAll(
        "[data-reveal]"
    );

revealButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const targetSelector =
                button.getAttribute(
                    "data-reveal"
                );

            if (!targetSelector) return;

            const target =
                document.querySelector(
                    targetSelector
                );

            if (!target) return;

            target.classList.toggle(
                "revealed"
            );

            button.classList.toggle(
                "active"
            );

        }
    );

});


/* =====================================================
   10. MEMORY CARD MICRO INTERACTION
   ===================================================== */

const memoryCards =
    document.querySelectorAll(
        ".memory-card"
    );

memoryCards.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            card.classList.toggle(
                "memory-open"
            );

        }
    );

});


/* =====================================================
   11. KEYBOARD ACCESSIBILITY
   ===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            const active =
                document.activeElement;

            if (
                active &&
                active.matches(
                    ".continue-btn, .continue-button"
                )
            ) {

                event.preventDefault();

                active.click();

            }

        }

    }
);


/* =====================================================
   12. BACK BUTTON PAGE RESTORE
   ===================================================== */

window.addEventListener(
    "pageshow",
    () => {

        document.body.classList.remove(
            "page-leaving"
        );

    }
);


/* =====================================================
   13. PARALLAX BACKGROUND
   ===================================================== */

if (
    enableTilt &&
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    let parallaxTicking = false;

    window.addEventListener(
        "pointermove",
        (event) => {

            if (parallaxTicking) return;

            parallaxTicking = true;

            requestAnimationFrame(() => {

                const x =
                    (
                        event.clientX /
                        window.innerWidth -
                        0.5
                    );

                const y =
                    (
                        event.clientY /
                        window.innerHeight -
                        0.5
                    );

                document.documentElement
                    .style
                    .setProperty(
                        "--mouse-x",
                        ${x * 12}px
                    );

                document.documentElement
                    .style
                    .setProperty(
                        "--mouse-y",
                        ${y * 12}px`
                    );

                parallaxTicking = false;

            });

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   14. PAGE VISIBILITY
   ===================================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

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


/* =====================================================
   15. SAFETY / PERFORMANCE CHECK
   ===================================================== */

optimizeForDevice();


});

/* =========================================================
CREATE AMBIENT PARTICLES
========================================================= */

function createAmbientParticles() {


const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

if (reducedMotion) {
    return;
}

const isMobile =
    window.innerWidth <= 600;

const particleCount =
    isMobile ? 10 : 18;

const container =
    document.createElement("div");

container.className =
    "ambient-particles";

container.setAttribute(
    "aria-hidden",
    "true"
);

const symbols = [
    "✦",
    "✧",
    "·",
    "⋆"
];

for (
    let i = 0;
    i < particleCount;
    i++
) {

    const particle =
        document.createElement("span");

    particle.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];

    particle.style.left =
        ${Math.random() * 100}% ;

    particle.style.top =
        ${Math.random() * 100}% ;

    particle.style.animationDelay =
        ${Math.random() * 7}s ;

    particle.style.animationDuration =
        ${6 + Math.random() * 7}s`;

    particle.style.opacity =
        ${0.15 + Math.random() * 0.4}`;

    container.appendChild(
        particle
    );
}

document.body.appendChild(
    container
);


}

/* =========================================================
DEVICE OPTIMIZATION
========================================================= */

function optimizeForDevice() {


const isMobile =
    window.innerWidth <= 700;

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

if (isMobile || reducedMotion) {

    document.documentElement
        .classList.add(
            "light-motion"
        );

}

}

/* =========================================================
GLOBAL BUTTON RIPPLE
========================================================= */

document.addEventListener(
"click",
(event) => {


    const button =
        event.target.closest(
            ".continue-btn, .continue-button, button"
        );

    if (!button) return;

    const rect =
        button.getBoundingClientRect();

    const ripple =
        document.createElement(
            "span"
        );

    ripple.className =
        "button-ripple";

    ripple.style.left =
        ${event.clientX - rect.left}px ;

    ripple.style.top =
        ${event.clientY - rect.top}px ;

    button.appendChild(
        ripple
    );

    setTimeout(() => {

        ripple.remove();

    }, 650);

}


);

/* =========================================================
PAGE LEAVE STYLE
========================================================= */

const pageTransitionStyle =
document.createElement("style");

pageTransitionStyle.textContent = 


.page-ready {
    opacity: 1;
}

.page-leaving {
    pointer-events: none;
    opacity: 0;
    transform: scale(.985);
    transition:
        opacity .3s ease,
        transform .3s ease;
}

.page-hidden .ambient-particles,
.page-hidden .final-particles {
    animation-play-state: paused !important;
}

.paper-card.visible {
    opacity: 1;
}

.paper-section {
    opacity: 0;
    transform: translateY(16px);
    transition:
        opacity .7s ease,
        transform .7s cubic-bezier(.22,1,.36,1);
}

.paper-section.section-visible {
    opacity: 1;
    transform: translateY(0);
}

.button-pressed {
    transform:
        translateY(1px)
        scale(.98) !important;
}

.button-ripple {
    position: absolute;

    width: 8px;
    height: 8px;

    border-radius: 50%;

    pointer-events: none;

    background:
        rgba(255,255,255,.55);

    transform:
        translate(-50%, -50%)
        scale(1);

    animation:
        buttonRipple .65s ease-out
        forwards;
}

.continue-btn,
.continue-button,
button {
    position: relative;
    overflow: hidden;
}

.ambient-particles {
    position: fixed;

    inset: 0;

    z-index: 1;

    pointer-events: none;

    overflow: hidden;
}

.ambient-particles span {
    position: absolute;

    color:
        rgba(207,193,255,.38);

    font-size:
        10px;

    animation:
        ambientFloat
        8s ease-in-out
        infinite;
}

@keyframes ambientFloat {

    0%, 100% {
        transform:
            translate3d(0,0,0)
            rotate(0deg);
    }

    50% {
        transform:
            translate3d(0,-22px,0)
            rotate(25deg);
    }

}

@keyframes buttonRipple {

    from {
        opacity: .7;

        transform:
            translate(-50%, -50%)
            scale(1);
    }

    to {
        opacity: 0;

        transform:
            translate(-50%, -50%)
            scale(28);
    }

}

@media (prefers-reduced-motion: reduce) {

    .paper-section {
        opacity: 1 !important;
        transform: none !important;
    }

    .ambient-particles {
        display: none;
    }

}

@media (max-width: 700px) {

    .ambient-particles span:nth-child(n+11) {
        display: none;
    }

}


;

document.head.appendChild(
pageTransitionStyle
);
