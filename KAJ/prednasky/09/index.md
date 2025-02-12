# KAJ 09

## Offline; HTML značky &lt;svg&gt; a &lt;audio&gt;

---

# Obsah

  1. Offline + Cache Manifest + Service Worker
  1. Scalable Vector Graphics
  1. HTML &lt;audio&gt;
  1. Web Audio API

---

# Offline API

Webová aplikace má k dispozici JS API, které informuje o stavu připojení.

  - `navigator.onLine`
  - `window.addEventListener("online", ...)`
  - `window.addEventListener("offline", ...)`

---

# App Cache

  - Dnes již zastaralá, slepá cesta
  - Webová aplikace poskytuje tzv. *offline manifest*, výčet souborů pro použití offline
```html
<html manifest="mysite.manifest">
```
  - Pokud je uživatel offline a pokusí se přistoupit na adresu webové aplikace, prohlížeč mu poskytne soubory definované v manifestu
  - Pokud je uživatel online a nezměnil se čas modifikace manifestu, opět se použije cachovaná verze
  - Při změně souborů (a manifestu) jsou data jen stažena a připravena na použití příště

---


# App Cache Manifest

```
CACHE MANIFEST

# soubory určené k použití offline
offline/index.html
offline/style.css
offline/code.js

# tyto soubory se nikdy nesmí cachovat
NETWORK:
remote.cgi

# tyto soubory, pokud nedostupné, budou nahrazeny jinými
FALLBACK:
images/large offline/sorry.jpg
```

---

# applicationCache API

JS API pro práci s offline cache

  - `window.applicationCache` &ndash; objekt popisující stav offline cache, též možnost explicitně cache obnovit
    - `if (applicationCache.status == applicationCache.UPDATEREADY) { ... }`
  - `applicationCache.update()` &ndash; pokyn ke kontrole novější verze (jako při reloadu)
  - `applicationCache.swapCache()` &ndash; přepnutí na aktuální verzi souborů (nutný reload)

---

