# KAJ 2

## JavaScript pro starší a pokročilé

---

# Obsah

  1. Modularizace
  1. Uzávěry
  1. Klíčové slovo this
  1. Prototype chain
  1. Operátor new
  1. Polyfilly

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

# Modularizace globálními proměnnými

```js
// script-1.js
function a() { ... }

// script-2.js
function b() { ... }

// main.js
a();
b();
```

---

# IIFE

  - Řešení z archaického období
  - Více HTML značek `<script>` sdílí jmenný prostor
    - Riziko kolize (v rámci aplikace i napříč dalšími skripty na stránce)
  - Trik: immediately-invoked function expressions

---

# IIFE

```js
(function(){
	let document = "test"  // lokalni promenna
	alert(document)        // "test"
})();

alert(document)          // [object HTMLDocument]
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

- Explicitní opt-in pomocí atributu `type`
  - `<script type="module" src="app.js"></script>`
  - automaticky v režimu *defer* (vykonání až po zpracování veškerého HTML)
  - volitelně atribut *async* (vykonání paralelně se zpracováním HTML)
- Nutnost výdeje pomocí HTTP
  - <span style="color:red;display:inline-block;width:2ch">✘</span> file://
  - <span style="color:lime;display:inline-block;width:2ch">✔</span> <span>http</span>://localhost

---

# Bundling

- Výdej produkčního kódu &ndash; počet HTTP požadavků?
- Alternativa #1: neřešit (pro potřeby KAJ zcela dostačující)
- Alternativa #2: *bundling* do jednoho souboru, např. nástrojem [Rollup](http://rollupjs.org/) či [ESbuild](https://esbuild.github.io/)

---

# Uzávěry (closures)

  - Jaký je obor platnosti proměnných?
  - Funkci lze definovat uvnitř jiné funkce
  - Proměnná existuje v rámci své funkce a všech jejích podfunkcí

```js
let outer = function(a, b) {
	let inner = function(x) { return 2*x }
	return a + inner(b)
}
```

---

# Uzávěry

  - Co když použijeme proměnnou ve vnitřní funkci?
  - Vznikne *uzávěra*
  - Rozdíl mezi prostorovou a časovou platností

```js
let outer = function(a, b) {
	let inner = function() { return 2*b }
	return inner
}
```

---


# Klíčové slovo *this*

- Jeden z nejkomplikovanějších konceptů jazyka
- Zásadní rozdíl oproti jiným: hodnota je určena při volání

```js
let fun = function() { alert(this) }

let obj1 = { fun:fun }
let obj2 = { fun:fun }

fun == obj1.fun == obj2.fun

obj1.fun()  // this == obj1
obj2.fun()  // this == obj2
fun()       // this == ?
```

---

# Klíčové slovo *this*

**Funkce lze vykonat mnoha způsoby**

1. Dokud voláme funkci zápisem `obj.fun()`, situace připomíná ostatní OOP jazyky
1. Pokud funkci předáme jako callback, dějí se věci
1. I v ostatních případech je situace komplikovaná

---

# Klíčové slovo *this*

Funkce předaná jako callback: hodnota `this` záleží na implementaci příjemce callbacku

```js
function onClick(e) {
  alert(this == e.currentTarget);
}
node.addEventListener("click", onClick);

function log(item) {
  console.log(this == data);
}
let data = [1, 2, 3];
data.forEach(log, data);
```

---

# Klíčové slovo *this*

Dnes málo užívané (historické) možnosti explicitního nastavení `this`

```js
let fun = function() { alert(this) }

let obj1 = {}
let obj2 = {}

fun.call(obj1, arg1, ...)     // this == obj1
fun.apply(obj2, [arg1, ...])  // this == obj2
```

---

# Klíčové slovo *this*

*Arrow funkce:* `this` neexistuje, užije se uzávěra

*Klíčové slovo `new`:* právě vznikající nový objekt

*Volání bez tečky:* globální jmenný prostor, případně `undefined`

---

# Klíčové slovo *this*
[Context quiz](https://leaverou.github.io/talks/intro/#context-quiz)

---

# Prototype chain

- Vlastnost převzatá z jazyka Self
- Specifické chování, když se v objektu pokusíme přistoupit k neexistujícímu klíči / vlastnosti

```js
let zvire = {
  jmeno: "zirafa",
  vek: 5
}

alert(zvire.jmeno)    // "zirafa"
alert(zvire.potrava)  // undefined
```

---

# Prototype chain

```js
let bylozravec = {
  potrava: "rostliny"
}
alert(bylozravec.potrava)       // "rostliny"

let zirafa = Object.create(bylozravec)
alert(zirafa.potrava)           // "rostliny"

