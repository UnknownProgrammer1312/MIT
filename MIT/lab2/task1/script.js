// Отримуємо елементи з HTML

let typeBtn = document.getElementById('typeBtn');
let result = document.getElementById('result');
function compareBooleans(a, b)
{
    if (a === b) {
        result.innerHTML = "✅ Значення однакові";
    } else  {
    result.innerHTML = "❌ Значення різні";
    }
    };
// Функція порівняння двох булевих значень
 typeBtn.onclick = function getValue() {
    let firstValue = document.getElementById('firstValue').value;
    let secondValue = document.getElementById('secondValue').value;
  compareBooleans(firstValue, secondValue);

}
