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
- Python-based API pro grafickou knihovnu Tk
- Základní součást většiny distribucí Pythonu
    - &rArr; nemusíme (snad) doinstalovávat

---

# Tkinter

```py
import tkinter
app = tkinter.Tk()

app.minsize(600, 400)

app.mainloop()
```

---

# Tkinter: widgety

```py
label = tk.Label(app, text="Nápis v GUI")
label.pack()

tk.Label(app, text="Druhý nápis").pack()

tk.Label(app, text="Třetí nápis").pack(expand=True)
```

---

# Tkinter: události

```py
import random
def button_click():
    num = random.randint(1, 100)
    button.config(text=num)

button = tk.Button(app, command=button_click)
button.pack(fill=tk.BOTH, expand=True)

button_click()
```

---

# Tkinter: další

```py
import tkinter.ttk as ttk
button = ttk.Button(...)
```

```py
import tkinter.filedialog as fd

def button_click();
	fd.askopenfilename()
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

# Objektově orientované programování (OOP)

- Způsob, jak strukturovat programy
- Tradiční program: dělíme na menší bloky (funkce)
- OOP program: dělíme na menší bloky (objekty)
	- Objekt: kombinace dat a logiky
- Doplňkové koncepty: dědičnost, polymorfismus

---

# OOP v Pythonu

```py
class Person:
	# tzv. "konstruktor"
	def __init__(self, name, age):
		self.name = name
		self.age = age

	def greet(self):
		print(f"Ahoj, jmenuji se {self.name} a je mi {self.age} let.")


p = Person("Jan", 30)
p.greet()
```

---

# Tkinter: OOP přístup

```py
import tkinter as tk
import tkinter.ttk as ttk
import tkinter.filedialog as fd

class App(tk.Tk):
	def __init__(self):
		super().__init__()
		ttk.Button(self, text="Pick file", command=self.pick_file).pack()

	def pick_file(self):
		name = fd.askopenfilename()
		print(f"Selected file: {name}")

App().mainloop()
```

---

# Prostor pro otázky

? { .questions }
