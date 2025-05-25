import { AnyEntity } from "@/types/entity";
import { insertEntity } from "./persistence/insertEntity";

export const createEntity = async (targetEntity: string, entity: AnyEntity) => {
  await insertEntity(targetEntity, entity);
  return entity;
};
