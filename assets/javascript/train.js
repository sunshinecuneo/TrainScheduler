// Initialize Firebase
var config = {
    apiKey: "AIzaSyCp6Uo6nFJubp6n2x1Dzxdx6-vRX45h0-g",
    authDomain: "train-scheduler-6c624.firebaseapp.com",
    databaseURL: "https://train-scheduler-6c624.firebaseio.com",
    projectId: "train-scheduler-6c624",
    storageBucket: "",
    messagingSenderId: "572938279637"
};
firebase.initializeApp(config);

//   Variables

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
    frequency: frequency

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
$("#trainName").val("");
});



// Steps to complete:

// Define "Current Train" and "Add Train" in html

// 1. Create button for adding new trains - then update the html + update the database
// 2. Create a way to retrieve trains from the train database.
// 3. Create a way to calculate the next arrival using difference between frequency and current time.
//    Then use moment.js formatting to set minutes away.
