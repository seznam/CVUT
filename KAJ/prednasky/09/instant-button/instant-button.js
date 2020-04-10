const mimeMap = {
	"mp3": "audio/mpeg",
	"ogg": "audio/ogg"
}

const rank = {
	"probably": 2,
	"maybe": 1,
	"": 0
}

class InstantButton extends HTMLElement {
	static get observedAttributes() { return ["src"]; }

	constructor() {
		super();
		this._audio = new Audio();
	}

	handleEvent(e) {
		switch (e.type) {
			case "mousedown":
				const audio = this._audio;
				if (!audio.currentTime || audio.currentTime == audio.duration) {
					audio.play();
				} else {
					audio.pause();
					audio.currentTime = 0;
				}
			break;
		}
	}

	connectedCallback() {
		this.addEventListener("mousedown", this);
	};

	disconnectedCallback() {
		this.removeEventListener("mousedown", this);
	}

	attributeChangedCallback(attr, oldVal, newVal) {
		switch (attr) {
			case "src":
				const audio = this._audio;
				let src = newVal;
				let r = src.match(/\{(.*?)\}/);
				if (r) {
					let extensions = r[1].split(",").map(ext => {
						return {ext:ext, rank: rank[audio.canPlayType(mimeMap[ext])]};
					});
					extensions.sort((a, b) => b.rank-a.rank);
					src = src.replace(r[0], extensions[0].ext);
				}
				audio.src = src;
			break;
		};
	}

	get src() { return this.getAttribute("src"); }
	set src(src) { return this.setAttribute("src", src); }
}

customElements.define("instant-button", InstantButton);
