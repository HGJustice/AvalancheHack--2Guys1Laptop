import {
  knowledge as coreKnowledge,
  AgentRuntime as coreAgentRuntime,
} from '@elizaos/core';
import type { AgentRuntime } from "./runtime.ts";
import type { IAgentRuntime, KnowledgeItem, UUID, Memory } from "./types.ts";

async function get(
    runtime: IAgentRuntime,
    message: Memory
): Promise<KnowledgeItem[]> {
  return coreKnowledge.get(runtime as coreAgentRuntime, message);
}

async function set(
    runtime: IAgentRuntime,
    item: KnowledgeItem,
    chunkSize = 512,
    bleed = 20
) {
  return coreKnowledge.set(runtime as coreAgentRuntime, item, chunkSize, bleed);
}

export function preprocess(content: string): string {
  return coreKnowledge.preprocess(content);
}

export default {
    get,
    set,
    preprocess,
};
