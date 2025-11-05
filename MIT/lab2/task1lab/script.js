const addHistoryButton = document.getElementById('addHistory');
const deleteHistoryButton = document.getElementById('deleteHistory');

const about = {url: "./about.html",
            title: "About", 
            decription: "About Page"
};

const addRow = () => {
    history.pushState(about, about.title, about.url);
    document.title = about.title;
    content.innerHTML = "<h1>About Page</h1><p>This is About page content</p>";

};

addHistoryButton.addEventListener('click', () => {
addRow();
});