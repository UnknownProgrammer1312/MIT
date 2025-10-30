// script.js — показує українські жарти (локально) та підвантажує цитати зовнішнім API
const fetchBtn = document.getElementById('fetchBtn');
const typeSelect = document.getElementById('type');
const output = document.getElementById('output');
const authorEl = document.getElementById('author');
const loader = document.getElementById('loader');
const errorEl = document.getElementById('error');



// Кеш для списку цитат з GitHub (щоб не вантажити великий JSON кожен раз)
let quotesCache = null;

// Функція, яка звертається до публічних API для отримання тексту
async function fetchFromAPI(kind) {
  if (kind === 'joke') {
    // Спроба отримати жарт із публічного API
    // Використаємо official-joke-api (працює стабільно, англомовні жарти)
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    if (!res.ok) throw new Error('Помилка при отриманні жарту з API');
    const j = await res.json();
    // Підтримка формату setup + punchline або поля joke
    return j.setup ? `${j.setup}\n\n${j.punchline}` : (j.joke || 'Немає жарту');
  } else {
    // Спробуємо офіційне API quotable.io спочатку
    try {
      const res = await fetch('https://api.quotable.io/random');
      if (res.ok) {
        const q = await res.json();
        return q.content ? `${q.content}${q.author ? `\n\n— ${q.author}` : ''}` : 'Немає цитати';
      }
      // Якщо статус не ок — кине помилку і перейде до фолбеку
      throw new Error('Статус API quotable не ок');
    } catch (e) {
      console.warn('quotable.io зазнав збою, спробуємо завантажити локальний набір із GitHub', e);
      // Фолбек: спробуємо взяти великий JSON із репозиторію quotable на GitHub
      try {
        if (!quotesCache) {
          const rawUrl = 'https://raw.githubusercontent.com/lukePeavey/quotable/master/data/quotes.json';
          const res2 = await fetch(rawUrl);
          if (!res2.ok) throw new Error('Не вдалося завантажити quotes.json з GitHub');
          const all = await res2.json();
          // Розуміємо, що формат — масив об'єктів {content, author, ...}
          quotesCache = Array.isArray(all) ? all : (all.results || []);
        }
        if (quotesCache && quotesCache.length > 0) {
          const pick = quotesCache[Math.floor(Math.random() * quotesCache.length)];
          return pick.content ? `${pick.content}${pick.author ? `\n\n— ${pick.author}` : ''}` : 'Немає цитати';
        }
        throw new Error('GitHub quotes.json порожній або має невідомий формат');
      } catch (ghErr) {
        console.error('Фолбек до GitHub теж не вдався', ghErr);
        throw ghErr; // передаємо помилку вище
      }
    }
  }
}

fetchBtn.addEventListener('click', () => fetchAndShow());

async function fetchAndShow() {
  const kind = typeSelect.value;
  output.textContent = '';
  authorEl.textContent = '';
  errorEl.textContent = '';
  loader.style.display = 'inline';
  fetchBtn.disabled = true;

  try {
    try {
      // Перш за все пробуємо API
      const text = await fetchFromAPI(kind);
      // Якщо API повернув текст — показуємо його. Для жартів — відсутність автора, для цитат вже вбудовано.
      output.textContent = text;
      // Якщо цитата повертається з API вже з автором у тілі — не чіпаємо authorEl.
      authorEl.textContent = '';
    } catch (apiErr) {
      console.warn('API не відповів або сталася помилка, використаємо локальну підміну.', apiErr);
      // Фолбек: для жартів беремо локальний масив, для цитат — повідомлення про помилку
      if (kind === 'joke') {
        const j = ukJokes[Math.floor(Math.random() * ukJokes.length)];
        output.textContent = j;
        authorEl.textContent = '';
      } else {
        errorEl.textContent = 'Не вдалося отримати цитату з API і немає локальної підмоги.';
      }
    }
  } catch (err) {
    console.error(err);
    errorEl.textContent = 'Сталася помилка. Спробуйте ще раз пізніше.';
    output.textContent = '';
  } finally {
    loader.style.display = 'none';
    fetchBtn.disabled = false;
  }
}

// Додаткова клавіатурна підтримка (Enter)
typeSelect.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') fetchAndShow();
});
