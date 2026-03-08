#!/usr/bin/env bash
set -euo pipefail

payload="$(cat)"
source_code="$(echo "$payload" | python3 -c 'import json,sys; print(json.load(sys.stdin)["sourceCode"])')"
stdin_input="$(echo "$payload" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("stdinInput", ""))')"

echo "$source_code" > Main.java
javac Main.java

if [ -n "$stdin_input" ]; then
  echo "$stdin_input" | java Main
else
  java Main
fi
