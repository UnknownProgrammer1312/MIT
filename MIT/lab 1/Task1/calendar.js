// Варіант 14.
// 1) Календар подій. Створіть інтерактивний календар, який дозволяє користувачеві вибрати дату. 
// Коли користувач вибере дату, відобразиться повідомлення з підтвердженням вибраної дати.
document.getElementById("calendar").addEventListener("change", function() {
  const selectedDate = this.value;
  alert("Ви вибрали дату: " + selectedDate);
});
