// Shape check for every card in the pack. No dependencies.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const EXPECTED = { lenses: 12, temperaments: 16 };
const PRECEDENCE = "Hard stops, the role contract and the writing rules win over this card; the runner's voice stays plain.";

// Names a card must not contain: tools, paths or projects of the loading system, or tone instructions.
const FORBIDDEN = [
  [/\b(?:kb|plan|workbook)_[a-z]\w*/i, 'names a loader tool'],
  [/knowledge-base/i, 'names the loader project'],
  [/\bKB\b/, 'names the loader'],
  [/(?:^|[\s`'"(])src\//m, 'names a src/ path'],
  [/speak like|in the voice of|catchphrase/i, 'gives a tone instruction'],
  [/[“”"]/, 'contains a quotation'],
];

function frontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split('\n')) {
    const at = line.indexOf(': ');
    if (at > 0) data[line.slice(0, at)] = line.slice(at + 2);
  }
  return { data, body: raw.slice(match[0].length) };
}

function cards(kind) {
  const dir = join(ROOT, kind);
  return readdirSync(dir)
    .filter(slug => !slug.startsWith('.') && statSync(join(dir, slug)).isDirectory())
    .sort()
    .map(slug => ({ slug, file: join(dir, slug, 'SKILL.md') }));
}

for (const [kind, count] of Object.entries(EXPECTED)) {
  describe(kind, () => {
    const list = cards(kind);

    it(`has ${count} cards`, () => {
      assert.equal(list.length, count, list.map(card => card.slug).join(', '));
    });

    for (const { slug, file } of list) {
      it(`${slug} has the card shape`, () => {
        assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug is lowercase and hyphenated');
        const raw = readFileSync(file, 'utf8');
        const parsed = frontmatter(raw);
        assert.ok(parsed, 'has YAML frontmatter');
        for (const key of ['name', 'description']) {
          const value = parsed.data[key];
          assert.ok(value && value.trim(), `frontmatter has ${key}`);
          assert.ok(!value.includes(': '), `${key} stays plain YAML (no ": ")`);
        }
        assert.match(parsed.data.description, /voice stays plain/, 'description says the voice stays plain');

        const lines = parsed.body.split('\n');
        const headings = lines.filter(line => /^##\s+Rules\s*$/.test(line.trim()));
        assert.equal(headings.length, 1, 'has one "## Rules" heading');
        const after = lines.slice(lines.findIndex(line => /^##\s+Rules\s*$/.test(line.trim())) + 1);
        const end = after.findIndex(line => /^#{1,6}\s/.test(line.trim()));
        const rules = (end === -1 ? after : after.slice(0, end)).filter(line => /^\d+\.\s+\S/.test(line));
        assert.ok(rules.length >= 5 && rules.length <= 7, `has 5 to 7 numbered rules, has ${rules.length}`);

        assert.equal(lines.filter(line => line.trim() === PRECEDENCE).length, 1, 'has the precedence line once');
        assert.equal(lines.filter(line => line.trim()).at(-1).trim(), PRECEDENCE, 'precedence line closes the card');

        for (const [pattern, rule] of FORBIDDEN) assert.doesNotMatch(raw, pattern, rule);
      });
    }
  });
}
