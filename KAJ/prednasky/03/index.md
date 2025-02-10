# KAJ 03

## Event loop, asynchronní zpracování

---

# Obsah

  1. Události: opáčko
  1. Události: objekt události
  1. Události: capture a bubble
  1. Události: posluchače
  1. Asynchronní zpracování
  1. Promises a dále

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
let iterator = generator();
iterator.next().value; // 3, next() vrací i done:true/false
iterator.next().value; // 9
iterator.next().value; // 27

for (let val of generator()) { console.log(val) }
```

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

# Prostor pro otázky

? { .questions }
