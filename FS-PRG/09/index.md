# Programování 09

## Databáze

---

# Obsah

  1. Ukládání dat
  1. Druhy databází
  1. SQL

---

# Ukládání dat

Typická aplikace potřebuje ukládat data

- Generuje je?
- Pracuje s nimi?
- Pracuje s nastaveními?
- Observability: diagnostická metadata?

---

# Level 1: filesystem

Lokální soubor:

- Snadná implementace
- Formát dle potřeb aplikace
- Teoreticky nemusí být lokální
- Závislost na výkonu I/O
- *Tight coupling*

---

# Level 2: služba operačního systému

Registr (windows), DConf (linux)

- Vložení vrstvy abstrakce
- Formát dat dle úložiště
- Vhodné typicky jen pro nastavení

---

# Level 3: databáze

- Nesouvisející, samostatná aplikace určená k ukládání dat
- Často dostupná pomocí TCP/IP (Network-bound)
- Formát dat dle úložiště
  - Ale! Existuje mnoho druhů databází
- *Loose coupling*

---

# Databáze

- Je z čeho vybírat
- Záleží na tvaru dat, operacích nad nimi, požadovaných výkonových vlastnostech
- Často obtížná změna, jakmile je produkt hotový

---

# Databáze: tabulková, relační

- Historicky tradiční přístup k ukládání dat
- MySQL, SQLite, MSSQL, PostgreSQL
- Tabulka: excel worksheet
- Sloupec: pojmenovaný sloupec v excelu
- Řádek: datová položka

---

# SQL

Structured Query Language

- Hřiště na https://sqlzoo.net/
  - `SELECT * FROM world`
  - `SELECT name FROM world WHERE continent = 'Europe'`
  - `SELECT COUNT(*), continent FROM world GROUP BY continent`

---

# Databáze: tabulková, relační

- Relační: mezi tabulkami mohou existovat logické vazby
    - T1: Seznam hudebních skladatelů
    - T2: Seznam hudebních děl
    - Je v pořádku mít v databázi dílo bez autora?

- Často nás zajímají data napříč více tabulkami:
    - T1: Surovina
    - T2: Recept
    - Jak popsat *párování* surovin v receptu?

---

# Úkol: kuchařka

1. Vytvořte v Excelu tabulky pro recepty a suroviny

2. Vytvořte v Excelu tabulky produkty e-shopu a jejich kategorie
    - Knihy, Jídlo, Komponenty, CPU, GPU, integrované, externí

---

# Slabá a silná místa relační databáze

- Funguje dobře tam, kde pracujeme s propojenými tabulkovými daty
- Slabší tam, kde jsou položky volitelné
- Slabší u stromových / grafových dat

---

# Databáze: key-value

- Pro málo strukturovaná data identifikovaná jednoduchým klíčem
- Informace o přihlášení, cache, často měněný stav (hry)
- Memcache, Redis, Aerospike
- Relativně snadné horizontální škálování (přidání serveru)

---

# Databáze: time series

- Pro evidenci dat v čase
- InfluxDB, Prometheus
- Často write-only (nechceme měnit historii)
- Optimalizovaná na častý zápis a rychlé vyhledávání v časovém rozmezí

---

# Prometheus

- Populární time-series databáze
- Základní stavební jednotka je *metrika* -- skalární hodnota, která se v čase mění
- http://smaug.cz:9090/
- PromQL: `{label="value"}, rate(), sum_over_time()`

---

# Databáze: dokumentová

- Pro strukturovaná data, která neodpovídají pevnému tvaru
- MongoDB, CouchDB, Elasticsearch
- Namísto záznamů se vkládají *dokumenty* (často libovolného obsahu)
- Čím flexibilnější, tím méně výkonu

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
