#!/bin/sh
F=$1

cat $F \
  | sed -e 's/\s*<li>\(.*\)<\/li>/  - \1/g' \
  | sed -e 's/\s*<h2>\(.*\)<\/h2>/# \1/g' \
  | sed -e 's/\s*<code[^>]\+>/```js\n/g' \
  | sed -e 's/^<\/code>/```/g' \
  | sed -e 's/<\/code>/`/g' \
  | sed -e 's/<code>/`/g' \
  | sed -e 's/<section.*//g' \
  | sed -e 's/<\/section.*//g'
