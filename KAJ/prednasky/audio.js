let cache = new Map();

let current = null;
let speed = 1;

function syncAudio(index) {
	let audio = cache.get(index);
	if (!audio) { return; }

	document.querySelector(".slide.current").appendChild(audio);
	current && current.pause();
	current = audio;
	current.currentTime = 0;
	current.playbackRate = speed;
	current.play();
}


let currentAudio = -1;
function audioKeyHandler(e){
	if (!cache.has(currentAudio)) return;
	const a = cache.get(currentAudio);
	if (e.key === " ") {
		e.stopPropagation();
		if (a.paused) a.play();
		else a.pause();
	} else if (e.key === "ArrowRight" && e.shiftKey) {
		if (a.currentTime + 5 < a.duration) {
			e.stopPropagation();
			a.currentTime += 5;
		}
	} else if (e.key === "ArrowLeft" && e.shiftKey) {
		if (a.currentTime - 5 > 0) {
			e.stopPropagation();
			a.currentTime -= 5;
		}
	} else if (e.key === ">") {
		a.playbackRate = Math.min(a.playbackRate + 0.25, 2);
		speed = a.playbackRate;
	} else if (e.key === "<") {
		a.playbackRate = Math.max(a.playbackRate - 0.25, 0.25);
		speed = a.playbackRate;
	}
}

window.addEventListener("keydown", audioKeyHandler, true);


window.addEventListener("slide-change", e => {
	let index = e.detail.currentIndex;
	currentAudio = index;
	if (cache.has(index)) { return syncAudio(index); }

	let a = new Audio();
	a.className = "voice";
	a.controls = true;
	a.addEventListener("canplay", _ => {
		if (cache.has(index)) { return; }
		cache.set(index, a);
		syncAudio(index);
	});
	a.addEventListener("error", _ => {
		if (cache.has(index)) { return; }
		cache.set(index, null);
		syncAudio(index);
	});
	a.addEventListener("ended", () => {
		if (index !== currentAudio) return;
		window.dispatchEvent(new KeyboardEvent('keydown',{'code':'ArrowRight'}));
	});

	a.src = `audio/${index.toString().padStart(2, "0")}.m4a`;
});



let style = document.createElement("style");
style.textContent = `
.voice {
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 1;
	margin: 0;
	width: 25%;
}

.voice-arrow {
	position: absolute;
	right: 15%;
	top: 65%;
	font-size: 300%;
	color: red;
	margin: 0;
}

.voice-arrow::before {
	content: "🠯";
}

.slide:first-child.current .voice-arrow {
	animation: pulse 1s infinite alternate ease-in-out;
}

@keyframes pulse {
	from { opacity: 0; }
	to { opacity: 1; }
}
`;
document.head.appendChild(style);
