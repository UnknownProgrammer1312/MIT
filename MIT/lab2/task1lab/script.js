
//Властивості window
document.getElementById("windowsProperty").addEventListener('click',() => {
    document.getElementById("widthInner").textContent = "Windows.innerWidth = " + window.innerWidth;
    document.getElementById("heightInner").textContent = "Windows.innerHeight = " + window.innerHeight;

});

//Компоненти браузера
document.getElementById("browserComponent").addEventListener('click',() => {
    document.getElementById("srcBar").textContent = "Scrollbar is = " + window.scrollbars.visible;

});

// Властивість screen
document.getElementById("screenProperty").addEventListener('click',() => {
    const clr = screen.colorDepth;
    document.getElementById("scrProp").textContent = "Color depth is = " + clr;

});
// Діалогові вікна
document.getElementById("conf").addEventListener('click',() => {
     const name = prompt("Enter your name");
     const isItCorrect = confirm("Your name is " + name + "?")
     if (isItCorrect === true) alert("Welcome " + name);
     else alert("Try again");

});

// Відкриття, закриття та позиціонування вікон
document.getElementById("windowsPosition").addEventListener('click',() => {
     window.open("https://www.google.com/","_blank","popup=yes,width=480,height=480");
});

// Історія браузера. History API довжина 
document.getElementById("length").addEventListener('click',() => {
    document.getElementById("labelLenght").textContent = history.length;
});
// Історія браузера. History API додати 
let count = 1
document.getElementById("add").addEventListener('click',() => {
    
    history.pushState({page :"myPage"},"", `?ilarion=${count}`);
    count++;
    console.log(history.length);
});
// Історія браузера. History API повернутись
document.getElementById("back").addEventListener('click',() => {
    history.back();
     
});
// Історія браузера. History API замінити
document.getElementById("replace").addEventListener('click', () => {
        
        history.replaceState({ page: "myPage" }, "", `?ilarion=${--count}`);
        console.log("History length після видалення:", history.length);
        
});
// Об'єкт location. Управління адресою
document.getElementById("location").addEventListener('click',() => {
    console.log(location.host);
    console.log(location.protocol);
    console.log(location.port);
    console.log(location.hostname);
   console.log(navigator.appCodeName);
});
// Функція setTimeout
document.getElementById("setTimeout").addEventListener('click', () => {
  const timerId = setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      console.log("Hello");
    }
  }, 5000);
});
// setInterval
let intervalId = false; 
document.getElementById("setInterval").addEventListener('click', () => {

  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    for (let i = 0; i < 5; i++) {
      console.log("Hello");
    }
  }, 50);
});

// stopInterval
document.getElementById("stopInterval").addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = true; 
  console.log("Interval stopped");
});

