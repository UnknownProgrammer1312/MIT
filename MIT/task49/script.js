const fetchBtn = document.getElementById('fetchBtn');
const typeSelect = document.getElementById('type');
const output = document.getElementById('output');
const authorEl = document.getElementById('author');
const loader = document.getElementById('loader');
const errorEl = document.getElementById('error');


async function fetchFromAPI(kind) {
  if (kind === 'joke') {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    if (!res.ok) throw new Error('Жарт API недоступний');
    const j = await res.json();
    const text = j.setup ? `${j.setup}\n\n${j.punchline}` : (j.joke || 'Немає жарту');
    return { text, author: null, source: 'official-joke-api' };
  }

  const res = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
  if (!res.ok) throw new Error('Цитатний API недоступний');
  const q = await res.json();
  return { text: q[0].quote || 'Немає цитати', author: q[0].author || '', source: 'api.breakingbadquotes' };
}

async function fetchAndShow() {
  const kind = typeSelect.value;
  
  output.textContent = '';
  authorEl.textContent = '';
  errorEl.textContent = '';
  loader.style.display = 'inline';
  fetchBtn.disabled = true;

  try {
    const result = await fetchFromAPI(kind);
    output.textContent = result.text;
    authorEl.textContent = result.author ? `— ${result.author}` : '';
  } catch (err) {
    console.warn('API помилка', err);
    // Жарти відображаються тільки через API — при помилці показуємо повідомлення
    if (kind === 'joke') {
      errorEl.textContent = 'Не вдалося отримати жарт з API. Спробуйте пізніше.';
      output.textContent = '';
      authorEl.textContent = '';
    } else {
      // Для цитат теж показуємо повідомлення про помилку
      errorEl.textContent = 'Не вдалося отримати цитату з API. Спробуйте пізніше.';
      output.textContent = '';
      authorEl.textContent = '';
    }
  } finally {
    loader.style.display = 'none';
    fetchBtn.disabled = false;
  }
}

fetchBtn.addEventListener('click', fetchAndShow);
typeSelect.addEventListener('keydown', (e) => { if (e.key === 'Enter') fetchAndShow(); });
