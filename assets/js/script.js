let textareaEl = document.querySelectorAll("textarea")
let now = moment().format("dddd, MMMM Do")
let currentHour = +moment().format('HH');
let savedObj = {};

function checkStatus(arr, hour) {
    for (let i = 0; i < arr.length; i++) {
        let time = []
        time[i] = +arr[i].getAttribute("data-time");
    
        if (time[i] < hour) {
            arr[i].classList.add("past");
        } else if (time[i] === hour) {
            arr[i].classList.add("present");
        } else {
            arr[i].classList.add("future");
        }
    };
}

checkStatus(textareaEl, currentHour);

$("#currentDay").text(now);