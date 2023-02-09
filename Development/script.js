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
