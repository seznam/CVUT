let cache = new Map();

let current = null;

function syncAudio(index) {
	let audio = cache.get(index);
	if (!audio) { return; }

	document.querySelector(".slide.current").appendChild(audio);
	current && current.pause();
	current = audio;
	current.currentTime = 0;
	current.play();
}

window.addEventListener("slide-change", e => {
	let index = e.detail.currentIndex;
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