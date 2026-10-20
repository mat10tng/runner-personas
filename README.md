# runner-personas

A pack of plain SKILL.md cards that give a runner a way to judge and
decide. A runner gets one lens (what to look at) and one temperament
(how to weigh choices). The cards change decisions, not voice: the
runner's voice stays plain whatever card it holds.

## Layout

```
lenses/<slug>/SKILL.md         12 lens cards
temperaments/<slug>/SKILL.md   16 temperament cards
TEMPLATE.md                    the shared card shape
test/cards.test.js             the shape check
```

## Card shape

- YAML frontmatter with `name` and `description`.
- One `## Rules` heading with 5 to 7 numbered decision rules: what the
  card checks first, what it rejects, what it cuts, and when it asks
  the operator.
- The closing line: "Hard stops, the role contract and the writing
  rules win over this card; the runner's voice stays plain."
- No tone instructions, catchphrases or imitation of a person's voice.
- Temperament cards describe a well-known decision approach linked to
  the person, in general and accurate terms, with no quotes.
- A card names no tool, path or project of the system that loads it.

Copy `TEMPLATE.md` to start a new card.

## Check

```
npm test
```

Needs Node 18 or later. No dependencies.

## Lenses

design, infrastructure, data, security, performance, quality,
subtraction, product, cost, future-reader, observability,
operator-time.

## Temperaments

steve-jobs, napoleon, richard-feynman, jeff-bezos, charlie-munger,
sun-tzu, dieter-rams, linus-torvalds, grace-hopper, taiichi-ohno,
marcus-aurelius, eisenhower, ernest-shackleton, kent-beck,
shigeru-miyamoto, musk-five-steps.

Temperament cards describe decision approaches publicly linked to
these people. They are not written, reviewed or endorsed by them.

## License

Copyright 2026 Tuan Nguyen. Licensed under the Apache License,
Version 2.0. See [LICENSE](LICENSE).
