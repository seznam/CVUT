# Programování 10

## Python III &ndash; GUI

---

# Obsah

1. Koncepty GUI aplikací
1. Python a GUI
1. Tkinter
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

# Tkinter

- Tk Interface
-

---

```py
import tkinter
app = tkinter.Tk()

app.mainloop()
```

---

---

```py
# nezavisly textovy popisek
label = tk.Label(text="Nápis v GUI")

#
label.pack()
```

---

# Kdopak to je?

![](img/kay.jpg) {.maslo-poster}

---

# Alan Kay

![](img/kay.jpg){height=200}

- Narozen 1940, USA
- Jeden z otců objektově orientovaného programování a GUI
- Autor konceptu *překrývajících se oken* a *tabletu* (rok 1972!)

---

# Prostor pro otázky

? { .questions }
