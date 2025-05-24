import {
  envSchema as coreEnvSchema,
  type EnvConfig as coreEnvConfig,
  validateEnv as coreValidateEnv,
  CharacterSchema as coreCharacterSchema,
  type CharacterConfig as coreCharacterConfig,
  validateCharacterConfig as coreValidateCharacterConfig,
} from '@elizaos/core';

import { ModelProviderName } from "./types";

export const envSchema = coreEnvSchema;

// Type inference
export type EnvConfig = coreEnvConfig;

// Validation function
export function validateEnv(): EnvConfig {
  return coreValidateEnv();
}

// Main Character schema
export const CharacterSchema = coreCharacterSchema;

// Type inference
export type CharacterConfig = coreCharacterConfig;

// Validation function
export function validateCharacterConfig(json: unknown): CharacterConfig {
  return coreValidateCharacterConfig(json);
}

