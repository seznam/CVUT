# Programování 03

## Python I

---

# Obsah

  1. Jazyk Python
  1. Syntaxe
  1. Jupyter
  1. Experimenty

---

# Kdopak to je?

![](img/guido.jpg) {.maslo-poster}

---

# Guido van Rossum

![](img/guido.jpg){height=200}

- Narozen 1956, Haarlem
- Autor jazyka Python
- Pracoval mj. pro Google, Dropbox, Microsoft

---

# Python

- Vznik 1991
- Jeden z nejúspěšnějších programovacích jazyků
- Multi-purpose, high-level, dynamically-typed, garbage-collected
- *Significant white space*
- Populární v mnoha prostředích, např.:
  - CLI tools
  - webové aplikace
  - data science

---

# Python je interpretovaný

- &hellip;takže nikoliv kompilovaný
- Zdrojové soubory (.py) jsou přenositelné
- Ke spuštění je potřeba program (python)

---

# Python: jak na něj?

1. CLI / REPL (command line interface, read-eval-print loop)
1. IDE (integrated development environment)
1. Webové rozhraní
  - Jupyter
  - Codewars

---

# Python v našem předmětu

1. Dnes: na webu
1. Příště: na vlastním počítači
1. Přespříště: GUI aplikace

---

# Python: syntaxe

- Proměnné definovány prvním přiřazením
- Funkce definovány klíčovým slovem `def`
- Bloky začínají dvojtečkou a končí původním odsazením

```py
def pozdrav(jmeno):
    if jmeno == "":
        print("tebe neznám")
    else:
        print("Hi", jmeno)

pozdrav("Ondra")
pozdrav("")
```

---

# Python: datové typy

- Čísla: celá (libovolně velká) a desetinná
- Řetězce: ohraničené uvozovkami či apostrofy
- Pravdivostní hodnoty `True` a `False`
- Pole (list), mezi hranatými závorkami
- Slovník (dict), mezi složenými závorkami

---

# Python: datové typy

```py
ROZPOCET = {
  "ceo": 100000,
  "senior": 50000,
  "junior": 20000
}

def mzdy(pozice):
  for p in pozice:
    print(p, ": ", ROZPOCET[p], sep="")

mzdy(["ceo", "senior", "junior"])
```

---

# Jupyter

Infrastruktura pro běh Pythonu v rámci webové stránky

  - Uživatel &rarr; Prohlížeč &rarr; Python na serveru
  - Uživatel &rarr; Prohlížeč &rarr; Python zkompilovaný do JavaScriptu

---

# Jupyter: omezení

Stejná, jako o webových aplikací

  - Lokální disk
  - Přístup k síti
  - Přístup k hardware (perfierie, CPU)

---

# Jupyter: kde zkoušet?

  - Přestože je zdarma, jeho provoz něco stojí
  - Možno zprovoznit na vlastním (webovém) serveru
  - https://colab.research.google.com/

---

# Jupyter: úlohy

Datová analýza

  1. vzorová data na FIXME
  1. ručně najít extrém
  1. knihovna pro grafy plotly, resp. plotly.express; px.bar(data, x=, y=)

---

# Codewars

  - Trénink programování formou malých hodnocených úloh
  - https://www.codewars.com/
  - Nejen pro Python!

---

# Prostor pro otázky

? { .questions }
