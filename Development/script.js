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



// Advice API ------------------------------------------------------------- //
// Add event listener on button
var quote;

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

  function displayMeme(memes, index) {
	const memeContainer = document.getElementById("memeContainer");
	memeContainer.innerHTML = `<img src="${memes[index].url}" id="current-meme" alt="Meme">`;
}

$(document).ready(function() {
    $("#save-data").click(function() {
      var quoteText = $("#quote-box-text").text();
      var memeImage = $("#current-meme").attr("src");
      console.log(memeImage);
      localStorage.setItem("quoteText", quoteText);
      localStorage.setItem("memeImage", memeImage);
    });
    if (localStorage.getItem("quoteText")) {
      $("#quote-box-text").text(localStorage.getItem("quoteText"));
    }
    if (localStorage.getItem("memeImage")) {
      $("#current-meme").attr("src", localStorage.getItem("memeImage"));
    }
  });

  $(document).ready(function() {
	var keys = Object.keys(localStorage);
	for (var i = 0; i < keys.length; i++) {
	  if (keys[i].startsWith("memeImage") || keys[i].startsWith("quoteText")) {
		(function(i) {
		  var memeImage = localStorage.getItem("memeImage" + i);
		  var quoteText = localStorage.getItem("quoteText" + i);
		  $("#button-container").append(`<button class="meme-button">Meme ${i + 1}</button>`);
		  $(".meme-button").last().click(function() {
			$("#quote-box-text").text(quoteText);
			$("#current-meme").attr("src", memeImage);
		  });
		})(i);
	  }
	}
  });

  



  
  

  
  
  
  
  
  