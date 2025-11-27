# Programování 10

## Python III &ndash; GUI

---

# Obsah

1. Koncepty GUI aplikací
1. Python a GUI
1. TKInter
1. OOP

---

# Koncepty GUI aplikací

Graphical User Interface

- Zrod cca v šedesátých letech 20. století
- Zvýšení uživatelské přívětivosti
- Podpora periferií (myš, touchscreen, grafika)

---

# Koncepty GUI aplikací

Event Loop

- Podobné webový aplikacím
- Aplikace většinu času *nic nedělá*
- Přesněji: ve velmi rychlé smyčce čeká na interakci či jiný zdroj událostí
- *Když nastane **X**, udělej **Y***

---

# Python a GUI

- Nutnost GUI knihovny
- Velké množství na výběr:
    - PyQt6, PySide6
    - TKInter
    - WxWidgets
    - DearPyGui
    - Kivy
    - PyForms
    - &hellip;
- Vzhled: konzistentní napříč OS / respektující styl OS?

---

# Python a GUI: společné rysy knihoven

- Zpravidla značně objemné
- Velmi odlišná syntaxe, velmi podobné koncepty použití
- Event-based programming
- Někdy deklarativní Domain-Specific Language pro popis UI
- Pokročilé techniky v Pythonu: OOP, dědičnost, Context Managers

---

# TKInter

---

# Kdopak to je?

![](img/hipp.jpg) {.maslo-poster}

---

# D. Richard Hipp &ndash; autor projektu SQLite

![](img/hipp.jpg){height=200}

- [Nejpoužívanější databáze na světě](https://sqlite.org/mostdeployed.html)
- Embedded: SQL v rámci jediného souboru
- 155 k řádek kódu, 92 M řádek testů
- Public Domain
- *the project does not accept patches*

---

# Prostor pro otázky

? { .questions }
