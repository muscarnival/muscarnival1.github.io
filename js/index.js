var video = document.getElementById("waiverVideo")

function videoEnd () {
  // alert("video ended")
  $("#waiver-info").removeClass("hide")
  $("#waiver").removeClass("hide")
  showForm("#waiver-info")
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
function progressBar () {
  curTime = video.currentTime
  duration = video.duration
  curProgress = Math.round(curTime/duration * 100)
  var elem = document.getElementById("myBar")
  elem.style.width = curProgress + '%';
  elem.innerHTML = curProgress  + '%';
}
function submitWaiver () {

})(jQuery)
