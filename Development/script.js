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
	memeContainer.innerHTML = `<img src="${memes[index].url}" id="current-meme" alt="Meme">`;
}

// Advice API ------------------------------------------------------------- //
// Add event listener on button
$("#generate-text").on("click", setQuote);
// Calls this future to reset or call text under image
function setQuote() {
fetch('https://api.adviceslip.com/advice')
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		var quote = data.slip.advice;
		console.log(quote);

		$("#quote-box-text").text(quote);
	})
};
// MODAL  ----------------------------------------------------------------- //
// var modal = document.querySelector('.modal');
// var closeButtons = document.querySelectorAll('.close-modal');
// // set open modal behaviour

// // set close modal behaviour
// for (i = 0; i < closeButtons.length; ++i) {
//   closeButtons[i].addEventListener('click', function() {
//     modal.classList.toggle('modal-open');
// 	});
// }
// // close modal if clicked outside content area
// document.querySelector('.modal-inner').addEventListener('click', function() {
//   modal.classList.toggle('modal-open');
// });
// // prevent modal inner from closing parent when clicked
// document.querySelector('.modal-content').addEventListener('click', function(e) {
// 	e.stopPropagation();
// });
// // Allows escape and space key to close for accessiblity purposes. 
// document.addEventListener("keydown", function(event) {
// 	if (event.key === "Escape" || event.key === " ") {
// 		modal.classList.toggle('modal-open');
// 	}
// }); 


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
  

// function saveMemeData() {
// 	var currentQuote = document.getElementById("quote-box-text").innerText();
// 	localStorage.setItem("currentQuote", currentQuote);
  
// 	var currentImage = document.getElementById("memeImage").src;
// 	localStorage.setItem("currentImage", currentImage);
//   }

//   $("#save-data").click(function(){
// 	saveMemeData();
//   })
  
