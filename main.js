'use strict'

var gBoardSize
var gNums = []
var gCorrectNumber = 1
var gIntervalId
var gStartTime
var gRecord = 0
var gRecordMinutes = +localStorage.getItem('recordMin')?+localStorage.getItem('recordMin'):Infinity
var gRecordSec = +localStorage.getItem('recordSec')?+localStorage.getItem('recordSec'):Infinity
var gRecordMil =+localStorage.getItem('recordMil')?+localStorage.getItem('recordMil'):Infinity
function onInit() {
    gBoardSize = 16
    reset()
    gNums = createArr()
    gNums = shuffle(gNums)
    renderBoard()
    renderButtonsLevel()
    getRecordFromLocalStorge()
}
function reset() {
    gCorrectNumber = 1
    gCountOfPaintedSquar = 0
    stopTimer()
    document.querySelector('.countup span').innerText = '00:00:00'
   document.querySelector('.record span').innerText = '00:00:00'
  
 

}

function startGame(elBtn) {
    onInit()
}

function createArr() {
    var nums = []
    for (var i = 1; i <= gBoardSize; i++) {
        nums.push(i)
    }

    return nums
}

var gTimerId = 0
var gCountOfPaintedSquar = 0
function onCellClicked(elTd, num) {
    if (+elTd.innerText === 1) startTimer()
    if (num === gCorrectNumber) {
        gCorrectNumber++
        gCountOfPaintedSquar++
        elTd.style.backgroundColor = 'white'
    }
    
    if (gBoardSize === gCountOfPaintedSquar) victory()

}
var gLastTime
function victory() {
    stopTimer()
    checkRecord()

}
var gMinutesInt
var gSecondsInt
var gMillisecondsInt
function checkRecord() {
    //  debugger
    gMinutesInt = +gTime[gTime.length - 3]// זמן אחרון 
    gSecondsInt = +gTime[gTime.length - 2]
    gMillisecondsInt = +gTime[gTime.length - 1]
   
    // debugger
    // if (minutesInt < gRecordMinutes) {
    //     gRecordMinutes = minutesInt
    // }
    // if (secondsInt < gRecordSec) {
    //     gRecordSec = secondsInt
    // }
    // if (millisecondsInt < gRecordMil) {
    //     gRecordMil = millisecondsInt
    // }
    //  document.querySelector('.record span').textContent =gRecordMinutes+':'+gRecordSec+':'+gRecordMil
    localStorage.setItem('recordMin', gRecordMinutes)
    localStorage.setItem('recordSec', gRecordSec)
    localStorage.setItem('recordMil',gRecordMil) /// זה לשמור שיא 
    localStorage.setItem('currentMinutes',gMinutesInt) // זה נוכחי
    localStorage.setItem('currentSec',gSecondsInt)
    localStorage.setItem('currentMil',gMillisecondsInt)

}
var gMin = 0
var gSec = 0
var gMil = 0
function getRecordFromLocalStorge() {
    //debugger
    //זה האחרון 
    gMin =localStorage.getItem('currentMinutes')   
    gSec= localStorage.getItem('currentSec')
    gMil=localStorage.getItem('currentMil')
    console.log(gMin)
    console.log(gSec)
    console.log(gMil)
    if (!gMin && !gSec && !gMil) gMil = gMin = gSec = 0
    else {
        if (+gMin < +gRecordMinutes) gRecordMinutes = +gMin

        if (+gSec < +gRecordSec) gRecordSec = +gSec
        if (+gMil < + gRecordMil) gRecordMil = +gMil
    }
   
    if (gRecordMinutes === Infinity) {
        document.querySelector('.record span').textContent = '00' + ':' + '00' + ':' + '00'
    } else {
        document.querySelector('.record span').textContent = gRecordMinutes + ':' + gRecordSec + ':' + gRecordMil
        // localStorage.setItem('recordMin', gRecordMinutes)
        // localStorage.setItem('recordSec', gRecordSec)
        // localStorage.setItem('recordMil',gRecordMil)
    }


}

function renderBoard() {
    var strHTML = ''
    var loopSize = Math.sqrt(gBoardSize)
    for (var i = 0; i < loopSize; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < loopSize; j++) {
            var currentCell = gNums.pop()
            strHTML += `\t<td ${currentCell} onclick="onCellClicked(this,${currentCell})" >${currentCell}</td>\n`
        }
        strHTML += `</tr>\n`
        const elTable = document.querySelector('.board')
        elTable.innerHTML = strHTML
    }
}

function renderButtonsLevel() {
    var strHTML = ''
    var title = ''
    for (var i = 1; i <= 3; i++) {
        if (i === 1) title = 'Easy'
        else if (i === 2) title = 'Hard'
        else title = 'Extreme'
        strHTML += `<button onclick="chooseLevel(${i})">${title}</button>`
    }
    var elLevel = document.querySelector('.levels')
    elLevel.innerHTML = strHTML
}

function chooseLevel(idx) {
    if (idx === 1) gBoardSize = 16
    else if (idx === 2) gBoardSize = 25
    else gBoardSize = 36
    gNums = createArr()
    gNums=shuffle(gNums)
    renderBoard()
    reset()
    return gBoardSize

}

function startTimer() {
    gStartTime = Date.now();
    gIntervalId = setInterval(updateTimer, 10);
}

function stopTimer() {
    clearInterval(gIntervalId);
}






//not finish 