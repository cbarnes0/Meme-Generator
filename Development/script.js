// Api Imgflip links: 'https://api.imgflip.com/get_memes' //

let currentMemeIndex = 0;

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

// Search History Function for Memes

/* // Function to save the city searched in form to local storage
let saveHistoryData = function (city) {

    // if statement stating that if the the search history below the search bar does not inslude the city searched then it should load beneath if
    // if the city is already present then no need to add again
    if(!searchHistory.includes(city)){
        searchHistory.push(city);
        $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + city + "'>" + city + "</a>")
    } 

    // Saves searchHistory array to local storage
    localStorage.setItem("searchHistoryData", JSON.stringify(searchHistory));

    // Saves city data to local storage
    localStorage.setItem("cityData", JSON.stringify(cityData));

    // Displays the search history based on what city has been entered
    loadHistoryData();
};

// Function to load city data saved to local storage
let loadHistoryData = function() {

    // Retrieves search history data from local storage
    searchHistory = JSON.parse(localStorage.getItem("searchHistoryData"));
    // Retrieves the city name data from local storage
    cityData = JSON.parse(localStorage.getItem("cityData"));
  
    // If not data is present then this creates an empt array
    if (!searchHistory) {
        searchHistory = []
    }

    if (!cityData) {
        cityData = ""
    }

    // Clears any previous data from the search history unordered list
    $("#search-history").empty();

    // For loop that runs through the cities avilable in the city data of openweather api
    for(i = 0 ; i < searchHistory.length ;i++) {


        // Converts the display city name in search history to link to pull data from storage if clicked
        // Append to unordered list
        $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>");
    }
  };

// Displays the search history based on what city has been entered
loadHistoryData();

// Starts webpage off with most recent search from local storage
if (cityData != ""){
    getWeather(cityData);
}

// Event handlers for form submittion and click functions
$("#search-form").submit(formSubmit);
$("#search-history").on("click", function(event){

    // Retrieves links value from id
    let pastCity = $(event.target).closest("a").attr("id");

    // Pushes id's link value to getWeather function
    getWeather(pastCity);
}); */