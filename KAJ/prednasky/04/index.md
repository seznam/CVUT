# KAJ 04

## Iterace, DOM, události

---

# JS: iterace struktur/objektů

```js
let data = {
	jmeno: "Eva",
	prijmeni: "Stará",
	vek: 74
};

for (let p in data) {
	console.log(p); // "jmeno", "prijmeni", "vek"
}
```

---

# JS: iterace polí

```js
let data = [15, "babicka", true];

// spravne
for (let i=0; i<data.length; i++) {
	console.log(i); // 0, 1, 2
	console.log(data[i]); // 15, "babicka", true
}

// spatne – ale proc?
for (let p in data) {
	console.log(p); // 0, 1, 2
}
```

---

# JS: iterace polí

  - Cyklus `for-in` *občas* funguje
  - Ale někdy vyústí v nečekané (nesprávné) výsledky
  - Jde totiž o výčet klíčů &rArr; a těch může být jiný počet, než hodnot
     - *sparse arrays:* `new Array(10)`
     - obohacená pole: `Array.prototype.X = ...`

---

# JS: funkcionální iterace

  - Přístup známý z tzv. funkcionálního programování
  - Aplikace uživatelem zadané funkce na (některé) položky pole
  - V řadě případů kratší / expresivnější zápis
  - Obliba použití roste s ES6 (třetí přednáška)
  - Kompletní <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods">dokumentace na MDN</a>
  - FIXME this

---

# JS: funkcionální iterace I

```js
let data = [15, "babicka", true];

// anonymni funkce
data.forEach(function(item, index) {
	console.log(item); // 15, "babicka", true
});

// pojmenovana funkce
function log(item, index) {
	console.log(index);
}
data.forEach(log); // 0, 1, 2
```

---

# JS: funkcionální iterace II

```js
let data = [1, 2, 3];

function square(x) { return x*x; }
let data2 = data.map(square); // 1, 4, 9

function odd(x) { return x % 2; }
let data3 = data.filter(odd); // 1, 3
```

---

# JS: funkcionální iterace III

```js
let data = [1, 2, 3];

function odd(x) { return x % 2; }
data.every(odd);  // false
data.some(odd);   // true

function add(x, y) { return x+y; }
data.reduce(add); // 6
```

---

# Iterators + for..of

  - Programovatelná iterovatelnost
  - Cokoliv, co má metodu `next` je iterátor
  - Cokoliv, co má symbol `Symbol.iterator` je iterovatelné cyklem `for..of`

```js
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1
    return {
      next() {
        [pre, cur] = [cur, pre + cur]
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
  if (n > 1000) break
  console.log(n)
}
```

---

# Vestavěné iterátory

```js
for (let x of [1, 2, 3]) { console.log(x) }

let map = new Map()
map.set("x", "y")
for (let entry of map) {
  console.log(entry)   // ["x", "y"]
}
```

---

# Vybrané partie DOM API

  - Funkce, konstanty a objekty pro manipulaci se stránkou
  - Zpravidla dostupné pomocí (globální) proměnné `document`
  - John Resig: <a href="http://ejohn.org/blog/the-dom-is-a-mess/">The DOM is a mess</a>

---

# DOM: úpravy podstromu

```js
let p = document.querySelector("p");

// HTML parser, pozor na XSS!
p.innerHTML = "<strong>toto je test</strong>";

// jen text
p.textContent = "<strong>toto je test</strong>";
```

---

# DOM: tvorba nových prvků

```js
let p = document.querySelector("p");

let strong = document.createElement("strong");
p.appendChild(strong);

let text = document.createTextNode("toto je test");
p.appendChild(text);

let input = document.createElement("input");
input.type = "number";
input.id = "foo";
```

Metody `createTextNode`, `appendChild` (a jejich sourozenci) dnes patří spíš do muzea.

---

# DOM: "nové" rozhraní ParentNode

...i DOM prochází průběžnou modernizací.

```js
let p = document.querySelector("p");

let strong = document.createElement("strong");
p.append("AAA", strong, "BBB");

p.prepend(strong, "test");

console.log(p.children); // pouze značky, nikoliv text
```

---

# DOM: "nové" rozhraní ChildNode

```js
let p1 = document.querySelector("p");
p1.remove();

let p2 = document.querySelector("p");
p2.replaceWith(p1, "test");

p2.before("AAA", "BBB", p3);
p2.after("AAA", "BBB", p3);
```

---

# DOM: práce s atributem `class`

```js
let p = document.querySelector("p");

p.className = "class1";

p.classList.add("class2");
p.classList.remove("class3");
p.classList.contains("class2"); // true

p.classList.toggle("class4");
p.classList.toggle("class4", x > 15);
```

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

# data-* atributy

FIXME
