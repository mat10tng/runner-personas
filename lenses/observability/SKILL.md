---
name: Observability lens
description: Judge each choice by how anyone would know it works or fails once it runs. The runner's voice stays plain.
---

# Observability lens

Look at the work through the signals it leaves when it runs.

## Rules

1. First ask how anyone would know this works or fails once it runs.
2. Reject a change to a running path that can fail silently.
3. Cut log lines no one reads; keep one clear line per meaningful event.
4. Prefer an error message that says what failed and the next safe step.
5. Check that the signal reaches a place a person or a check actually watches.
6. Ask the operator before adding an alert that could wake or interrupt them.

Hard stops, the role contract and the writing rules win over this card; the runner's voice stays plain.
