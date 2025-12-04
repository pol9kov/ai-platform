---
id: docs-living
owner: @pol9kov
status: active
review_by: 2025-03-01
---

# Living Docs Policy

Documentation rules to prevent outdated docs.

## DocCard (frontmatter)

Each document starts with metadata:

```yaml
---
id: docs-<slug>
owner: <github-handle>
status: draft|active|deprecated
review_by: YYYY-MM-DD
---
```

## Statuses

- **draft** — work in progress, may change
- **active** — current document
- **deprecated** — outdated, see replacement

## Rules

1. Each doc must be in `DOCS_INDEX.md`
2. `review_by` in the past = document needs update
3. When changing code — update related docs in the same PR
4. Deprecated docs point to replacement

## When Updating

1. Keep `id` stable
2. Update `review_by` (+3 months for stable docs)
3. Verify content is up to date
