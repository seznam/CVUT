let button = document.createElement("button");
document.body.appendChild(button);
button.style = `
	position: fixed;
	right: 8px;
	top: 8px;
	line-height: 1.5;
	width: 1.5em;
	padding: 0;
	font-size: 120%;
`;

let current = new Audio();
function sync(e) { button.textContent = current.paused ? "▶" : "⏸"; }

current.addEventListener("play", sync);
current.addEventListener("pause", sync);
current.addEventListener("ended", sync);

button.addEventListener("click", _ => (current.paused ? current.play() : current.pause()));

window.addEventListener("slide-change", _ => {
	const h = document.querySelector(".current h1[data-audio]");
	button.hidden = !h;
	if (!h) { return; }

	current.pause();
	current.src = `audio/${h.dataset.audio}.m4a`;
	current.play();
	sync();
});
