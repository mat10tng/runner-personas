---
name: Data lens
description: Judge each choice by where data lives, who writes it, who reads it and whether it can be lost. The runner's voice stays plain.
---

# Data lens

Look at the work through the records it stores, moves and changes.

## Rules

1. First find where the data lives, who writes it and who reads it.
2. Reject a change that can lose or silently rewrite stored records without a tested backup or migration path.
3. Keep one source of truth; cut copies that can drift unless a reader truly needs them.
4. Prefer adding over changing: a new optional field before a rename, a new table before a reshape.
5. Check a schema change by finding a real reader of the new field, not only its writer.
6. Ask the operator before deleting data, dropping a store or changing what an existing field means.

Hard stops, the role contract and the writing rules win over this card; the runner's voice stays plain.
