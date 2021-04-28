# KAJ 11: Další JavaScriptová API

---

# Obsah

  1. Drag'n'Drop
  1. Geolocation
  1. Web Storage
  1. File API
  1. History API
  1. Web Workers
  1. &hellip; a další

---


# Drag'n'Drop

  - Přetahování věcí ve stránce a do stránky
  - Překvapivě složité
  - [Dokumentace na MDN](https://developer.mozilla.org/en-US/docs/DragDrop/Drag_Operations)
  - [Ukázka 1](http://html5demos.com/drag), [Ukázka 2](https://mapy.cz/)

---

# Drag'n'Drop: zahájení tažení

  - Soubor do okna prohlížeče
  - HTML prvek s atributem `draggable`
  - Událost `dragstart`
  - Vlastnost `dataTransfer` v události obsahuje relevantní metadata

---

# Drag'n'Drop: práce s dataTransfer

```js
div.addEventListener("dragstart", function(e) {
	e.dataTransfer.setData("text/plain", "http://www.seznam.cz");
	e.dataTransfer.setDragImage(image, offsetX, offsetY);
	e.dataTransfer.effectAllowed = "copyMove";
	e.dataTransfer.dropEffect = "copy";
});
```

---

# Drag'n'Drop: tažení

  - Události `dragenter`, `dragover`, `dragleave`
  - Pokud má být nad prvkem tažení ukončitelné, je nutné událost *preventovat* (`preventDefault()`)

---

# Drag'n'Drop: puštění

  - Událost `drop`
  - Pokud událost zpracujeme, voláme `preventDefault`
  - Vlastnost `e.dataTransfer.files` je pole souborů, jsou-li jaké

---

# Geolocation
  - Zjištění polohy uživatele
  - Asynchronní
  - Polohu zjišťuje prohlížeč nedefinovanými mechanismy
  - GPS, IP, Názvy wifi AP, &hellip;
  - <del>Google Chrome:</del> **jen po HTTPS!**

---


# Geolocation: API

```js
let ok = function(position) {
	alert([position.coords.latitude, position.coords.longitude]);
}

let error = function(e) {
	alert(e.message);
}

navigator.geolocation.getCurrentPosition(ok, error);
```

---

# Geolocation: další API

  - `watchPosition` pro opakované sledování
  - `clearPosition` pro přerušení
  - Nalezená pozice obsahuje také rychlost, směr, výšku, přesnost

---

# Web Storage

  - Úložiště dat v prohlížeči
  - Alespoň 5MB pro doménu
  - Data se nikam neodesílají
  - Triviální [synchronní](http://www.webdirections.org/blog/localstorage-perhaps-not-so-harmful/) JS API

---

# Web Storage: ukázka

```js
localStorage.setItem("a", "b");
// též localStorage.a, localStorage["a"]

localStorage.length == 1;
localStorage.key(0) == "a";
localStorage.getItem("a") == "b";

localStorage.removeItem("a");
```

---

# Web Storage: další info

  - Problém s anonymním režimem (aktuálně Safari)
  - Ukládají se **jen** dvojice řetězců (klíč-hodnota)
  - Storage je sdílena všemi skripty na doméně
    - Událost `storage` při změně; lze použít/zneužít pro komunikaci tab-tab
  - Slabé API s ohledem na kapacitu
  - `sessionStorage` je oddělené úložiště, trvanlivé jen do zavření prohlížeče

---

# URL

  - Globální objekt zastřešující dvě různá API
  - Statická metoda `URL.createObjectURL` pro vytvoření URL *blobu*
  - Funkce `URL` pro parsování řetězců

---


# Práce s konstruktorem URL

```js
let base = "http://www.seznam.cz/";
let url = new URL("/a/b.cde?x=y#123", base);

url.href;          // http://www.seznam.cz/a/b.cde?x=y#123
url.origin;        // http://www.seznam.cz
url.hash;          // #123
url.searchParams;  // instanceof URLSearchParams
// ... a mnohé další
```

---


# File API

  - Přístup k souborům na disku uživatele
  - Uživatel musí soubor nejdříve "vybrat" (dragdrop, input)
  - Metadata, čtení, odesílání (XHR2)

---

# File API: objekt File

  - `name`
  - `size` v bajtech
  - `type` (MIME) &ndash; odhad prohlížeče / operačního systému

---

# File API: náhled obrázku

```js
let input = document.createElement("input");
input.type = "file";

input.onchange = function(e) {
	let file = input.files[0];
	let url = URL.createObjectURL(file);
	// url = "blob:........"
	image.src = url;
}
```

---

# File API: objekt FileReader

```js
let fr = new FileReader();
fr.addEventListener("load", function(e) {
	alert(e.target.result);
});

fr.readAsText(file);
/* fr.readAsDataURL(file); */
/* fr.readAsArrayBuffer(file); */
/* fr.readAsBinaryString(file); */
```

---

# History API

  - Práce s URL stránky
  - Pro stavové jednostránkové aplikace
  - Podpora pro zpět/vpřed, záložky a permalinky

---


# History API: hash

  - Práce s tzv. *fragment identifikátorem*, zkráceně též *hashem*
  - `location.hash = "ahoj"`
  - Událost `hashchange` na objektu `window`

---

# HTML5 History API

  - Možnost změny celého URL (bez načení stránky)
  - Funkce `history.pushState()` a `history.replaceState()`
  - `history.pushState(data, title, "/nove/URL")`
  - Událost `popstate` na objektu `window` vzniká při uživatelově interakci s historií

---

# Web Workers

  - Snaha o zpřístupnění dalších vláken JavaScriptu
  - JS vykonáván vždy jen v jednom vlákně!
  - Možnost spuštění kódu v izolovaných boxech
  - Problematika komunikace a předávání dat

---


# Web Workers

```js
let worker = new Worker("script.js");

/* obsah souboru je nyní vykonáván v odděleném vlákně */

worker.terminate();
```

---

# Web Workers: komunikace s workerem

```js
let worker = new Worker("script.js");

worker.postMessage({nejaka:"data"});

worker.onmessage = function(e) {
	alert(e.data);
}
```

---

# Web Workers: komunikace z workeru

```js
onmessage = function(e) {
	/* přišla data zvenčí */

	postMessage(/* ... */); /* posílám data ven */
}
```

---

# Web Workers: izolace

  - Žádné window, žádný document
  - importScripts, XMLHttpRequest/fetch, Worker
  - setTimeout, setInterval
  - To je vše!

---

# Web Workers: závěr

  - Výpočet ve workeru může trvat libovolně dlouho
  - Data jsou při předávání klonována (netřeba řešit synchronizaci)
    - Alternativa: *Transferrable*
    - <del>Alternativa: *SharedArrayBuffer*</del>
  - Vhodné tam, kde jsou třeba náročné výpočty
  - Ideálně málo vstupních i výstupních dat
  - [Ukázky](https://developer.mozilla.org/en-US/docs/Web/Demos_of_open_web_technologies#Unclassified)

---

# Page Visibility API

  - Je stránka vidět?
  - Událost `visibilitychange` na objektu `document`
  - `document.hidden`
  - `document.visibilityState` &ndash; `"visible", "hidden", "prerender"`

---

# Fullscreen API

  - Možnost zobrazit *konkrétní HTML prvek* přes celou obrazovku
  - Pouze z posluchače události
  - Podpora dobrá, ale s různými názvy/prefixy
  - Pseudotřída `:full-screen` či `:fullscreen`
  - `document.fullscreenElement`, `document.fullscreenEnabled`

---

# Fullscreen API

```js
let elem = document.querySelector("#myvideo");

if (elem.requestFullscreen) {
	elem.requestFullscreen();
} else if (elem.msRequestFullscreen) {
	elem.msRequestFullscreen();
} else if (elem.mozRequestFullScreen) {
	elem.mozRequestFullScreen();
} else if (elem.webkitRequestFullscreen) {
	elem.webkitRequestFullscreen();
}
```

---

# Fullscreen API

```js
if (document.exitFullscreen) {
	document.exitFullscreen();
} else if (document.msExitFullscreen) {
	document.msExitFullscreen();
} else if (document.mozCancelFullScreen) {
	document.mozCancelFullScreen();
} else if (document.webkitExitFullscreen) {
	document.webkitExitFullscreen();
}
```

---

# FormData

  - Automatická serializace key-value dat tvaru *jako z HTML formuláře*
  - Možno předat do `XMLHttpRequest::send()`
  - Možno postavit nad existujícím formulářem

---

# FormData

```js
let fd = new FormData( [form] );

fd.append("key1", "value");
fd.append("key2", file, "filename");

let blob = new Blob([data...]);
fd.append("key3", blob);
```

---

# IndexedDB

  - Transakční key-value databáze v prohlížeči
  - Pro libovolné množství dat
  - Zcela asynchronní API
  - Databáze je persistentní per-origin

---

# IndexedDB

```js
let r = indexedDB.open("mojeDB", 1);
r.onupgradeneeded = function(e) {
	let db = e.target.result;
	let r = db.createObjectStore("tabulka", {autoIncrement:true});
}

r.onsuccess = function(e) {
	let db = e.target.result;
	let t = db.transaction(["tabulka"], "readwrite");
	let r = t.objectStore("tabulka").add({some:"data"});
}
```

---

# IndexedDB

```js
let r = indexedDB.open("mojeDB", 1);

r.onsuccess = function(e) {
	let db = e.target.result;
	let t = db.transaction(["tabulka"], "readonly");
	let r = t.objectStore("tabulka").get(1);
	r.onsuccess = function(e) {
		console.log(e.target.result); // {some: "data"}
	}
}
```

---

# Prostor pro otázky

? { .questions }
