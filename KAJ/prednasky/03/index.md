# KAJ 03: ES 2015, historie a transpilace

---

# Obsah
  1. Jak si stojí ES 2015
  1. Novinky ES 2015: syntaxe
  1. Novinky ES 2015: rozšíření ES5
  1. Kde a jak si to lze vyzkoušet?

---

# ES6

  - Formálně ECMAScript 2015, vžil se název ES6
  - Největší balík standardizovaných úprav od roku 1995
  - Dříve označováno jako *Harmony*
  - Vývoj zhruba 2008&ndash;2015
  - V roce 2016 vznikla další verze ES7 / ES2016
  - V roce 2017 vznikla další verze ES8 / ES2017
  - ...
  - Aktuálně práce na ES2020

---

# let, const

  - let = var + block scope
  - const = let + read-only

```js
const N = 8;
N = 4; // exception

let x = 1;
if (true) {
	let x = 2;
}
alert(x); // 1
```

---

# Arrow functions

  - Zkrácená syntaxe definice funkcí
  - Lexical this (nelze `call, apply, new`)
  - Pokud má tělo funkce jediný příkaz, není třeba `return` ani závorky

```js
let square = a => a*a;
let add = (a, b) => a+b;

// lexical this
setTimeout( () => this.doStuff(), 1000 );
```
---

# Enhanced object literals

  - Zkrácená definice objektů

```js
let x = 42;

let obj = {
	x,                  // "x":42
	y() { return x; },
	["data_" + x]: x    // "data_42":42
}
```

---

# Template string literals

  - Nahrazování řetězců
  - Odpadá nutnost *sčítání*
  - Smí obsahovat newline
  - Možnost vlastní interpolační funkce

```js
let x = "world";
let y = `hello ${x}`;
let z = `this is a
			very long string`;

// html je uživ. funkce, která dostane jednotlivé tokeny k naformátování
html`<div> ${unsafe} </div>`;
```

---

# Destructuring

  - Snazší přístup k vlastnostem struktur a polí

```js
let [a, b, c] = [1, 2, 3];

let f = function() { return {x:42}; }
let { x } = f();
```

---

# Default + Rest + Spread

  - Výchozí hodnoty parametrů
  - Převod (podmnožiny) parametrů na pole a zpět

```js
function f(x, y = 12) {
	return x + y;
}
f(10); // 22

function f(x, ...y) {
	alert(y.length);
}
f(1, 2, 3); // 2

function f(a, b, c) { return c; }
f(...[1, 2, 3]); // 3
```

---

# Classes

  - Nová syntaxe, staré chování (stále se jedná o prototypovou dědičnost)

```js
class B extends A {
	constructor(x) {
		super(); // v konstruktoru dědící třídy povinné; před ním neexistuje this
		this.x = x;
	}

	static f2() {}
	get something() { /* .... */ }

	f1() {
		super.f1();
		return this.x;
	}
}
```

---

# Modules

  - Modularizace na syntaktické úrovni
  - Jeden výchozí a libovolně dalších pojmenovaných exportů

```js
// a.js
export let A = function() {};
export default function() {};

// b.js
import { A } from "./a.js";
A();

import myLocalName from "./a.js"; // default
```

---

# {Weak,}{Map,Set} {}

  - Set: množina unikátních hodnot
  - Map: dvojice cokoliv-cokoliv
  - WeakMap, WeakSet: bez reference na objekt, bez iterovatelnosti

```js
let s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size == 2;
s.has("hello") == true;

let m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;
```

---

# &hellip;a to ještě není všechno.

<p style="text-align:center; height:70%"><img src="ready.jpg" style="height:100%"/></p>

---

# Symbols

  - Nový datový typ pro řízení přístupu
  - Není zcela privátní, ale alespoň je unikátní

```js
(function() {
	let moneyKey = Symbol("money");
	typeof(moneyKey) == "symbol";

	let Person = function() {
		this[moneyKey] = 10000;
	}

	let person = new Person();
	person.money == undefined;

	Object.getOwnPropertySymbols(person); // :-(
})();
```

---

# Iterators + for..of

  - Programovatelná iterovatelnost
  - Cokoliv, co má metodu `next` je iterátor
  - Cokoliv, co má symbol `Symbol.iterator` je iterovatelné cyklem `for..of`

```js
let fibonacci = {
	[Symbol.iterator]() {
		let pre = 0, cur = 1;
		return {
			next() {
				[pre, cur] = [cur, pre + cur];
				return { done: false, value: cur }
			}
		}
	}
}
```

---

# Iterators + for..of

  - Programovatelná iterovatelnost
  - Cokoliv, co má metodu `next` je iterátor
  - Cokoliv, co má symbol `Symbol.iterator` je iterovatelné cyklem `for..of`

```js
for (let n of fibonacci) {
  if (n > 1000) break;
  console.log(n);
}
```

---

# Generators

  - Speciální druh funkce
  - Návratovou hodnotou je iterátor
  - Klíčové slovo `yield` odpovídá přerušení po jedné iteraci

```js
let generator = function*() {
	let tmp = 1;
	while (true) {
		tmp *= 3;
		yield tmp;
	}
}
```

---

# Generators

  - Speciální druh funkce
  - Návratovou hodnotou je iterátor
  - Klíčové slovo `yield` odpovídá přerušení po jedné iteraci

