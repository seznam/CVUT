# Programování 05

## Počítačové sítě

---

# Obsah

  1. IP
  1. DNS
  1. HTTP, MQTT

---

# Počítačové sítě

- Velké téma, vydalo by na celý předmět
- Koncept mnoha hierarchicky zanořených vrstev
- V praxi nás zajímají od toho okamžiku, kdy nevnímáme rozdíly mezi formami připojení jednotlivých zařízení
  - Ethernet
  - Wi-Fi
  - Mobilní sítě

---

# Kdopak to je?

![](img/cerf.jpg) {.maslo-poster}

---

# Vinton Cerf

![](img/cerf.jpg){height=200}

- Narozen 1943, USA
- Spoluautor rodiny protokolů TCP/IP (1975)
- *Otec internetu*

---

# IP: Internet Protocol

- Infrastruktura pro předávání libovolných dat mezi zařízeními
- Pro potřeby IP je každé zařízení vybaveno (jednou či více) IP adresou
  - Zpravidla se jedná o unikátní identifikaci příjemce dat
- V praxi potkáváme tzv. IPv4 a IPv6
  - https://ip4.me

---

# Pokusy s IP

- `ping`
- `traceroute` / `tracert`

---

# DNS

- Domain Name System
- *Abychom si nemuseli pamatovat IP adresy*
- `nslookup`, `dig`, `host`

---

# Aplikační protokoly

- Dávají význam datům přenášeným pomocí IP
- Typicky designované na míru konkrétní aplikační potřebě (mail, web, IoT, &hellip;)
- Jistou výjimkou je protokol HTTP

---

# HTTP

- HyperText Transfer Protocol
- Tim Berners-Lee, 1989
- Původně určen pro přenos webových stránek
- Dnes užíván k přenosu libovolných (multimediálních) dat
- Jednoduchý, textový, univerzální
---

# HTTP

- Definuje dva typy zpráv:
  - Požadavek (klient &rarr; server)
  - Odpověď (server &rarr; klient)
- Tyto dvě zprávy musí proběhnout v tomto pořadí
  - &hellip;takže komunikaci musí iniciovat klient
- Každá zpráva se skládá z hlavičky a volitelného těla

---

# HTTP

Program `telnet` nebo `nc`:

```
$ telnet zwa.toad.cz 80

> GET /index.html HTTP/1.0

< HTTP/1.1 200 OK
< Content-type: text/html
< Content-length: 12345

< <!doctype html>
< ...
```

---

# MQTT

- Message Queuing Telemetry Transport
- V porovnání s HTTP přenáší menší objem dat, ale komplikovanějším způsobem
  - Mechanismus nazvaný *publish-subscribe*
  - Klienti serveru (brokeru) říkají, jaké zprávy je zajímají (subscribe)
  - Klienti serveru (brokeru) posílají zprávy (publish) a ten je distribuuje ostatním
- Vhodný pro IoT aplikace
- Binární

---

# MQTT v akci

- Potřebujeme MQTT broker či klient
  - https://mosquitto.org/
  - `pip install paho-mqtt`
- Potřebujeme téma (topic)
  - Pole řetězců oddělených lomítky, např. `home/room1/temperature`

---

```py
import paho.mqtt.client as mqtt

def on_message(client, userdata, message):
	print(f"{message.topic}: {message.payload.decode()}")

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.username = "fs"
client.password = "mqtt-test"
client.connect("zwa.toad.cz", 1883, 60)
client.subscribe("home/#")
client.on_message = on_message

client.loop_forever()
```

---

# Prostor pro otázky

? { .questions }
