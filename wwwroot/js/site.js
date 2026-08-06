"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const loader = document.getElementById("echoLoader");
    const scrollTopButton = document.getElementById("echoScrollTop");

    const hideLoader = () => {
        loader?.classList.add("is-hidden");
        body.classList.add("echo-page-ready");
    };

    /*
     * The load event waits for images and other page resources.
     * The timeout prevents the loader from remaining visible forever
     * if a browser resource behaves unexpectedly.
     */
    if (document.readyState === "complete") {
        hideLoader();
    } else {
        window.addEventListener("load", hideLoader, { once: true });
        window.setTimeout(hideLoader, 2500);
    }

    const updateScrollButton = () => {
        if (!scrollTopButton) {
            return;
        }

        const shouldShow = window.scrollY > 500;

        scrollTopButton.classList.toggle(
            "is-visible",
            shouldShow
        );
    };

    window.addEventListener("scroll", updateScrollButton, {
        passive: true
    });

    updateScrollButton();

    scrollTopButton?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    /*
     * Show the loading screen when navigating to another internal page.
     * Hash links, downloads and links opening in another tab are excluded.
     */
    document.querySelectorAll("a[href]").forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (
                !href ||
                href === "#" ||
                href.startsWith("#") ||
                link.hasAttribute("download") ||
                link.target === "_blank" ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            const destination = new URL(
                link.href,
                window.location.href
            );

            if (destination.origin !== window.location.origin) {
                return;
            }

            loader?.classList.remove("is-hidden");
        });
    });
});