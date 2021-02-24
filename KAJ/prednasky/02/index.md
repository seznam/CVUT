# KAJ 2 JavaScript pro starší a pokročilé

---


# Obsah
  1. JavaScript: opáčko
  1. Objekty, funkce a pole
  1. Pilíř 1: Uzávěry
  1. Pilíř 2: Klíčové slovo this
  1. Pilíř 3: Prototype chain
  1. Operátor new

---


# Opáčko

  - Interpret v každém prohlížeči
  - Pro nováčka obtížný: jazyk samotný vs. DOM
  - Jazyk stále vyvíjen (ES5&rArr;ES6&rArr;ES7&rArr;ES2017&rArr;ES2018&rArr;&hellip;), vznikají nové verze
  - Neexistuje koncept tříd (obtížné porovnání s C++, Java, &hellip;)

---


# Opáčko: primitivní datové typy

  - Číslo, bool, řetězec, null, undefined
  - Předávané hodnotou

```js
var a = 3;
var b = 0.1 + 0.2;
var c = "ahoj" + 'ahoj';
var e = null;
var f = undefined;
```
---


# Opáčko: komplexní datové typy

  - Objekt = neuspořádaná množina dvojic (klíč, hodnota)
  - Podobjekty: Array, Function, Date, RegExp
  - Předávané odkazem

```js
var a = {};               /* prázdný objekt */
var b = {c:3, "d":"hi"};
var e = [a, b];           /* pole o dvou položkách */
var f = function() {};
var g = /^.*/;            /* regulární výraz */
```
---


# Opáčko: základní syntaktické prvky

  - Volitelný středník
  - if, for, while, switch
  - *Type coercion*

```js
var a = 1 + "dva";
var b = {} + {};
if (0 == "") { /* ... */ }
if (undefined == null)  { /* ... */ }
if (undefined === null) { /* ... */ }
```
---


# Objekty, funkce a pole

  - Objekt = neuspořádaná množina dvojic
  - Klíč je řetězec, hodnota je cokoliv
  - Pole je též objekt

```js
var pole1 = [3, 2, 1];
var pole2 = [];

pole1.length == 3;
pole1[1]     == 2;
pole2.length == 0;

pole2.push(pole1);
```
---


# Objekty, funkce a pole

  - Funkce je též objekt

```js
var add = function(a, b) { return a+b; }
add.c = 123;
add(add.c, add["c"]);
```
---


# Pilíř 1: Uzávěry

  - Jaký je obor platnosti proměnných?
  - Funkci lze definovat uvnitř jiné funkce
  - Proměnná existuje v rámci své funkce a všech jejích podfunkcí

```js
var outer = function(a, b) {
	var inner = function(x) { return 2*x; }
	return a + inner(b);
}
```
---


# Pilíř 1: Uzávěry

  - Co když použijeme proměnnou ve vnitřní funkci?
  - Vznikne *uzávěra*

```js
var outer = function(a, b) {
	var inner = function() { return 2*b; }
	return a + inner();
}

var outer = function(a, b) {
	var inner = function() { return 2*b; }
	return inner;
}
```
---


# Pilíř 2: Klíčové slovo *this*

  - Jeden z nejkomplikovanějších konceptů jazyka
  - Zásadní rozdíl oproti jiným: hodnota je určena při volání

```js
var fun = function() { alert(this); }
fun(); /* ? */

var obj1 = { fun:fun };
var obj2 = { fun:fun };

obj1.fun(); /* this == obj1 */
obj2.fun(); /* this == obj2 */

fun == obj1.fun == obj2.fun
```
---


# Pilíř 2: Klíčové slovo *this*

  - Pokud je při volání před názvem funkce tečka, hodnota this je objekt vlevo
  - Jinak je this globální jmenný prostor (změna v ES6!)
  - This lze explicitně určit

```js
var fun = function() { alert(this); }

var obj1 = {};
var obj2 = {};

fun.call(obj1, arg1, ...);    /* this == obj1 */
fun.apply(obj2, [arg1, ...]); /* this == obj2 */
```
---


# Pilíř 3: Prototype chain

  - Dva objekty je možno provázat
```js
var obj1 = { klic:"hodnota" }; var obj2 = {};
obj2.vazba = obj1;
alert(obj2.vazba.klic); /* "hodnota" */
```
  - Existuje speciální neviditelná vazba, zvaná "prototype link"
  - Použije se při přístupu k neexistujícím vlastnostem
