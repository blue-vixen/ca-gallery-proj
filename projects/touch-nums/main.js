'use strict'

var gNums = [];
// console.log(gNums);
var gNextNum = 1;
var gInterval

var gBoard = [];


function setDifficulty(num) {
    gNums = getNums(num);
    gNextNum = 1;
    stopTimer();
    gInterval = null;
    renderBoard(gNums);
}


function renderBoard(nums) {
    var strHtml = '';
    var currNumIdx = 0;

    for (var i = 0; i < Math.sqrt(nums.length); i++) {

        strHtml += '<tr>';
        for (var j = 0; j < Math.sqrt(nums.length); j++) {
            var currNum = nums[currNumIdx];
            strHtml += `<td class="num" onclick="cellClicked(this)"> ${currNum} </td>`;
            currNumIdx++;
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function cellClicked(clickedNum) {
    var elNextNum = document.querySelector(".next-num h2 span");

    if (gNextNum === 1) {
        startTimer();
    }

    if (gNextNum === gNums.length) {
        stopTimer();
        var finishMsg = 'Hooray! you did it!'
        var elH2 = document.querySelector(".next-num h2")
        elH2.innerHTML = finishMsg;
    }

    if (+clickedNum.innerText === gNextNum) {

        clickedNum.classList.add('clicked');
        gNextNum++;

    }
    elNextNum.innerText = gNextNum;

}

function startTimer() {
    var startTime = Date.now();
    updateTimer(startTime);
}

function updateTimer(startTime) {
    var elTimer = document.querySelector(".timer h2 span");

    gInterval = setInterval(function () {
        var timeNow = Date.now()
        var seconds = (timeNow - startTime) / 1000;
        elTimer.innerText = seconds;
    }, 100);

}

function stopTimer() {
    clearInterval(gInterval);

}