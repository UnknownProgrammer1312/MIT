// 4) Створення акордеону. Створіть акордеон, де є кілька блоків із заголовками та прихованим вмістом. 
// При натисканні на заголовок відповідний блок вмісту повинен відкриватися, а інші блоки - закриватися.
const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    document.querySelectorAll(".accordion-content").forEach(content => {
      content.classList.remove("active");
    });
    const content = header.nextElementSibling;
    content.classList.add("active");
  });
});
