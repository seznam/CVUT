# KAJ 1

## Úvod, JavaScript: historie, syntaxe, modularizace

---

# Obsah

  1. O předmětu
  1. Standardy HTML a JS
  1. Syntaktické prvky JS
  1. Modularizace

---

# Co jsou JavaScriptové aplikace?

  - SPA &ndash; Single Page Application
  - <a href="https://www.mapy.cz">www.mapy.cz</a>
  - <a href="https://www.gmail.com">www.gmail.com</a>
  - <a href="https://epicport.com/en/ttd">OpenTTD online</a>
  - tato stránka
  - ...a mnohé další

---

# Představení předmětu

  - "Moderní" webové technologie na klientu
  - HTML5, CSS3, JavaScript
  - <a href="img/ppk.jpg"><img src="img/ppk.jpg" style="height:380px"/></a>

---

# Organizace

  - Zkouška
  - Semestrální práce
  - Přednášky: RNDr. Ondřej Žára, Seznam.cz
  - Cvičení: Bc. Zdeněk Vlach, Seznam.cz
  - Cvičení: Bc. Petr Huřťák, <del>Seznam.cz</del>
  - Cvičení: Ing. Jan Dušek, Seznam.cz

---

# Sylabus předmětu

![](img/sylabus.png){style="height:460px"}

---

# Web předmětu

  - Stránky předmětu na <a href="http://cvut.seznam.cz/">cvut.seznam.cz</a>
  - (Nové) pořadí témat: JS, síť, CSS, multimédia

---

# Podklady a materiály

  - <a href="https://developer.mozilla.org/">https://developer.mozilla.org/</a>
  - <a href="https://caniuse.com/">https://caniuse.com/</a>
  - Google
  - <del>Stack Overflow</del>
  - <a href="mailto:ondrej.zara@firma.seznam.cz">ondrej.zara@firma.seznam.cz</a>

---

# Kniha FIXME stara
# Kniha FIXME nova

<img style="height:600px;float:right;margin-right:0;" src="https://cdn.albatrosmedia.cz/Images/Product/29109959?31092A68D952319080880FFA2781041B" />

  - JavaScript – Programátorské techniky a webové technologie
  - Vydává <a href="https://www.albatrosmedia.cz/tituly/29109959/java-script/">cpress.cz</a>
  - Určeno pro zájemce o JavaScript po absolvování základního kurzu
  - Povětšinou jen JS, méně DOM rozhraní
  - Psáno v době ES5 (2014): z dnešního pohledu je syntaxe jazyka zastaralá
  - V roce 2024 snad vyjde nová verze

---

# Formalizace témat

- HTML/CSS: HTML5
- JavaScript: ECMAScript

---

# Standard HTML5

https://html.spec.whatwg.org/

  - ![](img/w3c.png) + ![](img/whatwg.png) (**W**eb **H**ypertext **A**pplication **T**echnology **W**orking **G**roup)
  - Mnoho rozdílných požadavků na standard:
	- Zpětná kompatibilita
	- Zpracování chyb
	- Jednoduchost použití
	- Podpora pro skriptování

---

# Standardizační proces HTML

![Ian Hickson](img/ih.jpg) {style="position:absolute;right:0;top:40px;"}

  - Editor Ian Hickson
  - Aktuálně <del><em>Working Draft</em></del> <em>Recommendation</em>
  - <em>Living standard</em>
  - přes 14 MB textu, 95k řádek
  - Vývoj pomocí mailinglistu <a href="mailto:whatwg@whatwg.org">whatwg@whatwg.org</a>
  - <em>Dozorčí rada</em> (WHATWG members)
  - 2004 – <del>2022</del> 2014

---

