let textareaEl = document.querySelectorAll("textarea")
let now = moment().format("dddd, MMMM Do")
let currentHour = +moment().format('HH');
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

    for (let i = 0; i < savedTasks.length; i++) {
        if (savedTasks[i][time]) {
            savedTasks[i][time] = text;
            if (!savedTasks[i][time]) savedTasks.splice(i, 1);
            existed = true;
            break;
        };
    };

    if (!existed) {
        let tempObj = {};
        if (!text) return false;
        tempObj[time] = text;
        savedTasks.push(tempObj);
    };

    saveTask(savedTasks);

});

function saveTask(arr) {
    arr = JSON.stringify(arr);
    localStorage.setItem("tasks", arr);
};

function loadTasks() {
    savedTasks = localStorage.getItem("tasks");
    savedTasks = JSON.parse(savedTasks);

    if (!savedTasks) {
        return savedTasks = [];
    };

    for (let i = 0; i < textareaEl.length; i++) {
        let time = textareaEl[i].getAttribute("data-time");
        for (let j = 0; j < savedTasks.length; j++) {
            if (savedTasks[j][time]) {
                textareaEl[i].value = savedTasks[j][time];
                break;
            };
        };
    };
}