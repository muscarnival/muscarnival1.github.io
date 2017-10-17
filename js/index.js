// Initialize Firebase
var config = {
  apiKey: "AIzaSyB6W25napAR8VIksVpa_sgml4mkl_X5S_s",
  authDomain: "muscarnival-45dce.firebaseapp.com",
  databaseURL: "https://muscarnival-45dce.firebaseio.com",
  projectId: "muscarnival-45dce",
  storageBucket: "",
  messagingSenderId: "649034251506"
};
firebase.initializeApp(config);
var database = firebase.database();

function login () {
  var email = $(".email")[0].value
  var password = $(".password")[0].value
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
      // window.location = 'http://localhost:3000/waiver.html'
      $(".waiverhead").removeClass("hide")
      showForm(".waiverhead")
    })
    .catch(function(error) {
    var errorMessage = error.message;
    if (error) {
      console.log(error)
      alert(errorMessage)
    }
  })
}

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
  var name = $(".name")[0].value
  var address = $(".address")[0].value
  var telephone = $(".telephone")[0].value
  var birthday = $(".birthday")[0].value
  var userId = firebase.auth().currentUser.uid;
  var date = new Date()
  name == "" ? alert("Please input your name!")
    : address == "" ? alert("Please input your address!")
    : telephone == "" ? alert("Please input your telephone!")
    : birthday == "" ? alert("Please input your birthday!") : null
  var user = {
    name: name,
    address: address,
    telephone: telephone,
    birthday: birthday,
    waiverComplete: true,
    timeCompleted: date.toLocaleDateString()
  }
  firebase.database().ref('/participants/' + userId).update(user)
    .then(function (val) {
      alert('Waiver successfully submitted, fill er up bahd!')
    })
    .catch(function(err) {
      alert('There was a problem submitting the waiver!')
    })
}

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });
})(jQuery); // End of use strict