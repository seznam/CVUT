#!/bin/sh
F=$1

cat $F \
  | sed -e 's/\s*<li>\(.*\)<\/li>/  - \1/g' \
  | sed -e 's/\s*<h2>\(.*\)<\/h2>/# \1/g' \
  | sed -e 's/<a href="\(.*\)">\(.*\)<\/a>/[\2]\(\1\)/g' \
  | sed -e 's/<strong>\(.*\)<\/strong>/**\1**/g' \
  | sed -e 's/<em>\(.*\)<\/em>/*\1*/g' \
  | sed -e 's/\s*<code[^>]\+>/```js\n/g' \
  | sed -e 's/^<\/code>/```/g' \
  | sed -e 's/<\/code>/`/g' \
  | sed -e 's/&lt;/</g' \
  | sed -e 's/&gt;/>/g' \
  | sed -e 's/<code>/`/g' \
  | sed -e 's/<section.*//g' \
  | sed -e 's/<\/section.*//g' \
  | sed -e 's/\s*<ul>//g' \
  | sed -e 's/\s*<\/ul>//g'
