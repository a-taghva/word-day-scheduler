let textareaEl = document.querySelectorAll("textarea")
let now = moment().format("dddd, MMMM Do")
let currentHour = +moment().format('HH');
let mainArr = [];
let savedTasks = [];

function checkStatus(arr, hour) {
    for (let i = 0; i < arr.length; i++) {
        let time
        time = +arr[i].getAttribute("data-time");
    
        if (time < hour) {
            arr[i].classList.add("past");
        } else if (time === hour) {
            arr[i].classList.add("present");
        } else {
            arr[i].classList.add("future");
        };
    };
};

checkStatus(textareaEl, currentHour);
$("#currentDay").text(now);
loadTasks();

$(".row").on("click", ".saveBtn", () => {
    let existed = false;
    let textarea = event.target.closest(".row")
        .querySelector("textarea");

    let text = textarea.value.trim();
    let time = $(textarea).attr("data-time");

    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i][time]) {
            mainArr[i][time] = text;
            if (!mainArr[i][time]) mainArr.splice(i, 1);
            existed = true;
            break;
        };
    };

    if (!existed) {
        let tempObj = {};
        if (!text) return false;
        tempObj[time] = text;
        mainArr.push(tempObj);
    };

    saveTask(mainArr);

});

function saveTask(arr) {
    arr = JSON.stringify(arr);
    localStorage.setItem("tasks", arr);
};

function loadTasks() {
    mainArr = localStorage.getItem("tasks");
    mainArr = JSON.parse(mainArr);

    if (!mainArr) {
        return mainArr = [];
    };

    for (let i = 0; i < textareaEl.length; i++) {
        let time = textareaEl[i].getAttribute("data-time");
        for (let j = 0; j < mainArr.length; j++) {
            if (mainArr[j][time]) {
                textareaEl[i].value = mainArr[j][time];
                break;
            };
        };
    };
}