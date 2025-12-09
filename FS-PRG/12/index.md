# Programování 12

## Řízení projektů

---

# Obsah

1. Životní cyklus informačního systému
1. Tým a jeho organizace
1. Příklady vývojových procesů

---

# Životní cyklus informačního systému

- SDLC (Systems Development Life Cycle)
- Formalizace kroků, které vedou ke vzniku IS
- Nutnost formalizace úměrná velikosti a důležitosti systému
- Pro SDLC existují různé modely a standardy

---

# Životní cyklus informačního systému

Lze definovat různě! Typicky ale zhruba:

1. zachycení požadavků na systém
2. tvorba konceptuálního modelu
3. tvorba implementačního modelu
4. implementace a zavedení
5. testování
6. udržování systému a provoz
7. stažení systému z užívání

---

# 1. zachycení požadavků na systém

- Soupis toho, co musíme mít
- Soupis toho, co bychom rádi měli
- Soupis toho, jak se bude systém používat
- Specifikace?

---

# 2. tvorba konceptuálního modelu

- Z jakých součástí se systém skládá (nikoliv nezbytně technologicky)
- Jaké služby systém poskytuje
- Design

---

# 3. tvorba implementačního modelu

- Návrh architektury systému
- Včasná detekce technologických omezení

---

# 4. implementace a zavedení

- Patrně zabere nejvíce času
- Probereme do detailu později

---

# 5. testování

- Jednotkové, intergační, systémové
- Uživatelské, kvalitativní vs. kvantitativní
- Jednorázové vs. Průběžné

---

# 6. udržování systému a provoz

- Hardware, jeho obsluha, monitoring, limity, ekonomika
- Observability (sledování chování software)
- Proces aktualizací a aplikování změn
  - Komplikované ve světě (mobilních) aplikací

---

# 7. stažení systému z užívání

- Často opomíjená etapa
- Informovat uživatele s předstihem
- Dočasná / náhradní funkcionalita
- Komplikované ve světě (mobilních) aplikací

---

# Tým a jeho organizace

- Osoba vs. role
- Dělení kompetencí, zodpovědností
- Hierarchie

---

# Role v týmu

(relace M:N)

- Product Owner
- Product Manager
- Project Manager
- Návrhář (UI, UX)
- Architekt
- Vývojář
- Tester (QA)
- Administrátor
- Security Engineer

---

# Příklady vývojových procesů

- Vznikají a zanikají
- Podle potřeb projektu, účastníků, okolností vzniku
- Často nemají oficiální označení
- Lze aplikovat i mimo oblast IT!

---

# Příklady vývojových procesů: Waterfall

- Jeden z nejstarších
- Velmi přesně dodržuje popsané etapy
- Velký důraz na přípravnou fázi
- Dokumentace (specifikace) předchází implementaci
- Izolace rolí v teamu (nejprve se produktu věnuje analytik, pak programátor, &hellip;)

---

# Kdopak to je?

![](img/takeuchi.webp) {.maslo-poster}

---

# Hirotaka Takeuchi

![](img/takeuchi.webp){height=300}

- Tokyo, 1947
- Autor myšlenek metodologie Scrum (1986)

---

# Příklady vývojových procesů: Scrum

- Zástupce tzv. *agilních* metodik
- Vznik vývoje pomocí krátkých iterací (1-4 týdny)
- Prvky gamifikace, snaha o větší pružnost v porovnání s Waterfallem
- Cross-functional týmy
- Scrummaster

---

# Scrum: Sprint

- Iterace dodržuje pevnou strukturu:
    1. Plánování
    1. Denní scrum
    1. Demo
    1. Retrospektiva

- Řada *artefaktů a ceremonií*:
    - Standup
    - Backlog
    - Planning poker
    - Velocity

---

# Příklady vývojových procesů: Kanban

- Snaha vymezit se vůči oběma předchozím extrémům
- Dodat potřebnou agilitu pro zadavatele, nevynucovat pevnou strukturu sprintu
- Postaven na konceptu mřížky úkolů (*kanban board*)

---

# Kanban Board

- [High-level](img/kanban-board-1.png): Backlog, Planning, Todo, Doing, Done
- [Low-level](img/kanban-board-2.png): milníky vs. úkoly, komponenty pro produkt vs. vývoj vs. test

---

# Prostor pro otázky

? { .questions }
