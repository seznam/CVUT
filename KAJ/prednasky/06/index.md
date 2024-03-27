# KAJ 06: CSS3

---

# Obsah

  1. Vývoj CSS
  1. Selektorový jazyk
  1. Generovaný obsah
  1. Media queries a responsive design
  1. CSS Layers (AKA *jak se stát milionářem*)
  1. Preprocessing

---

# Vývoj CSS

  - CSS 1 v roce 1994
  - CSS 2 v roce 1998 &ndash; příliš ambiciózní (stíny, průhlednost, &hellip;)
  - CSS 2.1 (2004&ndash;2011) reviduje nepodporované vlastnosti; celkem 115 definovaných vlastností
  - CSS 3 &ndash; modularizace (přes padesát modulů), přes 500 vlastností

---

# Podpora CSS 3

  - Velmi výrazně odlišná napříč prohlížeči
  - [caniuse.com](http://caniuse.com/)
  - Důvod pro používání *bleeding edge* verzí

---

# Selektorový jazyk &ndash; rekapitulace

  - Selektor = řetězec, kterému může vyhovovat libovolné množství prvků v HTML stránce
  - Při změně stránky (DOM) se mění množina prvků, vyhovujících selektorům &rArr; nutnost znovuvyhodnocení
  - Stavební kameny selektorového jazyka: názvy značek, kombinační znaky, atributové filtry
  - Chytré selektory dovolují čistější kód a [snižují nutnost JavaScriptu](http://jsfiddle.net/ondras/oz18b7r0/)

---

# Selektorový jazyk &ndash; co nelze?

Obecně není možné vytvářet selektory, pro jejichž vyhodnocení potřebujeme znát stav či vlastnosti uzlů až **za** právě vyhodnocovaným uzlem (při procházení do hloubky).

Valná většina selektorů se tedy týká uzlů samotných, jejich rodičů či předchůdců.

Toto pravidlo ~~bude v budoucnu~~ je porušováno teprve plnou podporou selektoru `:has`.

---

# Selektorový jazyk &ndash; základy

  - Název značky = všechny uzly tohoto typu
  - Čárka = sjednocení
  - Hvězdička = všechny uzly

```css
div   { /* ... */ }
a, em { /* ... */ }
*     { /* ... */ }
```
---


# Selektorový jazyk &ndash; základy

  - Mezera = hierarchický vztah, čteno zprava

```css
p a          { /* odkazy v odstavci */ }
ul a         { /* odkazy v položkách seznamu */ }
p *          { /* vše pod všemi odstavci */ }
header li em { /* ? */ }
```

---

# Selektorový jazyk &ndash; atributy

  - Hranaté závorky = atributový filtr
  - Test na rovnost, začátek, konec, podmnožinu

```css
input[placeholder] { /* ty vstupní prvky, které mají atribut placeholder */ }
input[type="text"] { /* test rovnosti hodnoty */ }
div[class~="test"] { /* div, jehož atribut class obsahuje mezerou oddělený řetězec test */ }
div[id^="article"] { /* atribut začíná na */ }
div[id$="article"] { /* atribut končí na */ }
div[id*="article"] { /* atribut obsahuje */ }
```

---

# Selektorový jazyk &ndash; zkratky pro `class` a `id`

  - Mřížka: `[id=]`
  - Tečka: `[class~=]`

```css
div#id          { /* ... */ }
#id             { /* ... */ }
div.test        { /* ... */ }
div.test1.test2 { /* ... */ }
```

---

# Selektorový jazyk &ndash; kombinátory

  - Větší než = přímý potomek
  - Plus = přímý následný sourozenec
  - Tilda = libovolný následný sourozenec

```css
body > * { /* značky přímo v body */ }
img + p  { /* odstavec za obrázkem */ }
h1 ~ img { /* obrázky, kterým předchází nadpis */ }
```

---

# Selektorový jazyk &ndash; pseudotřídy

  - Zápis pomocí dvojtečky
  - Slouží k popsání podmínek, které nemusí být ze stromu stránky patrny
  - `:hover` = při nadjetí myší
  - `:focus` = pokud má *focus*

```css
a:hover     { font-weight: bold; }
input:focus { border: 1px solid red; }
```

---

# Selektorový jazyk &ndash; pseudotřídy

  - `:enabled`, `:disabled`, `:checked`, `:required` = stav vstupního prvku
  - [Ukázka na jsfiddle.net](http://jsfiddle.net/ondras/GyzKG/)
  - [CSS-only hra (postavená na pseudotřídách)](https://ondras.zarovi.cz/games/7drl-2019/)

```css
input:checked + label { font-weight: bold; }
```

---

# Selektorový jazyk &ndash; pseudotřídy

  - `:nth-child()`, `:first-child`, `:last-child` = pořadí v rámci sourozenců

```css
a:first-child     { /* odkaz, pokud je prvním potomkem svého rodiče */ }
p:nth-child(2n+1) { /* liché odstavce */ }
p:nth-child(odd)  { /* liché odstavce */ }
```

---

# Selektorový jazyk &ndash; pseudotřídy

  - `:nth-of-type()` = pořadí v rámci sourozenců stejného typu

```css
img:nth-of-type(2n+1) { float: left; }
img:nth-of-type(2n+0) { float: right; }
```

---

# Selektorový jazyk &ndash; pseudotřídy

  - `:empty` = nemá-li potomky
  - `:only-child` = je-li jediný potomek

```css
li:empty { display: none; }
```

---

# Selektorový jazyk &ndash; pseudotřídy

  - `:target` = právě aktivní kotva stránky
  - [Ukázka na jsfiddle.net](http://jsfiddle.net/ondras/7JAT8/)

```css
p        { opacity: 0.5; }
p:target { opacity: 1; }
```

---

# Selektorový jazyk &ndash; pseudotřídy

  - `:not()` = negace

```css
p:not(:target)        { opacity: 0.5; }
input:not([required]) { color: blue; }
```

---

# Selektorový jazyk &ndash; pseudotřídy

  - `:is()` = sjednocení

```css
:is(li, p, a) { font-weight: bold; }  /* stejné jako bez is() */

:is(header, footer) :is(a, em, strong) { color: lime; }  /* cekem 6 kombinací
```

---

# Selektorový jazyk &ndash; pseudotřídy

  - `:has()` = výběr rodiče za předpokladu existence potomka

```css
label:has(:checked) { font-weight: bold; }

h1:has(+ p) { margin-bottom: 0; }

p:has(img, a) { border-left: 3px solid salmon; }
```

---

# Selektorový jazyk &ndash; pseudoprvky

  - `::first-line` = první řádek textu
  - `::first-letter` = první písmeno textu
  - [Ukázka na jsfiddle.net](http://jsfiddle.net/ondras/A7S8f/)

```css
p::first-letter { font-size: 200%; }
```

---

# Generovaný obsah

`::before`, `::after` = falešný první a poslední potomek

```css
li.good::before {
	content: "✔ ";
	color: green;
}
li.bad::before {
	content: "✘ ";
	color: red;
}
```

<li class="good"><code>&lt;li class="good"&gt;</code></li>
<li class="bad"><code>&lt;li class="bad"&gt;</code></li>

---

# Generovaný obsah

Generovat lze i obrázky a hodnoty atributů

```css
a[href^="http"]::before {
	content: url(externi.png);
}
a[data-id]::after {
	content: attr(data-id);
	color: gray;
}
```

[Ukázka na jsfiddle.net](http://jsfiddle.net/ondras/dhjpe/)

---


# Generovaný obsah

Generovat lze také úvozovky

```css
q {
	quotes: "«" "»";
}
q::before {
	content: open-quote;
}
q::after {
	content: close-quote;
}
```

[Ukázka na jsfiddle.net](http://jsfiddle.net/egyuf0p2/)

---

# Generovaný obsah

  Podpora pro čítače: reset, změna hodnoty, výpis hodnoty
  <button onclick="document.querySelector('#test_1').innerHTML = document.querySelector('#test_2').textContent.replace(/^\d+/, '')">aplikovat</button>
	<style id="test_1"></style>

```css {#test_2}
body {
	counter-reset: kapitola;
}

h1 {
	counter-increment: kapitola;
}

h1::before {
	content: counter(kapitola) ". ";
}
```


---

# CSS a zobrazovací média

  - CSS 2 podporuje tzv. *typy médií*: možnost aplikovat stylopisy jen pro předdefinovaná zařízení
  - `<link rel="stylesheet" media="print" />`
  - `@media screen { ... }`
  - `@import url(...) projection;`
  - Neúplná podpora (9 typů médií, podporovány zpravidla jen `screen` a `print`)

---

# Media queries

  - Princip i syntaxe zůstává
  - Rozšíření typů i na parametry a logické operace

```css
@media (min-width:700px) and (orientation:landscape) { ... }
```

---

# Media queries: obecná syntaxe

  - Volitelně typ média
  - Následuje libovolné množství parametrizace v kulatých závorkách

```css
@media [screen and] (max-device-width:640px) [and (...)] { ... }
```

---

# Media queries: logické operace

  - `and` je průnik
  - `,` je sjednocení
  - `not` je negace

```css
@media not screen and (color), print and (color) { ... }
```

---


# Media queries: dostupné parametry

  - `width`, `height`, `device-width`, `device-height`
  - `aspect-ratio`, `device-aspect-ratio`
  - `color`, `color-index`
  - `resolution`, `monochrome`
  - `min-` a `max-` varianty předchozích
  - `scan`, `grid`, `orientation`

---

# Responsive design

  - Snaha navrhnout design/layout tak, aby nebyl *příliš* závislý na použitém zařízení
  - Používání relativních jednotek
  - Rozložení prvků na stránce dle dostupného místa
  - Sada pravidel/stylopisů pro různé média queries

---

# Responsive design: viewport

  - Mobilní zařízení používají trik pro zpětně kompatibilní zobrazení
  - Stránce se hlásí s falešnou pixelovou šířkou (typicky 960px)
  - Výsledek: uživatel vidí celou stránku (zmenšenou)
  - Mapování logických pixelů na fyzické lze nastavit

```html
<meta name="viewport" content="width=640" />
<meta name="viewport" content="width=device-width" />
maximum-scale, minimum-scale, user-scalable
```

---

# Responsive design: nové jednotky

  - CSS jednotky `vw`, `vh`, `vmin`, `vmax`
    - a také `svw`, `svh`, `lvw`, `lvh`, `dvw`, `dvh` (!!)
  - Procenta rozměrů průhledu
  - [Podpora](http://caniuse.com/#feat=viewport-units)
  - Ideální tam, kde by bylo nutno dopočítávat skriptem
  - [Ukázka](https://jsfiddle.net/ju3r49nq/)

---

# CSS Layers

  - Nástroj pro snazší řešení problémů se *specificitou* selektorů
  - Často není nezbytné, ale může se hodit
  - [Přednáška o CSS Layers](https://ondras.zarovi.cz/slides/2022/css-layers-webexpo/)

---

# CSS Layers

```html
<form>
  <button type=submit disabled>Odeslat</button>
</form>
```

```css
form button[type=submit] {
  background-color: dodgerblue;
}

button:disabled {
  background-color: gray;
}
```

---

# CSS Layers

Kaskáda: jak poznat, které z kolidujících pravidel má přednost?

(alternativně: jak se stát milionářem?)

---

# CSS Layers

![](https://ondras.zarovi.cz/slides/2022/css-layers-webexpo/img/cascade.svg) {.cascade}

Kaskáda: jak poznat, které z kolidujících pravidel má přednost?

(následně: jak zařídit, aby to bylo jinak?)

---

# CSS Layers

Pomocí syntaxe `@layer` lze explicitně přednost aplikace pravidel řídit

```css
@layer muj-projekt {
  form button[type=submit] {
    background-color: dodgerblue;
  }
}

@layer docasne-stavy {
  button:disabled {
    background-color: gray;
  }
}
```

---

# CSS Layers

  - Mnoho dalších variant zápisu a pravidel
    - Zanořování
    - Oddělení deklarace a definice vrstev
  - Nezvyklá kombinace s přívlastkem `!important`

---

# Vendor prefix #1

  - Problém: výrobce chce podporovat technologii, která není plně standardizovaná
  - Implementací riskuje stížnosti při změně API
  - Řešení: vlastní prefix před názvem vlastnosti

```css
div {
	-webkit-transform: rotate(45deg);
	-moz-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	-o-transform: rotate(45deg);
	transform: rotate(45deg);
}
```

---

# Vendor prefix #2

  - Psaní prefixů je opruz
  - Poslední dobou snahy o odprefixování
  - Preprocessing na straně serveru (generuje všechny, např. [Autoprefixer](https://autoprefixer.github.io/))
  - Preprocessing na straně prohlížeče (generuje jen potřebné)

---

# Preprocessing: Less.js
Vstup

```css
p {
	@color: red;
	font-size: @color;

	a {
		color: #fff - @color;
		background-color: @color;
	}
}
```

---

# Preprocessing: Less.js
Výstup

```css
p {
	font-size: red;
}
p a {
	color: #00ffff;
	background-color: red;
}
```

---

# Preprocessing: Less.js

  - Podobných nástrojů je celá řada (SASS, Compass, PostCSS, &hellip;)
  - Důvody pro existenci:
    - ~~Proměnné~~ (viz osmá přednáška)
    - ~~Zanořování~~ (viz dvanáctá přednáška)
    - ~~Barevná aritmetika~~ (viz [CSS Relative Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors))
    - Bundling

---

# Prostor pro otázky

? { .questions }
