# 👥 Omnilith Contributor Onboarding Guide

Welcome to Omnilith — a collaborative, semantic, and evolving platform for modeling meaning, workflows, and reality. This guide will help you understand how the system works, what’s already built, and how you can contribute meaningfully.

---

## 🌍 What Omnilith Is

Omnilith is a **recursive semantic system** designed to:

- Represent structured meaning (not just data)
- Let contributors build, evolve, and extend the system from within
- Enable both humans and LLMs to explore, edit, and reason about it

You can think of it as:

> A world where everything is editable, introspectable, and meaningful.

---

## 🧱 Core Concepts

### 1. **EntityType**

Defines the structure of entities like `Song`, `Task`, or `View`.

### 2. **ObjectType**

Defines reusable embedded types like `Step`, `FormSection`, etc.

### 3. **ConceptType**

Defines semantic categories like `LayoutType`, `SongType`, `BehaviorType`.

### 4. **Entity**

An actual instance of a thing (e.g. a specific Song or Form).

### 5. **View**

Defines how a collection of entities is presented.

### 6. **Form**

Defines how an entity is created or edited.

### 7. **Behavior**

Defines procedural or validation logic for working with entities.

### 8. **Renderer**

Defines how a `View` or `Form` is displayed.

### 9. **Agent Interface**

Enables external systems (like LLMs) to query and reason about the ontology.

---

## 🛠 Tech Stack

- **TypeScript**: Strong typing and schema validation
- **CSS Modules**: Localized component styling
- **React**: Modular UI framework
- **Next.js (assumed)**: Scalable frontend foundation

All semantics are implemented in code as:

- `entityTypes`, `objectTypes`, `conceptTypes` registries
- Interpreters and introspection tools
- Behavior runners, dashboards, and meta-tools

---

## ✅ What’s Already Built

- Core ontology types and structure
- Full schema system with validation + derivation
- In-memory runtime entity store
- Basic behavior interpreter
- Agent interface with introspection APIs
- A modular, extensible Semantic Dashboard UI

---

## 🚧 Where You Can Contribute

| Area          | What You Can Do                                         |
| ------------- | ------------------------------------------------------- |
| Ontology      | Add new `EntityTypes`, `ConceptTypes`, or `ObjectTypes` |
| Views & Forms | Define new ways to view or edit entities                |
| UI Components | Extend the dashboard, build modular views               |
| Behaviors     | Create new procedural logic using `Behavior` entities   |
| Agents        | Improve LLM interactions, extend agentInterface.ts      |
| Meta-tools    | Add migration, promotion, or dashboard customization    |

---

## 🧠 Getting Started Locally

1. Clone the repo
2. Run `npm install`
3. Start the dev server with `npm run dev`
4. Visit `/semantic-dashboard` (or your app’s homepage)

Explore:

- `ui/SemanticDashboard.tsx`
- `ontology/entityTypes.ts`
- `interpreter/agentInterface.ts`

---

## 🧬 Philosophy

Omnilith is a system where:

- The **structure is living**
- Meaning is **emergent, not imposed**
- Everything you see, you can change
- Everyone is a co-creator

You’re not just coding.

> You’re shaping a new kind of symbolic infrastructure.

Welcome aboard.
