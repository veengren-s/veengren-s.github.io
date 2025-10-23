// glidepathScript.js (GlidePath Corrections)

//TODO Calculations
const gpContainer = document.getElementById('gp');
const gpCalculateBtn = document.getElementById('calculate');

gpCalculateBtn.addEventListener('click', () => {
    const oldTable = gpContainer.querySelector('table');
    if (oldTable) oldTable.remove();

    const angle = Number(gpContainer.querySelector('#angle').value) * (Math.PI/180);
    const alt = Number(gpContainer.querySelector('#altitude').value);
    const tch = Number(gpContainer.querySelector('#tch').value);
    const temp = Number(gpContainer.querySelector('#aerodromeTemp').value);
    const start = Number(gpContainer.querySelector('#start').value);
    const end = Number(gpContainer.querySelector('#end').value);

    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('overflow-x-auto');
    tableWrapper.innerHTML = '<table class="w-full text-center border-collapse"></table>';
    const tbl = tableWrapper.querySelector('table');

    const headerRow = document.createElement('tr');
    const uncorrectedRow = document.createElement('tr');
    const correctedRow = document.createElement('tr');

    const thBlank = document.createElement('th'); thBlank.textContent = ''; headerRow.appendChild(thBlank);
    const thUn = document.createElement('th'); thUn.textContent = 'Uncorrected'; uncorrectedRow.appendChild(thUn);
    const thCor = document.createElement('th'); thCor.textContent = 'Corrected'; correctedRow.appendChild(thCor);

    for (let i=start; i<=end; i++) {
        const tca = alt + tch;
        const unVal = Math.round((tca + Math.tan(angle)*i*6076.115)/10)*10;
        const corVal = Math.round(unVal + error(alt, temp, unVal));

        const thHeader = document.createElement('th'); thHeader.textContent = i; headerRow.appendChild(thHeader);
        const tdUn = document.createElement('td'); tdUn.textContent = unVal; uncorrectedRow.appendChild(tdUn);
        const tdCor = document.createElement('td'); tdCor.textContent = corVal; correctedRow.appendChild(tdCor);
    }

    tbl.appendChild(headerRow);
    tbl.appendChild(uncorrectedRow);
    tbl.appendChild(correctedRow);
    gpContainer.appendChild(tableWrapper);
});
