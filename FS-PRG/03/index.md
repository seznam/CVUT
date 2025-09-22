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

# Python: jak na něj?

1. CLI / REPL (command line interface, read-eval-print loop)
1. IDE (integrated development environment)
1. Jupyter (webové rozhraní)

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

FIXME codewars

---

# Prostor pro otázky

? { .questions }
