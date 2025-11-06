# Programování 08

## Dokumentace a testování

---

# Obsah

  1. Dokumentace
  1. Markdown
  1. Komentáře
  1. Docstring
  1. Testování
  1. Pytest

---

# Dokumentace

- Nezbytná součást procesu tvorby software
- Složitá, pracná, ale velice užitečná
- Hodí se uživateli, zadavateli, programátorovi, mainteinerovi

---

# Dokumentace?

- Jak? (jazyk, formát, konzistence s kódem)
- Kam? (*vzdálenost* od kódu, dostupnost)
- Kdy? (před / během / po)
- Kdo? (zadavatel / autor / uživatel)

---

# Markdown

- Značkovací jazyk (John Gruber, 2004)
- Vhodný pro všechny formy textu
- Mnoho (ne zcela kompatibilních) implementací
- Nadpisy, odstavce, odkazy, seznamy, obrázky, citace, ukázky kódu, tabulky, &hellip;
- Vyzkoušejme online: https://markdownlivepreview.dev/ (recept na oblíbený pokrm?)

---

# Kdopak to je?

![](img/knuth.jpg) {.maslo-poster}

---

# Donald Knuth

![](img/knuth.jpg){height=200}

- Narozen 1938, USA
- Programátor, informatik, matematik, pedagog
- Autor knihy *The Art of Computer Programming*
- Autor typografických systémů Metafont a TeX
- Autor konceptu *literate programming*

---

# Komentáře

- Většina jazyků (incl. HTML, CSS) nabízí syntaxi pro komentáře
- Dva protichůdné názory:
  - komentářů má být hodně, protože kód je složitý
  - komentářů má být málo, aby kód nebyl složitý
- Pokročilé jazyky rozeznávají *běžné* a *dokumentační* komentáře

---

# Dokumentační komentář

- Má specifickou roli a syntaxi
- Je strojově zpracovatelný
- Ruku v ruce s nástrojem na generování dokumentace

---

# Dokumentační komentáře v Pythonu

```py
# test.py

def add(a, b):
	"""Sčítání"""
	return a+b
```

```
python -m pydoc test
```

---

# Struktura v docstringu

```py
def add(a, b):
  """
  Sečte dvě čísla

  @param {int} a První číslo
  :param int b: Druhé číslo
  ...
  """

```

---

# Testování

- Zahrnuje spoustu dílčích pod-disciplín
- Pomáhá:
  - ověřit splnění zadání
  - prozkoumat robustnost
  - nalézt nedostatky
  - předcházet regresi
  - &hellip;a mnohé další

---

# Testování

Složitá taxonomie/kategorizace:

- uživatelské vs. strojové
- kvalitativní vs. kvantitativní
- statické vs. dynamické
- jednotkové vs. integrační vs. end-to-end

---

# Unit testing

AKA *jednotkové testování*

- snadno pochopitelné, proveditelné
- ověřování chování aplikace s největší granularitou (typicky na úrovni funkce)
- *když pustím `add(2, 3)`, měl bych dostat `5`*

---

# Unit testing v Pythonu


```py
def add(a, b):
	"""Sčítání"""
	return a+b


def test_add():
    assert add(2, 3) == 6
```

```
pip install pytest
pytest
```

---

# TDD

- Test-Driven Development
- Proces tvorby software, kdy testy vyrobíme dříve, než implementaci
- Zkuste pomocí TDD vytvořit funkci `is_palindrome`
  - Nejprve testy! Klidně hodně.
  - Poté implementaci.

---

# Prostor pro otázky

? { .questions }
