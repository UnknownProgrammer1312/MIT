// 3) Перевірка правильності введення електронної пошти. Створіть текстове поле для введення електронної пошти. 
// Використовуйте JavaScript для перевірки електронної пошти на

// · Наявність символа @ (один раз).

// · Є частина до @ (локальна частина) і після @ (домен).

// · Домен містить хоча б одну крапку (.), наприклад gmail.com.

// · Заборона пробілів і заборонених символів ((),:;<>[\]).

// Якщо перевірка не виконана — виведіть повідомлення про помилку.
function validateEmail() {
  const email = document.getElementById("email").value;
  const message = document.getElementById("message");
  const forbiddenChars = /[(),:;<>[\]\s]/;
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const aaa = new RegExp("ilarion");
  if (forbiddenChars.test(email)) {
    message.textContent = "❌ Заборонені символи у e-mail!";
    message.style.color = "red";
  } else if (!emailPattern.test(email)) {
    message.textContent = "❌ Неправильний формат e-mail!";
    message.style.color = "red";
  } else {
    message.textContent = "✅ Правильний e-mail!";
    message.style.color = "green";
  }
}
