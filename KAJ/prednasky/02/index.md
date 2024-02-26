# KAJ 2 JavaScript pro starší a pokročilé

---


# Obsah
  1. JavaScript: opáčko
  1. Objekty, funkce a pole
  1. Pilíř 1: Uzávěry
  1. Pilíř 2: Klíčové slovo this
  1. Pilíř 3: Prototype chain
  1. Operátor new

---


# Opáčko

  - Interpret v každém prohlížeči
  - Pro nováčka obtížný: jazyk samotný vs. DOM
  - Jazyk stále vyvíjen (ES5&rArr;ES6&rArr;ES7&rArr;ES2017&rArr;ES2018&rArr;&hellip;), vznikají nové verze
  - Neexistuje koncept tříd (obtížné porovnání s C++, Java, &hellip;)

---


# Opáčko: primitivní datové typy

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


# Opáčko: komplexní datové typy

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


# Opáčko: základní syntaktické prvky

  - Volitelný středník
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

# Objekty, funkce a pole

  - Funkce je též objekt

```js
let add = function(a, b) { return a+b }
add.c = 123
add(add.c, add["c"])
```

---

# Pilíř 1: Uzávěry

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


# Pilíř 1: Uzávěry

  - Co když použijeme proměnnou ve vnitřní funkci?
  - Vznikne *uzávěra*
  - Rozdíl mezi prostorovou a časovou platností

```js
let outer = function(a, b) {
	let inner = function() { return 2*b }
	return a + inner()
}

let outer = function(a, b) {
	let inner = function() { return 2*b }
	return inner
}
```

---


# Pilíř 2: Klíčové slovo *this*

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

# Pilíř 2: Klíčové slovo *this*

1. Dokud voláme funkci zápisem `obj.fun()`, situace připomíná ostatní OOP jazyky
1. Pokud funkci předáme jako callback, dějí se věci
1. I v ostatních případech je situace komplikovaná

---

# Pilíř 2: Klíčové slovo *this*

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

# Pilíř 2: Klíčové slovo *this*

Dnes málo užívané (historické) možnosti explicitního nastavení `this`

```js
let fun = function() { alert(this) }

let obj1 = {}
let obj2 = {}

fun.call(obj1, arg1, ...)     // this == obj1
fun.apply(obj2, [arg1, ...])  // this == obj2
```

---

# Pilíř 2: Klíčové slovo *this*

*Arrow funkce (příští přednáška):* `this` neexistuje, užije se uzávěra

*Klíčové slovo `new`:* právě vznikající nový objekt

*Volání bez tečky:* globální jmenný prostor, případně `undefined`

---

# Pilíř 2: Klíčové slovo *this*
[Context quiz](https://leaverou.github.io/talks/intro/#context-quiz)

---

# Pilíř 3: Prototype chain

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

# Pilíř 3: Prototype chain

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

# Pilíř 3: Prototype chain

## Terminologický guláš! 🍲

- Název provázání: *prototype link*
- Ve specifikaci: `[[Prototype]]`
- Pro potřeby ladění: `__proto__`
- ...a bude hůř (až se objeví vlastnost `.prototype`)

---

# Pilíř 3: Prototype chain

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

# Pilíř 3+: Operátor *new*

Jak vytvořit prototype link?

  - Varianta 0: vlastnost `.__proto__`
    - Nelze (legacy/deprecated, debug-only)
  - Varianta 1: `Object.create`
    - Přibyla *až* v roce 2009
  - Varianta 2: `new`
    - Původní, složitá, stará

---

# Pilíř 3+: Operátor *new*

Co *opravdu* dělá operátor `new`?

- Každá funkce má (téměř prázdný) objekt `.prototype`
- Zápis `new f`:
  1. vytvoří nový objekt
  1. nastaví mu `__proto__` na `f.prototype`
  1. vykoná nad ním `f()`

---

# Pilíř 3+: Operátor *new*

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

# Pilíř 3+: Operátor *new*

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

# Pilíř 3+: Operátor *new*

Poznámky k použití `new`

- Objekt (*instance*) nemá příliš souvislost se svojí vytvořující funkcí
- Do prototypu funkce zpravidla vkládáme metody (neb ty mají být sdíleny)
- Složitost operátoru `new` a objektu `prototype` je hlavní motivací pro přidání *tříd* V ES6

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

# Obohacování prototypů

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

```js
Array.prototype.random = function() {
  let index = Math.random()*this.length
  return this[Math.floor(index)]
}
```

---

# ...

![Yoda](img/yoda.jpg){style="display:block;margin:auto;height:550px}

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
