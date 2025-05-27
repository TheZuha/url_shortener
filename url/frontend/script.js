const BASE_URL = 'http://127.0.0.1:8000/shorten';

// Loader uchun yordamchi
function showLoader(btn, loading = true) {
  if (loading) {
    btn.disabled = true;
    btn.dataset.original = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Qisqartirilmoqda...';
  } else {
    btn.disabled = false;
    if (btn.dataset.original) btn.innerHTML = btn.dataset.original;
  }
}

// Shorten URL
const shortenForm = document.getElementById('shortenForm');
shortenForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const url = document.getElementById('urlInput').value;
  const btn = shortenForm.querySelector('button[type="submit"]');
  showLoader(btn, true);
  const resultDiv = document.getElementById('result');
  resultDiv.classList.add('d-none');
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const data = await res.json();
    if (res.ok) {
      const shortUrl = `${window.location.origin}/${data.short_code}`;
      resultDiv.className = 'alert alert-success';
      resultDiv.innerHTML = `✅ Qisqa URL: <a href="http://127.0.0.1:8000/${shortUrl}" target="_blank">${shortUrl}</a> <button class='btn btn-sm btn-outline-secondary ms-2' onclick='copyToClipboard("${shortUrl}")'>Nusxa olish</button>`;
    } else {
      resultDiv.className = 'alert alert-danger';
      resultDiv.textContent = `❌ Xatolik: ${data.detail || JSON.stringify(data)}`;
    }
  } catch (err) {
    resultDiv.className = 'alert alert-danger';
    resultDiv.textContent = '❌ Server bilan bog‘lanishda xatolik.';
  }
  resultDiv.classList.remove('d-none');
  showLoader(btn, false);
});

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text);
  alert('Nusxa olindi!');
}

// Get Original URL
globalThis.getURL = async function() {
  const code = document.getElementById('shortCodeInput').value.trim();
  if (!code) return showOutput('Qisqa kod kiriting!', false);
  try {
    const res = await fetch(`${BASE_URL}/${code}`);
    if (res.ok) {
      const data = await res.json();
      showOutput(`🔗 Original URL: <a href='${data.url}' target='_blank'>${data.url}</a>`, true);
    } else {
      showOutput('❌ Topilmadi yoki xatolik.', false);
    }
  } catch {
    showOutput('❌ Server bilan bog‘lanishda xatolik.', false);
  }
}

// Stats
globalThis.getStats = async function() {
  const code = document.getElementById('shortCodeInput').value.trim();
  if (!code) return showOutput('Qisqa kod kiriting!', false);
  try {
    const res = await fetch(`${BASE_URL}/${code}/stats`);
    const data = await res.json();
    if (res.ok) {
      showOutput(`📊 Statistika: <b>${data.count}</b> marta bosilgan.`, true);
    } else {
      showOutput('❌ Statistika topilmadi.', false);
    }
  } catch {
    showOutput('❌ Server bilan bog‘lanishda xatolik.', false);
  }
}

// Update
globalThis.updateURL = async function() {
  const code = document.getElementById('shortCodeInput').value.trim();
  if (!code) return showOutput('Qisqa kod kiriting!', false);
  const newUrl = prompt("Yangi URL'ni kiriting:");
  if (!newUrl) return;
  try {
    const res = await fetch(`${BASE_URL}/${code}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: newUrl })
    });
    const data = await res.json();
    if (res.ok) {
      showOutput('✅ URL yangilandi!', true);
    } else {
      showOutput('❌ Xatolik: ' + (data.detail || JSON.stringify(data)), false);
    }
  } catch {
    showOutput('❌ Server bilan bog‘lanishda xatolik.', false);
  }
}

// Delete
globalThis.deleteURL = async function() {
  const code = document.getElementById('shortCodeInput').value.trim();
  if (!code) return showOutput('Qisqa kod kiriting!', false);
  if (!confirm("Rostdan ham o‘chirmoqchimisiz?")) return;
  try {
    const res = await fetch(`${BASE_URL}/${code}/delete`, { method: 'DELETE' });
    if (res.ok) {
      showOutput('🗑️ Qisqa URL o‘chirildi!', true);
    } else {
      showOutput('❌ O‘chirishda xatolik.', false);
    }
  } catch {
    showOutput('❌ Server bilan bog‘lanishda xatolik.', false);
  }
}

// Show Output
function showOutput(msg, success = true) {
  const output = document.getElementById('output');
  output.classList.remove('d-none');
  output.className = `alert ${success ? 'alert-info' : 'alert-danger'}`;
  output.innerHTML = msg;
}
  