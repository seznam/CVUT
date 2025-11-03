# Programování 07

## Webová aplikace &ndash; server

---

# Obsah

  1. Co je to webový server
  1. Flask
  1. XSS
  1. Jinja

---

# Kdopak to je?

![](img/stenberg.jpg) {.maslo-poster}

---

# Daniel Stenberg

![](img/stenberg.jpg){height=200}

- Narozen 1970, Švédsko
- Známý především jako autor knihovny a programu cURL
- Používáno na [110 (!!) operačních systémech](https://daniel.haxx.se/blog/wp-content/uploads/2025/10/curl-coverage9.jpg), zejména v embedded prostředích (přes 20 miliard nasazení)

---

# Co je to webový server

- Serverová část webové aplikace
- Historicky *ta větší*
    - zpracování HTTP požadavku
    - aplikační logika
    - úložiště dat
- Implementace skrytá před vnějším světem
  - možno používat libovolné programovací jazyky

---

# Zodpovědnost webového serveru

- Zpracování HTTP požadavku
    - &hellip;pravděpodobně vygenerování HTML odpovědi
    - &hellip;ale také ostatních, ne-HTML *souborů*
- Domain-based virtualhosting
- SSL/TLS termination
- IP filtering, přesměrování, měření, logování, &hellip;

---

# Webový server: historie

1. Rozmach internetu a webu: masivní virtualhosting
    - centrální HTTP komponenta (Apache)
    - následný přesun zodpovědnosti (delegace) na jednotlivé aplikační komponenty
1. Touha po svobodě:
    - snaha ovládat celý HTTP stack
    - HTTP už na úrovni aplikace
1. Zlatá střední cesta:
    - posloupnost HTTP-related mikroslužeb
    - na vstupu typicky *hloupá* proxy (nginx, caddy, traefik)
    - následně už v režii webové aplikace

---

# Webový server: Python

- Python se typicky nepoužívá jako webový server
- Webové aplikace v Pythonu se zapojují *za* HTTP implementaci
- Django, Flask, FastAPI

---

# Flask

`pip install flask`

- Webový *framework*
- Historicky prověřený
- Pro potřeby vývoje obsahuje miniaturní HTTP server

---

# Flask

```py
from flask import Flask

app = Flask(__name__)
```

```sh
flask run
```

---

# Flask

```py
from flask import Flask
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def index():
    now = datetime.now().strftime("%d. %m. %Y, %H:%M:%S")
    return f"<h1>Ahoj!</h1> <p> Právě je {now}"

# alternativně: app.add_url_rule("/", view_func=index)
```

```sh
flask run --debug
```

---

# Odbočka: dekorátory

*Dekorátor: funkce, která z jedné funkce udělá jinou*

```py
def dvakrat(f):
  def result():
    f()
    f()
  return result

@dvakrat
def tri():
  print(3)
```

---

# Vstup od uživatele

`static/form.html`:

```html
<form method="post" action="/pozdrav">
	Jméno: <input name="jmeno"><br>
	<input type="submit">
</form>
```

```py
from flask import request

@app.route("/pozdrav", methods=["POST"])
def pozdrav():
  return request.form["jmeno"]
```

---

# XSS

- Cross-site scripting
- Velmi rozšířený typ zranitelnosti
- Často lze zneužít k absolutnímu ovládnutí aplikace

---

# XSS: ochrana

Pokud generujeme výstup (HTML) z dat od uživatele, musíme dát pozor na znaky, které (v HTML) něco znamenají.

- HTML: entity
- Které znaky a jak na entity převádět?

---

# Flask: šablonování

- Řešení problému přidáním vrstvy *indirekce*
- Skládání HTML lepením řetězců je neobratné
- Šablonovací systém: nástroj pro kombinaci statického a dynamického HTML
- Ve Flasku je tradiční volbou **Jinja**

---

# Flask: Jinja

```py
from flask import render_template

@app.route("/pozdrav", methods=["POST"])
def index():
  jmeno = request.form["jmeno"]
  return render_template("pozdrav.html", jmeno=jmeno)
```

`templates/pozdrav.html`:
```html
<h1>Ahoj, {{jmeno}}</h1>
```

---

# Prostor pro otázky

? { .questions }
