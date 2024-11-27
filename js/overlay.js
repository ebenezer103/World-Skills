document.addEventListener('DOMContentLoaded', () => {
    const quizBtn = document.getElementById("quizBtn");
    const overlayBox = document.getElementById('overlayContent');
    const closeOverlayButton = document.getElementById('closeOverlay');

    if (closeOverlayButton) {
        closeOverlayButton.addEventListener('click', () => {
            overlayBox.style.display = 'none';
            quizBtn.style.display = 'flex';
        });
    }

    // Open quiz overlay on button click
    quizBtn.addEventListener("click", () => {
        showOverlay()
    });

});

/**
 * Shows the overlay when all locations are clicked.
 */
function showOverlay() {
    const overlayBox = document.getElementById('overlayContent');
    if (overlayBox) {
        overlayBox.style.display = 'block';
    }
}
