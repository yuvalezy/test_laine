// Survey form functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pollForm');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const successMessage = document.getElementById('successMessage');
    const summarySection = document.getElementById('summarySection');
    const summaryContent = document.getElementById('summaryContent');
    const textError = document.getElementById('textError');

    // Get questions data from the page
    const questions = window.surveyQuestions || {};

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const textInput = document.getElementById('conversation').value.trim();
        if (textInput.length === 0) {
            textError.textContent = 'Por favor completa este campo.';
            textError.style.display = 'block';
            return;
        }

        const formData = new FormData(form);
        const responses = Object.fromEntries(formData);

        console.log('Respuestas:', responses);

        // Show summary
        displaySummary(responses);

        // Hide form and show summary
        form.style.display = 'none';
        successMessage.style.display = 'block';
        summarySection.style.display = 'block';

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    function displaySummary(responses) {
        let summaryHTML = '';

        for (const [key, value] of Object.entries(responses)) {
            const question = questions[key];
            summaryHTML += `
                <div class="summary-item">
                    <div class="summary-question">${question}</div>
                    <div class="summary-answer">${value}</div>
                </div>
            `;
        }

        summaryContent.innerHTML = summaryHTML;
    }

    function lockForm() {
        const inputs = form.querySelectorAll('input, textarea, button');
        inputs.forEach(input => {
            if (input.type !== 'reset') {
                input.disabled = true;
            }
        });
        form.classList.add('locked');
        resetBtn.disabled = true;
    }

    // Clear error on input
    document.getElementById('conversation').addEventListener('input', function() {
        textError.style.display = 'none';
    });
});
