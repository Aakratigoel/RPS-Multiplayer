
$(document).ready(function () {

  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAfzxBQEOtH3aksJn0pKWKda2rHnKLI910",
    authDomain: "rps-db-33e37.firebaseapp.com",
    databaseURL: "https://rps-db-33e37.firebaseio.com",
    projectId: "rps-db-33e37",
    storageBucket: "",
    messagingSenderId: "913488802507",
    appId: "1:913488802507:web:ec8e27b37c1d847a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var player1;
  var player2;
  var choicePlayer1;
  var choicePlayer2;
  var winsPlayer1 = 0;
  var winsPlayer2 = 0;
  var lossPlayer1 = 0;
  var lossPlayer2 = 0;
  var tied;
  var count = 1;
  var chat1;
  var chat2;
  var test = "\n";
  $("#button2").on("click",function(event)
  {
    console.log("Entered send button");
    event.preventDefault();
    console.log($("#select2").val());
    if($("#select2").val()==="Select A Value")
    {
      console.log("entered first condition");
      
      chat1 = player1 + ":"+$("#chatInput1").val()+test;
      console.log("chat from player 1"+chat1)
      $("#chatInput1").val("");
      database.ref().push({
      dbChatPlayer1: chat1
      });
    }
    else if($("#select1").val()==="Select A Value")
    {
      chat2 = player2 + ":"+$("#chatInput1").val()+test;
      $("#chatInput1").val("");
      database.ref().push({
      dbChatPlayer2: chat2
      });
    }
    
  })
  $("#button1").on("click", function (event) {

    event.preventDefault();
    if ($("#ta1").val() === "") {

      player1 = $("#text1").val();
      $("#text1").val("");
      database.ref().push({
        dbPlayer1: player1,

      });

    }
    else if ($("#ta1").val() !== "") {
      player2 = $("#text1").val();
      $("#text1").val("");
      database.ref().push({
        dbPlayer2: player2,
      })
    }
  })

  $("#select1").on("change", function () {
    if (count % 2 !== 0) {
      choicePlayer1 = $("#select1").val();
      count++;
      database.ref().push({
        dbCount: count
      });
      database.ref().push({
        dbChoicePlayer1: choicePlayer1
      });
    }
    else {
      alert("It's player 2 turn");
    }

  })
  $("#select2").on("change", function () {
    
    if (count % 2 === 0) {
      choicePlayer2 = $("#select2").val();
      count++;
      database.ref().push({
        dbCount: count,

      });
      database.ref().push({
        dbChoicePlayer2: choicePlayer2
      });
    }
    else {

      alert("It's player 1 turn");
    }
    if (choicePlayer1 !== "Select A value" && choicePlayer2 !== "Select A value") {
      tie();
      winPlayer1();
      winPlayer2();
      // $("#select1").removeAttr("disabled");
      // $("#select2").removeAttr("disabled");
    }
  })
  database.ref().on("child_added", function (snapshot) {
    var keys = Object.keys(snapshot.val())[0];

    if (keys === "dbPlayer1") {
      $("#ta1").val(snapshot.val().dbPlayer1);
      player1 = snapshot.val().dbPlayer1;
    }
    else if (keys === "dbPlayer2") {
      $("#ta2").val(snapshot.val().dbPlayer2);
      player2 = snapshot.val().dbPlayer2;
    }
    else if (keys === "dbChoicePlayer1") {
      choicePlayer1 = snapshot.val().dbChoicePlayer1;
    }
    else if (keys === "dbChoicePlayer2") {
      choicePlayer2 = snapshot.val().dbChoicePlayer2;
    }
    else if (keys === "dbCount") {
      count = snapshot.val().dbCount;
    }
    else if (keys === "dbWinPlayer1") {
      winsPlayer1 = snapshot.val().dbWinPlayer1;
     $("#sp1").text(winsPlayer1);
    }
    else if (keys === "dbWinPlayer2") {
      winsPlayer2 = snapshot.val().dbWinPlayer2;
      $("#sp3").text(winsPlayer2);
    }
    else if (keys === "dbLossPlayer1") {
      lossPlayer1 = snapshot.val().dbLossPlayer1;
      $("#sp2").text(lossPlayer1);
    }
    else if (keys === "dbLossPlayer2") {
      lossPlayer2 = snapshot.val().dbLossPlayer2;
      $("#sp4").text(lossPlayer2);
    }
    else if (keys === "dbChatPlayer1") {
      chat1 = snapshot.val().dbChatPlayer1;
      $("#chatTextArea1").val($("#chatTextArea1").val()+test+chat1);
      //$("#chatTextArea1").html($("#chatTextArea1").val($("#chatTextArea1").val()+chat1));
    }
    else if (keys === "dbChatPlayer2") {
      chat2 = snapshot.val().dbChatPlayer2;
      $("#chatTextArea1").val($("#chatTextArea1").val()+test+chat2);
      //$("#chatTextArea1").html($("#chatTextArea1").val($("#chatTextArea1").val()+chat2));
    }
  })


  function winPlayer1() {
    if (choicePlayer1.toLowerCase() === "rock" && choicePlayer2.toLowerCase() === "scissors") {
      winsPlayer1++;
      lossPlayer2++;
      addingWinsPlayer1();
      console.log("Player1 wins");
      //settingResult1();

    }
    else if (choicePlayer1.toLowerCase() === "paper" && choicePlayer2.toLowerCase() === "rock") {
      winsPlayer1++;
      lossPlayer2++;
      addingWinsPlayer1();
      console.log("Player1 wins");
     // settingResult1();
    }
    else if (choicePlayer1.toLowerCase() === "scissors" && choicePlayer2.toLowerCase() === "paper") {
      winsPlayer1++;
      lossPlayer2++;
      addingWinsPlayer1();
      console.log("Player1 wins");
     // settingResult1();
    }

  }
  function winPlayer2() {
    
    if (choicePlayer1.toLowerCase() === "scissors" && choicePlayer2.toLowerCase() === "rock") {
      winsPlayer2++;
      lossPlayer1++;
      addingWinsPlayer2();
      console.log("Player2 wins");
      //settingResult2();
    }
    else if (choicePlayer1.toLowerCase() === "rock" && choicePlayer2.toLowerCase() === "paper") {
      winsPlayer2++;
      lossPlayer1++;
     

      addingWinsPlayer2();
      console.log("Player2 wins");
     // settingResult2();
    }
    else if (choicePlayer1.toLowerCase() === "paper" && choicePlayer2.toLowerCase() === "scissors") {
      winsPlayer2++;
      lossPlayer1++;
      addingWinsPlayer2();
      console.log("Player2 wins");
      //settingResult2();
    }
  }
  function tie() {
    if (choicePlayer1.toLowerCase() === choicePlayer2.toLowerCase()) {
      tied++;
      console.log("It's a tie");
    }
  }
  function addingWinsPlayer1() {
    database.ref().push({
      dbWinPlayer1: winsPlayer1
    })
    database.ref().push({
      dbLossPlayer2: lossPlayer2
    })
  }
  function addingWinsPlayer2() {
    database.ref().push({
      dbWinPlayer2: winsPlayer2,
    })
    database.ref().push({
      dbLossPlayer1: lossPlayer1
    })
  }
  function settingResult1() {
    $("#sp1").text(winsPlayer1);
    $("#sp4").text(lossPlayer2);
  }
  function settingResult2() {
    $("#sp2").text(lossPlayer1);
    $("#sp3").text(winsPlayer2);
  }
})