# Standard ECMAScript

  - Zaštiťuje [TC39](https://tc39.es/)
  - Návrhy na vylepšení může podat kdokoliv
  - Konkrétní návrh prochází čtyřmi fázemi standardizace (s pomocí tzv. *šampiona*)
  - Valná většina novinek přidávaných v posledních letech vzešla z požadavků a nápadů vývojářů

---

# Webové prohlížeče: co kdo umí

  - https://caniuse.com/
    - Srovnávací tabulky
    - Odkazy na testy
  - [Mozilla Developer Network](https://developer.mozilla.org/)
    - Dokumentace
    - Ukázky
  - [Feature detection](http://diveintohtml5.info/detect.html)

---

# Volitelné nabízení pokročilých technologií

  - **Progressive enhancement:** nabízet základní funkcionalitu a volitelně přidávat
  - **Graceful degradation:** nabízet pokročilou funkcionalitu a v případě nouze couvnout

---

# Syntaxe JS

  - ...se v čase mění!
  - Archaické období: 1995-2015
  - Moderní období: 2015+
  - Duální označení startuje s ES2015 = ES6

---

# Console API

Vývojářské nástroje v každém prohlížeči (typicky <kbd>F12</kbd>)

```js
console.log("...")
console.log("test", 123, ["pole", "hodnot"])
console.log("Formatovani %s", "retezcu")

console.warn("warning")
console.error("crash")

console.time("test")
console.timeEnd("test")
```

Více info v [kompletní dokumentaci](https://developer.mozilla.org/en-US/docs/Web/API/Console).

---

# Definice proměnných

  - var = archaické období
  - let = var + block scope
  - const = let + read-only

```js
const N = 8
N = 4      // exception

const M = [1, 2, 3]
M.push(4)  // ok

let x = 1
if (true) {
	let x = 2
}
alert(x)   // 1
```

---

# Základní syntaktické prvky

  - ASI = Automatic Semicolon Insertion
    - velmi komplikovaná pravidla!
  - if, for, while, switch
  - *Type coercion*

```js
let a = 1 + "dva"
let b = {} + {}
if (0 == "") { /* ... */ }
if (undefined == null)  { /* ... */ }
if (undefined === null) { /* ... */ }
```

---

# Primitivní datové typy

  - Číslo, bool, řetězec, null, undefined
  - Předávané hodnotou

```js
let a = 3
let b = 0.1 + 0.2
let c = "ahoj" + 'ahoj'
let e = null
let f = undefined
```

---

# Template string literals

  - Nahrazování řetězců
  - Odpadá nutnost *sčítání*
  - Smí obsahovat newline
  - Možnost vlastní interpolační funkce

```js
let x = "world"
let y = `hello ${x}`
let z = `this is a
			very long string`

// html je uživ. funkce, která dostane jednotlivé tokeny k naformátování
html`<div> ${unsafe} </div>`

randomize`Hello, ${["mr", "ms", "mrs"]}. ${firstnames} ${lastnames}`
```

---

# Komplexní datové typy

  - Objekt = neuspořádaná množina dvojic (klíč, hodnota)
  - Podobjekty: Array, Function, Date, RegExp
  - Předávané odkazem

```js
let a = {}               // prázdný objekt
let b = {c:3, "d":"hi"}
let e = [a, b]           // pole o dvou položkách
let f = function() {}
let g = /^.*/            // regulární výraz
```

---

# Objekty, funkce a pole

  - Objekt = neuspořádaná množina dvojic
  - Klíč je řetězec, hodnota je cokoliv
  - Pole je též objekt

```js
let pole1 = [3, 2, 1]
let pole2 = []

pole1.length == 3
pole1[1]     == 2
pole2.length == 0

pole2.push(pole1)
```

---

# Enhanced object literals

  - Zkrácená definice objektů *ex nihilo*

```js
let x = 42

let obj = {
	x,                  // "x":42
	y() { return x; },
	["data_" + x]: x    // "data_42":42
}
```

---

# Destructuring

  - Snazší přístup k vlastnostem struktur a polí

```js
let [a, b, c] = [1, 2, 3]

let f = function() { return {x:42} }
let { x } = f()
```

---

# Funkce

  - Funkce je též objekt

```js
let add = function(a, b) { return a+b }
add.c = 123
add(add.c, add["c"])
```

---

# Default + Rest + Spread

  - Výchozí hodnoty parametrů
  - Převod (podmnožiny) parametrů na pole a zpět

```js
function f(x, y = 12) {
	return x + y
}
f(10) // 22

function f(x, ...y) {
	alert(y.length)
}
f(1, 2, 3) // 2

function f(a, b, c) { return c }
f(...[1, 2, 3]) // 3
```

---

# Spread v akci

```js
function build(data) {
  let node = document.createElement("p")
  node.classList.add(data.status)
  node.append(data.text)
  return node
}

const DATA = [/* pole struktur */]

parent.append(...DATA.map(build))
```

---

# Arrow functions

  - Zkrácená syntaxe definice funkcí
  - Lexical this (nelze `call, apply, new`)
    - `this` v rámci arrow function nemá speciální hodnotu
  - Pokud má tělo funkce jediný příkaz, není třeba `return` ani závorky

```js
let square = a => a*a
let add = (a, b) => a+b

// lexical this
setTimeout( () => this.doStuff(), 1000 )
```

---

# Classes

```js
class B extends A {
	constructor(x) {
		super() // v konstruktoru dědící třídy povinné; před ním neexistuje this
		this.x = x
	}

	static f2() {}
	get something() { /* .... */ }

	f1() {
		super.f1()
		return this.x
	}
}
```

---

# {Weak,}{Map,Set} {}

  - Set: množina unikátních hodnot
  - Map: dvojice cokoliv-cokoliv
  - WeakMap, WeakSet: bez reference na objekt, bez iterovatelnosti

```js
let s = new Set()
s.add("hello").add("goodbye").add("hello")
s.size == 2
s.has("hello") == true

let m = new Map()
m.set("hello", 42)
m.set(s, 34)
m.get(s) == 34
```

---

# Jak pracovat s moedrní syntaxí?

  - [Compatibility table](https://compat-table.github.io/compat-table/es6/)
  - Některou syntaxi lze *transpilovat*
    - Více o tom za malou chvíli
  - Pro něco lze polyfill (`Array.from`, `Promise`, &hellip;)
    - Více o tom v příští přednášce
  - Něco nelze vůbec (`WeakMap, WeakSet, Proxy`)

---

# Transpilace ES 2015+

  - Proces konverze syntaxe ES 2015+ do starší
  - [Babel](https://github.com/babel/babel), [Google Closure Compiler](https://developers.google.com/closure/compiler)
  - Problematická otázka ES modulů

---

# Babel v praxi

  - Online hřiště na [https://babeljs.io/repl](https://babeljs.io/repl)
  - Ke stažení jako npm modul
  - Ke stažení též jako ohromný kus ES5 (transformace za běhu)

---

# Strukturování kódu

Předpoklad: kód členíme do více malých souborů

<table>
  <tr>
    <th>Modularizace \ Počet</th>
    <th>Mnoho souborů</th>
    <th>Jeden soubor</th>
  </tr>
  <tr>
    <th>globální proměnné</th>
    <td>volitelně IIFE</td>
    <td>hloupý bundler</td>
  </tr>
  <tr>
    <th>import+export</th>
    <td>module script <br/> &lt;script type=module&gt;</td>
    <td>module-aware bundler</td>
  </tr>
</table>

---

# JS: IIFE

  - Problém: strukturování (modularizace) JS kódu
  - Historicky velká ostuda
  - Solidní řešení až v ES6 (třetí přednáška)
  - Více HTML značek `<script>` sdílí jmenný prostor
  - Trik: immediately-invoked function expressions

---

# JS: IIFE
```js
(function(){
	let document = "test"; // lokalni promenna
	alert(document);       // "test"
})();

alert(document);           // [object HTMLDocument]
```

---



# ES Modules

  - Modularizace na syntaktické úrovni
  - Jeden výchozí a libovolně dalších pojmenovaných exportů

```js
// a.js
export let A = function() {}
export default function() {}

// b.js
import { A } from "./a.js"
A()

import myLocalName from "./a.js" // default
```

---

# Moduly v praxi

FIXME module skripty

- Explicitní opt-in pomocí atributu `type`
  - `<script type="module" src="app.js"></script>`
  - vždy asynchronní
- Výdej produkčního kódu &ndash; počet HTTP požadavků?
- Alternativa #1: neřešit (pro potřeby KAJ zcela dostačující)
- Alternativa #2: *bundling* do jednoho souboru, např. nástrojem [Rollup](http://rollupjs.org/) či [ESbuild](https://esbuild.github.io/)

---


# Prostor pro otázky

? { .questions }
