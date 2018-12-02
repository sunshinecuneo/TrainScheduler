// Initialize Firebase
var config = {
    apiKey: "AIzaSyCp6Uo6nFJubp6n2x1Dzxdx6-vRX45h0-g",
    authDomain: "train-scheduler-6c624.firebaseapp.com",
    databaseURL: "https://train-scheduler-6c624.firebaseio.com",
    projectId: "train-scheduler-6c624",
    storageBucket: "train-scheduler-6c624.appspot.com",
    messagingSenderId: "572938279637"
  };
  firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

// Button for adding Trains
$("#addTrain").on("click", function (event) {

 //Prevent the submit button from reloading the page.
    event.preventDefault();

//Grabs user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

// Creates local "temporary" object for holding train data
var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
};

// Uploads new train data to the database
database.ref().push(newTrain);

// Logs everything to console
console.log(newTrain.trainName);
console.log(newTrain.destination);
console.log(newTrain.firstTrain);
console.log(newTrain.frequency);


alert("Train Successfully added!!!")

// Clears all the text boxes
$("#trainName").val("");
$("#destination").val("");
$("#firstTrain").val("");
$("#frequency").val("");
});

//Creates a Firebase event for adding new train data to the database when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

// Stores everything into a variable
var trainName = childSnapshot.val().trainName;
var destination = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().firstTrain
var frequency = childSnapshot.val().frequency;

// Other variables
var frequency = 0;

// Entry on the entry form
var firstTrain = 0;

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

//   Variable for storing the current time
var currentTime = moment();
console.log("Current Time: " + moment(currentTime).format("HH:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("Difference in Time: " + moment(diffTime).format("HH:mm"));

// Time apart (remainder)
var tRemainder = diffTime % frequency;
console.log(tRemainder);

// Minutes Until Train
var tMinutesTillTrain = frequency - tRemainder;
console.log("Minutes Till Train: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));


// Creat the new row on the html with new train data
$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

//Handle any errors
}, function (errorObject){
    console.log("Errors handled: " + errorObject.code);

});

// "Minutes till trian" shows NaN
// "First Train" is not showing up in database

