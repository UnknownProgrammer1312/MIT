const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");




function isFalsy(value) {
  if (value === "false") value = false;
  else if (value === "0") value = 0;
  else if (value === "") value = "";
  else if (value === "null") value = null;
  else if (value === "undefined") value = undefined;
  else if (value === "NaN") value = NaN;

  if (!value) {
    result.innerHTML = "✅ Значення є хибним!";
    result.className = "success";
  } else {
    result.innerHTML = "❌ Значення не є хибним!";
    result.className = "error";
  }
}

addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
   const inputValue = document.getElementById("inputValue").value;
   isFalsy(inputValue);
  }});

checkBtn.onclick = function () {
  const inputValue = document.getElementById("inputValue").value;
  isFalsy(inputValue);
};
