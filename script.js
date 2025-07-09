let simcards = [];
let transactions = [];

fetch('data-simcard.json')
  .then(res => res.json())
  .then(data => {
    simcards = data;
    document.getElementById("simcard-count").textContent = simcards.length;

    const tbody = document.getElementById("simcard-table");
    simcards.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.site_name}</td>
        <td>${row.phone_number}</td>
        <td>${row.provider}</td>
        <td>${row.date_regis}</td>
        <td>${row.remaining_balance}</td>
        <td>${row.description}</td>
      `;
      tbody.appendChild(tr);
    });
  });

fetch('data-transaksi.json')
  .then(res => res.json())
  .then(data => {
    transactions = data;
  });

function showSection(sectionId) {
  document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';
}

function searchTransaction() {
  const phone = document.getElementById("searchNumber").value;
  const result = transactions.filter(tx => tx.phone_number === phone);
  const resultDiv = document.getElementById("searchResult");
  const tbody = document.getElementById("mutasi-body");
  const table = document.getElementById("transaction-table");

  if (result.length === 0) {
    resultDiv.innerHTML = "<p>No transaction found for " + phone + "</p>";
    table.style.display = "none";
  } else {
    resultDiv.innerHTML = `<p>Phone Number: ${phone} <button onclick="table.style.display='table'">Mutasi Transaction Simcard</button></p>`;
    tbody.innerHTML = "";
    result.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.date}</td>
        <td>${row.keterangan}</td>
        <td>${row.type}</td>
        <td>${row.saldo}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}