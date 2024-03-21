# KAJ 05: Ajax, XHR, HTTP a jejich kamarádi

---

# Obsah

  1. XHR, fetch a HTTP
  1. CORS
  1. Transportní formáty
  1. Relevantní drobnosti
  1. Web Sockets

---

# Ajax &ndash; motivace
<p style="text-align: center; height:70%">
  <img style="height:100%; margin-right:1em" src="img/ajax1.jpg" alt="Ajax" />
  <img style="height:100%" src="img/ajax2.jpg" alt="Ajax" />
</p>

---

# Ajax

  - Asynchronous JavaScript and XML
  - Označení zpravidla používána chybně
  - Požadavky nemusí být asynchronní
  - Přenášet se dá cokoliv (nejen XML)

---

# XMLHttpRequest / fetch

  - HTTP klient (XMLHttpRequest / fetch) je alfou a omegou pro bohaté webové aplikace
  - Možnost provést HTTP požadavek
  - Dočítání dat, odesílání informací

---

# XMLHttpRequest API

```js
let xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", /* ... */);
xhr.addEventListener("load", /* ... */);

xhr.open(metoda, url, async);
xhr.send(data);
```

---

# XMLHttpRequest API

  - Lze použít jakoukoliv HTTP metodu
  - Synchronní požadavek blokuje vykreslovací vlákno
  - URL požadavku podstupuje kontrolu *originu* (viz dále)
  - Použití `onload` vs. `addEventListener` jako u běžných DOM událostí

---

# XMLHttpRequest API: doplňková funkcionalita

  - `setRequestHeader(name, value)`
  - `getResponseHeader(name)`, `getAllResponseHeaders()`
  - `abort()`

---

# XMLHttpRequest API: vlastnosti a data odpovědi

  - `xhr.readyState` je stav požadavku (4 = hotovo)
  - `xhr.status` je HTTP kód odpovědi (200 = OK)
  - `xhr.responseText` jsou data odpovědi
  - `xhr.responseXML` jsou data odpovědi ve formátu XML, jsou-li k dispozici

---

# XMLHttpRequest 2

  - Rozšíření se zpětně kompatibilním API
  - Události *progress</em>, <em>load</em>, <em>error</em>, <em>abort*
  - To samé na objektu `xhr.upload`
  - `xhr.responseType` = "arraybuffer", "blob", "document", "json", "text"
  - `xhr.response`

---

