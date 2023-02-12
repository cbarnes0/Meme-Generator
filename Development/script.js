// Api Imgflip links: 'https://api.imgflip.com/get_memes' //
let meme = [];
let currentMemeIndex = 0;
var quote;
var counter = 0;


// This fetches the data from the meme image api and creates a function to navigate it with arrow keys
fetch('https://api.imgflip.com/get_memes')
	.then(response => response.json())
	.then(response => {
		const memes = response.data.memes;
		displayMeme(memes, currentMemeIndex);
        // Adding eventlistener for arrow key left and right //
		document.addEventListener("keydown", function(event) {
			if (event.key === "ArrowLeft") {
				currentMemeIndex--;
				if (currentMemeIndex < 0) {
					currentMemeIndex = memes.length - 1;
				}
				displayMeme(memes, currentMemeIndex);
			} else if (event.key === "ArrowRight") {
				currentMemeIndex++;
					if (currentMemeIndex >= memes.length) {
				 	currentMemeIndex = 0;
				}
				displayMeme(memes, currentMemeIndex);
			}
		});
	})
	.catch(err => console.error(err));

// Advice API ------------------------------------------------------------- //

// Add event listener on button for Advice API
$("#generate-text").on("click", setQuote);
// Calls this future to reset or call text under image
function setQuote() {
fetch('https://api.adviceslip.com/advice')
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		const quotes = data.slip.advice;

		$("#quote-box-text").text(quotes);
	})
};

// Function to display the meme
function displayMeme(memes, index) {
  const memeContainer = document.getElementById("memeContainer");
  memeContainer.innerHTML = `<img src="${memes[index].url}" id="current-meme" alt="Meme">`;
}

// This function saves the data from each API locally
$(document).ready(function() {
  // Check if the counter value exists in local storage
  if (localStorage.getItem("counter")) {
    counter = parseInt(localStorage.getItem("counter"));
  }

  $("#save-data").click(function() {
    var quoteText = $("#quote-box-text").text();
    var memeImage = $("#current-meme").attr("src");
    console.log(memeImage);
    localStorage.setItem("quoteText" + counter, quoteText);
    localStorage.setItem("memeImage" + counter, memeImage);
    counter++;
    localStorage.setItem("counter", counter);
    addButtonLoop();
  });

  if (localStorage.getItem("quoteText0")) {
    $("#quote-box-text").text(localStorage.getItem("quoteText0"));
    $("#current-meme").attr("src", localStorage.getItem("memeImage0"));
  }

  // Calls the loop to add button
  addButtonLoop();
});

// This function loops to add buttons based on the counter variable
function addButtonLoop() {
  $("#button-container").empty();
  for (var i = 0; i < counter; i++) {
    const button = $("<button>")
      .text("Meme Creation " + (i + 1))
      .attr("id", "recall-btn-" + i);
    button.on("click", function() {
      var index = $(this).attr("id").split("-")[2];
      $("#quote-box-text").text(localStorage.getItem("quoteText" + index));
      $("#current-meme").attr("src", localStorage.getItem("memeImage" + index));
    });
    $("#button-container").append(button);
  }
};

// MODAL  ----------------------------------------------------------------- //

var modal = document.querySelector('.modal');
var closeButtons = document.querySelectorAll('.close-modal');
// set open modal behaviour

// set close modal behaviour
for (i = 0; i < closeButtons.length; ++i) {
  closeButtons[i].addEventListener('click', function() {
    modal.classList.toggle('modal-open');
	});
}
// close modal if clicked outside content area
document.querySelector('.modal-inner').addEventListener('click', function() {
  modal.classList.toggle('modal-open');
});
// prevent modal inner from closing parent when clicked
document.querySelector('.modal-content').addEventListener('click', function(e) {
	e.stopPropagation();
});
// Allows escape and space key to close for accessiblity purposes. 
document.addEventListener("keydown", function(event) {
	if (event.key === "Escape" || event.key === " ") {
		modal.classList.toggle('modal-open');
	}
}); 