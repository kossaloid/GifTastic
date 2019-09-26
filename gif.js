var topics = ["pull ups", "bicep curls", "chest press", "squats"]

function exercises() {
    // Clearing the buttons
    $("#display").empty();
    // Grabbing and storing the data-name property value from the button
    var exercise = $(this).attr("data-name");

    // Constructing a queryURL using the workout name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        exercise + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var exerciseDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var exerciseGif = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item for STILL
                exerciseGif.attr("src", results[i].images.fixed_height_still.url);

                // Setting the still attribute of the image so I can get it again in the function down where I switch back and forth
                exerciseGif.attr("data-still", results[i].images.fixed_height_still.url);

                // Setting the data state to still initially
                exerciseGif.attr("data-state", "still");

                // adding a class of gif
                exerciseGif.attr("class", "gif");

                // Setting the data-animate attribute of the image to a property pulled off the result item for animate
                exerciseGif.attr("data-animate", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the Div
                exerciseDiv.append(p);
                exerciseDiv.append(exerciseGif);

                // Prependng the Div to the HTML page in the "#display" div
                $("#display").prepend(exerciseDiv);
            }
        });
};

// this should render our buttons
function renderButtons() {

    // Deleting the buttons prior to adding new  buttons
    $("#buttons").empty();

    // Looping through the array of exercises
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each item in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("exercise");
        // Adding a data-attribute with a value of the exercise at index i
        a.attr("data-name", topics[i]);
        // Providing the button's text with a value of the exercise at index i
        a.text(topics[i]);
        // Adding the button to the HTML
        $("#buttons").append(a);
    }
}

// This function handles events where an exercise is added via submit button
$("#add-workout").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var exercise = $("#user-input").val().trim();

    // Adding exercise from the textbox to our array
    topics.push(exercise);

    // Calling renderButtons which handles the processing of our exercise array
    renderButtons();
    console.log(topics);
});

function animate() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
};

// adding a click listener to run the function animate
$(document).on("click", ".gif", animate)


// Adding a click event listener to all elements with a class of "exercise"
$(document).on("click", ".exercise", exercises);

// Jumps to renderButtons
renderButtons();