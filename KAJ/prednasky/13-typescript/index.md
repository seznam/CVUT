# KAJ 13: TypeScript

---

# Obsah

1. Preprocessing JS a TypeScript
1. Hlavní vlastnosti a syntaxe
1. TSC
1. Další implementace a užití

---

# Preprocessing JS

- Populární cca 2005-2015
- Doplnění/vylepšení syntaxe: CoffeeScript, ClojureScript, Elm, BuckleScript&hellip;
- Doplnění typových informací: Flow, TypeScript
  - Úkol: statická typová kontrola

---

# TypeScript

- Microsoft, 2012 (Anders Hejlsberg)
- Nadmnožina syntaxe JS
- Nejen formální specifikace jazyka!
  - Také oficiální kompilátor
  - Také typové informace k populárním knihovnám 3. stran
  - Také tooling pro editory/IDE
  - Také zázemí a podpora silné společnosti
- Projekt stále rozvíjen

---

# TypeScript

https://www.typescriptlang.org/

```ts
function add(a: number, b: number) {
	return a+b;
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
	let result: string = "";
	result = a > b ? ">" : "<";
	return result;
}
```

---

# Syntaxe a vlastnosti jazyka

Pole, struktury, volitelné klíče

```ts
let numbers1: number[] = [1, 2, 3];
let numbers2: Array<number> = [4, 5, 6];

interface Person {
	name: string;
	surname?: string;
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
  - volitelně transpilace
- Kontrola
  - průběžná, typicky iniciovaná editorem
  - API pro komunikaci editor &harr; tsc (Language Server)

---

# TSC a JS

TSC dává smysl i při psaní běžného JavaScriptu!

- Silný systém typové inference
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

- Server-side TypeScript
- Kombinace V8 a SWC
- "Přímé" vykonávání serverového TS kódu
  - Alternativa: TSC + Node.js
  - Řada dalších odlišností/vylepšení v porovnání s Node.js
- https://deno.land/

---

# Prostor pro otázky
