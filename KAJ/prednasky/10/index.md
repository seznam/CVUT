# KAJ 10: HTML značky &lt;video&gt; a &lt;canvas&gt;

---

# Obsah

  1. HTML značka `<video>`
  1. HTML značka `<canvas>`
  1. Malování, transformace
  1. Animace a časování
  1. Komunikace s dalšími prvky
  1. Tipy a triky, WebGL
  1. WebRTC

---

# HTML5 Video

  - Vložení videa do stránky
  - Alternativa pro Flashové přehrávače
  - Syntaxe téměř shodná s audiem
  - Ještě výraznější problematika formátů
  - S výhodou použití `<source media="..." />`

---

# HTML5 Video: ukázka

```html
<video controls poster="image.png">
	<source src="video-small.mp4"
		type="video/mp4; codecs='avc1.42E01E, mp4a.40.2'"
		media="screen and (max-width:500px)"
	/>
	<source src="video.mp4" type="video/mp4; codecs='avc1.42E01E, mp4a.40.2'" />
	<source src="video.ogv" type="video/ogg; codecs='theora, vorbis'"/>
	<source src="video.webm" type="video/webm; codecs='vp8, vorbis'" />
	<!-- obrázek či odkaz jako fallback -->
</video>
```

---

# Media Source Extensions

  - Tradiční HTML5 audio/video přehrává jen jeden soubor
  - MSE dovoluje definovat zdroj multimediálních dat s větší granularitou
  - Namísto souboru s pevným trváním se přenáší *stream*
  - Změna datového toku za běhu
  - Protokol `mediasource:`, JS API `MediaSource`, [Dokumentace](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API)

---

