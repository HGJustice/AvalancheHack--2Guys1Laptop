import {
  uuidSchema as coreUuidSchema,
  validateUuid as coreValidateUuid,
  stringToUuid as coreStringToUuid
} from '@elizaos/core';
import type { UUID } from "./types.ts";

export const uuidSchema = coreUuidSchema;

export function validateUuid(value: unknown): UUID | null {
  return coreValidateUuid(value);
}

export function stringToUuid(target: string | number): UUID {
  return coreStringToUuid(target);
}