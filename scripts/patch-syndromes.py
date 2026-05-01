#!/usr/bin/env python3
"""Rewrite the syndrome arrays in antibacterials/antifungals/antivirals .ts files
   to add empiricPrimary/empiricAlternate/sourceIds/guidelineNotes from
   _syndrome_sources_processed.json. Also keep `empiric` field as the union
   primary+alternate dedupe (so legacy code works)."""
import json, re, sys, os

ROOT = os.path.join(os.path.dirname(__file__), '..')
PROC = os.path.join(ROOT, 'client/src/data/_syndrome_sources_processed.json')
with open(PROC) as f:
    proc = json.load(f)

new_by_id = {s['id']: s for s in proc['syndromes']}

def dedupe_keep_order(seq):
    seen = set()
    out = []
    for x in seq:
        if x not in seen:
            seen.add(x); out.append(x)
    return out

def js_array(items):
    return '[' + ', '.join(f'"{x}"' for x in items) + ']'

def js_str(s):
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').strip() + '"'

def patch_file(path):
    with open(path) as f:
        text = f.read()

    # Find each syndrome block. They look like:
    #   { id: "xxx", name: "...", ..., empiric: [...], commonBugs: [...]},
    # We'll rewrite each one.
    pattern = re.compile(
        r'(\{\s*id:\s*"([^"]+)"[^}]*?empiric:\s*)\[([^\]]*)\](.*?commonBugs:\s*\[[^\]]*\]\s*\})',
        re.DOTALL)

    def repl(m):
        full = m.group(0)
        prefix = m.group(1)
        sid = m.group(2)
        old_arr = m.group(3)
        suffix_after_empiric = m.group(4)
        if sid not in new_by_id:
            return full  # leave alone
        nd = new_by_id[sid]
        primary = nd['primary']
        alt = nd['alternate']
        sids = nd['sourceIds']
        notes = nd.get('notes', '')
        union = dedupe_keep_order(primary + alt)
        new_empiric = js_array(union)
        new_primary = js_array(primary)
        new_alternate = js_array(alt)
        new_source_ids = js_array(sids)
        new_notes = js_str(notes)
        # Build the replacement: keep "empiric: [ union ]" then inject extra fields
        # before commonBugs.
        # Original suffix_after_empiric starts with `, ...commonBugs: [...]}`.
        # We want: empiric: union, empiricPrimary: ..., empiricAlternate: ..., sourceIds: ..., guidelineNotes: ..., commonBugs: ...}
        # find the commonBugs portion in suffix_after_empiric
        cb_match = re.search(r'commonBugs:\s*\[[^\]]*\]', suffix_after_empiric)
        if not cb_match:
            return full
        before_cb = suffix_after_empiric[:cb_match.start()]
        cb_and_after = suffix_after_empiric[cb_match.start():]
        # Strip trailing comma/space before commonBugs (we'll re-add)
        before_cb = re.sub(r',\s*$', '', before_cb).rstrip()
        new_block = (
            prefix + new_empiric +
            f',\n    empiricPrimary: {new_primary},'
            f'\n    empiricAlternate: {new_alternate},'
            f'\n    sourceIds: {new_source_ids},'
            f'\n    guidelineNotes: {new_notes},\n    '
            + cb_and_after
        )
        return new_block

    new_text, count = pattern.subn(repl, text)
    return new_text, count

for fname in ['antibacterials.ts', 'antifungals.ts', 'antivirals.ts']:
    path = os.path.join(ROOT, 'client/src/data', fname)
    new_text, count = patch_file(path)
    with open(path, 'w') as f:
        f.write(new_text)
    print(f'{fname}: {count} syndromes patched')
