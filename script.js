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

//contador (pegeui no git)

// Defina a data alvo aqui (12/09/2026 às 16:00)
const dataAlvo = new Date('2026-09-12T16:00:00').getTime();

const atualizarContador = setInterval(function() {
    const agora = new Date().getTime();
    const diferenca = dataAlvo - agora;

    if (diferenca <= 0) {
        clearInterval(atualizarContador);
        const contador = document.getElementById('contador');
        if (contador) {
            contador.innerHTML = 'Tempo esgotado!';
        }
        return;
    }

    // Cálculos de tempo
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Atualiza o HTML (com operador ternário para adicionar zero à esquerda)
    const diasEl = document.getElementById('dias');
    const horasEl = document.getElementById('horas');
    const minutosEl = document.getElementById('minutos');
    const segundosEl = document.getElementById('segundos');

    if (diasEl) diasEl.innerText = dias;
    if (horasEl) horasEl.innerText = horas < 10 ? '0' + horas : horas;
    if (minutosEl) minutosEl.innerText = minutos < 10 ? '0' + minutos : minutos;
    if (segundosEl) segundosEl.innerText = segundos < 10 ? '0' + segundos : segundos;

}, 1000);