# Service Worker

  - Modernější alternativa k AppCache
  - Konfigurace (AppCache) vs. logika (Service Worker)
  - Zásadní komponenta konceptu PWA (Progressive Web Apps)
  - [Slabší podpora](http://caniuse.com/#feat=serviceworkers)

---

# Jak funguje Service Worker

  - Service Worker je skript, dodaný autorem stránky
  - Je prohlížečem vykonáván bokem, asynchronně, nezávisle na stránce, pro kterou pracuje
  - Service Worker může manipulovat s HTTP požadavky stránky, kterou obsluhuje
  - Service Worker nemá k dispozici DOM
  - Lze použít jen na HTTPS stránkách

---

# Service Worker &ndash; ukázka

```js
navigator.serviceWorker.register("/worker.js").then(() => {
	console.log("Service worker ready")
})
```

Řízení asynchronního toku kódu je realizováno pomocí vzoru Promise

---

# Service Worker &ndash; ukázka

```js
self.addEventListener("install", event => {
	console.log("SW (či jeho nová verze) nainstalován")
})

self.addEventListener("activate", event => {
	console.log("SW (či jeho nová verze) aktivován")
})

self.addEventListener("fetch", event => {
	console.log("HTTP požadavek ze stránky");
	event.respondWith(new Response("Hello world!"))
})
```

---

# Service Worker &ndash; offline-first

```js
self.addEventListener("fetch", async e => {
	const cache = await caches.open(CACHE_NAME)
	const cached = await cache.match(e.request)

	let response
	if (cached) {
		response = cached
	} else {
		response = await fetch(e.request)
	}
	e.respondWith(response)
})
```

---

# Service Worker &ndash; využití

  - Synchronizace dat na pozadí
  - Cachování
  - Preprocessing zdrojů na klientu
  - Šablonování
  - Pre-fetch

---

# Service Worker &ndash; odkazy

  - https://serviceworke.rs/
  - [sw.js](https://github.com/ondras/rri/blob/master/sw.js) pro hru [Railroad Ink](https://ondras.github.io/rri/)

---

# SVG

  - Všechny prohlížeče krom IE&le;8
  - Prehistorický standard z roku 2001
  - VML pro IE&le;8
  - Rozšířený pro vektorovou grafiku
  - DOM, události, stylování
  - Horší výkon v porovnání s `<canvas>`
  - [ukázka mapa](https://ondras.github.io/hex-maps/?f=cr.emap), [ukázka hodiny](clock/), [ukázka akordy](https://observablehq.com/@ondras/chords)

---

# SVG je dialekt XML

```js
<svg width="500" height="300" viewBox="0 0 100 100">
	<circle cx="20" cy="50" r="20" />
	<g transform="rotate(45) translate(30, -30)">
		<rect x="0" y="-10" width="30" height="30"/>
		<text x="30" y="10">SVG</text>
	</g>
</svg>
```

<svg width="500" height="300" viewBox="0 0 100 100">
	<circle cx="20" cy="50" r="20" />
	<g transform="rotate(45) translate(30, -30)">
		<rect x="0" y="-10" width="30" height="30"/>
		<text x="30" y="10">SVG</text>
	</g>
</svg>

---

# Míchání HTML a SVG

<p>
<table><tbody>
	<tr>
		<td>HTML4</td>
		<td><code>&lt;embed&gt;</code>, <code>&lt;object&gt;</code>, <code>&lt;iframe&gt;</code></td>
	</tr>
	<tr>
		<td>XHTML (text/xml)</td>
		<td><code>&lt;svg xmlns="http://www.w3.org/2000/svg"&gt;</code></td>
	</tr>
	<tr>
		<td>HTML5</td>
		<td>Dedikovaná značka <code>&lt;svg&gt;</code></td>
	</tr>
	<tr>
		<td>JS</td>
		<td><code>document.createElementNS()</code></td>
	</tr>
</tbody></table></p>

---

# Stavební kameny SVG

  - `<svg>`, `<g>` (group)
  - `<rect>`, `<circle>`, `<ellipse>`, `<line>`, `<polyline>`, `<polygon>`
  - `<path d="M100,200 C100,100 250,100 250,200">`
  - Barevné přechody (gradient), vzory (pattern), značky (marker)

---

# SVG &lt;path&gt; detailněji

  - `M x y` &ndash; posun na absolutní pozici
  - `m dx dy` &ndash; posun o relativní pozici
  - `L x y (l dx dy)` &ndash; rovná čára
  - `Q x1 y1, x y` &ndash; kvadratická Bézierova křivka
  - `C x1 y1, x2 y2, x y` &ndash; kubická Bézierova křivka
  - <code>A rx ry x-axis-rotation [large-arc-flag sweep-flag](img/arc.png) x y</code> &ndash; eliptická křivka
  - `Z` &ndash; spojit se začátkem

---

# SVG barevné přechody

<svg width="300" height="200" style="position:absolute; right:0; top:3em">
	<defs>
		<linearGradient id="gradient">
			<stop offset="0%" stop-color="red"/>
			<stop offset="50%" stop-color="black"/>
			<stop offset="100%" stop-color="blue"/>
		</linearGradient>
	</defs>
	<rect fill="url(#gradient)" x="0" y="0" width="100%" height="100%" />
</svg>

```xml
<defs>
	<linearGradient id="gradient">
		<stop offset="0%" stop-color="red" />
		<stop offset="50%" stop-color="black" />
		<stop offset="100%" stop-color="blue" />
	</linearGradient>
</defs>
<rect fill="url(#gradient)" x="0" y="0" width="100%" height="100%" />
```

---

# SVG &lt;pattern&gt;

<svg width="300" height="200" style="position:absolute; right:0; top:3em">
	<defs>
		<pattern id="pattern" width="0.25" height="0.333">
			<circle cx="25" cy="25" r="20" fill="#00f">
		</pattern>
	</defs>
	<rect fill="url(#pattern)" x="0" y="0" width="100%" height="100%" />
</svg>

```xml
<defs>
	<pattern id="pattern" width="0.25" height="0.333">
		<circle cx="25" cy="25" r="20" fill="#00f" />
	</pattern>
</defs>
<rect fill="url(#pattern)" x="0" y="0" width="100%" height="100%" />
```

---

# SVG &lt;marker&gt;

<svg width="300" height="200" style="position:absolute; right:0; top:5em">
	<defs>
		<marker id="marker" markerWidth="13" markerHeight="13" refX="2" refY="6" orient="auto">
			<path d="M2,2 L2,10 L10,6 Z" fill="red" />
		</marker>
	</defs>
	<path stroke="#000" stroke-width="5" fill="transparent" d="M30,50 L200,50 L250,80"
		marker-start="url(#marker)"
		marker-end="url(#marker)" />
</svg>

```xml
<defs>
	<marker
		id="marker" markerWidth="13" markerHeight="13"
		refX="2" refY="6" orient="auto">
			<path d="M2,2 L2,10 L10,6 Z" fill="red" />
	</marker>
</defs>
<path d="M30,20 L200,20 L250,50"
	marker-start="url(#marker)"
	marker-end="url(#marker)" />
```

---

# Stylování SVG

  - Pomocí atributů (`stroke`, `color`, `opacity`, &hellip;)
  - Pomocí CSS

```css
circle {
	fill: yellow; stroke: red;
}
rect {
	fill: none; stroke: black;
	stroke-width: 2;
}
text {
	text-anchor: middle; font-size: 10px;
}
```

---

# SVG a JavaScript

  - Práce stejně jako s DOM stránky
  - Tvorba prvků přes `document.createElementNS("http://www.w3.org/2000/svg", "...")`
  - Změna hodnot pomocí `setAttribute`
  - Běžná práce s událostmi pomocí `addEventListener`

---

# Inline SVG

  - SVG je možné přímo mixovat s HTML5
  - V mnoha ohledech flexibilnější, než `<img src=".svg" />`
  - Styly sdílené s dokumentem stránky
  - Ideální pro (barvené) ikonky

---

# HTML5 Audio

  - Vložení zvukového souboru do stránky
  - Ovládací prvky vyrábí prohlížeč (jsou-li požadovány)
  - Různé prohlížeče rozumí různým formátům zvukových souborů
  - Možnost specifikovat více formátů
  - Možnost zadat alternativní obsah pro nekompatibilní prohlížeče

<audio controls>
	<source src="sound.ogg" type="audio/ogg" />
	<source src="sound.mp3" type="audio/mpeg" />
	<source src="sound.wav" type="audio/wave" />
	Smůla :-(
</audio>


```html
<audio controls>
	<source src="sound.ogg" type="audio/ogg" />
	<source src="sound.mp3" type="audio/mpeg" />
	<source src="sound.wav" type="audio/wave" />
	Smůla :-(
</audio>
```

---

# HTML5 Audio: JavaScriptové API

```js
new Audio("song.mp3").play()
```

```js
let a = new Audio()
a.canPlayType("audio/mpeg") /* "", "maybe", "probably" */
a.src = "song.mp3"
a.addEventListener("timeupdate", () => console.log(a.currentTime))
a.play()
```

<instant-button style="color:red" src="instant-button/buzzer.{ogg,mp3}"></instant-button>
<instant-button style="color:lime" src="instant-button/tada.{ogg,mp3}"></instant-button>

---

# &lt;audio&gt; a &lt;video&gt; formáty

[Dokumentace](https://developer.mozilla.org/en-US/docs/HTML/Supported_media_formats)

---

# Web Audio API

  - Poměrně moderní JS API
  - Konstrukce [zvukového grafu](img/WebAudioBasics.png)
  - Uzly = transformace zvuku
  - Přístup k právě přehrávaným datům (vizualizace)
  - Generování zvukového signálu
  - [Ohňostroj](https://ondras.github.io/fireworks-webgl/), [Osciloskop](https://ondras.github.io/oscope/), [Noisecraft](https://noisecraft.app/529)

---

# Web Audio API: generování zvuku

```js
let ctx = new AudioContext()

let oscillator = ctx.createOscillator()

oscillator.frequency.value = 440
oscillator.connect(ctx.destination)

oscillator.start()
```

  - Tvar vlny možno určit vlastností `type`

---

# Prostor pro otázky

? { .questions }
