// Приклад: три асинхронні "запити" з різними затримками.
// Використовуємо Promise.allSettled, але щоб вивести результати
// у порядку завершення, ми збираємо мета-інформацію про час завершення

const runBtn = document.getElementById('runBtn');
const logEl = document.getElementById('log');
const resultsEl = document.getElementById('results');
const statusEl = document.getElementById('status');

function fakeRequest(name, delayMs, shouldReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) reject(new Error(`${name} failed after ${delayMs}ms`));
      else resolve(`${name} result after ${delayMs}ms`);
    }, delayMs);
  });
}

async function runAllSettledDemo() {
  logEl.innerHTML = '';
  resultsEl.textContent = '(виконується...)';
  statusEl.textContent = 'Запуск...';

  // Створюємо три проміси з різними затримками
  const tasks = [
    { id: 'A', promise: fakeRequest('A', 1200) },
    { id: 'B', promise: fakeRequest('B', 500) },
    { id: 'C', promise: fakeRequest('C', 900, true) } // C відмовиться
  ];

  // Обгортаємо кожен проміс так, щоб при завершенні ми записували timestamp
  const wrapped = tasks.map(t => {
    return t.promise
      .then(value => ({ id: t.id, status: 'fulfilled', value, finishedAt: Date.now() }))
      .catch(reason => ({ id: t.id, status: 'rejected', reason: reason && reason.message ? reason.message : reason, finishedAt: Date.now() }));
  });

  // Promise.allSettled чекає на завершення всіх, але наші обгортки повертають об'єкти з finishedAt
  const settled = await Promise.allSettled(wrapped);

  // settled — масив результатів для кожної обгортки; кожен результат має {status: 'fulfilled'|'rejected', value: ...}
  // витягаємо внутрішні об'єкти (value коли fulfilled)
  const payloads = settled.map(s => (s.status === 'fulfilled' ? s.value : s.reason));

  // Сортуємо по finishedAt — це дасть порядок завершення
  payloads.sort((a, b) => (a.finishedAt || 0) - (b.finishedAt || 0));

  // Лог подій у порядку завершення
  payloads.forEach(p => {
    const li = document.createElement('li');
    if (p.status === 'fulfilled') {
      li.textContent = `[${p.id}] fulfilled: ${p.value} (t=${p.finishedAt})`;
    } else {
      li.textContent = `[${p.id}] rejected: ${p.reason} (t=${p.finishedAt})`;
    }
    logEl.appendChild(li);
  });

  // Виведемо також повний масив settled для прозорості
  resultsEl.textContent = JSON.stringify(payloads, null, 2);
  statusEl.textContent = 'Готово';
}

runBtn.addEventListener('click', () => {
  runBtn.disabled = true;
  runAllSettledDemo().catch(err => {
    console.error(err);
    statusEl.textContent = 'Помилка';
  }).finally(() => runBtn.disabled = false);
});
