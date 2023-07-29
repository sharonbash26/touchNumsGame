'use strict'

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

var gTime=[]
function updateTimer() {
  
  var elapsedTime = Date.now() - gStartTime
  var minutes = Math.floor(elapsedTime / (1000 * 60))
  var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000)
  var milliseconds = Math.floor((elapsedTime % 1000) / 10)
  document.querySelector('.countup span').textContent =
    formatTime(minutes) +
    ':' +
    formatTime(seconds) +
    ':' +
    formatTime(milliseconds)
    gTime.push( formatTime(minutes),formatTime(seconds), formatTime(milliseconds))
    return gTime
    
}

function formatTime(time) {
  return (time < 10 ? '0' : '') + time
}