# Co je to canvas

  - HTML značka
  - Rastrová kreslící plocha
  - Bohaté JS API
  - [Výborná podpora prohlížečů](http://caniuse.com/#feat=canvas)

---

# Co je to canvas: v HTML

```html
<canvas width="800" height="600">Smolíček pacholíček :-(</canvas>
```

  - Fallback text
  - Pevné rozměry (změna = vymazání)
  - Průhledné pozadí

---

# Co je to canvas: v JS

```js
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
context.namalujNecoPekneho();
```

  - Malovací metody patří kontextu
  - Existuje též 3d kontext (WebGL) mimo rozsah předmětu
  - [Canvas cheatsheet](http://www.webmastersucks.com/uploads/HTML5_Canvas_Cheat_Sheet.png)

---


# Malování: obdélníky

  - `clearRect(x, y, w, h)`: vymazat
  - `fillRect(x, y, w, h)`: vyplnit (aktuálně nastavenou vyplňovací barvou)
  - `strokeRect(x, y, w, h)`: orámovat (aktuálně nastavenou kreslící barvou)

---

# Malování: tah štětcem

[Ukázka](http://ondras.zarovi.cz/slides/2011/html5/3.html#7)

```js
ctx.beginPath();
ctx.moveTo(100, 200);
ctx.lineTo(200, 300);
ctx.arc(300, 300, 50, 0, Math.PI, true);
ctx.stroke();
ctx.fill();
```

---

# Malování: vzhledové vlastnosti

  - `ctx.strokeStyle = "red"`
  - `ctx.fillStyle = "#000"`
  - CSS barva NEBO barevný přechod NEBO vzor (viz dále)
  - `ctx.globalAlpha = 0.5`
  - `ctx.globalCompositeOperation = "lighter"`, [dokumentace](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)
  - `ctx.shadow{Blur,Color,OffsetX,OffsetY} = ...`

---

# Malování: vlastnosti čar

  - `ctx.lineWidth = 3`
  - `ctx.lineCap = "round"`
  - `ctx.lineJoin = "round"`
  - [Ukázka](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial/Applying_styles_and_colors#Line_styles)

---


# Malování: text

```js
ctx.font = "bold 20px arial";
ctx.textAlign = "middle";
ctx.textBaseline = "bottom";

ctx.fillText("Ahoj", x, y);
ctx.strokeText("Ahoj", x, y);
var w = ctx.measureText("A").width;
```

---

# Malování: po pixelech

```js
var data = ctx.getImageData(x, y, w, h);
/* data.data.length == w*h*4 */

data.data[0] = 100; /* R */
data.data[1] = 200; /* G */
data.data[2] =  50; /* B */
data.data[3] = 255; /* A */

ctx.putImageData(data, 0, 0);
```

<a target="_blank" href="http://ondras.github.io/coral/">Ukázka 1</a>, <a target="_blank" href="http://ondras.github.io/fractal/">Ukázka 2</a>, <a target="_blank" href="http://ondras.github.io/primitive.js/">Ukázka 3</a>

---

# Malování: barevné přechody a vzory

```js
var g = ctx.createLinearGradient(0, 0, 100, 100);
g.addColorStop(0, "red");
g.addColorStop(1, "blue");
ctx.fillStyle = g;

var p = ctx.createPattern(image);
var p = ctx.createPattern(canvas);
ctx.fillStyle = p;
```

---

# Transformace

  - Podobné jako u SVG
  - Sada afinních transformací, která upravuje souřadný systém
  - `ctx.scale(0.5, 0.5)`
  - `ctx.rotate(Math.PI/2)`
  - `ctx.translate(dx, dy)`

[Ukázka](http://ondras.zarovi.cz/demos/space-filling/)

---


# Animace a časování

  - Canvas je ideální technologie pro animace a hry
  - Správná práce s canvasem je rychlá
  - Podstatné je dobré časování a množství překreslování
  - [Ukázka](https://ondras.github.io/drago/game/)

---

# Animace a časování: varianta 1

```js
var x = 0;
while (true) {
	ctx.clearRect();
	x += 3;
	ctx.drawRect(x, 0, 10, 10);
}
```

---


# Animace a časování: varianta 2
```js
var x = 0;
var draw = function() {
	ctx.clearRect();
	x += 3;
	ctx.drawRect(x, 0, 10, 10);
}

setInterval(draw, 1000/30);
```

---

# Animace a časování: varianta 3

```js
var x = 0;
var draw = function() {
	ctx.clearRect();
	x += 3;
	ctx.drawRect(x, 0, 10, 10);
	requestAnimationFrame(draw);
}

draw();
```

---

# Animace a časování: varianta 4

```js
var T = Date.now();
var speed = 0.1;

var draw = function() {
	var t = Date.now();
	x += (T - t) * speed;
	T = t;
	/* ... */
}
```

---

# Komunikace s dalšími prvky: export

  - `var data = canvas.toDataURL("image/png")`
  - Technika *data URI* představuje reprezentaci dat přímo v řetězci URI
  - Možno nastavit např. jako src obrázku
  - [Ukázka](http://ondras.github.io/photo/)

---


# Komunikace s dalšími prvky: import

  - `ctx.drawImage(image, dx, dy, [dw, dh])`
  - `ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)`
  - "image" může být obrázek, canvas či video

---

# Tipy a triky: ostré hrany

  - Canvas používá antialiasing, nelze vypnout
  - Souřadný systém má celočíselné hodnoty mezi pixely
  - Svislé / vodorovné čáry o liché tloušťce posuňme o půl pixelu
  - [Ukázka](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial/Applying_styles_and_colors#A_lineWidth_example)

---

# Tipy a triky: FOUT

  - Kreslení textu při použití @font-face
  - Dokud není písmo načteno, použije se výchozí
  - Soubor s písmem lze specifikovat pomocí data-URI

---

# Tipy a triky: animace

  - Překreslení (mazání) celého canvasu je drahé
  - Pokud se vyplatí, je lepší mazat jen změněné části
  - Různé kreslící operace jsou různě drahé; nejlepší je `drawImage`
  - [Benchmark](http://ondras.github.io/html5-animation-framework/benchmark.html)

---

# Tipy a triky: Retina

  - `window.devicePixelRatio > 1`
  - Rozměry canvasu jsou v hardwarových pixelech, plochu ale zabírá v logických
  - Prohlížeč před vykreslením canvas roztáhne na DPR-násobek
  - Displeje s vysokou hustotou pixelů (*Retina*) mívají canvas rozostřný

---

# Tipy a triky: Retina

```js
let canvas = document.createElement("canvas");
canvas.width = canvas.height = 600;
canvas.style.width = canvas.style.height = "300px";

let ctx = canvas.getContext("2d");
ctx.scale(2, 2);

ctx.fillText("Ahoj", 50, 50);
// ctx...
```

---

# WebGL

  - Akcelerovaná 3D grafika
  - Nové API HTML5 Canvasu
  - Kompatibilita API s OpenGL ES 2.0
  - [Ukázka](https://developer.mozilla.org/en-US/demos/detail/bananabread)

---

# WebGL: koncepty

  - `canvas.getContext("webgl") || canvas.getContext("experimental-webgl")`
  - Veliké API ([Reference Card pro verzi 1](https://www.khronos.org/files/webgl/webgl-reference-card-1_0.pdf))
  - Nové datové typy (*typovaná pole*)
  - Kompatibilní shadery (GLSL)
  - Nejen 3D scény, ale třeba i [částicové systémy](http://ondras.zarovi.cz/slides/devel2015/)

---

# WebGL: obtíže

  - Nejistá podpora
  - Práce s maticemi
  - [Silně ukecané](webgl.html) (stejně jako OpenGL)

---

# WebGL: závěr

  - Budoucnost grafiky na webu
  - Použít knihovnu pro matice ([glMatrix](http://glmatrix.net/))
  - Použít knihovnu pro WebGL ([three.js](http://threejs.org/))

---

# WebRTC

  - RTC = Real Time Communications
  - Technologie pro komunikaci mezi klienty (bez serveru)
  - Primárně přenos zvuku a obrazu, sekundárně JS dat
  - Obtížné navázání spojení (tzv. *signalling* &ndash; nutný server pro iniciální sestavení)

---

# WebRTC: getUserMedia

  - `navigator.mediaDevices.getUserMedia()`
  - Nejlépe podporovaná komponenta WebRTC
  - Přístup ke kameře a mikrofonu
  - Prefixované varianty

---


# WebRTC: getUserMedia

```js
var ok = function(stream) {
	video.srcObject = stream;
	video.play();
}

var error = function(e) {
	alert(e);
}

var options = {audio:true, video:true};
navigator.mediaDevices.getUserMedia(options).then(ok, error);
```

<a target="_blank" href="https://jsfiddle.net/smap/6fgu4/15/">Ukázka</a>

---

# WebRTC: getDisplayMedia

  - Nejnovější přírůstek pro `navigator.mediaDevices`
  - Videostream plochy uživatele
  - Uživatel volí, bude-li posktyovat plochu, prohlížeč či jeho záložku
  - Použitelné též pro screenshoty

---

# Prostor pro otázky

? { .questions }