```js
let iterator = generator();
iterator.next().value; // 3, next() vrací i done:true/false
iterator.next().value; // 9
iterator.next().value; // 27
```

---

# Proxies

  - Monitorování libovolného přístupu k objektům
  - Čtení, zápis, volání, &hellip;

```js
let obj = {};

let interceptor = {
	get: function (receiver, name) {
		return `Hello, ${name}!`;
	}
};

let p = new Proxy(obj, interceptor);
p.world === "Hello, world!"
```

---

# Reflect

  - Rozhraní pro introspekci objektů
  - Metody podobné těm v `Object.*`
  - Namísto výjimek vrací false

```js
Reflect.defineProperty(obj, name, descriptor);
Reflect.construct(F, args);
Reflect.get(obj, property, thisForGetter);
/* ... */
```

---

# Rozšíření ES5 #1

```js
Number.EPSILON
Number.MAX_SAFE_INTEGER
Number.MIN_SAFE_INTEGER
Number.isInteger(Infinity)                      // false
Number.isNaN("NaN")                             // false

Math.acosh(3)                                   // 1.762747174039086
Math.hypot(3, 4)                                // 5
Math.imul(Math.pow(2, 32)-1, Math.pow(2, 32)-2) // 2
Math.sign(5)                                    // 1
Math.trunc(3.1)                                 // 3
/* ... */

"abc".repeat(3)                                 // "abcabcabc"
```

---

# Rozšíření ES5 #2

```js
Array.from(document.querySelectorAll("*")) // real Array
Array.of(1, 2, 3)                          // without special one-arg behavior
[0, 0, 0].fill(7, 1)                       // [0, 7, 7]
[1, 2, 3].find(x => x == 3)                // 3
[1, 2, 3].findIndex(x => x == 2)           // 1
[1, 2, 3, 4, 5].copyWithin(3, 0)           // [1, 2, 3, 1, 2]
["a", "b", "c"].entries()                  // iterator [0, "a"], [1,"b"], [2,"c"]
["a", "b", "c"].keys()                     // iterator 0, 1, 2
["a", "b", "c"].values()                   // iterator "a", "b", "c"

Object.assign(target, { source: "data" });
```

---

# Ostatní

  - Práce s Unicode znaky mimo BMP (tj. code points > 65535):
			<span title="U+1F602 FACE WITH TEARS OF JOY">😂</span>,
			<span title="U+1F4A9 PILE OF POO">💩</span>,
			<span title="U+1F923 ROLLING ON THE FLOOR LAUGHING">🤣</span>,
			<span title="U+1F953 BACON">🥓</span>,
			&hellip;
  - Subclassing vestavěných objektů (Array, Element, &hellip;)
  - Garantované Tail Call Optimisation
  - `new Promise((resolve, reject) => {}), Promise.all, Promise.race`

---

# Jak zkoušet ES 2015+?

  - [Compatibility table](https://kangax.github.io/compat-table/es6/)
  - Pro něco lze polyfill (`Array.from`, `Promise`, &hellip;)
  - Některou syntaxi lze *transpilovat* (viz dále)
  - Něco nelze vůbec (`WeakMap, WeakSet, Proxy`)

---

# Transpilace ES 2015+

  - Proces konverze syntaxe ES 2015+ do ES5
  - [Babel](https://github.com/babel/babel), [Google Closure Compiler](https://developers.google.com/closure/compiler)
  - Pro některé novinky nutno dodat polyfilly
  - Problematická otázka ES 2015 modulů

---

# Babel v praxi

  - Online hřiště na [http://babeljs.io/repl/](http://babeljs.io/repl/)
  - Ke stažení jako npm modul
  - Ke stažení též jako ohromný kus ES5 (transformace za běhu)

---

# Moduly v praxi

  - Implementováno jen v [novějších verzích](https://caniuse.com/#search=es6-module) prohlížečů
  - Výdej produkčního kódu &ndash; počet HTTP požadavků?
  - Alternativa #1: *bundling* do jednoho souboru, např. nástrojem [Rollup](http://rollupjs.org/)
  - Alternativa #2: *transpilace* do jiného (kompatibilnějšího) formátu modulů

---

# Transpilace modulů

  - Konverze do CommonJS, AMD nebo SystemJS
  - Vždy nutno dodat další podpůrný kód (Browserify, Webpack, RequireJS, &hellip;)
  - Více viz [přednáška na devel.cz 2016](http://ondras.zarovi.cz/slides/devel2016/)

---

# ES 2016

  - Operátor `**`
  - `Array.prototype.includes`
  - ...that's all, folks

---

# ES 2017

  - `async/await`
  - `String.prototype.pad{Start,End}` (respektuje LTR/RTL)
  - `SharedArrayBuffer, Atomics`
  - Funkcionální iterace objektů

---

# ES 2018

  - `rest/spread` pro objekty
  - Asynchronní iterace `for-await-of`
  - `Promise.prototype.finally`
  - Nové schopnosti regulárních výrazů: lookbehind, named capture, single line flag

---

# ES 2019

  - `Array.prototype.{flat,flatMap}` pro více FP
  - `String.prototype.trim{Start,End}` (ES5 definuje jen `trim`)
  - Stabilní chování `Array.prototype.sort`
  - `try-catch` volitelně bez parametru

---

# Prostor pro otázky

? { .questions }
