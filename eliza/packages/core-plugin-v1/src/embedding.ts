import {
  EmbeddingProvider as coreEmbeddingProvider,
  getEmbeddingConfig as coreGetEmbeddingConfig,
  getEmbeddingType as coreGetEmbeddingType,
  getEmbeddingZeroVector as coreGetEmbeddingZeroVector,
  embed as coreEmbed,
} from '@elizaos/core';

import { type IAgentRuntime, ModelProviderName } from "./types.ts";

export const EmbeddingProvider = coreEmbeddingProvider;

export type EmbeddingProviderType =
    (typeof EmbeddingProvider)[keyof typeof EmbeddingProvider];

export type EmbeddingConfig = {
    readonly dimensions: number;
    readonly model: string;
    readonly provider: EmbeddingProviderType;
};

export const getEmbeddingConfig = coreGetEmbeddingConfig;

export function getEmbeddingType(runtime: IAgentRuntime): "local" | "remote" {
  return coreGetEmbeddingType(runtime);
}

export function getEmbeddingZeroVector(): number[] {
  return coreGetEmbeddingZeroVector()
}


/**
 * Gets embeddings from a remote API endpoint.  Falls back to local BGE/384
 *
 * @param {string} input - The text to generate embeddings for
 * @param {EmbeddingOptions} options - Configuration options including:
 *   - model: The model name to use
 *   - endpoint: Base API endpoint URL
 *   - apiKey: Optional API key for authentication
 *   - isOllama: Whether this is an Ollama endpoint
 *   - dimensions: Desired embedding dimensions
 * @param {IAgentRuntime} runtime - The agent runtime context
 * @returns {Promise<number[]>} Array of embedding values
 * @throws {Error} If the API request fails
 */
export async function embed(runtime: IAgentRuntime, input: string) {
  return coreEmbed(runtime, input);
}

