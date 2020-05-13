# KAJ 13: Modularizace v JS

---

# Obsah

  1. Modularizace (rozbití na menší části)
      1. Na úrovni souborů
      1. Na úrovni projektů/knihoven
  1. Bundling (spojení zpět pro ostrý provoz)

---


# Modularizace na úrovni souborů

  - Dlouhodobá neřest (klientského) JavaScriptu
  - Široké spektrum různých in-house řešení
  - Roztříštěný, komplikovaný ekosystém

---

# Historický rychlokurz: příručka k detekci

  - Klientský kód, pre-ES6: AMD / RequireJS
  - Serverový kód, pre-ES6: CommonJS
  - ES6: export/import
  - ELSE: nějaký proprietární dinosaurus

---

# Historický rychlokurz: AMD / RequireJS

```js
define("muj-widget",
	["dep1", "dep2"],
	function(dep1, dep2) { ... }
);
```

```js
require(["muj-widget"],
	function(mujWidget) { ... }
);
```

---

# Historický rychlokurz: AMD / RequireJS

  - `define` / `require`
  - AMD = *Asynchronous Module Definition*
  - Na první pohled asynchronní
  - Doplňková knihovna `require.js` implementuje vše potřebné

---

# Historický rychlokurz: CommonJS

```js
var fs = require("fs");
var lib1 = require("./lib/lib1");
var file = fs.openFile(lib1.name);

exports.result = magic(file);
```

---

# Historický rychlokurz: CommonJS

  - `require` / `exports`
  - Synchronní import
  - Možné jen v serverovém JavaScriptu
  - Předchází NodeJS (!)
  - Problém u kruhových závislostí
  - Extra komplexní otázka *identifikátorů modulů*

---

# CommonJS resolution algorithm

  - Cesty absolutní, s tečkou, ostatní
  - Možnost odkazovat adresář, JS či JSON soubor
  - Ostatní cesty hledány v `node_modules`
  - `node_modules` hledány v aktuálním projektu, v domovském adresáři, v operačním systému
  - Stále populární, ale [komplexní](https://ondras.zarovi.cz/slides/2016/devel/#17)

---

# Historický rychlokurz: ES6 modules

```js
import * as html from "./html.js";

let div = html.node("div");

export default div;
export const N = 8;
```

---

# Historický rychlokurz: ES6 modules

  - `import` / `export`
  - První (a poslední) standardizované rozhraní pro modularizaci
  - Statické závislosti (na úrovni syntaxe)
  - Specifikace již v ES6, realizace o mnoho později
  - Chrome 61, Firefox 60, Edge 16, Safari 10.1
  - I v moderním prohlížeči často nechceme dodávat kód dělený na soubory

---

# Modularizace na úrovni projektů/knihoven

  - Jak zapouzdřit projekt/knihovnu/modul?
  - Pro jaké prostředí balíčky vyrábíme (klient, server, service worker, nativní aplikace, &hellip;)?
  - Jak definovat autora, závislosti, licenci, non-JS soubory?
  - Jak tyto balíčky verzovat?
  - Kde tyto balíčky uchovávat a publikovat?

---

# Historický rychlokurz: Bower

  - [https://bower.io/](https://bower.io/)
  - Překonaný nástroj z roku 2012
  - Určený pro klientské balíčky
  - Charakteristický adresářem `bower_components`

---

# NPM

  - Node Package Manager
  - PHP: PEAR / Composer
  - Python: PyPI / pip
  - JavaScript: npm

---

# NPM

  - Součást serverového *embeddingu* NodeJS
  - Silně vázáno na CommonJS resolution algorithm
  - Vhodný pro serverový i klientský kód
  - K dispozici i veřejný repozitář balíčků

---

# package.json

  - Soubor s definicí metadat balíčku
  - [Ukázkový soubor](https://github.com/seznam/IMA.js-core/blob/f7c8ded69b98d6f5125291c91cc82e76fc75813b/package.json)
  - Zejména název a výčet závislostí
  - Verzování typu *SemVer*
  - Příkaz `npm init` vytvoří `package.json`

---

# NPM v akci

  - Při práci s npm je často uvažován *aktuální projekt*: nejbližší rodičovský adresář s `package.json`
  - `npm help`
  - `npm install`
  - `npm publish`
  - `npm start`

---

# npm install

  - Instalace balíčku (do aktuálního projektu, do domovského adresáře, do systému)
  - Bez parametrů instaluje závislosti aktuálního projektu
  - Volitelně zapsání balíčku do soupisu závislostí
  - Volitelně specifikace konkrétní verze balíčku
  - Automatické řešení závislostí

---

# npm publish

  - Nahrání aktuálního projektu do veřejného repozitáře
  - Nutnost vlastnictví účtu (na webu npmjs.com)
  - Kontrola existující verze
  - Důvod rychlé adopce NPM v JS ekosystému

---

# npm start

  - *Spuštění* aktuálního projektu
  - Význam spuštění lze definovat v `package.json`
  - `npm run foo` pro další případné úkony
  - Mantra NPM: `git clone; npm i; npm start`

---

# npm jako veřejný hosting?

  - GitHub (či jiné veřejné repozitáře) typicky nechtějí nabízet služby CDN
  - Pro on-line weby může být praktické *odkazovat* na knihovny
  - [UNPKG](https://unpkg.com/), [jsDelivr](https://www.jsdelivr.com/)

---

# NPM: Pozor na tranzitivní závislosti

```sh
$ create-react-app test
added 1324 packages in 50.211s

$ ls -1 node_modules/ | wc -l
951

$ du -sh
200M	.
```

[obrázek](https://thepracticaldev.s3.amazonaws.com/i/9i6bs4g6cx05jeagfhum.png)

---

# Bundling

  - Myšlenka: v rámci preprocessingu z mnoha souborů vyrobit jeden
    - (CSS preprocesory to tak dělají již dlouho)
  - Vyřešení závislostí před spuštěním
  - Google Closure Compiler, Webpack, Browserify, Rollup
  - Stále vznikají nové nástroje

---

# Rollup

  - Nástroj pro bundling modulů
  - K dispozici v NPM
  - Možnost použití i jako plugin pro komplikovanější preprocessing

---

# Rollup

```sh
$ npm i -D rollup
```

```js
// main.js
import * as lib from "./lib.js";
console.log(lib.A);
```

```js
// lib.js
export const A = 3;
export const B = 4;
```

---

# Rollup

```sh
$ node_modules/.bin/rollup -f iife main.js

(function () {
	'use strict';

	const A = 3;

	console.log(A);

}());
```

---

? {.questions}
