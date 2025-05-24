import {
  models as coreModels,
  getModelSettings as coreGetModelSettings,
  getImageModelSettings as coreGetImageModelSettings,
  getEmbeddingModelSettings as coreGetEmbeddingModelSettings,
  getEndpoint as coreGetEndpoint,
} from '@elizaos/core';
import {
    type EmbeddingModelSettings,
    type ImageModelSettings,
    ModelClass,
    ModelProviderName,
    type Models,
    type ModelSettings,
} from "./types.ts";

export const models: Models = coreModels

export function getModelSettings(
    provider: ModelProviderName,
    type: ModelClass
): ModelSettings | undefined {
    return coreGetModelSettings(provider, type);
}

export function getImageModelSettings(
    provider: ModelProviderName
): ImageModelSettings | undefined {
    return coreGetImageModelSettings(provider);
}

export function getEmbeddingModelSettings(
    provider: ModelProviderName
): EmbeddingModelSettings | undefined {
    return coreGetEmbeddingModelSettings(provider);
}

export function getEndpoint(provider: ModelProviderName) {
    return coreGetEndpoint(provider);
}
