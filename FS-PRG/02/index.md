# Programování 02

## Verzování, DVCS

---

# Obsah

  1. Správa digitálních statků
  1. Verzovací systémy
  1. Git
  1. GitHub a další

---

# Správa digitálních statků

Jakým způsobem spravujete své digitální vlastnictví?

---

# Správa digitálních statků

- Média: lokální disk, oddělené úložiště (NAS), cloud
- Dokumenty: dtto, online služby (Google Drive, SharePoint, &hellip;)
- Zdrojový kód: ???

---

# Úkoly pro správu zdrojového kódu

- Zálohování
- Možnost návratu ke starší verzi
- Možnost koexistence více verzí
- Chronologická evidence změn
- Koordinace úprav prováděných v týmu

---

# Verzovací systémy

- Anglicky *version-control software*
- Forma databáze, která ukládá a spravuje změny prováděné nad sadou souborů
- Centralizované vs. distribuované (DVCS)
  - RCS, CVS, Subversion, Perforce
  - Git, Mercurial, Darcs, Fossil

---

# Koncepty verzování

- Zaznamenávání změn: commit, changeset
- Porovnávání stavu: diff
- Odesílání provedených změn: check-in, push
- Příjem (cizích) změn: check-out, pull, fetch
- Kombinování změn: merge, rebase

---

# K čemu používat verzovací systém?

- Zdrojový kód
- Textové dokumenty (incl. binární)
- Podklady k libovolným projektům
- &hellip;cokoliv dalšího?

---

# Kdopak to je?

![](img/linus.webp) {.maslo-poster}

---

# Linus Torvalds

![](img/linus.webp){height=200}

- Aktuálně nejúspěšnější vývojář na planetě
- Autor OS Linux (1991)
- Autor DVCS Git (2005)

---

# Git

- Distribuovaný verzovací systém
- Popularitou překonal všechny ostatní
- Stále aktivně vyvíjený
- Synchronizační *podvozek* pro řadu dalších služeb (GitHub, GitLab, Gitea, &hellip;)
- Dostupný mnoha způsoby: CLI, GUI (GitHub Desktop, VS Code, &hellip;), Web

---

# Terminologie Gitu

- *Repo* (repository, repozitář) = databáze jednoho projektu (všechny verze všech souborů)
- *Fork* / *Clone* = repo, které vzniklo odvozením z jiného
- *Commit* = zaznamenaný stav projektu. Historie projektu je tvořena spoustou provázaných commitů (tzv. DAG).
- *Push* = odeslání jednoho či více commitů do jiného repa
- *Pull* = přijmutí jednoho či více commitů z jiného repa
- *Branch* = cedulka s označením konkrétního commitu

---

# GitHub

- Největší veřejný poskytovatel gitových repozitářů a souvisejících služeb
- Zdarma!
- Microsoft (od r. 2018)
- Webový klient, GUI klient
- Spousta nadstavbové funkcionality
  - Issue tracker
  - Static hosting
  - Diskuzní fórum
  - Dokumentace / wiki
  - CI

---

# GitHub v praxi

**Bude se hodit v průběhu semestru!**

1. Založte si účet na GitHubu
1. Zařiďte si vhodného Git klienta (CLI / GUI / IDE)
1. Pracujte s repozitářem jedním ze tří hlavních způsobů:
    1. Vlastní repozitář
    1. Sdílený repozitář
    1. Vlastní repozitář, který je fork jiného

---

# GitHub v praxi: vlastní repozitář

- `git clone`
- práce
- `git add, git commit`
- `git push`

---

# GitHub v praxi: sdílený repozitář

- `git clone`
- `git checkout -b jmeno-vetve`
- práce
- `git add, git commit`
- `git push`
- `git checkout main`
- `git merge jmeno-vetve`

---

# GitHub v praxi: fork

- forkovací tlačítko na GitHubu
- `git clone` (adresa ~~řepa s pórkem~~ repa s forkem)
- práce
- `git add, git commit`
- `git push`
- Pull Request na GitHubu

---

# Prostor pro otázky

? { .questions }
