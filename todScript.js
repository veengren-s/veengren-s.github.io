// todScript.js

const currentAltitudeInput = document.getElementById('currentAltitude');
const destinationAltitudeInput = document.getElementById('destinationAltitude');
const descentAngleInput = document.getElementById('descentAngle');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const resultEl = document.getElementById('result');

// Enable/disable submit button
function updateSubmitButtonState() {
    const allFilled = [currentAltitudeInput, destinationAltitudeInput, descentAngleInput]
        .every(input => input.value.trim() !== '');
    submitBtn.disabled = !allFilled;
    submitBtn.classList.toggle('opacity-50', submitBtn.disabled);
    submitBtn.classList.toggle('cursor-not-allowed', submitBtn.disabled);
}

// Attach input listeners
[currentAltitudeInput, destinationAltitudeInput, descentAngleInput].forEach(input => {
    input.addEventListener('input', updateSubmitButtonState);
});

// Reset button
resetBtn.addEventListener('click', () => {
    [currentAltitudeInput, destinationAltitudeInput, descentAngleInput].forEach(input => input.value = '');
    resultEl.textContent = 'Enter values and press Calculate.';
    updateSubmitButtonState();
});

// Calculate button
submitBtn.addEventListener('click', () => {
    const current = parseFloat(currentAltitudeInput.value);
    const destination = parseFloat(destinationAltitudeInput.value);
    const angle = parseFloat(descentAngleInput.value);

    if (isNaN(current) || isNaN(destination) || isNaN(angle)) {
        alert('Please enter valid numeric values.');
        return;
    }

    // Placeholder TOD calculation: simple formula
    const tod = ((current - destination) / 1000) * 3; // nautical miles

    resultEl.textContent = `Top of Descent: ${tod.toFixed(1)} nautical miles`;
});

// Initialize button state
updateSubmitButtonState();
