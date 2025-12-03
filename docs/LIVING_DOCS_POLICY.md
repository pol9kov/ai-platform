---
id: docs-living
owner: @pol9kov
status: active
review_by: 2025-03-01
---

# Living Docs Policy

Правила документации для предотвращения устаревания.

## DocCard (frontmatter)

Каждый документ начинается с метаданных:

```yaml
---
id: docs-<slug>
owner: <github-handle>
status: draft|active|deprecated
review_by: YYYY-MM-DD
---
```

## Статусы

- **draft** — в работе, может меняться
- **active** — актуальный документ
- **deprecated** — устарел, см. замену

## Правила

1. Каждый doc должен быть в `DOCS_INDEX.md`
2. `review_by` в прошлом = документ требует обновления
3. При изменении кода — обновить связанные docs в том же PR
4. Deprecated docs указывают на замену

## При обновлении

1. Сохраняй `id` стабильным
2. Обнови `review_by` (+3 месяца для стабильных docs)
3. Проверь актуальность содержимого
