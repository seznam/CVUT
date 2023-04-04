# KAJ 12: Web Components

---

FIXME grid pryc
FIXME predelat na web components
FIXME css custom properties pryc
FIXME zrusit notifikace

# Obsah

  1. CSS: Grid
  1. CSS: Custom Properties
  1. JS: Web Notifications
  1. JS: Web Components

---

# Příští přednáška je poslední

  - ...ale až za 14 dní
  - téma bylo zvoleno hlasováním
  - [výsledky](https://i.imgur.com/OTkQgi7.png)

---

# Zkouška!

  - Odehrává se v Seznamu
    - Radlická 10, Praha 5
  - Výsledkem zkoušky je skóre v intervalu `<−10, 10>` bodů
  - První před-čtyř-termín: 20. 5. 2021 (9:00, 10:00, 11:00, 12:00)
  - Celkem 16 termínů
  - Další termíny budou vypsány jen v případě absolutní nouze

---

# CSS3 Custom Properties

```css
body {
	--main-bg-color: brown;
}

div {
	background-color: var(--main-bg-color);
}

a {
	/* default value */
	background-color: var(--main-bg-color, red);
}
```

---

# CSS3 Custom Properties

  - Někdy nazýváno *CSS Variables*
  - Shodné chování s ostatními vlastnostmi (kaskáda)
  - Druhý parametr funkce `var()` je výchozí hodnota, pokud by vlastnost neexistovala
  - Hodnoty lze měnit za běhu (JS API, media queries, &hellip;)

---

# CSS3 Custom Properties

  - Nelze polyfillovat ani preprocessovat &ndash; hodnoty se v čase mění
  - Užitečné pro *skinování*
  - Užitečné pro modularizaci a izolaci CSS komponent

---

# Web Notifications

  - Zobrazení upozornění na úrovni OS
  - Spolupráce s notifikačním systémem OS
  - Agresivní; nutný souhlas uživatele
  - `let notification = new Notification(title, options)`

---

# Web Notifications

  - Options: jazyk, tělíčko, ikona
  - Notifikace generuje události, lze ji programově zavřít
  - Souhlas uživatele lze získat asynchronním voláním `Notification.requestPermission`
  - [Ukázka](https://davidwalsh.name/demo/notifications-api.php)

---


# Web Components

  - Souhrnný termín pro ~~čtveřici~~ trojici oddělených standardů
  - Fungují nezávisle, ale jsou cíleně navrhovány pro společné použití
  - Silně experimentální
  - Do roku ~2016 verze 0, od roku ~2016 znatelně odlišná verze 1; [výčet rozdílů](https://hayato.io/2016/shadowdomv1/)

---

# Web Components: &lt;template&gt;

```html
<template>
	<div class="person"><img /></div>
	<script>new Person(...)</script>
</template>
```

  - Dle slov autorů *něco jako chytřejší &lt;script type="custom"&gt;*

---

# Web Components: &lt;template&gt;

```js
let template = document.querySelector("template");
let parent = document.body;

parent.appendChild(template.content.cloneNode(true));
```

  - "Mrtvý" prvek; má DOM, ale nevykonávají se skripty a nestahují se externí média
  - DOM API: template má vlastnost `content`, což je DocumentFragment
  - Vnitřek template musí být parsovatelné HTML, ale jeho forma není předepsaná

---

# Web Components: HTML imports

**Zrušeno**

---

# Web Components: Custom Elements

```html
<szn-map x="..." y="..." controls="keyboard mouse zoom pan" />
```

```js
let map1 = new SznMap({x:..., y:..., control: ...});
let map2 = document.createElement("szn-map");

document.body.append(map1);
map1.append(map2);
```

---

# Custom Elements: ukázky

  - https://github.com/ondras/fixmetodo
  - https://github.com/ondras/instant-button
  - https://github.com/ondras/custom-range
  - https://www.zdrojak.cz/clanky/custom-elements-v-praxi/

---

# Custom Elements &ndash; define

  - JS API tvořeno jedinou funkcí: `customElements.define("szn-map", SznMap)`
  - Vlastní značky musí mít v názvu pomlčku (dopředná kompatibilita)
  - Značka s pomlčkou v názvu je tzv. *unresolved element* (`instanceof HTMLElement`), dokud nedojde k registraci

---

# Custom Element class

  - Třída (druhý parametr `customElements.define`) popisuje chování značky
  - Rozšiřuje (`extends`) nějakou existující HTML značku
  - Může obsahovat tzv. *lifecycle callbacks*

---

# Custom Elements: lifecycle callbacks

```js
class MyElement extends HTMLElement {
	constructor() { super(); }
	attributeChangedCallback(name, oldValue, newValue) {}
	connectedCallback() {}
	disconnectedCallback() {}
	adoptedCallback() {}
}
```

---

# Web Components: Shadow DOM

  - Technika "odstínění" podstromu od zbytku stránky
  - Myšlenka: DOM widgetu nemá okolí co zajímat
  - Zamezení interference JS a CSS
  - Problém: má být widget listem stromu?

---

# Web Components: realizace Shadow DOM

  - Pro libovolný uzel DOMu lze vytvořit tzv. *shadow root* (potomek DocumentFragment)
  - Shadow root může obsahovat libovolně složitý podstrom
  - Zvenčí shadow root není vidět
  - Omezení CSS a JS událostí
  - Připínání potomků do uzlu se shadow rootem způsobí jejich *(re)distribuci*
  - [Dokumentace](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)

---

# Web Components: &lt;slot&gt;

  - Nová HTML značka užitečná jen pro Shadow DOM
  - Určuje místo, do kterého se připnou prvky zvenčí umístěné do Shadow host
  - Uživatel appenduje do Shadow host, renderer vykresluje do `<slot>`
  - Jeden Shadow DOM může mít více značek `<slot>`
  - [Obrázek](https://assets.hongkiat.com/uploads/html-template-slow-tag-shadow-dom/slot-diagram.jpg)

---

# Prostor pro otázky

? {.questions}
