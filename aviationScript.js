// aviationScript.js

//TODO: CALCULATIONS

const rowsContainer = document.getElementById('rowsContainer');
const addRowBtn = document.getElementById('addRow');
const removeRowBtn = document.getElementById('removeRowBtn');
const calculateBtn = document.getElementById('calculate');
const resetBtn = document.getElementById('reset');
const resultEl = document.getElementById('result');
const aerodromeElevation = document.getElementById('aerodromeElevation');
const aerodromeTemp = document.getElementById('aerodromeTemp');

// Function to create a new row with Altitude to Correct (ASL) and MDA checkbox (no '-' button)
function createRow() {
    const row = document.createElement('div');
    row.className = 'row flex items-center space-x-2';
    row.innerHTML = `
        <input type="number" placeholder="Altitude to Correct (ASL)" class="p-2 rounded-md bg-gray-700 border border-cyan-400 flex-1">
        <label class="flex items-center space-x-1 text-gray-300">
            <input type="checkbox" class="mdaCheckbox accent-cyan-400">
            <span>MDA</span>
        </label>
    `;
    rowsContainer.appendChild(row);
    updateRemoveButtonState();
    attachInputListeners(row);
}

// Update Remove button disabled state
function updateRemoveButtonState() {
    const rows = rowsContainer.querySelectorAll('.row');
    removeRowBtn.disabled = rows.length === 1;
    if (removeRowBtn.disabled) {
        removeRowBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        removeRowBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Enable/disable calculate button
function updateCalculateButtonState() {
    const elevationFilled = aerodromeElevation.value.trim() !== '';
    const tempFilled = aerodromeTemp.value.trim() !== '';
    const allRowsFilled = Array.from(rowsContainer.querySelectorAll('input[type=number]')).every(input => input.value.trim() !== '');
    calculateBtn.disabled = !(elevationFilled && tempFilled && allRowsFilled);
    calculateBtn.classList.toggle('opacity-50', calculateBtn.disabled);
    calculateBtn.classList.toggle('cursor-not-allowed', calculateBtn.disabled);
}

// Attach input listeners to a row to check calculate button state
function attachInputListeners(row) {
    const input = row.querySelector('input[type=number]');
    input.addEventListener('input', updateCalculateButtonState);
}

// Start with a single row
createRow();

// Add row button
addRowBtn.addEventListener('click', () => {
    createRow();
    updateCalculateButtonState();
});

// Remove row button (removes last row if more than 1 row exists)
removeRowBtn.addEventListener('click', () => {
    const rows = rowsContainer.querySelectorAll('.row');
    if (rows.length > 1) {
        rowsContainer.removeChild(rows[rows.length - 1]);
    }
    updateRemoveButtonState();
    updateCalculateButtonState();
});

// Aerodrome inputs listener
[aerodromeElevation, aerodromeTemp].forEach(input => input.addEventListener('input', updateCalculateButtonState));

// Reset button
resetBtn.addEventListener('click', () => {
    rowsContainer.innerHTML = '';
    createRow();
    aerodromeElevation.value = '';
    aerodromeTemp.value = '';
    resultEl.textContent = 'Enter values and press Calculate.';
    updateRemoveButtonState();
    updateCalculateButtonState();
});

// Calculate button
calculateBtn.addEventListener('click', () => {
    const elevation = parseFloat(aerodromeElevation.value);
    const temperature = parseFloat(aerodromeTemp.value);

    const rows = rowsContainer.querySelectorAll('.row');
    let results = [];
    let valid = true;

    rows.forEach((row, index) => {
        const altitudeInput = row.querySelector('input[type=number]');
        const mdaChecked = row.querySelector('.mdaCheckbox').checked;
        const altitude = parseFloat(altitudeInput.value);

        if (isNaN(altitude)) {
            valid = false;
            alert(`Error in row ${index + 1}: Please check the entry and try again!`);
            return;
        }

        // Example correction formula; replace with actual logic
        let correction = altitude + (temperature - 15) * 4 / 10;
        if (mdaChecked) correction += 50; // MDA adjustment example

        results.push(`Row ${index + 1}: Corrected Altitude = ${correction.toFixed(2)} ft`);
    });

    if (valid) {
        resultEl.innerHTML = results.join('<br>');
    }
});

// Initialize calculate button state
updateCalculateButtonState();
