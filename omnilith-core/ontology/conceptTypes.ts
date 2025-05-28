export type ConceptValue = {
  id: string;
  label?: string;
  category?: string;
  description?: string;
  metadata?: Record<string, unknown>;
};

export type ConceptType = {
  id: string;
  values: ConceptValue[];
};

export const conceptTypes: Record<string, ConceptType> = {
  SongType: {
    id: "SongType",
    values: [
      {
        id: "ballad",
        label: "Ballad",
        category: "slow",
        description: "A slow, emotional song",
        metadata: {
          recommendedPosition: 8,
          mood: "reflective",
        },
      },
      {
        id: "anthem",
        label: "Anthem",
        category: "energetic",
        metadata: {
          mood: "inspiring",
        },
      },
    ],
  },
  LayoutType: {
    id: "LayoutType",
    values: [
      { id: "list", category: "collection", label: "List View" },
      { id: "board", category: "collection", label: "Board View" },
      { id: "form", category: "input", label: "Form View" },
      { id: "detail", category: "single", label: "Detail View" },
    ],
  },
  RendererType: {
    id: "RendererType",
    values: [
      { id: "listRenderer", label: "List Renderer" },
      { id: "formRenderer", label: "Form Renderer" },
      { id: "boardRenderer", label: "Board Renderer" },
      { id: "detailRenderer", label: "Detail Renderer" },
    ],
  },
  BehaviorType: {
    id: "BehaviorType",
    values: [
      { id: "mutation", label: "Mutation" },
      { id: "query", label: "Query" },
      { id: "validation", label: "Validation" },
      { id: "sideEffect", label: "Side Effect" },
    ],
  },
};

export function getConceptMetadata(
  conceptTypeId: string,
  conceptValueId: string
): Record<string, unknown> | undefined {
  const conceptType = conceptTypes[conceptTypeId];
  if (!conceptType) return undefined;
  const match = conceptType.values.find((v) => v.id === conceptValueId);
  return match?.metadata;
}

export function getConceptCategory(
  conceptTypeId: string,
  conceptValueId: string
): string | undefined {
  const conceptType = conceptTypes[conceptTypeId];
  if (!conceptType) return undefined;
  const match = conceptType.values.find((v) => v.id === conceptValueId);
  return match?.category;
}

export function listConceptValues(conceptTypeId: string): string[] {
  const conceptType = conceptTypes[conceptTypeId];
  return conceptType ? conceptType.values.map((v) => v.id) : [];
}
