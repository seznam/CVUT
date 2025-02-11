# KAJ 03

## Asynchronní zpracování, iterace

---

# Obsah

  1. Asynchronní zpracování
  1. Promises a dále
  1. Iterace

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
    - AKA asynchronní, AKA neblokující
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
class Animal {
  constructor() {
    setTimeout(this.eat, 3000)
  }

  eat() {
    this.food += 3
  }
}
```

---

# Zpožděné vykonávání: this v callbacku

`bind` pomůže

```js
class Animal {
  constructor() {
    setTimeout(this.eat.bind(this), 3000)
  }

  eat() {
    this.food += 3
  }
}
```

---

# Zpožděné vykonávání: this v callbacku

`arrow function` pomůže

```js
class Animal {
  constructor() {
    setTimeout(() => this.eat(), 3000)
  }

  eat() {
    this.food += 3
  }
}
```

---

# Zpožděné vykonávání: requestAnimationFrame

  - `setTimeout` zní jako rozumné řešení pro JS animace
  - `requestAnimationFrame` je výrazně vhodnější alternativa
```js
requestAnimationFrame(function() {
  // animujeme...
})
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
)
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
})
return promise
```

---

# Promises: tvorba a změna stavu

`withResolvers:` novinka z roku 2024

```js
let { promise, resolve, reject } = Promise.withResolvers()
if (...) {
  resolve(value)
} else {
  reject(error)
}
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
})
```

---

# async/await může mást

Nalezněte chybu v tomto kódu:

```js
form.addEventListener("submit", async e => {
  let ok = await checkUsernameAvailable()
  if (!ok) { e.preventDefault() }
})
```

---

# async/await může mást

Nalezněte chybu v tomto kódu:

```js
form.addEventListener("submit", e => {
  checkUsernameAvailable().then(ok => {
    if (!ok) { e.preventDefault() }
  })
})
```

---

# Iterace struktur/objektů

```js
let data = {
	jmeno: "Eva",
	prijmeni: "Stará",
	vek: 74
}

for (let p in data) {
	console.log(p) // "jmeno", "prijmeni", "vek"
}
```

---

# Iterace polí

```js
let data = [15, "babicka", true]

// spravne
for (let i=0; i<data.length; i++) {
	console.log(i) // 0, 1, 2
	console.log(data[i]) // 15, "babicka", true
}

// spatne – ale proc?
for (let p in data) {
	console.log(p) // 0, 1, 2
}
```

---

# Iterace polí

  - Cyklus `for-in` *občas* funguje
  - Ale někdy vyústí v nečekané (nesprávné) výsledky
  - Jde totiž o výčet klíčů &rArr; a těch může být jiný počet, než hodnot
     - *sparse arrays:* `new Array(10)`
     - obohacená pole: `Array.prototype.X = ...`

---

# Funkcionální iterace

  - Přístup známý z tzv. funkcionálního programování
  - Aplikace uživatelem zadané funkce na (některé) položky pole
  - V řadě případů kratší / expresivnější zápis
  - Kompletní <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods">dokumentace na MDN</a>
  - Hodnota `this` v callbacku je určena jako druhý parametr iterační metody

---

# Funkcionální iterace I

```js
let data = [15, "babicka", true]

// anonymni funkce
data.forEach(function(item, index) {
	console.log(item)  // 15, "babicka", true
})

// pojmenovana funkce
function log(item, index) {
	console.log(index)
}
data.forEach(log)    // 0, 1, 2
```

---

# Funkcionální iterace II

```js
let data = [1, 2, 3]

function square(x) { return x*x }
let data2 = data.map(square)  // 1, 4, 9

function odd(x) { return x % 2 }
let data3 = data.filter(odd)  // 1, 3

function testThis(x) { console.log(x, this) }
let obj = {}
data.forEach(odd, obj)        // this = obj
```

---

# Funkcionální iterace III

```js
let data = [1, 2, 3]

function odd(x) { return x % 2 }
data.every(odd)  // false
data.some(odd)   // true

function add(x, y) { return x+y }
data.reduce(add) // 6
```

---

# Programovatelná iterovatelnost

  - Cokoliv, co má metodu `next` je iterátor
  - Cokoliv, co má symbol `Symbol.iterator` (viz minulou přednášku) je iterovatelné cyklem `for..of`

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

# Generators

- Speciální druh funkce
- Návratovou hodnotou je iterátor
  - lze použít cyklus `for..of`
- Klíčové slovo `yield` odpovídá přerušení po jedné iteraci

```js
let generator = function*() {
  let tmp = 1
  while (true) {
    tmp *= 3
    yield tmp
  }
}
```

---

# Generators

- Speciální druh funkce
- Návratovou hodnotou je iterátor
  - lze použít cyklus `for..of`
- Klíčové slovo `yield` odpovídá přerušení po jedné iteraci

```js
let iterator = generator()
iterator.next().value // 3, next() vrací i done:true/false
iterator.next().value // 9
iterator.next().value // 27

for (let val of generator()) { console.log(val) }
```

---

# Prostor pro otázky

? { .questions }
