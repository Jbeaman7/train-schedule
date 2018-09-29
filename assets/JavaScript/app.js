$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyDL3kdrHBKf8eyEbDK0dr-RN3XFUeEmDNI",
        authDomain: "train-schedule-1b43a.firebaseapp.com",
        databaseURL: "https://train-schedule-1b43a.firebaseio.com",
        projectId: "train-schedule-1b43a",
        storageBucket: "train-schedule-1b43a.appspot.com",
        messagingSenderId: "1019159687641"
      };
    
    firebase.initializeApp(config);
    
    //variables
    var database = firebase.database();
    var trainName = "";
    var destination = "";
    var firstTrain = 0;
    var frequency = 0;
    var nextTrain = 0;
    var timeUntil = 0;
    
    
    $("#submitButton").on("click", function(){
    
        event.preventDefault();
    
        
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#firstTrain").val().trim();
        frequency = $("#frequency").val().trim();
    
        
        var timeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        var difference = moment().diff(moment(timeConverted), "minutes");
        var timeRemainder = difference % frequency;
        var timeUntil = frequency - timeRemainder;
        var nextTrain = moment().add(timeUntil, "minutes").format("HH:mm");
        
        
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            timeUntil: timeUntil,
            nextTrain: nextTrain
        });
    
        //empty form
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
    });
    
    //persist
    database.ref().on("child_added", function(snapshot) {
    
        //append saved values
        var newLine = $("<tr></tr>"); 
    
        newLine.append('<td>' + snapshot.val().trainName + '</td>');
        newLine.append('<td>' + snapshot.val().destination + '</td>');
        newLine.append('<td>' + snapshot.val().frequency + '</td>');
        newLine.append('<td>' + snapshot.val().nextTrain + '</td>');
        newLine.append('<td>' + snapshot.val().timeUntil + '</td>');
    
        $("#tbody").append(newLine);
    });
    
    });