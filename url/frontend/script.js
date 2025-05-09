const BASE_URL = 'http://127.0.0.1:8000/shorten';

// Shorten URL
document.getElementById('shortenForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const url = document.getElementById('urlInput').value;
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url })
    });
  
    const resultDiv = document.getElementById('result');
    if (res.ok) {
      const data = await res.json();
      resultDiv.className = 'alert alert-success';
      resultDiv.innerHTML = `✅ Short URL: <a href="${BASE_URL}/${data.short_code}" target="_blank">${BASE_URL}/${data.short_code}</a>`;
    } else {
      const error = await res.json();
      resultDiv.className = 'alert alert-danger';
      resultDiv.textContent = `❌ Error: ${JSON.stringify(error)}`;
    }
  
    resultDiv.classList.remove('d-none');
  });
  
  
// Get Original URL
async function getURL() {
    const code = document.getElementById('shortCodeInput').value;
    const res = await fetch(`${BASE_URL}/${code}`);
    showOutput(res);
  }
  
  // Stats
  async function getStats() {
    const code = document.getElementById('shortCodeInput').value;
    const res = await fetch(`${BASE_URL}/${code}/stats`);
    showOutput(res);
  }
  
  // Update
  async function updateURL() {
    const code = document.getElementById('shortCodeInput').value;
    const newUrl = prompt("Enter new URL:");
    if (!newUrl) return;
    const res = await fetch(`${BASE_URL}/${code}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: newUrl })
    });
    showOutput(res);
  }
  
  // Delete
  async function deleteURL() {
    const code = document.getElementById('shortCodeInput').value;
    const confirmDelete = confirm("Are you sure you want to delete this short URL?");
    if (!confirmDelete) return;
    const res = await fetch(`${BASE_URL}/${code}/delete`, {
      method: 'DELETE'
    });
    showOutput(res);
  }
  
  // Show Output
  async function showOutput(res) {
    const output = document.getElementById('output');
    const data = await res.json();
    output.classList.remove('d-none');
    output.className = `alert ${res.ok ? 'alert-info' : 'alert-danger'}`;
    output.textContent = JSON.stringify(data, null, 2);
  }
  