zirafa.__proto__ == bylozravec  // true
```

---

# Prototype chain

## Terminologický guláš! 🍲

- Název provázání: *prototype link*
- Ve specifikaci: `[[Prototype]]`
- Pro potřeby ladění: `__proto__`
- ...a bude hůř (až se objeví vlastnost `.prototype`)

---

# Prototype chain

- Říkáme, že jeden objekt je prototypem druhého
- Druhý nabízí vše, co první (+ možná něco navíc)
- Více prototype linků = prototype chain

```js
let obj1 = { klic:"hodnota" }
let obj2 = Object.create(obj1)
let obj3 = Object.create(obj2)
obj3.klic = "jina hodnota"
obj1.jinyKlic = "jeste jina hodnota"

alert(obj2.klic)      // "hodnota"
alert(obj3.klic)      // "jina hodnota"
alert(obj3.jinyKlic)  // "jeste jina hodnota"
```

---

# Operátor *new*

Jak vytvořit prototype link?

  - Varianta 0: vlastnost `.__proto__`
    - Nelze (legacy/deprecated, debug-only)
  - Varianta 1: `Object.create`
    - Přibyla *až* v roce 2009
  - Varianta 2: `new`
    - Původní, složitá, stará

---

# Operátor *new*

Co *opravdu* dělá operátor `new`?

- Každá funkce má (téměř prázdný) objekt `.prototype`
- Zápis `new f`:
  1. vytvoří nový objekt
  1. nastaví mu `__proto__` na `f.prototype`
  1. vykoná nad ním `f()`

---

# Operátor *new*

[diagram](img/prototype.svg)

```js
let F = function() {
	this.a = 1
}
F.prototype.b = 2

let f = new F()
f.c = 3
```
---

# Operátor *new*

Zkusme si to naimplementovat:

```js
function myNew(F) {
  let result = Object.create(F.prototype)
  F.call(result)
  return result
}

let f = myNew(F)
```

---

# Operátor *new*

Poznámky k použití `new`

- Objekt (*instance*) nemá příliš souvislost se svojí vytvořující funkcí
- Do prototypu funkce zpravidla vkládáme metody (neb ty mají být sdíleny)
- Složitost operátoru `new` a objektu `prototype` je hlavní motivací pro přidání *tříd* V ES6

---

# Prototype vs. class

`class` je *syntax sugar*

```js
class A {}
class B extends A {
  constructor() {
    super();
    this.c = 3
  }
  f() {}
}

function F() {
  this.c = 3
}
F.prototype = Object.create(A.prototype)
```

---

# Dědičnost pomocí prototypů

[diagram](img/inheritance.svg)

```js
let Parent = function() {}
Parent.prototype.hi = function() { return "hello" }

let Child = function() {}
Child.prototype = Object.create(Parent.prototype)
// alternativně: Child.prototype = new Parent()

let ch = new Child()
ch.hi() // "hello"
```

---

# Polyfill

**Polyfill:** JavaScriptový kód, který je schopen doplnit chybějící funkcionalitu při zachování kompatibilního API

```js
if (!Math.sign) {
  Math.sign = function(n) {
    return (n ? n/Math.abs(n) : n);
  }
}
```

---

# Obohacování prototypů

```js
Array.prototype.random = function() {
  let index = Math.random()*this.length
  return this[Math.floor(index)]
}
```

---

# Obohacování prototypů

Smutná historie projektu NPM

```js
String.prototype.lpad = function(what, length) {
  let count = length - this.length
  let padding = ""
  for (let i=0; i<count; i++) { padding += what }
  return padding + this
}
```

---

# Obohacování prototypů

Smutná historie projektu MooTools

```js
Array.prototype.contains = function(what) {
  for (let i=0; i<this.length; i++) {
    if (this[i] === what) { return true; }
  }
  return false
}
```

---

# bind

```js
let f1 = function() { alert(this.name) }
let foo = { name:"foo" }
let bar = { name:"bar" }
f1.call(foo)  // "foo"

let f2 = f1.bind(bar)
f2()  // "bar"
```

---

# bind

  - Funkce/metoda `bind` vrací novou funkci
  - V nové funkci je `this` napevno definováno ve chvíli volání `bind`
  - `bind` může kromě *zafixování* `this` rovnou obdobně nastavit i některé parametry
  - Úkol: vyrobte `bind`

---

# bind

```js
Function.prototype.bind = function(newThis) {
	let func = this
	return function() {
		return func.apply(newThis, arguments)
	}
}
```
---

# bind &ndash; využití

Dnes zejména pro fanoušky funkcionálního programování. V pre-ES6 éře taktéž pro předávání `this` s callbackem:

```js
let Obj = function() {}
Obj.prototype.foo = function() {}

let bar = new Obj()
setTimeout(bar.foo, 100)  // FAIL!

setTimeout(bar.foo.bind(bar), 100)

// dtto addEventListener atp.
```

---

# Bonus

Víte, co a proč udělá tato funkce?

```js
function s(a) {
    while (a.length) {
        let v = a.shift()
        setTimeout(a.push.bind(a, v), v)
    }
}
```

---

# Prostor pro otázky

? { .questions }
