# KAJ 13

## JavaScript mimo prohlížeč
## TypeScript

---

# Obsah

1. JavaScript mimo prohlížeč, proč?
1. Koncepty server-side JS
1. Příklady Node.js
1. Koncepty TS
1. Příklady Deno

---

# Motivace

- Proč by měl být JS k dispozici jen v prohlížeči?
- Paradigma asynchronního I/O na serveru
- Sdílení kódu
- *Snadnost* rozšířeného jazyka

---

# Status quo

![](img/node-deno-1.png) {.node-deno}

---

# Status quo: Node.js a Deno

![](img/node-deno-2.png) {.node-deno}

---

# Status quo: Node.js a Deno a Bun

![](img/node-deno-3.png) {.node-deno}

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

# TypeScript

- Microsoft, 2012 (Anders Hejlsberg)
- Nadmnožina syntaxe JS
- Nejen formální specifikace jazyka!
  - Také oficiální kompilátor
  - Také typové informace k populárním knihovnám 3. stran
  - Také tooling pro editory/IDE
  - Také zázemí a podpora silné společnosti
- Projekt stále aktivně rozvíjen

---

# TypeScript

https://www.typescriptlang.org/

```ts
function add(a: number, b: number) {
	return a+b
}

add(1, "2")
```

```
> Argument of type 'string' is not assignable to parameter of type 'number'.
```

---

# Životní cyklus TS kódu

1. tvorba a údržba
    - užitečná podpora v editoru/IDE
1. kontrola a kompilace
    - zahrnuje odstranění nadbytečných (typových) informací
1. běh
    - žádný TS, jen JS

---

# Syntaxe a vlastnosti jazyka

Typy proměnných, parametrů a návratových hodnot

```ts
function compare(a: number, b: number): string {
	let result: string = ""
	result = a > b ? ">" : "<"
	return result
}
```

---

# Syntaxe a vlastnosti jazyka

Pole, struktury, volitelné klíče

```ts
let numbers1: number[] = [1, 2, 3]
let numbers2: Array<number> = [4, 5, 6]

interface Person {
	name: string
	surname?: string
}

let p1: Person = { name: "Eva" }
let p2: Person = { name: "Jiří", surname: "Novák" }
```

---

# Syntaxe a vlastnosti jazyka

Sjednocení typů

```ts
function greet(who: string | Person) {
	if (typeof(who) == "string") {
		alert(who)
	} else {
		alert(who.name)
	}
}
```

---

# Syntaxe a vlastnosti jazyka

Generika (parametrické typy)

```ts
function first<T>(arr: T[]) {
	return arr[0]
}
let num = first([1, 2, 3])

let button = document.createElement("button")
button.value = "name"

let span = document.createElement("span")
span.value = "name" // Property 'value' does not exist on type 'HTMLSpanElement'
```

---

# Syntaxe a vlastnosti jazyka

Externí typové deklarace

```ts
declare function sum(a: number, b: number): number;
```

- Uložit do souboru `foo.d.ts`
- Automaticky použito při načtení `foo.js`
- Poskytnutí typů *bokem* tam, kde nemůžeme nebo nechceme zasahovat do existujícího kódu
- Typicky pro externí knihovny

---

# TSC

- TypeScript Compiler
- Referenční implementace
- Typicky dostupný z NPM
  - `npm install -g typescript`
  - https://www.typescriptlang.org/play

---

# TSC: Role

- Kontrola
  - jednorázová, typicky vyvolaná vývojářem
- Komplilace
  - odstranění typových anotací
  - **výjimečně** doplnění nového runtime kódu
  - transpilace
- Kontrola
  - průběžná, typicky iniciovaná editorem
  - API pro komunikaci editor &harr; tsc (Language Server)

---

# TSC a JS

TSC dává smysl i při psaní běžného JavaScriptu!

- Silný systém **typové inference**
- Alternativně podpora typování pomocí dokumentačních komentářů (JSDoc)
- Ideální pro inkrementální zavádění TS

---

# TSC: Konfigurace

TSC je ultimátní nástroj pro TS, vybavený spoustou konfigurovatelných nastavení.

- Míra striktnosti
- Závažnost jednotlivých chyb
- Kterým souborům/adresářům se věnovat
- Module resolution
- Verze výstupní syntaxe
- Doplňkové kontroly (nepoužité proměnné, switch fallthrough, nedostupný kód&hellip;)

---

# TSC: Použití

tsconfig.json:
```json
{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": true,
    "removeComments": true
  },
  "files": ["app.ts", "lib.ts"]
}
```

```sh
$ tsc -p tsconfig.json
```

---

# TSC: Doplňkové informace

- Stejná verze a konfigurace pro editor a kompilaci/bundling
- Někdy obtížná spolupráce s knihovním kódem
- Někdy obtížná spolupráce s různými formami modularizace (globals / require / import)

---

# Další implementace

- TSC je velký a silný nástroj&hellip;
- &hellip;a je také přiměřeně pomalý
- Existují alternativní implementace pro TS kompilaci (nikoliv však pro typovou kontrolu)
  - [ESBuild](https://esbuild.github.io/) (Go)
  - [SWC](https://swc.rs/) (Rust)

---

# Deno

- 2018, Ryan Dahl (!)
- Rust, V8
- *Jako Node.js, ale lepší*
  - Single binary
  - Žádný `package.json`
  - Podpora pro TypeScript (SWC)
  - Snaha o znovupoužití klientských APIs

---

# Deno: ukázka 1

```js
// index.js
import { serve } from "https://deno.land/std@0.180.0/http/server.ts"

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

Ne-standardní API v namespace `Deno.*`

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
- [Ukázka](https://praguejs.deno.dev/), její [zdrojový kód](https://github.com/ondras/deno-praguejs-demo)

---

# Deno KV

- Hostovaná key-value databáze
  - funguje lokálně (sqlite) i na Deploy (napříč datacentry)

```ts
interface Properties { name: string }
let kv = await Deno.openKv()

let userId = 123
let key = ["users", userId, "properties"]
await kv.set(key, {name:"John"})

const iterator = kv.list<Properties>({ prefix: ["users"] })
for await (const user of iterator) {
  console.log(user.key)    // ["users", 123, "properties"]
  console.log(user.value)  // {name:"John"}
}
```

---

# Souhrn

Skvělé časy pro JS, v prohlížeči i mimo!

- Komunita se předhání v množství knihoven a modulů
- Tři+ [soupeřící](https://deno.com/benchmarks) implementace
- Konvergence APIs v souladu s klientským standardizačním procesem

---

# Další čtení

- [What's up, Deno?](https://slideslive.com/39000550/what-s-up-deno)
- [10 Things I Regret About Node.js - Ryan Dahl](https://www.youtube.com/watch?v=M3BM9TB-8yA)
- [Node.js documentation](https://nodejs.org/en/docs)
- [Bun.sh](https://bun.sh/)

---

# Prostor pro otázky
