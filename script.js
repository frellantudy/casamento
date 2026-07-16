document.addEventListener('DOMContentLoaded', () => {
	const audio = document.querySelector('audio');
	if (!audio) return;
	const playBtn = document.querySelector('.bi-caret-right-fill');
	const fastForwards = document.querySelectorAll('.bi-fast-forward-fill');
	const prevBtn = fastForwards[0];
	const nextBtn = fastForwards[1];
	const shuffleBtn = document.querySelector('.bi-shuffle');
	const heartBtn = document.querySelector('.bi-suit-heart');
	const card = document.querySelector('.card');

	function updatePlayState() {
		if (!playBtn) return;
		if (audio.paused) {
			playBtn.style.fill = 'rgba(82,79,79,0.829)';
			card && card.classList.remove('playing');
			playBtn.setAttribute('aria-label', 'Play');
		} else {
			playBtn.style.fill = 'rgba(138, 70, 31, 0.9)';
			card && card.classList.add('playing');
			playBtn.setAttribute('aria-label', 'Pause');
		}
	}

	if (playBtn) {
		playBtn.style.cursor = 'pointer';
		// direct listener on the play icon
		playBtn.style.cursor = 'pointer';
		playBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			if (audio.paused) audio.play();
			else audio.pause();
			updatePlayState();
		});
	}

	if (prevBtn) {
		prevBtn.style.cursor = 'pointer';
		prevBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			audio.currentTime = Math.max(0, audio.currentTime - 10);
			updatePlayState();
		});
	}

	if (nextBtn) {
		nextBtn.style.cursor = 'pointer';
		nextBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + 10);
			updatePlayState();
		});
	}

	// shuffle e heart removidos pois os ícones foram retirados do HTML

	audio.addEventListener('play', updatePlayState);
	audio.addEventListener('pause', updatePlayState);
	audio.addEventListener('ended', () => {
		audio.currentTime = 0;
		audio.pause();
		updatePlayState();
	});

	// inicializa estado visual
	updatePlayState();
});

