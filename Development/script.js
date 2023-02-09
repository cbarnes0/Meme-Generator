// Api Imgflip links: 'https://api.imgflip.com/get_memes' //

let currentMemeIndex = 0;

// Search History Array
let savedHistory = [];

let quoteData = [];

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

function displayMeme(memes, index) {
	const memeContainer = document.getElementById("memeContainer");
	memeContainer.innerHTML = `<img src="${memes[index].url}" alt="Meme">`;
}

$("#generate-text").on("click", setQuote);
// Calls this future to reset or call text under image
function setQuote() {
fetch('https://api.adviceslip.com/advice')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const quote = data.slip.advice;
        console.log(quote);
        $("#quote-box-text").text(quote);
    })
};


// Local Storage Code
// Still deciding on path to take

// // Search History Function for Memes

// // Function to save memes to local storage
// let saveHistoryData = function (memes) {

// 	// if statement to display saved item in save history list unless if it has already been saved
// 	if(!savedHistory.includes(memes)){
// 		savedHistory.push(memes);
// 		$("#search-history").append("<a href='#' id='" + memes + "'>" + memes + "</a>")
// 	}

// 	// Saves saved history data to local storage
// 	localStorage.setItem("savedHistoryData", JSON.stringify(savedHistory));

// 	// Saves quote data to storage
// 	localStorage.setItem("quote", JSON.stringify(quote));

// 	// Displays previously saved data
// 	loadHistoryData();
// };

// // FUnction to display to load saved data
// let loadHistoryData = function () {

// 	// Retrieves saved data from local storage
// 	savedHistory = JSON.parse(localStorage.getItem("savedHistoryData"));

// 	// Retireves te quote data from local storage
// 	quote = JSON.parse(localStorage.getItem("quote"));

// 	// if no data is present then creates empty array
// 	if (!savedHistory) {
//         savedHistory = []
//     }

//     if (!quoteData) {
//         quoteData = []
//     }

// 	// Clears any previous data from the saved history unordered list
// 	$("#search-history").empty();

// 	 // Converts the displayed meme in saved history to link to pull data from storage if clicked
//     // Append to unordered list
// 	for(i = 0 ; i < savedHistory.length ;i++) {

//         $("#search-history").append("<a href='#' id='" + savedHistory[i] + "'>" + savedHistory[i] + "</a>");
//     }
// };


// $("#search-form").submit(formSubmit);

// // Event Handlers
// $("#search-history").on("click", function(event){

// 	// Retrieves links value from id
//     let pastMeme = $(event.target).closest("a").attr("id");

// 	// Pushes id's link value to displayMeme function
//     displayMeme(pastMeme);
// });