# fetch()

  - Zatím nejnovější HTTP rozhraní
  - Podobné jako XMLHttpRequest, ale jednodušší
  - Asynchronní řízení pomocí *Promises*
  - K dispozici je [polyfill](https://github.com/github/fetch)
  - Rozdělení na dva asynchronní kroky: hlavičky odpovědi, tělíčko odpovědi

---

# fetch()

```js
fetch("/nejaky/soubor.json")
	.then(function(response) {
		if (response.status != 200) {
			console.log("HTTP status", response.status)
			return
		}

		response.json().then(function(data) {
			console.log(data)
		})
	})
	.catch(function(err) {
		console.log("Error", err)
	})
```

---

# fetch()

Úsporněji pomocí arrow functions

```js
fetch("/nejaky/soubor.json")
	.then(response => {
		if (response.status != 200) {
			console.log("HTTP status", response.status)
			return
		}

		response.json().then(data => console.log(data))
	})
	.catch(err => console.log("Error", err))
```

---

# fetch()

Úsporněji pomocí async/await

```js
try {
  let response = await fetch("/nejaky/soubor.json")
  if (response.status != 200) {
    return console.log("HTTP status", response.status)
  }

  let data = await response.json()
  console.log(data)
} catch (err) {
  console.log("Error", err)
}
```

---

# Konfigurace fetch()

```js
fetch(url,  {
  method: "POST",
  headers: { /* ... */ },
  body: ...,
  redirect: "follow",
  signal: ...,
  ...
})
```

---

# Objekt Response

https://developer.mozilla.org/en-US/docs/Web/API/Response

```js
let response = await fetch("/")

response.url            // string
response.status         // number
response.headers        // objekt s hlavičkami
response.body           // stream
response.text()         // Promise
response.json()         // Promise
response.arrayBuffer()  // Promise
```

---

# fetch vs XHR

  - Chybí `abort()` &rArr; lze vyřešit pomocí `new AbortController().signal`
  - Chybí `timeout` &rArr; lze vyřešit pomocí `AbortSignal.timeout()`

---

# Nuda!

<p style="text-align: center;"><span></span><img src="img/unicorn.png" alt="" /></p>

---

# Sandbox, Origin a CORS

  - XHR/fetch nelze poslat na jakékoliv URL
  - Kvůli bezpečnosti!
  - Protože součastí požadavku jsou cookies, HTTP autorizace, certifikáty&hellip;

---

# Cross-domain požadavky: potenciální riziko

```js
let xhr = new XMLHttpRequest()
xhr.open("get", "http://gmail.com/", true)
xhr.send()

xhr.onload = function() {
	alert(this.responseText)
}
```

---

# Sandbox: omezení originem

  - HTTP požadavky jsou v základu omezeny jen na URL se stejným *originem*
  - origin = schema + host + port

---

# CORS: technika pro cross-origin HTTP

  - Cross Origin Resource Sharing
  - Oslabuje sandbox tam, kde to nepředstavuje riziko
  - Myšlenka: zeptat se backendu, jestli je ochoten takovýto požadavek přijmout
    - resp. jestli souhlasí s *prozrazením* odpovědi do aplikačního JS
  - Pokud ne (default), odpověď se zahodí
  - Pokud ano, odpověď se vrátí

---

# CORS: implementace

  - HTTP hlavička požadavku `Origin`
  - Podpora inzerovaná v hlavičce odpovědi `Access-Control-Allow-Origin`
  - Požadavek se **vždy** provede
  - U složitějších požadavků (file upload, DELETE, &hellip;) je realizace podstatně složitější (*preflight*)

---

# CORS: poznámky

  - Autor veřejného API by měl posílat `Access-Control-Allow-Origin`
  - Nouzové řešení je server-side proxy (stejný origin)
  - Kompletní čtení na [https://enable-cors.org/](https://enable-cors.org/)

---

# Cross-domain bez XHR?

  - Odbočka pro zvídavé
 ```html
<img src="http://gmail.com/" />
<form method="post" action="http://gmail.com/sendEmail" />
```
  - Nelze získat data odpovědi
  - Formulářový útok je CSRF

---

# Nuda!

<p style="text-align: center;"><span></span><img src="img/monkey.png"  alt="" /></p>

---

# Transportní formáty

  - Data lze posílat v mnoha formátech
  - Žádný není nejlepší
  - Upload zpravidla neřešíme
  - Download podle potřeby

---

# Transportní formáty: plain text
(to není žádný formát)

---

# Transportní formáty: XML

  - Odpověď musí být validní XML
  - Odpověď musí mít platný XML mime type (nebo overrideMimeType)
```js
xhr.responseXML instanceof DOMDocument
```
  - Dotazování přes DOM nebo XPath

---

# Transportní formáty: JSON

  - Populární textový formát ([https://json.org/](https://json.org/))
  - Podmnožina JavaScriptu
  - Řetězce, čísla, bool, pole, struktury, null
  - Absence speciálních číselných hodnot, undefined, Date, RegExp

---

# Transportní formáty: JSON

```js
{
	"name": "jan",
	"data": [3, 4, true]
}
```

  - Klíče musí být ohraničeny úvozovkami
  - `JSON.parse` a `JSON.stringify`

---

# Transportní formáty: binárně

  - Lze, ale historicky je nezvyklé (cross-browser)
  - U XMLHttpRequest 2 lze přes `responseType` a `send(binaryData)`
  - fetch() pomocí `Response.prototype.arrayBuffer()`
  - V JS dlouho nebyl vhodný datový typ pro práci s binárními daty
  - [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), [Typed Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

---

# JSONP

  - NENÍ transportní formát
  - Úplně jiná technika přenosu dat
  - Způsob obcházení cross-origin restriction

---

# JSONP: ukázka
```html
<!-- vložit do dokumentu -->
<script src="http://api.com/service?callback=mojeFunkce"></script>
```

```js
// odpověď serveru
mojeFunkce({name: "jan", data: [3, 4, true]})
```

---

# Transportní formáty: GraphQL

  - https://graphql.org/
  - Jazyk pro popis, dotazování a úpravy (mutace) dat
  - Facebook, zveřejněno 2015

```graphql
{
  users {
    id
    name
    salary
    boss {
      id
      name
    }
  }
}
```

---

# GraphQL

  - Značný odklon od předchozího populárního schématu (REST)
    - URL je jen jedno a není zajímavé
  - Majitel grafu dat publikuje schéma (typy a závislosti)
  - Dotaz definuje podmnožinu grafu
  - Odpověď (vždy JSON) obsahuje jen vyjmenovaná pole

---

# GraphQL

  - Introspekce! Viz např. https://graphql.org/swapi-graphql
  - Dotazy jsou často velké &rArr; jakou volit HTTP metodu?
  - Dotazy možno parametrizovat:

```graphql
{
  users(id: 123) {
    id
    name
    salary
  }
}
```

---

# Doplňkové informace #1

  - Prohlížeče omezují počet současných spojení na doménu (zpravidla 4)
  - HTTP požadavek musí být iniciován klientem
  - Technika *long poll*/*comet*: pošlu HTTP požadavek; server odpoví, až bude mít data
  - Server takto může notifikovat, ale musí držet mnoho otevřených spojení

---

# Doplňkové informace #2

  - Velikost přenášených dat (a jejich formát a následné zpracování) může razantně ovlivňovat výkon aplikace
  - Ladění HTTP vždy ve spolupráci s vyvojářskými nástroji prohlížeče
  - V případě nouze wireshark/tcpdump

---

# Web Sockets

  - Snaha o zpřístupnění duplexní komunikace v prohlížeči
  - Notifikace ze strany serveru
  - Persistentní spojení
  - Léta draftů
  - [Just Spaceships](https://ondras.zarovi.cz/games/just-spaceships/)
  - [Railroad Ink](https://ondras.github.io/rri/)

---

# Web Sockets: princip

  - Trvale otevřené spojení na server
  - Možnost oboustranného posílání dat
  - Vlastní protokol postavený nad HTTP Upgrade
  - Žádná spojitost s BSD sockety

---

# Web Sockets: klientská část

```js
let socket = new WebSocket("ws://server.tld:1234/")

socket.onopen = function(e) {
	socket.send("data")
}

socket.onmessage = function(e) {
	alert(e.data)
	socket.close()
}
```

---

# Web Sockets: serverová část

  - Ta nás nezajímá!
  - Nutný specializovaný software
  - Knihovny pro řadu jazyků (PHP, Python, Node.js, &hellip;)

---

# Web Sockets: protokol

  - Vlastní binární protokol
  - Komunikace začíná HTTP požadavkem s hlavičkou Upgrade
  - Zpětná kompatibilita s existujícími webovými servery
  - <del>CORS</del>

---

# Prostor pro otázky

![](img/ajax3.jpg){style="display:block;margin:auto;height:700px"}
