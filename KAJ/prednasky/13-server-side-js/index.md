# KAJ 13: JavaScript na serveru

---

# Obsah

1. Motivace a status quo
1. Koncepty server-side JS
1. Příklady Node.js
1. Příklady Deno

---

# Motivace

- Proč by měl být JS k dispozici jen v prohlížeči?
- Paradigma asynchronního I/O na serveru
- Sdílení kódu
- *Snadnost* rozšířeného jazyka

---

# Status quo

![](img/node-deno.png) {.node-deno}

---

# Status quo: Node.js a Deno

![](img/node-deno-2.png) {.node-deno}

---

# Koncepty server-side JS

- Implementací je více; zde focus jen na dvě
- Interpret vs. *embedding*
- Univerzálnost, boom JS-based toolingu
  - CLI nástroje
  - HTTP/TCP servery

---

# Kdo standardizuje serverová APIs?

---

# Kdo standardizuje serverová APIs?

Nikdo!

---

# Nejednotnost serverových APIs

- Přenositelnost kódu
- Správa závislostí
- Publikace hotových produktů (knihoven)

---

# Node.js

- 2009, Ryan Dahl
- C++, V8
- Z pohledu klientského JS velmi starý
- Custom-based modularizace (*CommonJS modules*)
- Pre-Promise APIs
- Ruku v ruce s NPM

---

# Node.js: ukázka 1

```js
// index.js
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader("content-type", "text/html")
  res.end("Hello, World!")
})

server.listen(3000)
```

```sh
node index.js
```

---

# Node.js: ukázka 2

```js
let fs = require("fs")

fs.readFile("/tmp/test.txt", (err, data) => {
  if (err) { console.error(err) } else { console.log(data) }
})

let data = fs.readFileSync("/tmp/test.txt")
console.log(data)

fs = require("fs/promises")
fs.readFile("/tmp/text.txt").then(console.log, console.error)
```

---

# Node.js: správa závislostí

```js
// lib.js
exports.add = function(a, b) { return a+b }

// main.js
let add = require("./lib.js").add

let sub = require("sub").sub  // odkud?
```

Ne-relativní závislosti jsou vyhledávány komplikovaným způsobem

---

# Node.js: npm

Instalace do `node_modules` (pro následné `require`):
```sh
npm i jmeno-knihovny
```

Definice závislosti v `package.json`:
```json
{
  "dependencies": {
    "jmeno-knihovny": "^1.2.0"
  }
}
```

Instalace všech závislostí z `package.json`:
```sh
npm i
```

---

# Node.js: npm

Nástroj `npm` (Node Package Manager) je nedílnou součástí ekosystému Node.js

- Instalace závislostí
- Správa verzí
- Pouštění testů
- Pouštění tzv. *skriptů*
- Publikace do (veřejného) repozitáře

---

# Deno

- 2018, Ryan Dahl (!)
- Rust, V8
- *Jako Node.js, ale lepší*
  - Single binary
  - Žádný `package.json`
  - Podpora pro TypeScript
  - Snaha o znovupoužití klientských APIs

---

# Deno: ukázka 1

```js
// index.js
import { serve } from "https://deno.land/std@0.180.0/http/server.ts";

serve(request => {
  let headers = { "content-type": "text/html" }
  return new Response("Hello, World!", {headers})
}, {port: 8080})
```

```sh
deno run --allow-net index.js
```

---

# Deno: ukázka 2

Ne-standardní serverová API v namespace `Deno.*`

```js
let data = await Deno.readFile("/tmp/text.txt")
console.log(data)

data = Deno.readFileSync("/tmp/text.txt")
alert(data)
```

---

# Deno: správa závislostí

...pomocí ES6 modulů

```js
// lib.js
export function add(a, b) { return a+b }

// main.js
import { add } from "./lib.js"

import { someLibrary1 } from "https://deno.land/std/..."

import { someLibrary2 } from "https://deno.land/x/..."
```

---

# Deno: deno.land/std a deno.land/x

- Hosting Deno modulů
- Automaticky generovaná dokumentace
- /std: standardní knihovna
- /x: veřejný hosting
  - bez přímé interakce; synchronizace s GitHub repozitářem

---

# Deno Deploy

- Hosting Deno skriptů
  - z GitHubu či z lokálního počítače
- Spouštění *on demand* (v rámci HTTP požadavku na doménu `projekt.deno.dev`)
- Běh v desítkách lokalit po celém světě

---


# Prostor pro otázky
