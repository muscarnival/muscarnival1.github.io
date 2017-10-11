/**
 * Created by liamvovk on 2017-10-10.
 */

var video = document.getElementById("waiverVideo")

function submitForm () {
  console.log("submit")

}

function videoEnd () {
  // alert("video ended")
  $("#waiver").removeClass("hide")
  showForm("#waiver")
}

function showForm (form) {
  $('html, body').animate({
    scrollTop: $(form).offset().top
  }, 1000,  "easeInOutExpo");
}

function playVideo () {
  video.play()
}
function pauseVideo () {
  video.pause()
}
function progressBar (progress) {
  curTime = video.currentTime
  duration = video.duration
  curProgress = Math.round(curTime/duration * 100)
  console.log(curProgress)
  var elem = document.getElementById("myBar")
  elem.style.width = curProgress + '%';
  elem.innerHTML = curProgress  + '%';
}