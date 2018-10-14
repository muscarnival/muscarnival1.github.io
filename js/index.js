// Initialize Firebase
var config = {
  apiKey: "AIzaSyBkpevvEvMLKLIly5Z56DVRmu27J64lre8",
  authDomain: "hypeweek2018.firebaseapp.com",
  databaseURL: "https://hypeweek2018.firebaseio.com/", 
  projectId: "hypeweek2018",
  storageBucket: "",
  messagingSenderId: "464667077494"
};
firebase.initializeApp(config);
var database = firebase.database();
var masterTable = []
var curTable = []

function login () {
  var email = $(".email")[0].value
  var password = $(".password")[0].value
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
      $(".waiverhead").removeClass("hide")
      showForm(".waiverhead")
      firebase.database().ref('/hypeweek2018/').once('value')
        .then(function(snapshot) {
          var participants = snapshot.val()
          var ids = Object.keys(participants)
          var cur_id = firebase.auth().currentUser.uid
          var flag = false
          ids.map(function(id) {
            if (participants[id].Email == email & cur_id != id) {
              var user = participants[id]
              firebase.database().ref('/hypeweek2018/' + cur_id).update(user)
              firebase.database().ref('/hypeweek2018/' + id).remove()
            }
          })
        })
    })
    .catch(function(error) {
    var errorMessage = error.message;
    if (error) {
      console.log(error)
      alert(errorMessage)
    }
  })
}

function loginAdmin () {
  var email = $(".email")[0].value
  var password = $(".password")[0].value
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
      if (firebase.auth().currentUser.email == 'carnival@musonline.com') {
        loadTable()
        $(".table-container").removeClass("hide")
        showForm(".table-container")
      }
      else {
        alert("You are not authorized to see this page!")
        window.location = 'https://muscarnival.github.io'
      }
    })
    .catch(function(error) {
      var errorMessage = error.message;
      if (error) {
        alert("You are not authorized to see this page!")
        window.location = 'https://muscarnival.github.io'
      }
    })
}

function loadTable () {
  firebase.database().once('value').then(function(snapshot) {
    var participants = snapshot.val()
    var teams = []
    teams = updateTable(participants)
    teams.map(function (team, index) {
      $("#select-team-filter").append($('<option>', {
        text: team,
        value: index
      }))
      $("#select-new-team").append($('<option>', {
        text: team,
        value: index
      }))
    })
    masterTable = participants
    curTable = participants
  });
}
function updateTable (participants, filter) {
  var names = Object.keys(participants)
  if (filter) {
    names = names.filter(function (name) {
      return participants[name].Team == filter
    })
  }
  var teams = []
  names.map(function(name) {
    var table = document.getElementById("participant-table")
    var participant = participants[name]
    var row = table.insertRow(0)
    var name = row.insertCell(0)
    var email = row.insertCell(1)
    var team = row.insertCell(2)
    var waiverComplete = row.insertCell(3)
    name.innerHTML = participant.Name
    email.innerHTML = participant.Email
    team.innerHTML = participant.Team
    teams.includes(participant.Team) ? null : teams.push(participant.Team)
    if (participant.Email == "") {
      row.style = "background-color: rgba(255, 0, 0, 0.3)"
    }
    else if (participant.waiverComplete == true) {
      row.style = "background-color: rgba(0, 255, 0, 0.3)"
    }
    waiverComplete.innerHTML = participant.waiverComplete === true ? 'True' : 'False'
  })
  return teams
}
function createParticipant () {
  var team = $("#select-new-team option:selected")[0].label
  var name = $(".new-name")[0].value
  var email = $(".new-email")[0].value
  var oldId = name.replace(" ", "")
  var user = {
    Name: name,
    Email: email,
    Team: team,
    waiverComplete: false
  }
  firebase.auth().createUserWithEmailAndPassword(email, 'hype2018')
    .then(function (newUser) {
      var userId = newUser.uid
      console.log(userId)
      firebase.database().ref('/hypeweek2018/' + oldId).remove()
        .then(function () {
          firebase.database().ref('/hypeweek2018/' + userId).update(user)
            .then(function (val) {
              alert('User successfully added!')
            })
            .catch(function(err) {
              alert('There was a problem adding the user!')
            })
        })
        .catch(function () {
          alert('There was a problem removing the old user!')
        })
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });
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
    Name: name,
    address: address,
    telephone: telephone,
    birthday: birthday,
    waiverComplete: true,
    timeCompleted: date.toLocaleDateString()
  }
  firebase.database().ref('/hypeweek2018/' + userId).update(user)
    .then(function (val) {
      $(".thank-you").removeClass("hide")
      showForm(".thank-you")
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
  if (window.location.href === "http://localhost:3000/" || window.location.href === "https://muscarnival.github.io/") {
    $(window).blur(pauseVideo)
  }
  else {
    $("#select-team-filter").change(function (event) {
      var filter = $("#select-team-filter option:selected")[0].label
      $("#participant-table").empty()
      updateTable(masterTable, filter)
    })
  }

})(jQuery)
