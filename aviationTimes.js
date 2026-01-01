document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("tableBody");
  const addRowBtn = document.getElementById("addRow");
  const removeRowBtn = document.getElementById("removeRow");
  const clearRowsBtn = document.getElementById("clearRows");

  const updateRemoveButton = () => {
    const rows = tableBody.querySelectorAll("tr");
    removeRowBtn.disabled = rows.length <= 1;
  };

  const createRow = () => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border border-cyan-400 p-2"><input type="number" class="bg-gray-700 rounded-md p-2 w-full text-center"></td>
      <td class="border border-cyan-400 p-2"><input type="number" class="bg-gray-700 rounded-md p-2 w-full text-center"></td>
      <td class="border border-cyan-400 p-2"><input type="number" class="bg-gray-700 rounded-md p-2 w-full text-center"></td>
      <td class="border border-cyan-400 p-2"><input type="number" class="bg-gray-700 rounded-md p-2 w-full text-center"></td>
      <td class="border border-cyan-400 p-2 bg-gray-700"></td>
      <td class="border border-cyan-400 p-2 bg-gray-700"></td>
    `;
    return row;
  };

  // Initial row
  const initialRow = createRow();
  tableBody.appendChild(initialRow);
  updateRemoveButton();

  addRowBtn.addEventListener("click", () => {
    const row = createRow();
    tableBody.appendChild(row);
    updateRemoveButton();
  });

  removeRowBtn.addEventListener("click", () => {
    const rows = tableBody.querySelectorAll("tr");
    if (rows.length > 1) rows[rows.length - 1].remove();
    updateRemoveButton();
  });

  clearRowsBtn.addEventListener("click", () => {
    tableBody.innerHTML = "";
    const row = createRow();
    tableBody.appendChild(row);
    updateRemoveButton();
  });
});
