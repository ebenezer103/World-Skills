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

document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('accessibilityMenu');
    const toggleMenuButton = document.getElementById('toggleAccessibilityMenu');
    const increaseTextSizeButton = document.getElementById('increaseTextSize');
    const decreaseTextSizeButton = document.getElementById('decreaseTextSize');
    const highContrastButton = document.getElementById('toggleHighContrast');
    const textToSpeechButton = document.getElementById('textToSpeech');
    const pauseAnimationsButton = document.getElementById('pauseAnimations');
    const resetButton = document.getElementById('resetAccessibility');

    // Toggle menu visibility
    toggleMenuButton.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    // Increase text size
    let fontSize = 16;
    increaseTextSizeButton.addEventListener('click', () => {
        fontSize += 2; // Increase by 2px
        document.body.style.fontSize = `${fontSize}px`;
    });

    // Decrease text size
    decreaseTextSizeButton.addEventListener('click', () => {
        fontSize = Math.max(12, fontSize - 2); // Decrease but ensure a minimum size
        document.body.style.fontSize = `${fontSize}px`;
    });

    // Toggle high contrast mode
    highContrastButton.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // Text-to-speech
    textToSpeechButton.addEventListener('click', () => {
        const text = document.body.innerText;
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    });

    // Reset preferences
    resetButton.addEventListener('click', () => {
        document.body.style.fontSize = '';
        document.body.classList.remove('high-contrast');
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        location.reload(); // Reload page to clear other changes
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
