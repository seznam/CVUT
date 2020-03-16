# KAJ 05: Ajax, XHR, HTTP a jejich kamarádi {data-audio=1}

---

# Obsah {data-audio=2}

  1. XHR a HTTP
  1. CORS
  1. Transportní formáty
  1. Relevantní drobnosti
  1. Web Sockets

---

# Ajax &ndash; motivace {data-audio=3}
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

# XMLHttpRequest

  - XMLHttpRequest je alfou a omegou pro bohaté webové aplikace
  - Možnost provést HTTP požadavek
  - Dočítání dat, odesílání informací
  - V moderních prohlížečích není nutná žádná abstrakce

---

# XMLHttpRequest API

```js
var xhr = new XMLHttpRequest();

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
  - `overrideMimeType()`

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

# Nuda!

<p style="text-align: center;"><span></span><img src="img/unicorn.png" alt="" /></p>

---

# Sandbox, Origin a CORS

  - XHR nelze poslat na jakékoliv URL
  - Kvůli bezpečnosti!
  - Protože součastí požadavku jsou cookies, HTTP autorizace, certifikáty&hellip;

---

# Cross-domain požadavky: potenciální riziko

```js
var xhr = new XMLHttpRequest();
xhr.open("get", "http://gmail.com/", true);
xhr.send();

xhr.onload = function() {
	alert(this.responseText);
}
```

---

# Sandbox: omezení originem

  - XHR jsou v základu omezeny jen na URL se stejným *originem*
  - origin = schema + host + port

---

# CORS: technika pro cross-origin XHR

  - Cross Origin Resource Sharing
  - Oslabuje sandbox tam, kde to nepředstavuje riziko
  - Myšlenka: zeptat se backendu, jestli je ochoten takovýto požadavek přijmout
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
  - Kompletní čtení na [http://enable-cors.org/](http://enable-cors.org/)

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

  - Populární textový formát ([http://json.org/](http://json.org/))
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
  - `eval` jako zpětná kompatibilita

---

# Transportní formáty: binárně

  - Lze, ale historicky je obtížné (cross-browser)
  - U XMLHttpRequest 2 lze přes `responseType` a `send(binaryData)`
  - V JS dlouho nebyl vhodný datový typ pro práci s binárními daty

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
/* odpověď serveru */
mojeFunkce({name: "jan", data: [3, 4, true]});
```

---

# fetch()

  - Nové, nedávno standardizované rozhraní
  - Podobné jako XMLHttpRequest, ale jednodušší
  - Asynchronní řízení pomocí *Promises*
  - K dispozici je [polyfill](https://github.com/github/fetch)

---

# fetch()

```js
fetch("/nejaky/soubor.json")
	.then(function(response) {
		if (response.status != 200) {
			console.log("HTTP status", response.status);
			return;
		}

		response.json().then(function(data) {
			console.log(data);
		});
	})
	.catch(function(err) {
		console.log("Error", err);
	});
```

---

# fetch vs XHR

  - Chybí `timeout` &rArr; lze implementovat ručně pomocí `setTimeout` a `abort()`
  - Chybí `abort()` &rArr; problém celého konceptu Promises
  - Objekt `AbortController` má výhledově řešit přerušitelné Promises, zatím jen fetch

---

# Doplňkové informace #1

  - Prohlížeče omezují počet současných XHR na stránku (zpravidla 4)
  - HTTP požadavek musí být iniciován klientem
  - Technika *long poll*/*comet*: pošlu HTTP požadavek; server odpoví, až bude mít data
  - Server takto může notifikovat, ale musí držet mnoho otevřených spojení

---

# Doplňkové informace #2

  - Velikost přenášených dat (a jejich formát a následné zpracování) může razantně ovlivňovat výkon aplikace
  - Ladění XHR vždy ve spolupráci s vyvojářskými nástroji prohlížeče
  - V případě nouze wireshark/tcpdump

---

# Web Sockets

  - Snaha o zpřístupnění duplexní komunikace v prohlížeči
  - Notifikace ze strany serveru
  - Persistentní spojení
  - Léta draftů
  - <a id="demo" href="http://bit.ly/1lBDw4W">bit.ly/1lBDw4W</a>

<style>
  #demo { font-size: 200%; }
</style>

---

# Web Sockets: princip

  - Trvale otevřené spojení na server
  - Možnost oboustranného posílání dat
  - Vlastní protokol postavený nad HTTP Upgrade
  - Žádná spojitost s BSD sockety

---

# Web Sockets: klientská část

```js
var socket = new WebSocket("ws://server.tld:1234/");

socket.onopen = function(e) {
	socket.send("data");
}

socket.onmessage = function(e) {
	alert(e.data);
	socket.close();
}
```

---

# Web Sockets: serverová část

  - Ta nás nezajímá!
  - Nutný specializovaný software
  - Knihovny pro řadu jazyků (PHP, Python, node.js, &hellip;)

---

# Web Sockets: protokol

  - Vlastní binární protokol
  - Komunikace začíná HTTP požadavkem s hlavičkou Upgrade
  - Zpětná kompatibilita s existujícími webovými servery
  - <del>CORS</del>

---

# Prostor pro otázky

![](img/ajax3.jpg){style="display:block;margin:auto;height:700px"}
