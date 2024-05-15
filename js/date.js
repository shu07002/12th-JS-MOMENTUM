const today = document.querySelector("h2#date");

function getToday() {
    const date = new Date();
    const year = String(date.getFullYear()).padStart(2,"0");
    const month = String(date.getMonth()+1).padStart(2,"0");
    const day = String(date.getDate()).padStart(2,"0");
    today.innerText = `${year}/${month}/${day}`
} 

today.className = "date-font";

getToday();
setInterval(getToday,86400000);