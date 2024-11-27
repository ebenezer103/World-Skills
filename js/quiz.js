document.addEventListener('DOMContentLoaded', () => {
    /**
     * Initializes quiz functionality, including event listeners.
     */
    const submitQuizButton = document.getElementById('submitQuiz');
    if (submitQuizButton) {
        submitQuizButton.addEventListener('click', handleQuizSubmission);
    }

    const retryButton = document.getElementById('retryQuiz');
    if (retryButton) {
        retryButton.addEventListener('click', resetQuiz);
    }
});

/**
 * Handles quiz submission and displays results.
 */
function handleQuizSubmission() {
    const answers = { q1: 'b', q2: 'c', q3: 'a', q4: 'b', q5: 'b' };
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);
    let score = 0;

    for (const [question, correctAnswer] of Object.entries(answers)) {
        if (formData.get(question) === correctAnswer) score++;
    }

    const passMark = 3;
    const resultMessage = document.getElementById('resultMessage');
    const quizResult = document.getElementById('quizResult');

    resultMessage.textContent = score >= passMark
        ? `Congratulations! You passed with a score of ${score}/5.`
        : `Sorry, you failed with a score of ${score}/5. Please try again.`;

    form.style.display = 'none';
    quizResult.style.display = 'block';
    
}

/**
 * Resets the quiz for another attempt.
 */
function resetQuiz() {
    const form = document.getElementById('quizForm');
    form.reset();
    form.style.display = 'block';

    const quizResult = document.getElementById('quizResult');
    quizResult.style.display = 'none';
}
