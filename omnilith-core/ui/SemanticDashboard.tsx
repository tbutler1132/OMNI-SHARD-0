// ui/SemanticDashboard.tsx
import React from "react";
import styles from "./SemanticDashboard.module.css";

import { entityTypes, FieldDefinition } from "../ontology/entityTypes";
import { objectTypes } from "../ontology/objectTypes";
import { conceptTypes, ConceptValue } from "../ontology/conceptTypes";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function FieldList({ fields }: { fields: FieldDefinition[] }) {
  return (
    <ul>
      {fields.map((f) => (
        <li key={f.name}>
          <strong>{f.name}</strong> ({f.kind}: {f.type})
        </li>
      ))}
    </ul>
  );
}

function ConceptValueList({ values }: { values: ConceptValue[] }) {
  return (
    <ul>
      {values.map((v) => (
        <li key={v.id}>
          <strong>{v.label || v.id}</strong> {v.category && `(${v.category})`}
          <br />
          {v.description && <small>{v.description}</small>}
        </li>
      ))}
    </ul>
  );
}

export default function SemanticDashboard() {
  return (
    <div className={styles.dashboard}>
      <h1>Semantic Dashboard</h1>

      <Section title="Entity Types">
        {Object.values(entityTypes).map((et) => (
          <div key={et.id} className={styles.card}>
            <h3>{et.name}</h3>
            <FieldList fields={et.fields} />
          </div>
        ))}
      </Section>

      <Section title="Object Types">
        {Object.values(objectTypes).map((ot) => (
          <div key={ot.id} className={styles.card}>
            <h3>{ot.name}</h3>
            <FieldList fields={ot.fields} />
          </div>
        ))}
      </Section>

      <Section title="Concept Types">
        {Object.entries(conceptTypes).map(([id, ct]) => (
          <div key={id} className={styles.card}>
            <h3>{id}</h3>
            <ConceptValueList values={ct.values} />
          </div>
        ))}
      </Section>
    </div>
  );
}
