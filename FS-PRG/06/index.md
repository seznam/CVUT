# Programování 06

## Webová aplikace &ndash; klient

---

# Obsah

  1. HTML
  1. CSS
  1. JavaScript

---

# Webová stránka / aplikace

- Informace, které prohlížeč získá po HTTP a zobrazí uživateli
- Hranice *stránka vs. aplikace* je mlhavá
  - čím víc interakce, tím víc aplikace
- Dnes se soustředíme na data teprve poté, co přijdou (po síti?) do prohlížeče
- Tři režimy fungování:
  - Webový server
  - Pseudo-protokol `file://`
  - Online hřiště (https://kod.djpw.cz/, https://jsfiddle.net/, https://codepen.io/, &hellip;)

---

# HTML + CSS

- Sada jazyků pro formátování dokumentů
- Striktně vzato nejsou programovací&hellip;
  - &hellip;ale řešíme s nimi stejná témata (syntaxe, modularizace, přenositelnost, výkon a další)
- Od počátku navrženy pro společné fungování:
  - HTML do prostého textu dodává **význam** a **strukturu**
  - CSS do HTML dokumentu dodává layout, vzhled a styl

---

# HTML

HyperText Markup Language

```html
<h1> Toto je nadpis </h1>
<p> Toto je odstavec </p>
<p> Další odstavec </p>
<p> Zde je <img> a <a href="https://www.cvut.cz/"> odkaz </a> </p>

<h2> Co nakoupit: </h2>
<ul>
  <li> Rohlíky </li>
  <li> Mléko </li>
</ul>
```

---

# HTML

Formuláře jsou klíčovou komponentou pro interaktivitu

```html
<form>
  Jméno: <input type=text> <br>
  Heslo: <input type=password> <br>
  <hr>
  Kapybara: <br>
    <input type=radio name=kapybara> Živá <br>
    <input type=radio name=kapybara> Vycpaná <br>
  <hr>
  <button type=submit>Odeslat objednávku</button>
</form>
```

---

# Jak na HTML?

- Jaké značky existují?
- Jaká jsou syntaktická pravidla jazyka?
- https://developer.mozilla.org/en-US/docs/Web/HTML

---

# HTML

Úkol: sestavte HTML stránku o něčem, co vás zajímá. Ať obsahuje:

- Nadpis
- Obrázek
- Trochu textu
- Seznam odkazů na stránky, kde si mohou zájemci přečíst více informací

---

# CSS

Cascading Style Sheets

```css
a { color: red }

p { font-size: 18px }

li {
  margin-top: 1em;
  background-color: rgb(255, 200, 100);
}
```

---

# CSS

Pokud nepoužíváme online hřiště, musíme naše HTML a CSS propojit:

```html
<link rel=stylesheet href=styl.css />
```

---

# Jak na CSS?

- Jaké vlastnosti existují? Jaké mohou mít hodnoty?
- Co všechno dovoluje *selektorový jazyk*?
- Jak definovat rozměry a pozici prvků na stránce?
- Jak zařídit správný vzhled na milionech displejů různých velikostí?
- https://developer.mozilla.org/en-US/docs/Web/CSS

---

# CSS

Úkol: doplňte do HTML základní styly

- Barvy (`color`, `background-color`)
- Řez a velikost písma (`font-size`, `font-family`)
- Rámeček (`border`)

---

# Kdopak to je?

![](img/eich.jpg) {.maslo-poster}

---

# Brendan Eich

![](img/eich.jpg){height=200}

- Narozen 1961, USA
- Ve společnosti Netscape dostal v roce 1995 za úkol navrhnout <em>hloupějšího sourozence Javy</em>
- V průběhu deseti dnů navrhl a naimplementoval první verzi jazyka JavaScript

---

# JavaScript

- Vznikl pro obohacení interakčních možností HTML
- Historicky používán především ke kontrole formulářů před odesláním
- V roce 2005 možnost tvorby SPA (změna obsahu stránky bez tradičnín navigace)
- V roce 2009 první větší zájem o použití mimo prohlížeč
- Dnes soupeří s Pythonem o pozici univerzálního jazyka *pro cokoliv*

---

# JavaScript

- V mnoha ohledech podobný Pythonu (high-level, dynamické typování, garbage collection, first-class functions)
- Syntaxe podobná C a Javě
- Tzv. *asynchronní* (*neblokující*) rozhraní
- Programování řízené událostmi

---

# JavaScript

```html
<button id="tlacitko"> Click me! </button>

<script>
  function pozdrav() {
    alert("Ahoj!");
  }

  let button = document.querySelector("#tlacitko");
  button.addEventListener("click", pozdrav);
</script>
```

---

# JavaScript a DOM

DOM: Document Object Model

- Sada JS proměnných a funkcí, které dovolují manipulovat s webovou stránkou (HTML)
- Změna obsahu, přidávání nových prvků, mazání
- Změna vzhledu (stylu)
- Reakce na rozmanité události (způsobené interakcí: myš, klávesnice, dotyk)

---

# Jak na JavaScript?

- Syntaxe jazyka, REPL v rámci DevTools
- Browser-based rozhraní: DOM, HTTP a další
- https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

# JavaScript

Úkol: vytvořte *zdrhací* tlačítko, které uskočí před myší

---

# JavaScript

```html
<button id="tlacitko" style="position:absolute"> Click me! </button>

<script>
  function skok() {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    button.style.left = x + "px";
    button.style.top = y + "px";
  }

  let button = document.querySelector("#tlacitko");
  button.addEventListener("mouseover", skok);
</script>
```

---

# Prostor pro otázky

? { .questions }
