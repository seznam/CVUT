# KAJ 04: Události a asynchronní zpracování

---

# Obsah

  1. Události: opáčko
  1. Události: objekt události
  1. Události: capture a bubble
  1. Události: posluchače
  1. Asynchronní zpracování
  1. Promises a dále

---


# Události: opáčko

  - Alternativní způsob řízení toku programu
  - *Event-based programming*
  - *Až nastane X, udělej Y*

---

# Události: opáčko

```js
let func = function(e) {
	alert("...")
}
document.body.addEventListener("click", func, false)
```

---

# Události: opáčko

Co je na událostech zajímavého?

  - Na jakých vznikají prvcích?
  - Jaké existují?
  - Co obsahuje (jediný) parametr posluchače?
  - Jaký význam má třetí parametr `addEventListener`?

---

# Události: objekt události

  - Liší se podle typu události
  - Vždy obsahuje `target`, `currentTarget`, `timeStamp`, `type`
  - Vždy obsahuje `stopPropagation` a `preventDefault`

---

# Události klávesnice

  - `keydown`, `keypress`, `keyup`
  - Modifikátory `ctrlKey`, `altKey`, `shiftKey`, `metaKey`
  - Vlastnost `key`
    - Identifikátor stisklé logické klávesy (string)
    - Seznam na [https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
  - Vlastnost `code`
    - Identifikátor stisklé fyzické (hardwarové) klávesy
    - Stejná množina hodnot jako u `key`

---

# Události klávesnice

Staré, zpětně kompatibilní API

  - Stisk a uvolnění obsahuje `keyCode`
    - Identifikátor klávesy na klávesnici (int)
    - Seznam na [https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)
  - Tištitelný keypress obsahuje `charCode`
    - Unicode code point znaku (int)
    - `String.fromCharCode` převede na znak

---

# Události myši

  - `mousedown`, `mouseup`, `click`, `mouseover`, `mouseout`, `mousemove`
  - `clientX` a `clientY` &ndash; souřadnice kurzoru vůči průhledu
  - `button` je tlačítko (0 = levé, 1 = prostřední, 2 = pravé)

---

# Události dotykové

  - `touchstart`, `touchmove`, `touchend`, (`gesturechange`)
  - `touches` &ndash; pole všech dotyků
  - `changedTouches` &ndash; pole změněných dotyků
  - `targetTouches` &ndash; pole dotyků na cílovém prvku
  - Dotyk je mini-událost, obsahující pozici a doplňkové údaje (sílu stisku, velikost prstu a natočení)

---

# Pointer events

Hybrid mezi `mouse` a `touch`. Společné pro myš, dotyk, stylus&hellip;

  - `pointerdown`, `pointermove`, `pointerup`
  - `pointerenter`, `pointerleave`
  - žádný *click*
  - `element.setPointCapture()`, `element.releasePointCapture()`
  - komplementární [CSS vlastnost `pointer-events`](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)

---

# Události ostatní

  - `focus`, `blur`
  - `input`, `change`, `submit`
  - `scroll`, `resize`
  - `DOMContentLoaded`
  - [Kompletní soupis](https://developer.mozilla.org/en-US/docs/DOM/Mozilla_event_reference)

---

# Capture a bubble #1

  - Třetí parametr pro `addEventListener` je *useCapture*, nebo konfigurační objekt (viz dále)
  - Posluchače události jsou volány nejprve ve fázi capture, poté ve fázi bubble
  - Pořadí fází a volání viz [diagram](img/event.gif)

---

# Capture a bubble #2

  - Více posluchačů na stejném uzlu (ve stejné fázi) je voláno v definovaném pořadí
  - Zpracovávání události (mezi uzly) lze zastavit voláním `stopPropagation()`
  - Zpracovávání události (v rámci uzlu) lze zastavit voláním `stopImmediatePropagation()`
  - Metoda `preventDefault()` s tím nijak nesouvisí

---

# Capture a bubble #3

  - Některé události nebublají&hellip;
  - &hellip;ale i tyto procházejí capture
  - `load`, `unload`
  - `focus`, `blur`

---

# Konfigurační objekt

Třetí parametr může být též objekt s vlastnostmi:

  - `once`
  - `capture`
  - `passive`: slib, že posluchač nezavolá `preventDefault()`
  - `signal`: instance funkce `AbortSignal`, použitelná k odebrání posluchače

---

# Odebrání posluchače pomocí AbortSignal

...není zásadně užitečné, ale bude se hodit příště.

```js
let controller = new AbortController()
node.addEventListener("click", f, {signal: controller.signal})

/* ... */

controller.abort()  // odebrani posluchace
```

---

# Posluchače událostí

Varianta 1: posluchač je funkce

```js
window.addEventListener("load", function(e) {
	alert(e.currentTarget == this)
});
```

  - `this` je prvek, na kterém je posluchač zavěšen (nikoliv ten, kde událost vznikla)
  - Pokud chceme předat parametry nebo změnit this, použijeme uzávěru / *arrow function* / `bind`

---

![](img/secret.jpg) {.poster}

---


# Posluchače událostí

Varianta 2: posluchač je objekt

```js
let obj = {
	handleEvent(e) {
		alert(this == obj)
	}
}
window.addEventListener("load", obj)
```

  - `obj` musí mít metodu `handleEvent`
  - `this` je posluchač

---

# Asynchronní zpracování

  - JavaScript je vykonáván v jednom vlákně
  - Není nutné řešit přerušení a synchronizaci vykonávání
  - *Event loop*

---

# Event loop

```js
scheduledJS = "";  // inicializováno pomocí <script>
listeners = [];

while (1) {
	eval(scheduledJS);  // TADY se vykoná JS

	if (!listeners.length) break;

	// počkat, než bude čas na nejbližší posluchač
	currentListener = waitFor(listeners);

	// naplánovat jej
	scheduledJS = listeners[currentListener];
	delete listeners[currentListener];
}
```

---

# Zpožděné vykonávání

  - Je řada způsobů, jak *naplánovat* zpožděné vykonání kódu
  - XMLHttpRequest, addEventListener
  - timeout, interval
```js
setTimeout(  function() { /* ... */ }, 1000)
setInterval( function() { /* ... */ }, 100)
```
  - Pořadí určuje <del>lékař</del> prohlížeč, ale vždy nejprve v příští iteraci event loopu

---


# Zpožděné vykonávání: this v callbacku

Pokud někam předávám funkci, s jakým `this` bude volána?

```js
function Animal() {
	setTimeout(this.eat, 3000)
}

Animal.prototype.eat = function() {
	this.food += 3
}
```

---

# Zpožděné vykonávání: this v callbacku

`bind` pomůže

```js
function Animal() {
	setTimeout(this.eat.bind(this), 3000)
}

Animal.prototype.eat = function() {
	this.food += 3
}
```

---

# Zpožděné vykonávání: this v callbacku

`arrow function` pomůže

```js
function Animal() {
	setTimeout(() => this.eat(), 3000)
}

Animal.prototype.eat = function() {
	this.food += 3
}
```

---

# Zpožděné vykonávání: requestAnimationFrame

  - `setTimeout` zní jako rozumné řešení pro JS animace
  - `requestAnimationFrame` je výrazně vhodnější alternativa
```js
requestAnimationFrame(function() {
	// animujeme...
});
```
  - Prohlížeč sám volí vhodnou délku časového kroku (zpravidla okolo 60 fps)
  - Více info viz [MDN](https://developer.mozilla.org/en-US/docs/DOM/window.requestAnimationFrame)

---

# Promises

  - Při návrhu vlastního API narážíme na asynchronní funkce
  - Takové funkce vyžadují `callback`
  - Kolikátý parametr? Co návratová hodnota? Co výjimky?
  - Co podmíněně asynchronní funkce?

---

# Promises

  - Návrhový vzor `Promise` nabízí výrazně přehlednější řízení asynchronního kódu
  - Promise je *krabička na časem získanou hodnotu*
  - (podmíněně) asynchronní funkce **vrací** Promise
  - Zájemce může na promise navěsit posluchače (dva různé)

---

# Promises: ukázka

```js
function getData(url) {
	let promise = new Promise()
	// ...
	return promise
}

getData(url).then(
	function(data) { alert(data) },
	function(error) { alert(error) }
);
```

---

# Promises: doplnění

  - Promise se může nacházet ve stavech *pending*, *fulfilled*, *rejected*
  - Fulfilled/rejected == *resolved*
  - Tvůrce promise ji mění, konzument jen poslouchá (`then`)
  - Vyrobit lze již naplněnou promise: `Promise.resolve(123)`
  - Volání `then()` vrací novou promise (‽) &rArr; řetězení
  - Promise je *jen* návrhový vzor, tj. lze doplnit pomocí Polyfillu

---

# Promises: další API

```js
getData().catch(console.error)      // jako .then(null, console.error)

let p1 = getData()
let p2 = getData()

Promise.all([p1, p2]).then( ... )   // parametr callbacku je pole hodnot
Promise.race([p1, p2]).then( ... )  // první s hodnotou
```
---

# Promises: tvorba a změna stavu

  - Je to složité!
  - &hellip;protože měnit stav smí jen producent
  - Tedy nic jako `Promise.prototype.fulfill = ...`
  - API konstruktoru `new Promise` vyžaduje funkci (tzv. exekutor), které budou *řídící nástroje* předány

---

# Promises: tvorba a změna stavu

```js
let promise = new Promise(function(resolve, reject) {
	// funkce dodaná tvůrcem Promise
	if (...) {
		resolve(value)
	} else {
		reject(error)
	}
});
return promise
```

---

# Promises v praxi

  - Nacházíme se v období přechodu z callbacků na Promises
    - &hellip;už asi 10 let
  - Stará API (`setTimeout`) požadují callbacky, nová (`fetch`) vrací Promise
  - Nový kód by měl vždy pracovat s Promises

---

# "Žhavá" novinka: async/await

  - ES2017
  - Nadstavba nad Promises
  - Asynchronní funkce stále vracejí Promise
  - Konzument může na hodnotu čekat blokujícím způsobem
  - [Přednáška o async/await](http://ondras.zarovi.cz/slides/2018/async-await/)

---

# "Žhavá" novinka: async/await

```js
async function getData(url) {
	try {
		let data = await fetch(url)  // vrací Promise
		let processed = process(data)
		return processed             // implicitně obaleno do Promise
	} catch (e) {
		// Promise rejection
	}
}
```

---

# "Žhavá" novinka: async/await

```js
let processed = await getData(url)  // toto lze jen v "async" funkci
```

```js
getData(url).then(function(processed) {  // toto lze kdekoliv
  // ...
});
```

---

# Prostor pro otázky

? { .questions }
