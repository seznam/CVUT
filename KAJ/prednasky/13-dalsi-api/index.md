# KAJ 14: Další JS API

---

# Intl

- [i18n, l10n](https://en.wikipedia.org/wiki/Internationalization_and_localization)
- Součást ES6+, není specifické pro prohlížeč
- Porovnávání textů, formátování čísel, datumů a časů
	- &hellip;a ještě mnoho dalšího

---

# Intl &ndash; Collator

Porovnávání řetězců s ohledem na jazykové zvyklosti

```js
const data = ['Z', 'a', 'z', 'á']
let collator

collator = new Intl.Collator("cs")
console.log(data.sort(collator.compare))

collator = new Intl.Collator("cs", {caseFirst: "upper"})
console.log(data.sort(collator.compare))
```

---

# Intl &ndash; NumberFormat

Formátování čísel a měn

```js
const nf = new Intl.NumberFormat("cs")
console.log(nf.format(123456.789))
```

---

# Intl &ndash; DateTimeFormat

Formátování data a času

```js
const options = {dateStyle: "full", timeStyle: "full"}
const dtf = new Intl.DateTimeFormat("cs", options)
const now = new Date()
dtf.format(now)
```

---

# Web Cryptography

- Kryptografie nativně v prohlížeči
- Generování klíčů, (de)šifrování, podepisování, ověřování, hashování
- Export a import klíčů (PKCS8, SPKI/DER, JWK)
- Asynchronní API
- [podpora algoritmů](https://diafygi.github.io/webcrypto-examples/)

---

# Web Cryptography &ndash; Hash

- Asynchronní API (Promises &rArr; async/await)
- Práce s binárními daty = `ArrayBuffer`

```js
async function sha256() {
	const options = { name: "SHA-256" }
	let data = new Uint8Array([1, 2, 3, 4])
	let hash = await crypto.subtle.digest(options, data)
	let bytes = new Uint8Array(hash)

	document.body.textContent = String.fromCharCode(...bytes)
}
```

---

# Web Cryptography &ndash; Šifrování

https://jsfiddle.net/ondras/7yw5ucfy/

---

# Web Speech

- Dvojice asynchronních rozhraní pro práci s řečí
- `SpeechSynthesis` text-to-speech
- `SpeechRecognition` pro server-side rozpoznání

---

# Web Speech &ndash; Synthesis

- Prohlížeč nabízí množinu hlasů/jazyků
- Syntéza někdy v cloudu, někdy lokálně
- [Demo](https://jsfiddle.net/ondras/2fwustym/16/)

```js
let utterance = new SpeechSynthesisUtterance("Hello world!");
speechSynthesis.speak(utterance);
```

---

# Web Speech &ndash; Recognition

- Rozpoznávání odesláním kamsi do cloudu
- Možnost/nutnost zadat jazyk
- [Demo](https://jsfiddle.net/ondras/4ovmyxz9/)
- Jen Chrome+Edge+Safari
- Jen prefixovaná varianta

---

# Web Speech &ndash; Recognition

```js
const SR = window.SpeechRecognition || window.webkitSpeechRecognition
let r = new SR()

r.lang = "cs"
r.interimResults = false
r.maxAlternatives = 1
r.start()

r.addEventListener("speechend", e => r.stop())

r.addEventlistener("result", e => {
	let alt = event.results[0][0]
	console.log(alt.transcript, alt.confidence)
})
```

---

# Web Midi

- Přístup k MIDI I/O zařízením
- Čtení MIDI událostí
- Generování MIDI událostí
- [Demo](https://webaudiodemos.appspot.com/midi-synth/index.html)

---

# Payment Request

- Zastřešení procesu <em>platba a doprava</em> při online platbách
- Princip: prohlížeč dodá UI pro výběr platby a dopravy
- Chrome, Edge, Opera, Safari
- [Demo](https://googlechrome.github.io/samples/paymentrequest/dynamic-shipping/)

---

# Payment Request

- Komponenty: souhrn objednávky, možnosti platby, možnosti dopravy
- Výběr dopravy může ovlivňovat skladbu a konfiguraci ostatních komponent
- Prohlížeč může implementovat (složitou) logiku pamatování, výběru země, &hellip;

---

# Device APIs

- Detekce natoční a pohybu mobilního zařízení
- Teoreticky i další (úroveň světla, baterie, ...)
- [Souhrnné čtení na MDN](https://developer.mozilla.org/en-US/docs/Web/Events/Orientation_and_motion_data_explained)

```js
window.addEventListener("deviceorientation", e => {
	console.log(`${event.alpha} : ${event.beta} : ${event.gamma}`)
})


window.addEventListener("devicemotion", e => {
	const a = e.acceleration
	console.log(`${a.x} : ${a.y} : ${a.z}`)
})
```

---

# Network Information

- Informace o připojení k Internetu
- Nejlepší podpora v ChromeOS, ostatní platformy nic moc
- [Demo](https://jsfiddle.net/uccpaLd3/)
- [`type`](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/type)
- [`effectiveType`](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType)

---

# Gamepad API

- Čtení stavu připojených herních ovladačů
- Není řízeno událostmi (!), s výjimkou připojení a odpojení ovladače
- https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API

```js
let gp = navigator.getGamepads()[0]

console.log(gp.buttons.length)
console.log(gp.buttons[0].value])  // 0..1

console.log(gp.axes.length)
console.log(gp.axes[0])  // -1..1
```

---

# File System Access API

- Několikátý pokus o standard
  - Dříve: `Filesystem`, `FileSystem`, `File and Directory Entries`
- Fakticky není nikde kompletně implementováno
- https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
- Čtení, zápis, iterace
- Taktéž *Origin Private File System*

```js
async function getFile() {
	let [fileHandle] = await window.showOpenFilePicker()
	if (fileHandle.kind == "file") {
		return fileHandle.getFile()
	}
}
```

---

# Prostor pro otázky
