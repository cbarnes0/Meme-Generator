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

// MODAL //
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