```js
var obj1 = { klic:"hodnota" };
var obj2 = Object.create(obj1);
alert(obj2.klic); /* "hodnota" */

obj2.__proto__ == obj1;
```

---


# Pilíř 3: Prototype chain

  - Říkáme, že jeden objekt je prototypem druhého
  - Druhý nabízí vše, co první (+ možná něco navíc)
  - Více prototype linků = prototype chain

```js
var obj1 = { klic:"hodnota" };
var obj2 = Object.create(obj1);
var obj3 = Object.create(obj2);
obj3.klic = "jina hodnota";
obj1.jinyKlic = "jeste jina hodnota";

alert(obj2.klic);     /* "hodnota" */
alert(obj3.klic);     /* "jina hodnota" */
alert(obj3.jinyKlic); /* "jeste jina hodnota" */
```
---


# Pilíř 3: odbočka
<q>Nepodporujeme atribut prototype, který je u všech objektů. Tento atribut je normou povolen a přidává do objektu nové metody a atributy (případně s danou hodnotou). Tento atribut jsme neimplementovali, protože by byl problém ho implementovat a jsme toho názoru, že je k ničemu.</q>
		**— prohlížeč Links, projektová dokumentace**</p>

---


# Pilíř 3: Prototype chain

  - Neexistuje koncept tříd
  - OOP lze realizovat pomocí prototypů
  - Vzor (třída) = rodičovský objekt
  - Objekt (instance) = objekty s prototypovým odkazem na rodiče

---


# Operátor new

  - Prototype link nelze vytvářet přímo (`x.__proto__`)
  - Varianta 1: `Object.create`
  - Varianta 2: `new`
  - Každá funkce má (téměř prázdný) objekt `.prototype`
  - Zápis `new f` vytvoří nový objekt, nastaví mu `__proto__` na `f.prototype` a vykoná nad ním `f()`

---


# Operátor new

[diagram](img/prototype.svg)

```js
var F = function() {
	this.a = 1;
}
F.prototype.b = 2;

var f = new F();
f.c = 3;
```
---


# Operátor new

  - Terminologický guláš: vlastnost `.prototype` vs. `__proto__`
  - Objekt ("instance") nemá příliš souvislost se svojí vytvořující funkcí
  - Operátor `new` patří k nejsložitějším partiím jazyka
  - Do prototypu funkce zpravidla vkládáme metody (neb ty mají být sdíleny)

---


# Dědičnost pomocí prototypů

[diagram](img/inheritance.svg)

```js
var Parent = function() {}
Parent.prototype.hi = function() { return "hello"; }

var Child = function() {}
Child.prototype = Object.create(Parent.prototype);
/* alternativně: Child.prototype = new Parent(); */

var ch = new Child();
ch.hi(); /* "hello" */
```

---

# Obohacování prototypů

```js
String.prototype.lpad = function(what, length) {
  var count = length - this.length;
  var padding = "";
  for (var i=0; i<count; i++) { padding += what; }
  return padding + this;
}
```

---

# Obohacování prototypů

```js
Array.prototype.random = function() {
  var index = Math.random()*this.length;
  return this[Math.floor(index)];
}
```

---

# ...

![Yoda](img/yoda.jpg){style="display:block;margin:auto;height:550px}

---


# bind

```js
var f1 = function() { alert(this.name); }
var foo = { name:"foo" }
var bar = { name:"bar" }
f1.call(foo); /* "foo" */

var f2 = f1.bind(bar);
f2() /* "bar" */
```

---

# bind

  - Funkce/metoda `bind` vrací novou funkci
  - V nové funkci je `this` napevno definováno ve chvíli volání `bind`
  - `bind` může kromě *zafixování* `this` rovnou obdobně nastavit i některé parametry
  - Úkol: vyrobte `bind`

---


# bind

```js
Function.prototype.bind = function(newThis) {
	var func = this;
	return function() {
		return func.apply(newThis, arguments);
	}
}
```
---


# bind &ndash; využití

```js
var Obj = function() {}
Obj.prototype.foo = function() {}

var bar = new Obj();
setTimeout(bar.foo, 100);

setTimeout(bar.foo.bind(bar), 100);

/* dtto addEventListener atp. */
```

---

# Bonus

Víte, co a proč udělá tato funkce?

```js
function s(a) {
    while (a.length) {
        var v = a.shift();
        setTimeout(a.push.bind(a, v), v);
    }
}
```

---

# Bonus (další)

[Context quiz](https://leaverou.github.io/talks/intro/#context-quiz)

---

# Prostor pro otázky

? { .questions }
