# Omnilith System Planning Document

This document outlines the next phases for reinforcing, testing, and expanding the Omnilith system. The goal is to lock down the ontology as the foundation of the entire platform before expanding further into features like Convergence.

---

## ✅ Current State (Baseline)

- `entity_schema` and `field_definition` tables are set up and populated
- Validation engine (`validateAgainstSchema`) works using live schema data
- `validateAndPrepareEntity()` handles enrichment (timestamps, schema_version)
- Architecture is layered and clean (ontology → action → persistence → renderer)
- Dynamic rendering from `View` configuration is working
- `FormRenderer` supports booleans, enums, references
- DB schema is semantically named (snake_case) and field definitions are normalized

---

## 🟩 WAVE 1: Structural Integrity & Semantic Trust

**Goal:** Ensure that ontology and views are aligned, complete, and structurally sound.

- [ ] **Schema Drift Checker**

  - Validate that all `entity_schema.fields[]` exist in `field_definition`

- [ ] **View Field Reference Validator**

  - Check that every `view.fields[]` is defined in the matching `field_definition`

- [ ] **FieldDefinition Linter**

  - Check naming conventions (snake_case)
  - Ensure `description` is present
  - Ensure `auto_populated` is correctly applied for system fields

- [ ] **Ontology Consistency Report**

  - Print status of each schema, number of fields, views using it, and errors if any

---

## 🟨 WAVE 2: Unit Testing and Contracts

**Goal:** Formalize core behaviors, prevent regression, lock validation correctness.

- [ ] **Unit tests for `validateAgainstSchema()`**

  - Test required fields, bad types, invalid enums, valid passes

- [ ] **Unit test `validateAndPrepareEntity()`**

  - Ensure `schema_version` and `created_at` are added
  - Ensure auto fields are skipped in validation

- [ ] **CreateEntity + UpdateEntity tests**

  - Check full roundtrip from form → DB

- [ ] **Renderer sanity checks**

  - Basic smoke tests for `FormRenderer`, `ListRenderer`, etc.

---

## 🟦 WAVE 3: Internal Ontology Dev Tools

**Goal:** Make the system explorable, extensible, and trustworthy.

- [ ] **Schema Explorer UI**

  - Visualize schemas, their fields, descriptions, types

- [ ] **View Viewer / Inspector**

  - Browse existing views, field order, layout, filters, sort

- [ ] **Live Renderer Debugger**

  - Pick a view → see renderer → render with dummy or selected data

---

## 🟥 WAVE 4: Feature Expansion — Convergence Engine

**Goal:** Leverage trust in ontology to expand capabilities.

- [ ] Add `horizon` filtering and grouping Views
- [ ] Create children Convergences from a parent context
- [ ] Improve Apex/Trait linking UI (graph/tree view?)
- [ ] Add tags or scoped grouping UX (via View filters)
- [ ] Begin Review Protocol: weekly guided convergence evaluation
- [ ] Schedule-based Convergences (time-aware filtering, reminders)

---

## 🟪 TypeScript Ontology Alignment (Parallel Track)

**Goal:** Ensure ontology data is reflected in real types and safely handled across the system.

- [ ] Define shared `FieldDefinition` type (done ✅)
- [ ] Generate per-entity TypeScript types from `field_definition`
- [ ] Ensure `validateAndPrepareEntity()` returns fully typed entity object
- [ ] Enable `FormRenderer` to infer expected value types by `input_type`
- [ ] Clean up `unknown`, `any`, or loose casting patterns in `FormRenderer`, `FieldInput`, etc.
- [ ] Add helper: `getFieldType(field: FieldDefinition): 'string' | 'number' | ...`

---

## Notes

This roadmap is meant to make the ontology the true foundation of the system — reliable, inspectable, extensible. Once these layers are in place, feature work can accelerate without fear of inconsistency or silent drift.

> The Convergence feature is important — but it should grow from a system that is clean and inspectable, not one that's held together with intuition.
