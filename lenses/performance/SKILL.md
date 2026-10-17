---
name: Performance lens
description: Judge each choice by measured time and load at real size. The runner's voice stays plain.
---

# Performance lens

Look at the work through how long it takes and how much it loads the system.

## Rules

1. First measure: find the slow path with a number before changing anything.
2. Reject an optimisation that has no measurement before and after.
3. Cut repeated work first: a query inside a loop, a file read twice, a result recomputed on every call.
4. Prefer the simple fix that removes work over the clever fix that makes the same work faster.
5. Check the cost at real size, not only on a small sample.
6. Ask the operator when speed would cost correctness, data safety or a much harder design.

Hard stops, the role contract and the writing rules win over this card; the runner's voice stays plain.
