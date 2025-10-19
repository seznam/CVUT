# Programování 04

## Python II

---

# Obsah

  1. Python na vlastním počítači
  1. Více souborů
  1. Další API

---

# Python ve Windows

Celá řada variant instalace:

  - [Oficiální verze Python 3.14.0](https://www.python.org/ftp/python/3.14.0/python-3.14.0-amd64.exe)
  - [Python install manager](https://www.python.org/ftp/python/pymanager/python-manager-25.0.msix) (dovoluje spravovat a aktualizovat více distribucí)
  - WSL2 (následně např. `apt install python3`)
  - další (ActivePython, Anaconda, WinPython)

---

# Python: modularizace

Klíčové slovo `import`:

```py
import math            # celý "modul" dostupný jako proměnná
from math import sqrt  # konkrétní položka z modulu

import math as m       # přejmenování

import lib.image       # knihovna v adresáři lib/image.py

import lib             # buď lib.py, nebo lib/__init__.py
```

---

# Python: hledání modulů

Algoritmus je výrazně složitější, ale zhruba:

  1. Systémové knihovny (`import math`)
  1. Soubory poblíž toho, který vykonáváme (`import lib`)
  1. Nainstalované balíčky knihoven (`import `)

---

# Python: závislosti a sytém PyPI

Jazyk jako takový nepředepisuje formu správy závislostí.

- Python Package Index: oblíbené úložiště knihoven
  - https://pypi.org/
- Program `pip`: správce balíčků, zejména získávaných z PyPI
  - ```
    pip list

    pip install requests pillow

    pip install -U pillow
    ```

---

# Kdopak to je?

![](img/carmack.jpg) {.maslo-poster}

---

# John Carmack

![](img/carmack.jpg){height=200}

- Narozen 1970, USA
- Autor her Wolfenstein 3D, Doom, Quake a dalších
- Geniální programátor a autor mnoha algoritmů ve světě počítačové grafiky

---

# Python: PIL

- PIL = Python Imaging Library
- Stará a léty prověřená knihovna
- Dnes opuštěná a nahrazená modernější implementací
  - Ta stále poskyuje identickou funkctionalitu
  - &hellip;ale je dostupná pod jiným jménem

```
pip install pillow

from PIL import Image
```

---

# Úloha 1: zmenšit obrázek

1. načíst konkrétní soubor
1. zmenšit na polovinu
1. uložit

https://pillow.readthedocs.io/en/stable/

---

# Úloha 2: všechny soubory ve složce na odstíny šedé

1. cyklus přes všechny
1. obrazový filtr
1. uložit

```py
import os
from glob import glob

os.listdir()
glob("*.jpg")
```

---

# Úloha 3: AI-generated obrázek

- Knihovna `requests` pro HTTP komunikaci (viz 6. přednáška)
- Webová služa *AI Art* (`https://aiart-zroo.onrender.com/api/generate`)

```py
import requests

url = "https://aiart-zroo.onrender.com/api/generate"
payload = {
  "video_description": "Winnie the Pooh playing chess with Abraham Lincoln",
	"style_preset": "pixel-art"
}

response = requests.post(url, json=payload)
data = response.json()
print("Image URL", data["image_url"])
```

---

# Prostor pro otázky

? { .questions }
