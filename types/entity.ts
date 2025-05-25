// =====================
// entity.ts
// =====================

import { BaseEntity } from "./base";
import { EntityTypeMap } from "./entityTypes";

// Type-safe per-entity wrapper
export type Entity<K extends keyof EntityTypeMap> = BaseEntity<
  EntityTypeMap[K]
> & {
  type: K;
};

// All possible entity types
export type AnyEntity = Entity<keyof EntityTypeMap>;
